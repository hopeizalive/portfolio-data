
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
  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/813f001f-ddaf-4d47-965f-9d5a14ecfd58',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'geminiService.ts:13',message:'initializeChat entry',data:{hasExistingSession:!!chatSession},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H4'})}).catch(()=>{});
  // #endregion
  if (chatSession) return chatSession;

  // Use the API_KEY from process.env as per guidelines
  const apiKey = process.env.API_KEY as string;
  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/813f001f-ddaf-4d47-965f-9d5a14ecfd58',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'geminiService.ts:18',message:'API key check',data:{apiKeyExists:!!apiKey,apiKeyLength:apiKey?.length||0,apiKeyPrefix:apiKey?.substring(0,5)||'none'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H1'})}).catch(()=>{});
  // #endregion
  if (!apiKey || apiKey.trim() === '' || apiKey === 'undefined') {
    throw new Error('GEMINI_API_KEY is not set. Please create a .env file with GEMINI_API_KEY=your_api_key');
  }
  const ai = new GoogleGenAI({ apiKey });
  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/813f001f-ddaf-4d47-965f-9d5a14ecfd58',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'geminiService.ts:20',message:'GoogleGenAI instance created',data:{aiInstanceExists:!!ai},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H3'})}).catch(()=>{});
  // #endregion

  // Initialize the chat model with system instructions and correct model name
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: SYSTEM_PROMPT,
      temperature: 0.7,
    },
  });
  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/813f001f-ddaf-4d47-965f-9d5a14ecfd58',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'geminiService.ts:28',message:'Chat session created',data:{chatExists:!!chat},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H3'})}).catch(()=>{});
  // #endregion

  chatSession = chat;
  return chat;
};

/**
 * Sends a text message to the Gemini model and returns the response string.
 */
export const sendMessageToGemini = async (message: string): Promise<string> => {
  // #region agent log
  fetch('http://127.0.0.1:7244/ingest/813f001f-ddaf-4d47-965f-9d5a14ecfd58',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'geminiService.ts:35',message:'sendMessageToGemini entry',data:{messageLength:message?.length||0},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H4'})}).catch(()=>{});
  // #endregion
  try {
    const session = initializeChat();
    // #region agent log
    fetch('http://127.0.0.1:7244/ingest/813f001f-ddaf-4d47-965f-9d5a14ecfd58',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'geminiService.ts:38',message:'Session initialized',data:{sessionExists:!!session},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H4'})}).catch(()=>{});
    // #endregion
    
    // sendMessage returns a GenerateContentResponse
    const response = await session.sendMessage({
      message: message
    });
    // #region agent log
    fetch('http://127.0.0.1:7244/ingest/813f001f-ddaf-4d47-965f-9d5a14ecfd58',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'geminiService.ts:44',message:'Response received',data:{responseExists:!!response,hasText:!!response?.text,textLength:response?.text?.length||0},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H3'})}).catch(()=>{});
    // #endregion

    // Access .text property directly (not a method)
    return response.text || "I apologize, I couldn't generate a response at this moment.";
  } catch (error) {
    // #region agent log
    fetch('http://127.0.0.1:7244/ingest/813f001f-ddaf-4d47-965f-9d5a14ecfd58',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'geminiService.ts:47',message:'Error in sendMessageToGemini',data:{errorMessage:error instanceof Error?error.message:String(error),errorName:error instanceof Error?error.name:'Unknown'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'H1'})}).catch(()=>{});
    // #endregion
    console.error("Error communicating with Gemini:", error);
    return "I'm having trouble connecting to the AI service right now. Please try again later.";
  }
};
