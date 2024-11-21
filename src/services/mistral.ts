import MistralClient from '@mistralai/mistralai';

export const createMistralClient = (apiKey: string) => {
  return new MistralClient(apiKey);
};

export const getAIResponse = async (apiKey: string, question: string): Promise<string> => {
  try {
    const client = createMistralClient(apiKey);
    
    const prompt = `You are a professional interviewee. Provide a clear, concise, and professional answer to the following interview question. Focus on being specific and providing relevant examples when appropriate.

Question: "${question}"

Format your response in a clear, structured way. If relevant, include:
1. A direct answer to the question
2. A specific example or explanation
3. A brief conclusion`;

    const response = await client.chat({
      model: "mistral-tiny",
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error getting AI response:', error);
    throw new Error('Failed to get AI response. Please check your API key and try again.');
  }
};