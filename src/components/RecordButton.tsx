import React from 'react';
import { Mic, Square } from 'lucide-react';

interface RecordButtonProps {
  isRecording: boolean;
  onClick: () => void;
}

const RecordButton: React.FC<RecordButtonProps> = ({ isRecording, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`relative p-8 rounded-full transition-all duration-300 transform hover:scale-105 ${
        isRecording
          ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600'
          : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600'
      } shadow-lg hover:shadow-xl`}
    >
      {isRecording ? (
        <Square className="h-10 w-10 text-white" />
      ) : (
        <Mic className="h-10 w-10 text-white" />
      )}
      <span className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-sm font-medium text-gray-600">
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </span>
      {isRecording && (
        <span className="absolute top-0 right-0 h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
        </span>
      )}
    </button>
  );
};

export default RecordButton;