'use client'
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Loader2, Send, Download, FileText, FileDown } from "lucide-react";
import { toast } from "sonner";
import ladyJusticeImage from "@/assets/lady-justice-marble.jpg";
import html2pdf from "html2pdf.js";
import Image from "next/image";

type Stage = "pitch" | "interrogation" | "report";

const Audit = () => {
  const [stage, setStage] = useState<Stage>("pitch");
  const [pitch, setPitch] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState("");

  const handlePitchSubmit = async () => {
    if (!pitch.trim()) {
      toast.error("Please enter your project pitch");
      return;
    }

    setIsLoading(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setQuestions([
      "How will you handle organizational complexity and resistance to change within healthcare institutions?",
      "What is your strategy for scaling beyond your initial market while maintaining clinical efficacy?",
      "How do you plan to navigate regulatory requirements and demonstrate measurable patient outcomes?"
    ]);
    setAnswers(["", "", ""]);
    
    setStage("interrogation");
    setIsLoading(false);
    toast.success("Questions generated! Provide your defense.");
  };

  const handleAnswersSubmit = async () => {
    if (answers.some(answer => !answer.trim())) {
      toast.error("Please answer all questions");
      return;
    }

    setIsLoading(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setReport(`# Validation Report

## Overall Assessment: 65% Survival Probability

### NASSS Framework Analysis

**Technology Domain (Score: 7/10)**
Your technology shows promise with clear clinical applications. However, integration complexity with existing EHR systems poses significant challenges.

**Adopter System (Score: 6/10)**
Clinician adoption will require substantial training and workflow redesign. Your change management strategy needs strengthening.

**Organization (Score: 5/10)**
Healthcare organizations are notoriously resistant to change. Your scaling strategy must address organizational inertia more directly.

### Play-to-Win Analysis

**Where to Play**
Your initial market focus is well-defined, but expansion plans need clearer differentiation.

**How to Win**
Competitive advantage relies heavily on network effects that will take time to materialize.

### Key Recommendations

1. **Strengthen stakeholder engagement** - Build deeper relationships with clinical champions
2. **Develop robust interoperability** - Invest in seamless EHR integration from day one
3. **Create clear ROI metrics** - Healthcare buyers need quantifiable value propositions
4. **Plan for regulatory pathway** - FDA/CE mark strategy should be front-loaded

### Next Steps

Focus on pilot deployments with 2-3 friendly healthcare systems. Use these to refine your value proposition and gather quantitative outcomes data before scaling.`);
    
    setStage("report");
    setIsLoading(false);
    toast.success("Analysis complete!");
  };

  const resetAudit = () => {
    setStage("pitch");
    setPitch("");
    setQuestions([]);
    setAnswers([]);
    setReport("");
  };

  const downloadAsPDF = () => {
    toast.info("Generating PDF...");
    const element = document.getElementById('validation-report');
    if (!element) {
      toast.error("No report available to generate PDF");
      return;
    }
    const opt = {
      margin: 1,
      filename: 'healthtech-validation-report.pdf',
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in' as const, format: 'letter' as const, orientation: 'portrait' as const }
    };
    
    html2pdf().set(opt).from(element).save().then(() => {
      toast.success("PDF downloaded successfully!");
    });
  };

  const downloadAsMarkdown = () => {
    const blob = new Blob([report], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'healthtech-validation-report.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Markdown downloaded successfully!");
  };

  const downloadAsText = () => {
    const plainText = report
      .replace(/#{1,6}\s/g, '')
      .replace(/\*\*/g, '')
      .replace(/\*/g, '');
    
    const blob = new Blob([plainText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'healthtech-validation-report.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Text file downloaded successfully!");
  };

  return (
    <div className="min-h-screen relative bg-background text-foreground">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-black/60" />
        <Image
          src={ladyJusticeImage}
          alt="Lady Justice"
          className="w-full h-full object-cover opacity-40"
        />
        {/* <img
          src={ladyJusticeImage}
          alt="Lady Justice"
          className="w-full h-full object-cover opacity-40"
        /> */}
      </div>
      
      {/* Content wrapper */}
      <div className="relative z-10">
        <Navigation />
      
      <div className="container mx-auto px-6 pt-32 pb-20 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gold font-cinzel">
            The Leo Validation
          </h1>
          <p className="text-xl text-warm-beige font-medium">
            Rigorous assessment combining NASSS and Play-to-Win frameworks
          </p>
        </div>

        {stage === "pitch" && (
          <Card className="p-8 bg-card/95 backdrop-blur-sm border-primary/30 shadow-2xl animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 text-center text-gold font-cinzel">
              Step 1: Your Pitch
            </h2>
            <p className="text-warm-beige mb-6 text-center">
              Describe your digital health solution in detail. Include your technology, target users, 
              value proposition, and implementation strategy.
            </p>
            
            <Textarea
              placeholder="Example: We've developed an AI-powered remote patient monitoring platform for chronic disease management..."
              value={pitch}
              onChange={(e) => setPitch(e.target.value)}
              className="min-h-[150px] mb-6 bg-muted/80 text-foreground border-primary/40 focus:border-primary placeholder:text-muted-foreground"
            />
            
            <div className="flex justify-center">
              <Button 
                onClick={handlePitchSubmit}
                disabled={isLoading}
                size="lg"
                className="min-w-[200px] bg-primary hover:bg-primary/80 text-foreground border border-gold/50"
              >
                {isLoading ? "Analyzing..." : "Submit Pitch"}
              </Button>
            </div>
          </Card>
        )}

        {stage === "interrogation" && (
          <Card className="p-8 bg-card/95 backdrop-blur-sm border-primary/30 shadow-2xl animate-fade-in">
            <h2 className="text-3xl font-bold mb-6 text-center text-gold font-cinzel">
              Step 2: Strategic Interrogation
            </h2>
            <p className="text-warm-beige mb-8 text-center">
              Answer these strategic questions based on the NASSS and Play-to-Win frameworks.
            </p>
            
            <div className="space-y-8">
              {questions.map((question, index) => (
                <div key={index} className="space-y-3">
                  <label className="text-lg font-semibold text-foreground">
                    {index + 1}. {question}
                  </label>
                  <Textarea
                    placeholder="Provide a detailed answer..."
                    value={answers[index] || ""}
                    onChange={(e) => {
                      const newAnswers = [...answers];
                      newAnswers[index] = e.target.value;
                      setAnswers(newAnswers);
                    }}
                    className="min-h-[100px] bg-muted/80 text-foreground border-primary/40 focus:border-primary placeholder:text-muted-foreground"
                  />
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-8">
              <Button 
                onClick={handleAnswersSubmit}
                disabled={isLoading || answers.some(a => !a?.trim())}
                size="lg"
                className="min-w-[200px] bg-primary hover:bg-primary/80 text-foreground border border-gold/50"
              >
                {isLoading ? "Generating Report..." : "Generate Validation Report"}
              </Button>
            </div>
          </Card>
        )}

        {stage === "report" && report && (
          <Card className="p-8 bg-card/95 backdrop-blur-sm border-primary/30 shadow-2xl animate-fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <h2 className="text-3xl font-bold text-gold font-cinzel">
                Validation Report
              </h2>
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={downloadAsPDF}
                  variant="outline"
                  size="sm"
                  className="border-primary text-primary hover:bg-primary/20 bg-background/50"
                >
                  <Download className="mr-2 h-4 w-4" />
                  PDF
                </Button>
                <Button
                  onClick={downloadAsMarkdown}
                  variant="outline"
                  size="sm"
                  className="border-primary text-primary hover:bg-primary/20 bg-background/50"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Markdown
                </Button>
                <Button
                  onClick={downloadAsText}
                  variant="outline"
                  size="sm"
                  className="border-primary text-primary hover:bg-primary/20 bg-background/50"
                >
                  <FileDown className="mr-2 h-4 w-4" />
                  Text
                </Button>
              </div>
            </div>

            <div id="validation-report" className="prose prose-invert max-w-none font-normal">
              <div dangerouslySetInnerHTML={{ __html: report.replace(/\n/g, '<br/>').replace(/### /g, '<h3>').replace(/## /g, '<h2>').replace(/# /g, '<h1>').replace(/\*\*/g, '<strong>').replace(/\*/g, '<em>') }} />
            </div>

            <div className="mt-8 flex justify-center">
              <Button 
                onClick={resetAudit}
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary/20 bg-background/50"
              >
                Start New Validation
              </Button>
            </div>
          </Card>
        )}
      </div>
      </div>
    </div>
  );
};

export default Audit;
