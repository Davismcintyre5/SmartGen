export async function getAISuggestions({ templateName, schema, partialData, context = '' }) {
  const fieldList = schema.map(f => `- ${f.name} (${f.label}): ${partialData[f.name] || '[empty]'}`).join('\n');

  const prompt = `You are an expert document assistant for SmartGen.
The user is filling out a "${templateName}" document template.
Current field values (may be partial or empty):
${fieldList}
${context ? `Extra context from user: ${context}` : ''}

Your task: Return ONLY a valid JSON object with suggested values for ALL fields.
Keep suggestions realistic, professional, and culturally appropriate.
Do not include explanations — just the JSON object.
Example format: { "fieldName": "suggested value", ... }`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!response.ok) throw new Error('AI service unavailable');
  const data = await response.json();
  const text = data.content?.find(b => b.type === 'text')?.text || '{}';

  try {
    const clean = text.replace(/```json|```/g, '').trim();
    return JSON.parse(clean);
  } catch {
    return {};
  }
}