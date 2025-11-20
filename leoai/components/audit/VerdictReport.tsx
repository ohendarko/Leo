// components/audit/VerdictReport.tsx
'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { VerdictResponse } from '@/types/audit';
import { Download, FileText, FileDown, ChevronDown, ChevronUp, Lightbulb, RotateCcw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { generateVerdictPDF } from '@/lib/utils/pdfExport';
import { toast } from 'sonner';

interface VerdictReportProps {
  verdict: VerdictResponse;
  startupName: string;
  onReset: () => void;
}

export function VerdictReport({ verdict, onReset }: VerdictReportProps) {
  const [showThinking, setShowThinking] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-green-400';
    if (score >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreEmoji = (score: number) => {
    if (score >= 75) return '🟢';
    if (score >= 50) return '🟡';
    return '🔴';
  };

  const getConfidenceBadge = (confidence: string) => {
    const colors = {
      high: 'bg-green-500/20 text-green-300 border-green-500/50',
      medium: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50',
      low: 'bg-red-500/20 text-red-300 border-red-500/50',
    };
    return colors[confidence as keyof typeof colors] || colors.medium;
  };

  const downloadAsMarkdown = () => {
    const blob = new Blob([verdict.reportMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leo-validation-report.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadAsText = () => {
    const plainText = verdict.reportMarkdown
      .replace(/#{1,6}\s/g, '')
      .replace(/\*\*/g, '')
      .replace(/\*/g, '');
    
    const blob = new Blob([plainText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leo-validation-report.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header Card with Survival Score */}
      <Card className="p-8 bg-card/95 backdrop-blur-sm border-primary/30 shadow-2xl animate-fade-in">
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-gold font-cinzel">
            Leo's Verdict
          </h2>

          {/* Survival Score */}
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-4">
              <span className="text-6xl font-bold font-cinzel">
                {getScoreEmoji(verdict.survivalScore)}
              </span>
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Survival Probability</p>
                <p className={`text-5xl font-bold ${getScoreColor(verdict.survivalScore)}`}>
                  {verdict.survivalScore}%
                </p>
              </div>
            </div>

            <Badge
              variant="outline"
              className={`${getConfidenceBadge(verdict.confidence)} text-lg px-4 py-1`}
            >
              {verdict.confidence.toUpperCase()} Confidence
            </Badge>
          </div>

          {/* Framework Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-foreground">NASSS Risk</span>
                <span className={getScoreColor(verdict.breakdown.nasss_risk)}>
                  {verdict.breakdown.nasss_risk}/100
                </span>
              </div>
              <Progress value={verdict.breakdown.nasss_risk} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-foreground">Strategic Viability</span>
                <span className={getScoreColor(verdict.breakdown.strategic_viability)}>
                  {verdict.breakdown.strategic_viability}/100
                </span>
              </div>
              <Progress value={verdict.breakdown.strategic_viability} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-foreground">Business Model</span>
                <span className={getScoreColor(verdict.breakdown.business_model)}>
                  {verdict.breakdown.business_model}/100
                </span>
              </div>
              <Progress value={verdict.breakdown.business_model} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-foreground">Regulatory Readiness</span>
                <span className={getScoreColor(verdict.breakdown.regulatory_readiness)}>
                  {verdict.breakdown.regulatory_readiness}/100
                </span>
              </div>
              <Progress value={verdict.breakdown.regulatory_readiness} className="h-2" />
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Critical Risks */}
        <Card className="p-6 bg-red-950/30 border-red-500/30">
          <h3 className="text-xl font-bold text-red-400 mb-4 font-cinzel">
            🔴 Critical Risks
          </h3>
          <ul className="space-y-2 text-sm text-red-200">
            {verdict.criticalRisks.map((risk, idx) => (
              <li key={idx} className="leading-relaxed">
                • {risk}
              </li>
            ))}
          </ul>
        </Card>

        {/* Key Strengths */}
        <Card className="p-6 bg-green-950/30 border-green-500/30">
          <h3 className="text-xl font-bold text-green-400 mb-4 font-cinzel">
            🟢 Key Strengths
          </h3>
          <ul className="space-y-2 text-sm text-green-200">
            {verdict.keyStrengths.map((strength, idx) => (
              <li key={idx} className="leading-relaxed">
                • {strength}
              </li>
            ))}
          </ul>
        </Card>

        {/* Recommendations */}
        <Card className="p-6 bg-blue-950/30 border-blue-500/30">
          <h3 className="text-xl font-bold text-blue-400 mb-4 font-cinzel">
            💡 Top Actions
          </h3>
          <ul className="space-y-2 text-sm text-blue-200">
            {verdict.actionableRecommendations.map((rec, idx) => (
              <li key={idx} className="leading-relaxed">
                • {rec}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Extended Thinking */}
      {verdict.thinkingProcess && (
        <Card className="p-6 bg-card/95 backdrop-blur-sm border-primary/30">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowThinking(!showThinking)}
            className="w-full border-primary/40 text-primary hover:bg-primary/10"
          >
            <Lightbulb className="mr-2 h-4 w-4" />
            {showThinking ? 'Hide' : 'Show'} Leo's Deep Analysis Reasoning
            {showThinking ? (
              <ChevronUp className="ml-2 h-4 w-4" />
            ) : (
              <ChevronDown className="ml-2 h-4 w-4" />
            )}
          </Button>

          {showThinking && (
            <div className="mt-4 p-4 bg-muted/30 border border-primary/20 rounded-lg max-h-96 overflow-y-auto">
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {verdict.thinkingProcess}
              </p>
            </div>
          )}
        </Card>
      )}

      {/* Full Report */}
      <Card className="p-8 bg-card/95 backdrop-blur-sm border-primary/30">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <h3 className="text-2xl font-bold text-gold font-cinzel">
            Full Validation Report
          </h3>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={downloadAsMarkdown}
              variant="outline"
              size="sm"
              className="border-primary text-primary hover:bg-primary/20"
            >
              <FileText className="mr-2 h-4 w-4" />
              Markdown
            </Button>
            <Button
              onClick={downloadAsText}
              variant="outline"
              size="sm"
              className="border-primary text-primary hover:bg-primary/20"
            >
              <FileDown className="mr-2 h-4 w-4" />
              Text
            </Button>
          </div>
        </div>

        <div className="prose prose-invert prose-gold max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {verdict.reportMarkdown}
          </ReactMarkdown>
        </div>
      </Card>

      {/* Reset Button */}
      <div className="flex justify-center">
        <Button
          onClick={onReset}
          variant="outline"
          size="lg"
          className="border-primary text-primary hover:bg-primary/20"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Start New Validation
        </Button>
      </div>
    </div>
  );
}