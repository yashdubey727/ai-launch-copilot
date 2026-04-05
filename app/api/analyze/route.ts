import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { buildAnalyzePrompt } from '@/lib/prompts';
import { mockAnalyzeResponse } from '@/lib/demo-data';

const client = new OpenAI();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt = buildAnalyzePrompt(body);

    const response = await client.responses.create({
      model: 'gpt-4.1-mini',
      input: prompt,
    });

    const text = response.output_text?.trim();
    console.log('RAW ANALYZE OUTPUT:', text);

    if (!text) {
      console.log('No text returned, using mock fallback');
      return NextResponse.json(mockAnalyzeResponse);
    }

    const parsed = JSON.parse(text);
    console.log('Parsed analyze response successfully');
    return NextResponse.json(parsed);
  } catch (error) {
    console.error('Analyze API error:', error);
    return NextResponse.json(mockAnalyzeResponse);
  }
}