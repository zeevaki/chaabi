import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { message } = await req.json()

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return NextResponse.json({
      reply: "The Genie is resting! Add an ANTHROPIC_API_KEY to your .env.local file to wake me up. 🧞‍♂️",
    })
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 300,
        system:
          'You are a friendly coding genie for kids in 5th grade (age 10-11). Explain coding concepts in very simple, fun, short answers. Use emojis. Keep answers under 3 sentences. Never write the full solution for them — give hints and encouragement instead.',
        messages: [{ role: 'user', content: message }],
      }),
    })

    const data = await response.json()
    const reply = data.content?.[0]?.text || "Hmm, the lamp is flickering! Try again. 🪔"
    return NextResponse.json({ reply })
  } catch {
    return NextResponse.json({ reply: "The lamp needs more magic dust! Try again in a moment. 🪔" })
  }
}
