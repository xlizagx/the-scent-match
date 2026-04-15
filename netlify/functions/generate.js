exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: 'No API key' }) };
  }

  const { prompt, schema } = JSON.parse(event.body);

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
  
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: clean
  };
};
