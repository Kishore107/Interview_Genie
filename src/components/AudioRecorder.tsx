import React, { useEffect, useRef } from 'react';
import { AudioRecorderProps } from '../types';

const AudioRecorder: React.FC<AudioRecorderProps> = ({
  onTranscriptionUpdate,
  isRecording,
}) => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const speechRecognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      console.error('Speech recognition not supported');
      return;
    }

    const SpeechRecognition = window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = true;
    
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');
      onTranscriptionUpdate(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };

    speechRecognitionRef.current = recognition;

    return () => {
      if (speechRecognitionRef.current) {
        speechRecognitionRef.current.stop();
      }
    };
  }, [onTranscriptionUpdate]);

  useEffect(() => {
    if (isRecording) {
      speechRecognitionRef.current?.start();
    } else {
      speechRecognitionRef.current?.stop();
    }
  }, [isRecording]);

  return null;
};

export default AudioRecorder;