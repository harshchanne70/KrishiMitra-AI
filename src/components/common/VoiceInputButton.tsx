import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface VoiceInputButtonProps {
  onTranscript: (text: string) => void;
  sampleFallbackText?: string;
  className?: string;
}

export const VoiceInputButton: React.FC<VoiceInputButtonProps> = ({
  onTranscript,
  sampleFallbackText = 'Ramesh Patil',
  className = ''
}) => {
  const { language } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const startVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = language === 'hi' ? 'hi-IN' : language === 'mr' ? 'mr-IN' : 'en-IN';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        setIsListening(true);
        setStatusMessage(language === 'hi' ? 'सुन रहा है…' : language === 'mr' ? 'ऐकत आहे…' : 'Listening…');

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            onTranscript(transcript);
          }
          setIsListening(false);
          setStatusMessage(null);
        };

        recognition.onerror = () => {
          setIsListening(false);
          setStatusMessage(language === 'hi' ? 'आवाज स्पष्ट नहीं आई' : 'Could not hear clearly');
          setTimeout(() => setStatusMessage(null), 2500);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
        return;
      } catch (err) {
        console.warn('SpeechRecognition failed, triggering sample fallback', err);
      }
    }

    // Demo / Simulated fallback for non-supported browsers or simulated env
    setIsListening(true);
    setStatusMessage(language === 'hi' ? 'आवाज पहचान (डेमो नमूना)…' : language === 'mr' ? 'आवाज ओळख (नमुना)…' : 'Listening (Demo Mode)…');

    setTimeout(() => {
      setIsListening(false);
      onTranscript(sampleFallbackText);
      setStatusMessage(language === 'hi' ? 'नमूना नाम दर्ज किया गया' : 'Sample transcript entered');
      setTimeout(() => setStatusMessage(null), 2000);
    }, 1200);
  };

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onClick={startVoiceInput}
        className={`w-10 h-10 rounded-full flex items-center justify-center transition border ${
          isListening
            ? 'bg-red-500 text-white border-red-600 animate-pulse ring-4 ring-red-300'
            : 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100 hover:border-emerald-400'
        } ${className}`}
        title="Voice input for farmers (आवाज से दर्ज करें)"
        aria-label="Voice input button"
      >
        {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
      </button>

      {statusMessage && (
        <span className="absolute left-12 whitespace-nowrap text-xs font-semibold px-2 py-0.5 rounded-md bg-stone-800 text-white shadow-md z-20">
          {statusMessage}
        </span>
      )}
    </div>
  );
};
