// components/audit/PitchForm.tsx
'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PitchSubmission } from '@/types/audit';

interface PitchFormProps {
  onSubmit: (pitch: PitchSubmission) => void;
  isLoading: boolean;
}

export function PitchForm({ onSubmit, isLoading }: PitchFormProps) {
  const [formData, setFormData] = useState<PitchSubmission>({
    startupName: '',
    tagline: '',
    problemStatement: '',
    solution: '',
    targetMarket: '',
    competitiveAdvantage: '',
    currentStage: 'mvp',
    fundingGoal: '',
    additionalContext: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateField = (field: keyof PitchSubmission, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="p-8 bg-light-cream/80 shadow-2xl backdrop-blur-sm border-primary/30 animate-fade-in">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 font-cinzel">
        Step 1: Your Pitch
      </h2>
      <p className="text-gray-900 mb-8 text-center">
        Provide detailed information about your digital health startup. 
        This will be analyzed through four strategic frameworks.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Startup Name */}
        <div className="space-y-2">
          <Label htmlFor="startupName" className="text-gray-900 font-semibold">
            Startup Name *
          </Label>
          <Input
            id="startupName"
            placeholder="e.g., CardioWatch AI"
            value={formData.startupName}
            onChange={(e) => updateField('startupName', e.target.value)}
            required
            className="bg-muted/80 border-primary/40 focus:border-primary"
          />
        </div>

        {/* Tagline */}
        <div className="space-y-2">
          <Label htmlFor="tagline" className="text-gray-900 font-semibold">
            Tagline *
          </Label>
          <Input
            id="tagline"
            placeholder="e.g., AI-powered cardiac monitoring for heart failure patients"
            value={formData.tagline}
            onChange={(e) => updateField('tagline', e.target.value)}
            required
            className="bg-muted/80 border-primary/40 focus:border-primary"
          />
        </div>

        {/* Problem Statement */}
        <div className="space-y-2">
          <Label htmlFor="problemStatement" className="text-gray-900 font-semibold">
            Problem Statement *
          </Label>
          <Textarea
            id="problemStatement"
            placeholder="What problem are you solving? Include market size and impact..."
            value={formData.problemStatement}
            onChange={(e) => updateField('problemStatement', e.target.value)}
            required
            className="min-h-[100px] bg-muted/80 border-primary/40 focus:border-primary"
          />
        </div>

        {/* Solution */}
        <div className="space-y-2">
          <Label htmlFor="solution" className="text-gray-900 font-semibold">
            Solution *
          </Label>
          <Textarea
            id="solution"
            placeholder="Describe your solution, technology, and how it works..."
            value={formData.solution}
            onChange={(e) => updateField('solution', e.target.value)}
            required
            className="min-h-[100px] bg-muted/80 border-primary/40 focus:border-primary"
          />
        </div>

        {/* Target Market */}
        <div className="space-y-2">
          <Label htmlFor="targetMarket" className="text-gray-900 font-semibold">
            Target Market *
          </Label>
          <Textarea
            id="targetMarket"
            placeholder="Who are your customers? Be specific about segments, geography, channels..."
            value={formData.targetMarket}
            onChange={(e) => updateField('targetMarket', e.target.value)}
            required
            className="min-h-[80px] bg-muted/80 border-primary/40 focus:border-primary"
          />
        </div>

        {/* Competitive Advantage */}
        <div className="space-y-2">
          <Label htmlFor="competitiveAdvantage" className="text-gray-900 font-semibold">
            Competitive Advantage *
          </Label>
          <Textarea
            id="competitiveAdvantage"
            placeholder="What makes you different? Why will customers choose you?"
            value={formData.competitiveAdvantage}
            onChange={(e) => updateField('competitiveAdvantage', e.target.value)}
            required
            className="min-h-[80px] bg-muted/80 border-primary/40 focus:border-primary"
          />
        </div>

        {/* Current Stage */}
        <div className="space-y-2">
          <Label htmlFor="currentStage" className="text-gray-900 font-semibold">
            Current Stage *
          </Label>
          <Select
            value={formData.currentStage}
            onValueChange={(value: PitchSubmission['currentStage']) => 
              updateField('currentStage', value)
            }
          >
            <SelectTrigger className="bg-muted/80 border-primary/40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="idea">Idea</SelectItem>
              <SelectItem value="prototype">Prototype</SelectItem>
              <SelectItem value="mvp">MVP</SelectItem>
              <SelectItem value="early-revenue">Early Revenue</SelectItem>
              <SelectItem value="scaling">Scaling</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Funding Goal (Optional) */}
        <div className="space-y-2">
          <Label htmlFor="fundingGoal" className="text-gray-900 font-semibold">
            Funding Goal (Optional)
          </Label>
          <Input
            id="fundingGoal"
            placeholder="e.g., $2M seed round"
            value={formData.fundingGoal}
            onChange={(e) => updateField('fundingGoal', e.target.value)}
            className="bg-muted/80 border-primary/40 focus:border-primary"
          />
        </div>

        {/* Additional Context (Optional) */}
        <div className="space-y-2">
          <Label htmlFor="additionalContext" className="text-gray-900 font-semibold">
            Additional Context (Optional)
          </Label>
          <Textarea
            id="additionalContext"
            placeholder="Any other relevant information (pilots, partnerships, traction, etc.)"
            value={formData.additionalContext}
            onChange={(e) => updateField('additionalContext', e.target.value)}
            className="min-h-[80px] bg-muted/80 border-primary/40 focus:border-primary"
          />
        </div>

        <div className="flex justify-center pt-4">
          <Button
            type="submit"
            disabled={isLoading}
            size="lg"
            className="min-w-[200px] bg-primary hover:bg-primary/80 text-gray-900 border border-gold/50"
          >
            {isLoading ? 'Analyzing...' : 'Submit Pitch'}
          </Button>
        </div>
      </form>
    </Card>
  );
}