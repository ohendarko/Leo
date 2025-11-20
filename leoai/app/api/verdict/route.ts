// app/api/verdict/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { anthropic, extractThinking, extractText, handleAnthropicError } from '@/lib/anthropic';
import { buildVerdictPrompt } from '@/lib/prompts/verdict';
import { 
  VerdictRequest,
  VerdictResponse, 
  ApiResponse,
  MODEL_CONFIG,
} from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const verdictRequest: VerdictRequest = await request.json();

    // Validate required fields
    if (!verdictRequest.pitch || !verdictRequest.questions || !verdictRequest.answers) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: pitch, questions, and answers are required',
          timestamp: new Date().toISOString(),
        } as ApiResponse<never>,
        { status: 400 }
      );
    }

    // Validate questions and answers match
    if (verdictRequest.questions.length !== verdictRequest.answers.length) {
      return NextResponse.json(
        {
          success: false,
          error: 'Mismatch between questions and answers count',
          timestamp: new Date().toISOString(),
        } as ApiResponse<never>,
        { status: 400 }
      );
    }

    const systemPrompt = buildVerdictPrompt(verdictRequest);

    console.log('[Verdict] Calling Claude API for final assessment...');
    console.log('[Verdict] Startup:', verdictRequest.pitch.startupName);

    // Use larger thinking budget for final analysis
    const response = await anthropic.messages.create({
      model: MODEL_CONFIG.model,
      max_tokens: MODEL_CONFIG.max_tokens,
      thinking: {
        type: 'enabled',
        budget_tokens: 15000,
      },
      messages: [
        {
          role: 'user',
          content: systemPrompt,
        },
      ],
    });

    console.log('[Verdict] Response received');

    const thinkingProcess = extractThinking(response);
    const textResponse = extractText(response);

    // Parse JSON response
    let parsedResponse: VerdictResponse;
    try {
      const cleanJson = textResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      
      parsedResponse = {
        survivalScore: parsed.survivalScore,
        breakdown: parsed.breakdown,
        confidence: parsed.confidence,
        reportMarkdown: parsed.reportMarkdown,
        criticalRisks: parsed.criticalRisks,
        keyStrengths: parsed.keyStrengths,
        actionableRecommendations: parsed.actionableRecommendations,
        thinkingProcess,
      };
    } catch (parseError) {
      console.error('[Verdict] Failed to parse JSON:', parseError);
      console.error('[Verdict] Raw response:', textResponse);
      
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to parse AI response. Please try again.',
          timestamp: new Date().toISOString(),
        } as ApiResponse<never>,
        { status: 500 }
      );
    }

    // Validate response structure
    if (
      typeof parsedResponse.survivalScore !== 'number' ||
      !parsedResponse.breakdown ||
      !parsedResponse.confidence ||
      !parsedResponse.reportMarkdown
    ) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid AI response: Missing required fields',
          timestamp: new Date().toISOString(),
        } as ApiResponse<never>,
        { status: 500 }
      );
    }

    // Validate score ranges
    if (
      parsedResponse.survivalScore < 0 || 
      parsedResponse.survivalScore > 100 ||
      Object.values(parsedResponse.breakdown).some(score => score < 0 || score > 100)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid AI response: Scores must be between 0 and 100',
          timestamp: new Date().toISOString(),
        } as ApiResponse<never>,
        { status: 500 }
      );
    }

    console.log('[Verdict] Successfully generated verdict');
    console.log('[Verdict] Survival Score:', parsedResponse.survivalScore);

    return NextResponse.json(
      {
        success: true,
        data: parsedResponse,
        timestamp: new Date().toISOString(),
      } as ApiResponse<VerdictResponse>,
      { status: 200 }
    );

  } catch (error) {
    console.error('[Verdict] Error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: handleAnthropicError(error),
        timestamp: new Date().toISOString(),
      } as ApiResponse<never>,
      { status: 500 }
    );
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}