import React, { useState, useCallback } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Brain, Keyboard } from 'lucide-react';
import ApiKeyInput from './components/ApiKeyInput';
import AudioRecorder from './components/AudioRecorder';
import RecordButton from './components/RecordButton';
import TranscriptionDisplay from './components/TranscriptionDisplay';
import FeedbackDisplay from './components/FeedbackDisplay';
import { useKeyPress } from './hooks/useKeyPress';
import { getAIResponse } from './services/mistral';
import { getAnthropicResponse } from './services/anthropic';
import type { InterviewState } from './types';

function App() {
  const [state, setState] = useState<InterviewState>({
    isRecording: false,
    transcription: '',
    aiResponse: '',
    mistralApiKey: localStorage.getItem('mistralApiKey') || '',
    anthropicApiKey: localStorage.getItem('anthropicApiKey') || '',
    selectedProvider: (localStorage.getItem('selectedProvider') as 'mistral' | 'anthropic') || 'mistral',
    isLoading: false,
    chatHistory: [],
  });

  const handleMistralKeyChange = (key: string) => {
    setState(prev => ({ ...prev, mistralApiKey: key }));
    localStorage.setItem('mistralApiKey', key);
  };

  const handleAnthropicKeyChange = (key: string) => {
    setState(prev => ({ ...prev, anthropicApiKey: key }));
    localStorage.setItem('anthropicApiKey', key);
  };

  const handleProviderChange = (provider: 'mistral' | 'anthropic') => {
    setState(prev => ({ ...prev, selectedProvider: provider }));
    localStorage.setItem('selectedProvider', provider);
  };

  const getResponse = async (question: string) => {
    if (!question.trim()) {
      toast.error('No question detected. Please try again.');
      return;
    }

    const apiKey = state.selectedProvider === 'mistral' ? state.mistralApiKey : state.anthropicApiKey;
    if (!apiKey) {
      toast.error(`Please enter your ${state.selectedProvider === 'mistral' ? 'Mistral' : 'Anthropic'} API key first`);
      return;
    }

    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const updatedHistory = [...state.chatHistory, { role: 'user', content: question }];
      
      const response = state.selectedProvider === 'mistral'
        ? await getAIResponse(apiKey, question, state.chatHistory)
        : await getAnthropicResponse(apiKey, question, state.chatHistory);

      updatedHistory.push({ role: 'assistant', content: response });
      
      setState(prev => ({ 
        ...prev, 
        aiResponse: response, 
        isLoading: false,
        chatHistory: updatedHistory
      }));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to get AI response');
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const startRecording = () => {
    const apiKey = state.selectedProvider === 'mistral' ? state.mistralApiKey : state.anthropicApiKey;
    if (!apiKey) {
      toast.error(`Please enter your ${state.selectedProvider === 'mistral' ? 'Mistral' : 'Anthropic'} API key first`);
      return;
    }
    setState(prev => ({
      ...prev,
      isRecording: true,
      transcription: '',
      aiResponse: '',
    }));
  };

  const stopRecording = async () => {
    setState(prev => ({ ...prev, isRecording: false }));
    await getResponse(state.transcription);
  };

  const toggleRecording = () => {
    if (state.isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleTranscriptionUpdate = useCallback((text: string) => {
    setState(prev => ({ ...prev, transcription: text }));
  }, []);

  useKeyPress(
    ' ',
    () => startRecording(),
    () => stopRecording()
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Toaster position="top-center" />
      
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Brain className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              AI Interview Assistant
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto text-xl font-light">
            Ask your interview question and get professional answers instantly
          </p>
          <div className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-500 glass-effect py-3 px-6 rounded-full w-fit mx-auto">
            <Keyboard className="h-4 w-4" />
            <span>Hold Space to ask</span>
          </div>
        </header>

        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex justify-center">
            <ApiKeyInput
              mistralApiKey={state.mistralApiKey}
              anthropicApiKey={state.anthropicApiKey}
              selectedProvider={state.selectedProvider}
              onMistralKeyChange={handleMistralKeyChange}
              onAnthropicKeyChange={handleAnthropicKeyChange}
              onProviderChange={handleProviderChange}
            />
          </div>

          <div className="flex justify-center">
            <RecordButton
              isRecording={state.isRecording}
              onClick={toggleRecording}
            />
          </div>

          <AudioRecorder
            onTranscriptionUpdate={handleTranscriptionUpdate}
            isRecording={state.isRecording}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <TranscriptionDisplay 
              text={state.transcription} 
              isRecording={state.isRecording}
              label="Your Question"
            />
            
            <FeedbackDisplay 
              feedback={state.aiResponse}
              isLoading={state.isLoading}
              label="AI Answer" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;