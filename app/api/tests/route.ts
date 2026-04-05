import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { buildTestsPrompt } from '@/lib/prompts';
import { mockTestsResponse } from '@/lib/demo-data';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt = buildTestsPrompt(body.requirements ?? [], body.stories ?? []);

    const response = await client.responses.create({
      model: 'gpt-4.1-mini',
      input: prompt,
    });

    const text = response.output_text?.trim();
    if (!text) {
      return NextResponse.json(mockTestsResponse);
    }

    const parsed = JSON.parse(text);
    return NextResponse.json(parsed);
  } catch (error) {
    console.error('Tests API error:', error);
    return NextResponse.json(mockTestsResponse);
  }
}