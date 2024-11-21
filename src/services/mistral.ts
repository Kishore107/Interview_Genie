import MistralClient from '@mistralai/mistralai';

export const createMistralClient = (apiKey: string) => {
  return new MistralClient(apiKey);
};

export const getAIResponse = async (apiKey: string, question: string, chatHistory: ChatMessage[]): Promise<string> => {
  try {
    const client = createMistralClient(apiKey);
    
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

    const response = await client.chat({
      model: "mistral-tiny",
      messages: messages,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error getting AI response:', error);
    throw new Error('Failed to get AI response. Please check your API key and try again.');
  }
};