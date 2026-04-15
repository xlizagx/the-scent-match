export default async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;

  const body = await req.json();
  const { prompt, schema } = body;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 4000,
      messages: [{ role: 'user', content: `${prompt}\n\nRespond with only a JSON object matching this schema:\n${JSON.stringify(schema)}` }]
    })
  });

  const data = await response.json();
  const text = data.content[0].text.trim();
  const clean = text.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();

  return new Response(clean, {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};

export const config = {
  path: '/api/generate'
};
