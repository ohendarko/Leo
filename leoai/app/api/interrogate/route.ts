// app/api/interrogate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { anthropic, extractThinking, extractText, handleAnthropicError } from '@/lib/anthropic';
import { buildInterrogationPrompt } from '@/lib/prompts/interrogate';
import { 
  PitchSubmission, 
  InterrogationResponse, 
  ApiResponse,
  MODEL_CONFIG,
  THINKING_CONFIG 
} from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const pitch: PitchSubmission = await request.json();

    // Validate required fields
    if (!pitch.startupName || !pitch.problemStatement || !pitch.solution) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: startupName, problemStatement, and solution are required',
          timestamp: new Date().toISOString(),
        } as ApiResponse<never>,
        { status: 400 }
      );
    }

    const systemPrompt = buildInterrogationPrompt(pitch);

    console.log('[Interrogate] Calling Claude API...');
    console.log('[Interrogate] Pitch:', pitch.startupName);

    const response = await anthropic.messages.create({
      model: MODEL_CONFIG.model,
      max_tokens: MODEL_CONFIG.max_tokens,
      thinking: THINKING_CONFIG,
      messages: [
        {
          role: 'user',
          content: systemPrompt,
        },
      ],
    });

    console.log('[Interrogate] Response received');

    const thinkingProcess = extractThinking(response);
    const textResponse = extractText(response);

    // Parse JSON response
    let parsedResponse: InterrogationResponse;
    try {
      const cleanJson = textResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      
      parsedResponse = {
        questions: parsed.questions,
        analysisSnippet: parsed.analysisSnippet,
        thinkingProcess,
      };
    } catch (parseError) {
      console.error('[Interrogate] Failed to parse JSON:', parseError);
      console.error('[Interrogate] Raw response:', textResponse);
      
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
    if (!parsedResponse.questions || parsedResponse.questions.length !== 3) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid AI response: Expected 3 questions',
          timestamp: new Date().toISOString(),
        } as ApiResponse<never>,
        { status: 500 }
      );
    }

    console.log('[Interrogate] Successfully generated', parsedResponse.questions.length, 'questions');

    return NextResponse.json(
      {
        success: true,
        data: parsedResponse,
        timestamp: new Date().toISOString(),
      } as ApiResponse<InterrogationResponse>,
      { status: 200 }
    );

  } catch (error) {
    console.error('[Interrogate] Error:', error);
    
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