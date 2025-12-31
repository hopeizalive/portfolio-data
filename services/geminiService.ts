
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
  const apiKey = process.env.API_KEY as string;
  
  // Enhanced API key validation
  if (!apiKey) {
    console.error("API_KEY is undefined");
    throw new Error('GEMINI_API_KEY is not set. Please create a .env file in the root directory with: GEMINI_API_KEY=your_api_key');
  }
  
  if (apiKey.trim() === '' || apiKey === 'undefined' || apiKey === 'null') {
    console.error("API_KEY is invalid:", apiKey);
    throw new Error('GEMINI_API_KEY is invalid. Please check your .env file and ensure it contains a valid API key.');
  }

  console.log("Initializing Gemini chat with API key (length):", apiKey.length);
  
  try {
    const ai = new GoogleGenAI({ apiKey });

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
  } catch (error: any) {
    console.error("Failed to initialize Gemini chat:", error);
    throw new Error(`Failed to initialize Gemini: ${error?.message || 'Unknown error'}`);
  }
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

    // Log the response structure for debugging
    console.log("Gemini API Response:", response);

    // Try different possible response structures
    let responseText: string | undefined;
    
    // Check if response has text property
    if (response.text) {
      responseText = response.text;
    } 
    // Check if response has candidates array
    else if ((response as any).candidates && (response as any).candidates[0]) {
      const candidate = (response as any).candidates[0];
      if (candidate.content && candidate.content.parts && candidate.content.parts[0]) {
        responseText = candidate.content.parts[0].text;
      }
    }
    // Check if response has content property
    else if ((response as any).content) {
      const content = (response as any).content;
      if (content.parts && content.parts[0] && content.parts[0].text) {
        responseText = content.parts[0].text;
      }
    }

    if (!responseText) {
      console.error("Unexpected response structure:", JSON.stringify(response, null, 2));
      return "I apologize, I couldn't generate a response at this moment. The API returned an unexpected format.";
    }

    return responseText;
  } catch (error: any) {
    // Enhanced error logging
    console.error("Error communicating with Gemini:", error);
    console.error("Error details:", {
      message: error?.message,
      name: error?.name,
      stack: error?.stack,
      response: error?.response,
      status: error?.status,
      statusText: error?.statusText
    });

    // Provide more specific error messages
    let errorMessage = "I'm having trouble connecting to the AI service right now.";
    
    if (error?.message) {
      if (error.message.includes('API_KEY') || error.message.includes('api key')) {
        errorMessage = "API key is missing or invalid. Please check your configuration.";
      } else if (error.message.includes('quota') || error.message.includes('limit')) {
        errorMessage = "API quota exceeded. Please try again later.";
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        errorMessage = "Network error. Please check your internet connection and try again.";
      } else if (error.status === 401 || error.status === 403) {
        errorMessage = "Authentication failed. Please check your API key.";
      } else if (error.status === 429) {
        errorMessage = "Too many requests. Please wait a moment and try again.";
      } else {
        errorMessage = `Error: ${error.message}. Please try again later.`;
      }
    }

    return errorMessage;
  }
};
