// app/audit/page.tsx
'use client';

import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { PitchForm } from '@/components/audit/PitchForm';
import { InterrogationStage } from '@/components/audit/InterrogationStage';
import { VerdictReport } from '@/components/audit/VerdictReport';
import { LionLoader } from '@/components/ui/LionLoader';
import { toast } from 'sonner';
import { interrogate, generateVerdict } from '@/lib/api/audit';
import {
  PitchSubmission,
  InterrogationResponse,
  VerdictResponse,
  QuestionAnswer,
} from '@/types/audit';
import ladyJusticeImage from '@/assets/lady-justice-marble.jpg';
import Image from 'next/image';

type Stage = 'pitch' | 'interrogation' | 'verdict';

const Audit = () => {
  // State
  const [stage, setStage] = useState<Stage>('pitch');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [abortController, setAbortController] = useState<AbortController | null>(null);
  
  // Data
  const [pitch, setPitch] = useState<PitchSubmission | null>(null);
  const [interrogationData, setInterrogationData] = useState<InterrogationResponse | null>(null);
  const [verdictData, setVerdictData] = useState<VerdictResponse | null>(null);

  // Stage 1: Submit Pitch
  const handlePitchSubmit = async (pitchData: PitchSubmission) => {
    const controller = new AbortController();
    setAbortController(controller);
    setIsLoading(true);
    setLoadingMessage('Leo is analyzing your pitch through 4 strategic frameworks...');
    setPitch(pitchData);

    try {
      const response = await interrogate(pitchData);
      
      if (controller.signal.aborted) return;
      
      setInterrogationData(response);
      setStage('interrogation');
      toast.success('Strategic questions generated! Answer them to proceed.');
    } catch (error) {
      if (controller.signal.aborted) {
        toast.info('Analysis cancelled');
        return;
      }
      console.error('Interrogation error:', error);
      toast.error(
        error instanceof Error 
          ? error.message 
          : 'Failed to generate questions. Please try again.'
      );
    } finally {
      setIsLoading(false);
      setAbortController(null);
    }
  };

  // Stage 2: Submit Answers
  const handleAnswersSubmit = async (answers: QuestionAnswer[]) => {
    if (!pitch || !interrogationData) {
      toast.error('Missing pitch or questions data');
      return;
    }

    const controller = new AbortController();
    setAbortController(controller);
    setIsLoading(true);
    setLoadingMessage('Leo is generating your comprehensive verdict with survival score...');

    try {
      const response = await generateVerdict(
        pitch,
        interrogationData.questions,
        answers
      );
      
      if (controller.signal.aborted) return;
      
      setVerdictData(response);
      setStage('verdict');
      toast.success('Validation report complete!');
    } catch (error) {
      if (controller.signal.aborted) {
        toast.info('Analysis cancelled');
        return;
      }
      console.error('Verdict error:', error);
      toast.error(
        error instanceof Error 
          ? error.message 
          : 'Failed to generate verdict. Please try again.'
      );
    } finally {
      setIsLoading(false);
      setAbortController(null);
    }
  };

  // Cancel current operation
  const handleCancel = () => {
    if (abortController) {
      abortController.abort();
      setIsLoading(false);
      setAbortController(null);
      toast.info('Analysis cancelled. You can make changes and try again.');
    }
  };

  // Reset
  const handleReset = () => {
    setStage('pitch');
    setPitch(null);
    setInterrogationData(null);
    setVerdictData(null);
    toast.info('Ready for a new validation');
  };

  return (
    <div className="min-h-screen relative bg-background text-foreground">
      {/* Loading Overlay */}
      {isLoading && (
        <LionLoader message={loadingMessage} onCancel={handleCancel} />
      )}

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-black/60" />
        <Image
          src={ladyJusticeImage}
          alt="Lady Justice"
          className="w-full h-full object-cover opacity-40"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navigation />

        <div className="container mx-auto px-6 pt-32 pb-20 max-w-5xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gold font-cinzel">
              The Leo Validation
            </h1>
            <p className="text-xl text-warm-beige font-medium">
              Rigorous assessment combining NASSS, Play-to-Win, Business Model, and Regulatory frameworks
            </p>
            
            {/* Stage Indicator */}
            <div className="mt-8 flex justify-center gap-4">
              <div className={`px-4 py-2 rounded-lg border ${
                stage === 'pitch' 
                  ? 'bg-light-cream/80 border-primary text-gray-800' 
                  : 'bg-muted/20 border-muted text-muted-foreground'
              }`}>
                1. Pitch
              </div>
              <div className={`px-4 py-2 rounded-lg border ${
                stage === 'interrogation' 
                  ? 'bg-light-cream/80 border-primary text-primary' 
                  : 'bg-muted/20 border-muted text-muted-foreground'
              }`}>
                2. Interrogation
              </div>
              <div className={`px-4 py-2 rounded-lg border ${
                stage === 'verdict' 
                  ? 'bg-light-cream/80 border-primary text-primary' 
                  : 'bg-muted/20 border-muted text-muted-foreground'
              }`}>
                3. Verdict
              </div>
            </div>
          </div>

          {/* Stage Components */}
          {stage === 'pitch' && (
            <PitchForm onSubmit={handlePitchSubmit} isLoading={isLoading} />
          )}

          {stage === 'interrogation' && interrogationData && (
            <InterrogationStage
              questions={interrogationData.questions}
              analysisSnippet={interrogationData.analysisSnippet}
              thinkingProcess={interrogationData.thinkingProcess}
              onSubmit={handleAnswersSubmit}
              isLoading={isLoading}
            />
          )}

          {stage === 'verdict' && verdictData && pitch && (
            <VerdictReport 
              verdict={verdictData}
              startupName={pitch.startupName}
              onReset={handleReset} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Audit;