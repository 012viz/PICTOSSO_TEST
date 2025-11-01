/**
 * OpenRouter AI Client
 * Handles communication with OpenRouter API
 */

export interface OpenRouterMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export interface OpenRouterResponse {
    id: string;
    choices: {
        message: {
            role: string;
            content: string;
        };
        finish_reason: string;
    }[];
    usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
}

export class OpenRouterClient {
    private apiKey: string;
    private baseUrl = 'https://openrouter.ai/api/v1';
    
    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    async chat(
        messages: OpenRouterMessage[],
        model: string = 'anthropic/claude-3.5-sonnet',
        temperature: number = 0.7
    ): Promise<string> {
        const response = await fetch(`${this.baseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': process.env.NEXT_PUBLIC_WEBSITE_BASE_URL || 'http://localhost:3000',
                'X-Title': 'Pictosso AI Generator'
            },
            body: JSON.stringify({
                model,
                messages,
                temperature,
                max_tokens: 4000
            })
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`OpenRouter API error: ${error}`);
        }

        const data: OpenRouterResponse = await response.json();
        return data.choices[0]?.message?.content || '';
    }
}
