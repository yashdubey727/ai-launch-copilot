import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { buildStoriesPrompt } from '@/lib/prompts';
import { mockStoriesResponse } from '@/lib/demo-data';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt = buildStoriesPrompt(body.requirements ?? []);

    const response = await client.responses.create({
      model: 'gpt-4.1-mini',
      input: prompt,
    });

    const text = response.output_text?.trim();
    if (!text) {
      return NextResponse.json(mockStoriesResponse);
    }

    const parsed = JSON.parse(text);
    return NextResponse.json(parsed);
  } catch (error) {
    console.error('Stories API error:', error);
    return NextResponse.json(mockStoriesResponse);
  }
}