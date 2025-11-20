// app/api/test-connection/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { anthropic, handleAnthropicError } from '@/lib/anthropic';
import { ApiResponse } from '@/lib/types';

interface TestConnectionResponse {
  status: 'connected' | 'error';
  message: string;
  model?: string;
  responsePreview?: string;
}

export async function GET(request: NextRequest) {
  try {
    console.log('[Test] Testing Anthropic API connection...');

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 100,
      messages: [
        {
          role: 'user',
          content: 'Respond with: "Leo HealthTech Validator backend is operational."',
        },
      ],
    });

    const textContent = response.content
      .filter((block) => block.type === 'text')
      .map((block) => 'text' in block ? block.text : '')
      .join('');

    console.log('[Test] Connection successful');

    return NextResponse.json(
      {
        success: true,
        data: {
          status: 'connected',
          message: 'Anthropic API connection successful',
          model: response.model,
          responsePreview: textContent,
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse<TestConnectionResponse>,
      { status: 200 }
    );

  } catch (error) {
    console.error('[Test] Connection failed:', error);
    
    return NextResponse.json(
      {
        success: false,
        data: {
          status: 'error',
          message: handleAnthropicError(error),
        },
        timestamp: new Date().toISOString(),
      } as ApiResponse<TestConnectionResponse>,
      { status: 500 }
    );
  }
}