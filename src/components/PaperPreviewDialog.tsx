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
  program?: string;
  courseCode?: string;
  pdfUrl?: string;
}

interface PaperPreviewDialogProps {
  paper: Paper | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Questions database - in production this would come from Supabase
const questionsDatabase: Record<string, { section: string; questions: { text: string; options?: string[] }[] }[]> = {
  "Financial Management": [
    {
      section: "Section A - Multiple Choice (10 × 1 = 10 marks)",
      questions: [
        {
          text: "Which of the following refers to the practice of purchasing enough shares in a company to threaten a takeover, compelling the owners to buy them back at a higher price to maintain control?",
          options: ["a. Poison pill", "b. Greenmail", "c. Managerial incentive", "d. Executive stock option"]
        },
        {
          text: "Which of the following is the maximum growth rate a firm can attain without using any kind of external financing?",
          options: ["a. Constant growth rate", "b. Variable growth rate", "c. Sustainable growth rate", "d. Internal growth rate"]
        },
        {
          text: "Agency problems may arise due to conflicts among stakeholders within a firm. In this context, who is considered a shareholder?",
          options: ["a. Agent", "b. Owner", "c. Principal", "d. Manager"]
        },
        {
          text: "Which of the following is the return on equity (ROE) for a firm with a profit margin of 5%, an asset turnover of 1.25 times, and a debt-to-equity ratio of 1.50 times?",
          options: ["a. 5.63 percent", "b. 9.37 percent", "c. 6.25 percent", "d. 8.00 percent"]
        },
        {
          text: "Which of the following is the major functions of financial management?",
          options: ["a. Clerical decision", "b. Capital structure decision", "c. Marketing decision", "d. Production decision"]
        },
        {
          text: "Growth rate can be achieved with constant debt-equity ratio is called by which of the following?",
          options: ["a. Sales growth rate", "b. Internal growth rate", "c. Sustainable growth rate", "d. Dividend growth rate"]
        },
        {
          text: "Which of the following is a variable used to balance the balance sheet?",
          options: ["a. Sales variable", "b. Growth variable", "c. Plug variable", "d. Cost variable"]
        },
        {
          text: "Which of the following best describes the primary role of a financial manager?",
          options: ["a. Managing the day-to-day operations of a company", "b. Ensuring the company maximizes shareholder wealth", "c. Overseeing employee relations and welfare", "d. Developing marketing strategies to increase sales"]
        },
        {
          text: "Which of the following conditions must typically be met for a financial manager to receive performance shares?",
          options: ["a. Achievement of specific financial targets, such as earnings growth, market price of share, etc.", "b. Successful management of day-to-day operational tasks", "c. Reduction of employee turnover", "d. Completion of a certain number of years with the company"]
        },
      ],
    },
    {
      section: "Section B - Short Questions (Answer any 4, 4 × 3 = 12 marks)",
      questions: [
        {
          text: "Organizations facing financial challenges cannot achieve their goals without collaboration with the finance department, as no functional unit can operate effectively in isolation. Explain the role of a financial manager in publicly held companies in Nepal."
        },
        {
          text: "Just like the overall organizational structure, a firm has its own structure within the finance function. Describe the functions of the finance department and explain its organizational chart."
        },
        {
          text: "Every firm has various stakeholders, each expecting a satisfactory return from the organization. Explain how conflicts arise between shareholders and managers and suggest strategies to minimize them."
        },
        {
          text: "Bottlers Nepal is currently operating at only 80 percent of fixed asset capacity. Current sales are Rs 700,000 and fixed assets are Rs 580,000. (i) What level of sales could the company have obtained if it had been operating at full capacity? (ii) If the company expects its sales to be Rs 950,000, how large an increase in fixed assets would the company need?"
        },
        {
          text: "Based on the following information, calculate the sustainable growth rate for Bottlers Nepal: Profit margin 5%, Asset turnover 2.25, DE ratio 0.55, Payout ratio 40%, Debt Rs 90,000, Equity Rs 70,000. If it does grow at this growth rate, how much new borrowing will take place in the coming year?"
        },
      ],
    },
    {
      section: "Section C - Long Questions (Answer any 2, 2 × 5 = 10 marks)",
      questions: [
        {
          text: "Many firms are established with the primary goal of maximizing profit. However, in today's business environment, profit maximization alone is not sufficient. Compare and contrast profit maximization vs wealth maximization, explaining why wealth maximization is more beneficial."
        },
        {
          text: "A firm has the following relationships: Assets to sales ratio 55%, Spontaneous liabilities 5%, Profit margin 6%, Dividend payout ratio 40%. (a) If growth rate is 18%, what percentage must be financed externally? (b) If growth increases to 25%? (c) How will answer change if profit margin increases to 8%? (d) How will answer change if DPR is reduced to 10%? (e) If profit margin increases from 6% to 8%, will external financing be exactly zero?"
        },
        {
          text: "Neptun Computers balance sheet shows Total assets Rs 122,500, Sales Rs 350,000, Net income Rs 4,200. Sales projected to increase by 30% during 2024. Use the EFN equation to determine projected external financing requirements. Construct proforma balance sheet for December 31, 2024."
        },
      ],
    },
  ],
  "Data Structures & Algorithms": [
    {
      section: "Section A - Short Answer (2 marks each)",
      questions: [
        { text: "Define time complexity and space complexity." },
        { text: "What is the difference between a stack and a queue?" },
        { text: "Explain the concept of recursion with an example." },
        { text: "What is a binary search tree?" },
        { text: "Define Big O notation." },
      ],
    },
    {
      section: "Section B - Long Answer (10 marks each)",
      questions: [
        { text: "Explain the merge sort algorithm with a step-by-step example. Analyze its time complexity." },
        { text: "Describe the implementation of a hash table. How do you handle collisions?" },
        { text: "Compare and contrast BFS and DFS graph traversal algorithms." },
      ],
    },
  ],
  "Computer Networks": [
    {
      section: "Section A - Short Answer (2 marks each)",
      questions: [
        { text: "What is the OSI model? List all 7 layers." },
        { text: "Differentiate between TCP and UDP protocols." },
        { text: "What is an IP address? Explain IPv4 vs IPv6." },
        { text: "Define routing and switching." },
        { text: "What is DNS and how does it work?" },
      ],
    },
    {
      section: "Section B - Long Answer (10 marks each)",
      questions: [
        { text: "Explain the TCP/IP model and compare it with the OSI model." },
        { text: "Describe the process of establishing a TCP connection (three-way handshake)." },
        { text: "What are the different types of network topologies? Explain with diagrams." },
      ],
    },
  ],
};

const getDefaultQuestions = (): { section: string; questions: { text: string; options?: string[] }[] }[] => [
  {
    section: "Section A - Short Answer (2 marks each)",
    questions: [
      { text: "Define the key concepts covered in this course." },
      { text: "Explain the fundamental principles with examples." },
      { text: "What are the main differences between the two approaches discussed?" },
      { text: "List and briefly describe the important components." },
      { text: "What is the significance of this topic in real-world applications?" },
    ],
  },
  {
    section: "Section B - Long Answer (10 marks each)",
    questions: [
      { text: "Provide a detailed analysis of the main topic covered in Unit 1." },
      { text: "Compare and contrast the methodologies discussed in the course." },
      { text: "Solve the following problem and explain your approach step by step." },
    ],
  },
];

export const PaperPreviewDialog = ({ paper, open, onOpenChange }: PaperPreviewDialogProps) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, boolean>>({});

