import React from 'react';
import { MessageCircle } from 'lucide-react';

interface TranscriptionDisplayProps {
  text: string;
  isRecording: boolean;
  label: string;
}

const TranscriptionDisplay: React.FC<TranscriptionDisplayProps> = ({ text, isRecording, label }) => {
  return (
    <div className="card p-6 h-[500px] flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <MessageCircle className="h-5 w-5 text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-700">{label}</h3>
        {isRecording && (
          <span className="flex h-3 w-3 ml-auto">
            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        )}
      </div>
      <div className="flex-1 bg-gray-50 rounded-lg p-4 overflow-y-auto">
        {text ? (
          <div className={`${isRecording ? 'animate-pulse' : ''} prose max-w-none`}>
            {text}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <span className="text-gray-400 italic text-center">
              Your question will appear here as you speak...
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TranscriptionDisplay;