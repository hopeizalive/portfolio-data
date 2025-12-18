
// Use correct imports and types from @google/genai
import { GoogleGenAI, Chat } from "@google/genai";
import { SYSTEM_PROMPT } from '../constants';

// Store the chat session using the correct Chat type
let chatSession: Chat | null = null;

/**
 * Initializes the Gemini chat session if it hasn't been created yet.
 * Uses gemini-3-flash-preview for general text tasks.
 */
export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  // Use the API_KEY from process.env as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

  // Initialize the chat model with system instructions and correct model name
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: SYSTEM_PROMPT,
      temperature: 0.7,
    },
  });

  chatSession = chat;
  return chat;
};

/**
 * Sends a text message to the Gemini model and returns the response string.
 */
export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const session = initializeChat();
    
    // sendMessage returns a GenerateContentResponse
    const response = await session.sendMessage({
      message: message
    });

    // Access .text property directly (not a method)
    return response.text || "I apologize, I couldn't generate a response at this moment.";
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return "I'm having trouble connecting to the AI service right now. Please try again later.";
  }
};
