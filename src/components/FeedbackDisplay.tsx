import React from 'react';
import { MessageSquare, Loader2 } from 'lucide-react';

interface FeedbackDisplayProps {
  feedback: string;
  isLoading: boolean;
  label: string;
}

const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ feedback, isLoading, label }) => {
  const formatResponse = (text: string) => {
    return text.split('```').map((segment, index) => {
      if (index % 2 === 1) {
        const [language, ...code] = segment.split('\n');
        return (
          <div key={index} className="code-block my-4" data-language={language || 'code'}>
            <pre className="!mt-0">
              <code>{code.join('\n').trim()}</code>
            </pre>
          </div>
        );
      }
      return <p key={index} className="whitespace-pre-line text-lg leading-relaxed">{segment}</p>;
    });
  };

  return (
    <div className="card p-6 h-[600px] flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="h-5 w-5 text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-700">{label}</h3>
      </div>
      <div className="flex-1 bg-gray-50 rounded-lg p-6 overflow-y-auto">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
              <span className="text-sm text-gray-500">Generating response...</span>
            </div>
          </div>
        ) : feedback ? (
          <div className="prose prose-lg max-w-none">
            {formatResponse(feedback)}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <span className="text-gray-400 italic text-center">
              AI answer will appear here after you ask your question...
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackDisplay;