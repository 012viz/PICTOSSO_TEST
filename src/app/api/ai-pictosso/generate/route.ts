/**
 * API Route: Generate Pictosso with AI
 * POST /api/ai-pictosso/generate
 */

import { NextRequest, NextResponse } from 'next/server';
import { PictossoGenerator } from '@/app/ai-pictosso/pictosso-generator';

export async function POST(request: NextRequest) {
    try {
        const { prompt, apiKey } = await request.json();

        if (!prompt || typeof prompt !== 'string') {
            return NextResponse.json(
                { error: 'Prompt is required' },
                { status: 400 }
            );
        }

        // Use API key from request or environment variable
        const openRouterKey = apiKey || process.env.OPENROUTER_API_KEY;
        
        if (!openRouterKey) {
            return NextResponse.json(
                { error: 'OpenRouter API key not configured' },
                { status: 500 }
            );
        }

        const generator = new PictossoGenerator(openRouterKey);
        const result = await generator.generate(prompt);

        return NextResponse.json({
            success: true,
            data: result
        });

    } catch (error) {
        console.error('AI Pictosso generation error:', error);
        return NextResponse.json(
            { 
                error: 'Failed to generate Pictosso',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
