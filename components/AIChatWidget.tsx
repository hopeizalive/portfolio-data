
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Loader2, User, Bot, Mic, MicOff, Volume2 } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";
import { SYSTEM_PROMPT } from '../constants';
import { float32ToPCM16, encode, decode, decodeAudioData } from '../utils/audioUtils';

const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: "Hi there! I'm an AI assistant. You can chat with me or click the microphone to talk!",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Voice Mode State
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false); // Model is speaking
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Live API Refs
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const activeSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionRef = useRef<any>(null); // To hold the active session

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isVoiceMode]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopVoiceSession();
    };
  }, []);

  const stopVoiceSession = () => {
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }

    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (sourceNodeRef.current) {
      sourceNodeRef.current.disconnect();
      sourceNodeRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    
    // Stop playing audio
    activeSourcesRef.current.forEach(source => {
      try { source.stop(); } catch(e) {}
    });
    activeSourcesRef.current.clear();

    if (inputAudioContextRef.current) {
      inputAudioContextRef.current.close();
      inputAudioContextRef.current = null;
    }
    if (outputAudioContextRef.current) {
      outputAudioContextRef.current.close();
      outputAudioContextRef.current = null;
    }

    nextStartTimeRef.current = 0;
    setIsConnecting(false);
    setIsVoiceMode(false);
    setIsSpeaking(false);
  };

  const startVoiceSession = async () => {
    try {
      setIsVoiceMode(true);
      setIsConnecting(true);

      const apiKey = process.env.API_KEY;
      if (!apiKey) throw new Error("API Key not found");

      // Initialize a new instance right before making an API call to ensure current key
      const ai = new GoogleGenAI({ apiKey });
      
      // Initialize Audio Contexts
      inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      nextStartTimeRef.current = outputAudioContextRef.current.currentTime;

      // Get Microphone Access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      // Connect to Live API
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }
          },
          systemInstruction: SYSTEM_PROMPT,
        },
        callbacks: {
          onopen: () => {
            console.log("Live Session Connected");
            setIsConnecting(false);

            // Start processing audio input
            if (!inputAudioContextRef.current || !mediaStreamRef.current) return;
            
            const source = inputAudioContextRef.current.createMediaStreamSource(mediaStreamRef.current);
            sourceNodeRef.current = source;
            
            const processor = inputAudioContextRef.current.createScriptProcessor(4096, 1, 1);
            processorRef.current = processor;
            
            processor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcm16 = float32ToPCM16(inputData);
              const base64Data = encode(pcm16);
              
              // Solely rely on sessionPromise resolves to send data
              sessionPromise.then(session => {
                session.sendRealtimeInput({
                  media: {
                    mimeType: 'audio/pcm;rate=16000',
                    data: base64Data
                  }
                });
              });
            };

            source.connect(processor);
            processor.connect(inputAudioContextRef.current.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            // Handle Audio Output
            const audioData = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (audioData && outputAudioContextRef.current) {
              setIsSpeaking(true);
              const audioBuffer = await decodeAudioData(
                decode(audioData),
                outputAudioContextRef.current,
                24000,
                1
              );
              
              const source = outputAudioContextRef.current.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputAudioContextRef.current.destination);
              
              // Use nextStartTime cursor to track the end of audio playback queue for gapless playback
              const ctxTime = outputAudioContextRef.current.currentTime;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctxTime);
              
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current = nextStartTimeRef.current + audioBuffer.duration;
              
              activeSourcesRef.current.add(source);
              source.onended = () => {
                activeSourcesRef.current.delete(source);
                if (activeSourcesRef.current.size === 0) {
                  setIsSpeaking(false);
                }
              };
            }

            // Handle interruptions (if user speaks over model)
            if (message.serverContent?.interrupted) {
               activeSourcesRef.current.forEach(src => {
                 try { src.stop(); } catch(e) {}
               });
               activeSourcesRef.current.clear();
               setIsSpeaking(false);
               nextStartTimeRef.current = 0;
            }
          },
          onclose: () => {
            console.log("Live Session Closed");
            stopVoiceSession();
          },
          onerror: (err) => {
            console.error("Live Session Error", err);
            stopVoiceSession();
          }
        }
      });

      sessionRef.current = await sessionPromise;

    } catch (error) {
      console.error("Failed to start voice session:", error);
      stopVoiceSession();
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue.trim();
    setInputValue('');
    
    // Add user message
    const newUserMessage: ChatMessage = {
      role: 'user',
      text: userText,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(userText);
      
      const newBotMessage: ChatMessage = {
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newBotMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: ChatMessage = {
        role: 'model',
        text: "Sorry, I encountered an error. Please check the console or try again.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      <div 
        className={`
          pointer-events-auto
          mb-4 w-[350px] sm:w-[380px] max-h-[600px] h-[70vh]
          glass-panel rounded-2xl shadow-2xl flex flex-col overflow-hidden
          transition-all duration-300 ease-in-out origin-bottom-right
          ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10 pointer-events-none h-0'}
        `}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2 text-white">
            <Sparkles className="w-5 h-5" />
            <h3 className="font-bold">Portfolio Assistant</h3>
          </div>
          <div className="flex items-center gap-1">
             <button 
                onClick={() => isVoiceMode ? stopVoiceSession() : startVoiceSession()}
                className={`p-2 rounded-full transition-colors ${isVoiceMode ? 'bg-red-500/20 text-red-200 hover:bg-red-500/40' : 'hover:bg-white/10 text-white/80'}`}
                title={isVoiceMode ? "End Voice Chat" : "Start Voice Chat"}
              >
                {isVoiceMode ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-white/80 hover:text-white transition-colors hover:bg-white/10 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
          </div>
        </div>

        {/* Content Area - Switches between Text List and Voice Visualizer */}
        {isVoiceMode ? (
          <div className="flex-1 bg-darker/50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
             {/* Background Pulse */}
             <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-3xl transition-all duration-1000 ${isSpeaking ? 'scale-150 opacity-80' : 'scale-100 opacity-40'}`}></div>
             
             {/* Center Status */}
             <div className="z-10 flex flex-col items-center gap-6">
                {isConnecting ? (
                  <div className="flex flex-col items-center gap-4 text-slate-400">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <span className="text-sm font-medium">Connecting to Gemini Live...</span>
                  </div>
                ) : (
                  <>
                    <div className={`
                      w-24 h-24 rounded-full flex items-center justify-center
                      transition-all duration-300 shadow-[0_0_30px_rgba(99,102,241,0.3)]
                      ${isSpeaking ? 'bg-primary scale-110 shadow-[0_0_50px_rgba(99,102,241,0.6)]' : 'bg-card border-2 border-primary/50'}
                    `}>
                       {isSpeaking ? (
                         <Volume2 className="w-10 h-10 text-white animate-pulse" />
                       ) : (
                         <Mic className="w-10 h-10 text-primary" />
                       )}
                    </div>
                    <div className="text-center">
                      <p className="text-white font-medium text-lg mb-1">
                        {isSpeaking ? "Adil's AI is speaking..." : "Listening..."}
                      </p>
                      <p className="text-slate-400 text-sm">
                        Speak naturally to ask about Adil.
                      </p>
                    </div>
                  </>
                )}
             </div>
             
             {/* Cancel Button */}
             <button 
               onClick={stopVoiceSession}
               className="mt-12 px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm text-slate-300 transition-all z-10"
             >
               Switch to Text Chat
             </button>
          </div>
        ) : (
          <>
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-darker/50">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex items-start gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center shrink-0
                    ${msg.role === 'user' ? 'bg-slate-700' : 'bg-primary/20 text-primary'}
                  `}>
                    {msg.role === 'user' ? <User size={14} /> : <Bot size={16} />}
                  </div>
                  <div 
                    className={`
                      p-3 rounded-lg max-w-[80%] text-sm leading-relaxed
                      ${msg.role === 'user' 
                        ? 'bg-primary text-white rounded-tr-none' 
                        : 'bg-card border border-white/5 text-slate-200 rounded-tl-none'}
                    `}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-2">
                   <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                    <Bot size={16} />
                  </div>
                  <div className="bg-card border border-white/5 p-3 rounded-lg rounded-tl-none">
                    <div className="flex space-x-1 h-5 items-center">
                      <div className="w-2 h-2 bg-slate-400 rounded-full typing-dot"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full typing-dot"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full typing-dot"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-card border-t border-white/10 shrink-0">
              <form 
                onSubmit={handleSendMessage}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about my skills..."
                  className="flex-1 bg-darker border border-white/10 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-slate-500"
                />
                 <button
                  type="button"
                  onClick={startVoiceSession}
                  className="p-2 text-slate-400 hover:text-primary transition-colors"
                  title="Talk to AI"
                >
                  <Mic className="w-5 h-5" />
                </button>
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="p-2 bg-primary text-white rounded-full hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
              </form>
            </div>
          </>
        )}
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          pointer-events-auto
          group flex items-center justify-center
          w-14 h-14 rounded-full shadow-lg hover:shadow-primary/25
          transition-all duration-300 transform hover:scale-110
          ${isOpen ? 'bg-slate-700 text-white rotate-90' : 'bg-gradient-to-r from-primary to-secondary text-white'}
        `}
        aria-label="Toggle AI Chat"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        {!isOpen && (
          <span className="absolute top-0 right-0 -mt-1 -mr-1 w-3 h-3 bg-red-500 rounded-full animate-pulse border-2 border-darker"></span>
        )}
      </button>
    </div>
  );
};

export default AIChatWidget;
