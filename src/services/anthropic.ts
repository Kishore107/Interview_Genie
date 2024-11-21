import { ANTHROPIC_API_URL } from '../config';
import { ChatMessage } from '../types';

export const getAnthropicResponse = async (apiKey: string, question: string, chatHistory: ChatMessage[]): Promise<string> => {
  try {
    const messages = [
      {
        role: "system",
        content: "You are a professional interviewee. Provide clear, concise, and professional answers to interview questions. Focus on being specific and providing relevant examples when appropriate."
      },
      ...chatHistory.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      { role: "user", content: question }
    ];

    const response = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({
        model: 'claude-3-opus-20240229',
        messages: messages,
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