  if (!paper) return null;

  const questions = questionsDatabase[paper.subject] || getDefaultQuestions();
  const totalQuestions = questions.reduce((acc, section) => acc + section.questions.length, 0);
  const answeredCount = Object.values(selectedAnswers).filter(Boolean).length;

  const toggleQuestion = (questionId: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const handleDownload = () => {
    if (paper.pdfUrl) {
      window.open(paper.pdfUrl, '_blank');
    }
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
                {paper.courseCode && (
                  <Badge variant="default" className="gap-1 bg-primary">
                    {paper.courseCode}
                  </Badge>
                )}
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
                  {paper.faculty} {paper.program && `- ${paper.program}`}
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
                <span>Duration: {paper.subject === "Financial Management" ? "50 mins" : "3 hours"}</span>
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
                                <div className="mb-2">
                                  <span className="font-medium text-primary mr-2">
                                    Q{qIndex + 1}.
                                  </span>
                                  <span className="text-foreground">{question.text}</span>
                                </div>
                                {question.options && (
                                  <div className="ml-4 mt-2 space-y-1">
                                    {question.options.map((option, optIndex) => (
                                      <div key={optIndex} className="text-sm text-muted-foreground">
                                        {option}
                                      </div>
                                    ))}
                                  </div>
                                )}
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
                  {paper.program && (
                    <div className="p-4 rounded-xl bg-muted/50">
                      <p className="text-sm text-muted-foreground mb-1">Program</p>
                      <p className="font-semibold text-foreground">{paper.program}</p>
                    </div>
                  )}
                  {paper.courseCode && (
                    <div className="p-4 rounded-xl bg-muted/50">
                      <p className="text-sm text-muted-foreground mb-1">Course Code</p>
                      <p className="font-semibold text-foreground">{paper.courseCode}</p>
                    </div>
                  )}
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
                    <p className="font-semibold text-foreground">
                      {paper.subject === "Financial Management" ? "50 Minutes" : "3 Hours"}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-muted/50">
                  <p className="text-sm text-muted-foreground mb-2">Instructions</p>
                  <ul className="text-sm text-foreground space-y-2">
                    {paper.subject === "Financial Management" ? (
                      <>
                        <li>• Section A: Answer all questions. Encircle the most appropriate answer.</li>
                        <li>• Section B: Answer any FOUR questions (4 × 3 = 12 marks).</li>
                        <li>• Section C: Answer any TWO questions (2 × 5 = 10 marks).</li>
                        <li>• Total Marks: 32 marks.</li>
                        <li>• Make suitable assumptions wherever necessary.</li>
                      </>
                    ) : (
                      <>
                        <li>• Answer all questions from Section A.</li>
                        <li>• Answer any three questions from Section B.</li>
                        <li>• Figures to the right indicate full marks.</li>
                        <li>• Make suitable assumptions wherever necessary.</li>
                        <li>• Draw neat and labeled diagrams wherever required.</li>
                      </>
                    )}
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
            <Button 
              variant="premium" 
              className="flex-1 gap-2"
              onClick={handleDownload}
              disabled={!paper.pdfUrl}
            >
              <Download className="w-4 h-4" />
              {paper.pdfUrl ? "Download PDF" : "PDF Not Available"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
