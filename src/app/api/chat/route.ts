// src/app/api/chat/route.ts
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// tipos simples para as mensagens do chat
type ChatRole = 'system' | 'user' | 'assistant';
interface ChatMessage { role: ChatRole; content: string }

// Prompt ajustado para respostas curtas (até 2 frases)
const SYSTEM_PROMPT = `
Você é a Lina, consultora virtual do NutriFlow, um SaaS de nutrição por IA.
Responda sempre em no máximo duas frases claras e diretas.
Explique brevemente que o NutriFlow analisa fotos de refeições, calcula calorias e macros, acompanha progresso e oferece planos a partir de R$19,90/mês.
Seja amigável e finalize sempre com um convite para assinar.
`;

export async function POST(req: Request) {
  try {
    const { message, history } = (await req.json()) as { message: string; history: ChatMessage[] };

    const messages: ChatMessage[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history,
      { role: 'user', content: message },
    ];

    const res = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 0.7,
      max_tokens: 150,
    });

    const reply = (res.choices[0]?.message?.content ?? '').trim();
    const newHistory: ChatMessage[] = [...messages, { role: 'assistant', content: reply }];

    return NextResponse.json({ reply, history: newHistory });
  } catch (err: unknown) {
    console.error(err);
    const message = err instanceof Error ? err.message : 'Erro desconhecido';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
