import { GoogleGenAI, ChatSession, Content } from "@google/genai";
import { SYSTEM_PROMPT } from '../constants';

let chatSession: ChatSession | null = null;

export const initializeChat = (): ChatSession => {
  if (chatSession) return chatSession;

  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing from environment variables.");
    // In a real app, we might handle this gracefully or disable the chat
  }

  // Create the client with the API key
  const ai = new GoogleGenAI({ apiKey: apiKey || 'dummy-key-for-dev' });

  // Initialize the chat model with system instructions
  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_PROMPT,
      temperature: 0.7,
    },
  });

  chatSession = chat;
  return chat;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const session = initializeChat();
    
    // We want to wait for the whole text for this simple implementation
    // For a more advanced version, we would yield chunks
    const response = await session.sendMessage({
      message: message
    });

    return response.text || "I apologize, I couldn't generate a response at this moment.";
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return "I'm having trouble connecting to the AI service right now. Please try again later.";
  }
};