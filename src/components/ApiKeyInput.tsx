import React from 'react';
import { Key } from 'lucide-react';

interface ApiKeyInputProps {
  mistralApiKey: string;
  anthropicApiKey: string;
  selectedProvider: 'mistral' | 'anthropic';
  onMistralKeyChange: (key: string) => void;
  onAnthropicKeyChange: (key: string) => void;
  onProviderChange: (provider: 'mistral' | 'anthropic') => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({
  mistralApiKey,
  anthropicApiKey,
  selectedProvider,
  onMistralKeyChange,
  onAnthropicKeyChange,
  onProviderChange,
}) => {
  return (
    <div className="w-full max-w-2xl">
      <div className="flex flex-col gap-6">
        <div className="flex justify-center gap-4 mb-2">
          <button
            onClick={() => onProviderChange('mistral')}
            className={`px-6 py-3 rounded-xl transition-all duration-300 ${
              selectedProvider === 'mistral'
                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg transform -translate-y-0.5'
                : 'bg-white/80 text-gray-600 hover:bg-white'
            }`}
          >
            Mistral AI
          </button>
          <button
            onClick={() => onProviderChange('anthropic')}
            className={`px-6 py-3 rounded-xl transition-all duration-300 ${
              selectedProvider === 'anthropic'
                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg transform -translate-y-0.5'
                : 'bg-white/80 text-gray-600 hover:bg-white'
            }`}
          >
            Anthropic
          </button>
        </div>

        <div className="space-y-4">
          <div className={`transition-all duration-300 ${selectedProvider === 'mistral' ? 'block' : 'hidden'}`}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Key className="h-5 w-5 text-blue-500" />
              </div>
              <input
                type="password"
                value={mistralApiKey}
                onChange={(e) => onMistralKeyChange(e.target.value)}
                placeholder="Enter your Mistral API key"
                className="block w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl leading-5 glass-effect placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-300"
              />
            </div>
          </div>

          <div className={`transition-all duration-300 ${selectedProvider === 'anthropic' ? 'block' : 'hidden'}`}>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Key className="h-5 w-5 text-blue-500" />
              </div>
              <input
                type="password"
                value={anthropicApiKey}
                onChange={(e) => onAnthropicKeyChange(e.target.value)}
                placeholder="Enter your Anthropic API key"
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-white/80 backdrop-blur-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200"
              />
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500 text-center">
          Your API keys are stored locally and never sent to our servers
        </p>
      </div>
    </div>
  );
}

export default ApiKeyInput;