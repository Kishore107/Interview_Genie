import { ANTHROPIC_API_URL } from '../config';

export const getAnthropicResponse = async (apiKey: string, question: string): Promise<string> => {
  try {
    const response = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({
        model: 'claude-3-opus-20240229',
        messages: [{
          role: 'user',
          content: `You are a professional interviewee. Provide a clear, concise, and professional answer to the following interview question. Focus on being specific and providing relevant examples when appropriate.

Question: "${question}"

Format your response in a clear, structured way. If relevant, include:
1. A direct answer to the question
2. A specific example or explanation
3. A brief conclusion`
        }],
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get response from Anthropic API');
    }

    const data = await response.json();
    return data.content[0].text;
  } catch (error) {
    console.error('Error getting Anthropic response:', error);
    throw new Error('Failed to get AI response. Please check your API key and try again.');
  }
};