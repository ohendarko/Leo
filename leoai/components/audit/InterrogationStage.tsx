// components/audit/InterrogationStage.tsx
'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { InterrogationQuestion, QuestionAnswer } from '@/types/audit';
import { ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';

interface InterrogationStageProps {
  questions: InterrogationQuestion[];
  analysisSnippet: string;
  thinkingProcess?: string;
  onSubmit: (answers: QuestionAnswer[]) => void;
  isLoading: boolean;
}

const frameworkColors = {
  nasss: 'bg-blue-300/20 text-blue-900 border-blue-500/50',
  'play-to-win': 'bg-purple-300/20 text-purple-900 border-purple-500/50',
  'business-model': 'bg-green-300/20 text-green-900 border-green-500/50',
  regulatory: 'bg-orange-300/20 text-orange-900 border-orange-500/50',
};

export function InterrogationStage({
  questions,
  analysisSnippet,
  thinkingProcess,
  onSubmit,
  isLoading,
}: InterrogationStageProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showThinking, setShowThinking] = useState(false);

  const handleSubmit = () => {
    const answerArray: QuestionAnswer[] = questions.map((q) => ({
      questionId: q.id,
      answer: answers[q.id] || '',
    }));
    onSubmit(answerArray);
  };

  const allAnswered = questions.every((q) => answers[q.id]?.trim());

  return (
    <Card className="p-8 bg-light-cream/80 backdrop-blur-sm border-primary/30 shadow-2xl animate-fade-in">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 font-cinzel">
        Step 2: Strategic Interrogation
      </h2>

      {/* Analysis Snippet */}
      <div className="mb-8 p-4 bg-muted/80 border border-primary/30 rounded-lg">
        <p className="text-white italic text-center">{analysisSnippet}</p>
      </div>

      {/* Extended Thinking Toggle */}
      {thinkingProcess && (
        <div className="mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowThinking(!showThinking)}
            className="w-full border-primary/40 text-gray-100 hover:bg-primary/10"
          >
            <Lightbulb className="mr-2 h-4 w-4" />
            {showThinking ? 'Hide' : 'Show'} Leo's Reasoning Process
            {showThinking ? (
              <ChevronUp className="ml-2 h-4 w-4" />
            ) : (
              <ChevronDown className="ml-2 h-4 w-4" />
            )}
          </Button>

          {showThinking && (
            <div className="mt-4 p-4 bg-muted/70 border border-primary/20 rounded-lg max-h-96 overflow-y-auto">
              <p className="text-sm text-gray-100 whitespace-pre-wrap">
                {thinkingProcess}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Questions */}
      <div className="space-y-8">
        {questions.map((question, index) => (
          <div key={question.id} className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 border border-primary flex items-center justify-center font-bold text-gray-900">
                {index + 1}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className={frameworkColors[question.framework]}
                  >
                    {question.framework.toUpperCase()}
                  </Badge>
                  <Badge variant="outline" className="border-gray-700/40 text-gray-900">
                    {question.category}
                  </Badge>
                </div>
                <p className="text-lg text-gray-900 leading-relaxed">
                  {question.question}
                </p>
                <p className="text-sm text-gray-700 italic">
                  Why this matters: {question.rationale}
                </p>
              </div>
            </div>

            <Textarea
              placeholder="Provide a detailed answer with specific data and evidence..."
              value={answers[question.id] || ''}
              onChange={(e) =>
                setAnswers((prev) => ({ ...prev, [question.id]: e.target.value }))
              }
              className="min-h-[120px] bg-muted/80 text-gray-100 border-primary/40 focus:border-primary placeholder:text-muted-foreground"
            />
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-8">
        <Button
          onClick={handleSubmit}
          disabled={isLoading || !allAnswered}
          size="lg"
          className="min-w-[200px] bg-primary hover:bg-primary/80 text-foreground border border-gold/50"
        >
          {isLoading ? 'Generating Verdict...' : 'Generate Validation Report'}
        </Button>
      </div>

      {!allAnswered && (
        <p className="text-center text-sm text-muted-foreground mt-4">
          Please answer all questions to proceed
        </p>
      )}
    </Card>
  );
}