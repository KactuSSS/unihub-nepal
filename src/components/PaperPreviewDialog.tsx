import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Calendar, 
  BookOpen, 
  Download, 
  Clock, 
  CheckCircle2,
  Circle,
  GraduationCap
} from "lucide-react";

interface Paper {
  subject: string;
  year: number;
  semester: string;
  examType: string;
  faculty?: string;
}

interface PaperPreviewDialogProps {
  paper: Paper | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Sample questions based on subject - in a real app, these would come from the database
const getSampleQuestions = (subject: string): { section: string; questions: string[] }[] => {
  const questionSets: Record<string, { section: string; questions: string[] }[]> = {
    "Data Structures & Algorithms": [
      {
        section: "Section A - Short Answer (2 marks each)",
        questions: [
          "Define time complexity and space complexity.",
          "What is the difference between a stack and a queue?",
          "Explain the concept of recursion with an example.",
          "What is a binary search tree?",
          "Define Big O notation.",
        ],
      },
      {
        section: "Section B - Long Answer (10 marks each)",
        questions: [
          "Explain the merge sort algorithm with a step-by-step example. Analyze its time complexity.",
          "Describe the implementation of a hash table. How do you handle collisions?",
          "Compare and contrast BFS and DFS graph traversal algorithms.",
        ],
      },
    ],
    "Computer Networks": [
      {
        section: "Section A - Short Answer (2 marks each)",
        questions: [
          "What is the OSI model? List all 7 layers.",
          "Differentiate between TCP and UDP protocols.",
          "What is an IP address? Explain IPv4 vs IPv6.",
          "Define routing and switching.",
          "What is DNS and how does it work?",
        ],
      },
      {
        section: "Section B - Long Answer (10 marks each)",
        questions: [
          "Explain the TCP/IP model and compare it with the OSI model.",
          "Describe the process of establishing a TCP connection (three-way handshake).",
          "What are the different types of network topologies? Explain with diagrams.",
        ],
      },
    ],
    default: [
      {
        section: "Section A - Short Answer (2 marks each)",
        questions: [
          "Define the key concepts covered in this course.",
          "Explain the fundamental principles with examples.",
          "What are the main differences between the two approaches discussed?",
          "List and briefly describe the important components.",
          "What is the significance of this topic in real-world applications?",
        ],
      },
      {
        section: "Section B - Long Answer (10 marks each)",
        questions: [
          "Provide a detailed analysis of the main topic covered in Unit 1.",
          "Compare and contrast the methodologies discussed in the course.",
          "Solve the following problem and explain your approach step by step.",
        ],
      },
    ],
  };

  return questionSets[subject] || questionSets.default;
};

export const PaperPreviewDialog = ({ paper, open, onOpenChange }: PaperPreviewDialogProps) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, boolean>>({});

  if (!paper) return null;

  const questions = getSampleQuestions(paper.subject);
  const totalQuestions = questions.reduce((acc, section) => acc + section.questions.length, 0);
  const answeredCount = Object.values(selectedAnswers).filter(Boolean).length;

  const toggleQuestion = (questionId: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center flex-shrink-0">
              <FileText className="w-7 h-7 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-xl font-bold text-foreground mb-2">
                {paper.subject}
              </DialogTitle>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="gap-1">
                  <Calendar className="w-3 h-3" />
                  {paper.year}
                </Badge>
                <Badge variant="secondary" className="gap-1">
                  <BookOpen className="w-3 h-3" />
                  {paper.semester}
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <GraduationCap className="w-3 h-3" />
                  {paper.faculty}
                </Badge>
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                  {paper.examType}
                </Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="questions" className="flex-1">
          <div className="px-6 pt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="questions">Questions</TabsTrigger>
              <TabsTrigger value="info">Paper Info</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="questions" className="mt-0 flex-1">
            <div className="px-6 py-3 border-b bg-muted/30 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Duration: 3 hours</span>
                <span className="mx-2">•</span>
                <span>Total: {totalQuestions} questions</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-muted-foreground">
                  {answeredCount}/{totalQuestions} marked
                </span>
              </div>
            </div>
            
            <ScrollArea className="h-[400px] px-6 py-4">
              <div className="space-y-6">
                {questions.map((section, sectionIndex) => (
                  <div key={sectionIndex}>
                    <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">
                      {section.section}
                    </h3>
                    <div className="space-y-3">
                      {section.questions.map((question, qIndex) => {
                        const questionId = `${sectionIndex}-${qIndex}`;
                        const isMarked = selectedAnswers[questionId];
                        
                        return (
                          <div
                            key={qIndex}
                            className={`p-4 rounded-xl border transition-all cursor-pointer hover:border-primary/50 ${
                              isMarked 
                                ? 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800' 
                                : 'bg-card border-border'
                            }`}
                            onClick={() => toggleQuestion(questionId)}
                          >
                            <div className="flex items-start gap-3">
                              <div className="mt-0.5">
                                {isMarked ? (
                                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                                ) : (
                                  <Circle className="w-5 h-5 text-muted-foreground" />
                                )}
                              </div>
                              <div className="flex-1">
                                <span className="font-medium text-primary mr-2">
                                  Q{qIndex + 1}.
                                </span>
                                <span className="text-foreground">{question}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="info" className="mt-0">
            <ScrollArea className="h-[450px] px-6 py-4">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-muted/50">
                    <p className="text-sm text-muted-foreground mb-1">Subject</p>
                    <p className="font-semibold text-foreground">{paper.subject}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/50">
                    <p className="text-sm text-muted-foreground mb-1">Faculty</p>
                    <p className="font-semibold text-foreground">{paper.faculty}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/50">
                    <p className="text-sm text-muted-foreground mb-1">Year</p>
                    <p className="font-semibold text-foreground">{paper.year}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/50">
                    <p className="text-sm text-muted-foreground mb-1">Semester</p>
                    <p className="font-semibold text-foreground">{paper.semester}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/50">
                    <p className="text-sm text-muted-foreground mb-1">Exam Type</p>
                    <p className="font-semibold text-foreground">{paper.examType}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/50">
                    <p className="text-sm text-muted-foreground mb-1">Duration</p>
                    <p className="font-semibold text-foreground">3 Hours</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-muted/50">
                  <p className="text-sm text-muted-foreground mb-2">Instructions</p>
                  <ul className="text-sm text-foreground space-y-2">
                    <li>• Answer all questions from Section A.</li>
                    <li>• Answer any three questions from Section B.</li>
                    <li>• Figures to the right indicate full marks.</li>
                    <li>• Make suitable assumptions wherever necessary.</li>
                    <li>• Draw neat and labeled diagrams wherever required.</li>
                  </ul>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>

        <div className="p-6 pt-4 border-t bg-muted/30">
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button variant="premium" className="flex-1 gap-2">
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
