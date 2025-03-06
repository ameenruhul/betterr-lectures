
import React, { useState } from "react";
import { 
  AlertCircle,
  Brain, 
  Check, 
  Copy, 
  FileQuestion, 
  LayoutList, 
  MoveDown, 
  MoveUp, 
  Plus, 
  Printer, 
  Save, 
  Settings, 
  Sparkles, 
  Trash2, 
  X 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  text: string;
  type: "multiple-choice" | "true-false" | "short-answer";
  options: QuestionOption[];
  points: number;
}

const QuizBuilder = () => {
  const { toast } = useToast();
  const [quizTitle, setQuizTitle] = useState("Introduction to Machine Learning");
  const [quizDescription, setQuizDescription] = useState("Test your understanding of basic machine learning concepts.");
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      text: "Which of the following is NOT a type of machine learning?",
      type: "multiple-choice",
      options: [
        { id: "1-1", text: "Supervised Learning", isCorrect: false },
        { id: "1-2", text: "Unsupervised Learning", isCorrect: false },
        { id: "1-3", text: "Reinforcement Learning", isCorrect: false },
        { id: "1-4", text: "Cognitive Learning", isCorrect: true }
      ],
      points: 10
    },
    {
      id: "2",
      text: "True or False: K-means is a supervised learning algorithm.",
      type: "true-false",
      options: [
        { id: "2-1", text: "True", isCorrect: false },
        { id: "2-2", text: "False", isCorrect: true }
      ],
      points: 5
    }
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [promptInput, setPromptInput] = useState("");

  // Add a new question
  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      text: "New question",
      type: "multiple-choice",
      options: [
        { id: `${Date.now()}-1`, text: "Option 1", isCorrect: false },
        { id: `${Date.now()}-2`, text: "Option 2", isCorrect: false },
        { id: `${Date.now()}-3`, text: "Option 3", isCorrect: false },
        { id: `${Date.now()}-4`, text: "Option 4", isCorrect: true }
      ],
      points: 5
    };
    setQuestions([...questions, newQuestion]);
  };

  // Delete a question
  const handleDeleteQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
    toast({
      title: "Question removed",
      description: "The question has been deleted from the quiz"
    });
  };

  // Update question text
  const handleUpdateQuestionText = (id: string, newText: string) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, text: newText } : q
    ));
  };

  // Update question type
  const handleUpdateQuestionType = (id: string, newType: "multiple-choice" | "true-false" | "short-answer") => {
    setQuestions(questions.map(q => {
      if (q.id === id) {
        let newOptions: QuestionOption[] = [];
        
        if (newType === "multiple-choice") {
          newOptions = [
            { id: `${id}-1`, text: "Option 1", isCorrect: false },
            { id: `${id}-2`, text: "Option 2", isCorrect: false },
            { id: `${id}-3`, text: "Option 3", isCorrect: false },
            { id: `${id}-4`, text: "Option 4", isCorrect: true }
          ];
        } else if (newType === "true-false") {
          newOptions = [
            { id: `${id}-1`, text: "True", isCorrect: false },
            { id: `${id}-2`, text: "False", isCorrect: true }
          ];
        } else {
          newOptions = [];
        }
        
        return { ...q, type: newType, options: newOptions };
      }
      return q;
    }));
  };

  // Update option text
  const handleUpdateOptionText = (questionId: string, optionId: string, newText: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        const updatedOptions = q.options.map(opt => 
          opt.id === optionId ? { ...opt, text: newText } : opt
        );
        return { ...q, options: updatedOptions };
      }
      return q;
    }));
  };

  // Set correct option
  const handleSetCorrectOption = (questionId: string, optionId: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        const updatedOptions = q.options.map(opt => 
          ({ ...opt, isCorrect: opt.id === optionId })
        );
        return { ...q, options: updatedOptions };
      }
      return q;
    }));
  };

  // Add option to a question
  const handleAddOption = (questionId: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        const newOption = {
          id: `${questionId}-${q.options.length + 1}`,
          text: `Option ${q.options.length + 1}`,
          isCorrect: false
        };
        return { ...q, options: [...q.options, newOption] };
      }
      return q;
    }));
  };

  // Delete option from a question
  const handleDeleteOption = (questionId: string, optionId: string) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        // Don't delete if we only have 2 options left
        if (q.options.length <= 2) {
          toast({
            title: "Cannot remove option",
            description: "Questions must have at least 2 options",
            variant: "destructive"
          });
          return q;
        }
        
        const updatedOptions = q.options.filter(opt => opt.id !== optionId);
        
        // If we're removing the correct option, set the first remaining option as correct
        if (q.options.find(opt => opt.id === optionId)?.isCorrect) {
          updatedOptions[0].isCorrect = true;
        }
        
        return { ...q, options: updatedOptions };
      }
      return q;
    }));
  };

  // Move question up
  const handleMoveQuestionUp = (index: number) => {
    if (index === 0) return;
    const newQuestions = [...questions];
    [newQuestions[index], newQuestions[index - 1]] = [newQuestions[index - 1], newQuestions[index]];
    setQuestions(newQuestions);
  };

  // Move question down
  const handleMoveQuestionDown = (index: number) => {
    if (index === questions.length - 1) return;
    const newQuestions = [...questions];
    [newQuestions[index], newQuestions[index + 1]] = [newQuestions[index + 1], newQuestions[index]];
    setQuestions(newQuestions);
  };

  // Handle printing the quiz
  const handlePrintQuiz = () => {
    toast({
      title: "Preparing quiz for printing",
      description: "Your quiz will open in a new window for printing"
    });
  };

  // Handle saving the quiz
  const handleSaveQuiz = () => {
    toast({
      title: "Quiz saved",
      description: "Your quiz has been saved successfully"
    });
  };

  // Generate questions with AI
  const handleGenerateQuestions = () => {
    if (!promptInput.trim()) {
      toast({
        title: "Please enter a prompt",
        description: "Describe what kind of questions you want to generate",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const newQuestions: Question[] = [
        {
          id: `ai-${Date.now()}-1`,
          text: "What is the primary goal of regularization in machine learning models?",
          type: "multiple-choice",
          options: [
            { id: `ai-${Date.now()}-1-1`, text: "To make the training process faster", isCorrect: false },
            { id: `ai-${Date.now()}-1-2`, text: "To prevent overfitting", isCorrect: true },
            { id: `ai-${Date.now()}-1-3`, text: "To improve model accuracy on training data", isCorrect: false },
            { id: `ai-${Date.now()}-1-4`, text: "To reduce the number of features", isCorrect: false }
          ],
          points: 10
        },
        {
          id: `ai-${Date.now()}-2`,
          text: "Which algorithm is primarily used for clustering in unsupervised learning?",
          type: "multiple-choice",
          options: [
            { id: `ai-${Date.now()}-2-1`, text: "Linear Regression", isCorrect: false },
            { id: `ai-${Date.now()}-2-2`, text: "Decision Trees", isCorrect: false },
            { id: `ai-${Date.now()}-2-3`, text: "K-means", isCorrect: true },
            { id: `ai-${Date.now()}-2-4`, text: "Logistic Regression", isCorrect: false }
          ],
          points: 10
        }
      ];
      
      setQuestions([...questions, ...newQuestions]);
      setIsGenerating(false);
      setPromptInput("");
      
      toast({
        title: "Questions generated",
        description: "AI has created new questions based on your prompt"
      });
    }, 2000);
  };
  
  // Calculate total quiz points
  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white">
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-violet-50 to-white">
        <h2 className="text-xl font-semibold flex items-center text-primary mb-2">
          <FileQuestion className="mr-2 h-5 w-5" />
          Quiz Builder
        </h2>
        <p className="text-sm text-gray-500">Create interactive quizzes and assessments for your students</p>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Quiz Builder */}
        <div className="w-2/3 flex flex-col overflow-hidden border-r">
          {/* Quiz Info */}
          <div className="p-4 border-b bg-gray-50">
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-500 block mb-1">Quiz Title</label>
                <Input 
                  value={quizTitle}
                  onChange={(e) => setQuizTitle(e.target.value)}
                  placeholder="Enter quiz title"
                  className="bg-white shadow-sm"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 block mb-1">Description (Optional)</label>
                <Textarea 
                  value={quizDescription}
                  onChange={(e) => setQuizDescription(e.target.value)}
                  placeholder="Enter a brief description of the quiz"
                  className="bg-white shadow-sm h-20 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Questions List */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <h3 className="font-medium text-gray-700">Questions</h3>
                <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">
                  {questions.length} total
                </span>
                <span className="ml-2 text-xs bg-primary/10 px-2 py-0.5 rounded-full text-primary">
                  {totalPoints} points
                </span>
              </div>
              <Button 
                onClick={handleAddQuestion}
                size="sm"
                className="bg-primary/10 hover:bg-primary/20 text-primary"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Question
              </Button>
            </div>

            <div className="space-y-6">
              {questions.map((question, index) => (
                <div 
                  key={question.id} 
                  className="border rounded-lg p-4 bg-white shadow-sm"
                >
                  {/* Question Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <Select 
                          value={question.type} 
                          onValueChange={(value) => handleUpdateQuestionType(
                            question.id, 
                            value as "multiple-choice" | "true-false" | "short-answer"
                          )}
                        >
                          <SelectTrigger className="h-7 text-xs w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                            <SelectItem value="true-false">True/False</SelectItem>
                            <SelectItem value="short-answer">Short Answer</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="flex items-center mt-1">
                          <label className="text-xs text-gray-500 mr-2">Points:</label>
                          <Input 
                            type="number" 
                            value={question.points}
                            onChange={(e) => {
                              const points = parseInt(e.target.value) || 0;
                              setQuestions(questions.map(q => 
                                q.id === question.id ? { ...q, points } : q
                              ));
                            }}
                            className="h-6 w-16 text-xs p-1"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleMoveQuestionUp(index)}
                        disabled={index === 0}
                      >
                        <MoveUp className="h-4 w-4 text-gray-500" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleMoveQuestionDown(index)}
                        disabled={index === questions.length - 1}
                      >
                        <MoveDown className="h-4 w-4 text-gray-500" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-500"
                        onClick={() => handleDeleteQuestion(question.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Question Text */}
                  <div className="mb-4">
                    <Textarea 
                      value={question.text}
                      onChange={(e) => handleUpdateQuestionText(question.id, e.target.value)}
                      placeholder="Enter question text"
                      className="resize-none bg-gray-50"
                    />
                  </div>

                  {/* Question Options */}
                  {question.type !== "short-answer" && (
                    <div className="space-y-2">
                      {question.options.map((option) => (
                        <div 
                          key={option.id} 
                          className={cn(
                            "flex items-center p-3 rounded-lg border", 
                            option.isCorrect && "bg-green-50 border-green-200"
                          )}
                        >
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className={cn(
                              "h-6 w-6 p-0 mr-3 rounded-full",
                              option.isCorrect 
                                ? "bg-green-500 text-white hover:bg-green-600" 
                                : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                            )}
                            onClick={() => handleSetCorrectOption(question.id, option.id)}
                          >
                            {option.isCorrect ? (
                              <Check className="h-3.5 w-3.5" />
                            ) : null}
                          </Button>
                          <Input 
                            value={option.text}
                            onChange={(e) => handleUpdateOptionText(question.id, option.id, e.target.value)}
                            className={cn(
                              "border-0 bg-transparent focus-visible:ring-0 p-0",
                              option.isCorrect && "font-medium"
                            )}
                          />
                          {question.options.length > 2 && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-6 w-6 p-0 ml-auto hover:bg-red-50 hover:text-red-500"
                              onClick={() => handleDeleteOption(question.id, option.id)}
                            >
                              <X className="h-3.5 w-3.5" />
                            </Button>
                          )}
                        </div>
                      ))}

                      {question.type === "multiple-choice" && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full mt-2"
                          onClick={() => handleAddOption(question.id)}
                        >
                          <Plus className="h-3.5 w-3.5 mr-1" />
                          Add Option
                        </Button>
                      )}
                    </div>
                  )}

                  {question.type === "short-answer" && (
                    <div className="border p-3 rounded-lg bg-gray-50 border-dashed text-gray-500 italic text-sm">
                      [Students will provide a text answer here]
                    </div>
                  )}
                </div>
              ))}

              {questions.length === 0 && (
                <div className="text-center p-8 border rounded-lg">
                  <AlertCircle className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                  <h3 className="text-gray-500 font-medium">No Questions Yet</h3>
                  <p className="text-gray-400 text-sm mt-1">Add a question or generate questions with AI</p>
                  <Button 
                    className="mt-4"
                    onClick={handleAddQuestion}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add First Question
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-4 border-t bg-gray-50 flex justify-between">
            <div>
              <Button 
                onClick={handlePrintQuiz}
                variant="outline" 
                className="bg-white mr-2"
              >
                <Printer className="h-4 w-4 mr-2" />
                Print Quiz
              </Button>
              <Button 
                onClick={() => {
                  toast({
                    title: "Quiz copied",
                    description: "Quiz has been copied to clipboard"
                  });
                }}
                variant="outline" 
                className="bg-white"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Quiz
              </Button>
            </div>
            <Button onClick={handleSaveQuiz}>
              <Save className="h-4 w-4 mr-2" />
              Save Quiz
            </Button>
          </div>
        </div>

        {/* Right Panel - AI Assistant & Settings */}
        <div className="w-1/3 flex flex-col overflow-hidden">
          {/* AI Question Generator */}
          <div className="p-4 border-b">
            <h3 className="font-medium text-gray-700 mb-3 flex items-center">
              <Sparkles className="h-4 w-4 mr-2 text-primary" />
              AI Question Generator
            </h3>
            <Textarea 
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              placeholder="Describe the questions you want to generate. E.g., 'Create 5 multiple choice questions about machine learning algorithms'"
              className="bg-white shadow-sm resize-none h-28 mb-3"
            />
            <Button 
              onClick={handleGenerateQuestions} 
              disabled={isGenerating}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-opacity-50 border-t-transparent rounded-full"></div>
                  Generating Questions...
                </>
              ) : (
                <>
                  <Brain className="mr-2 h-4 w-4" />
                  Generate Questions
                </>
              )}
            </Button>
          </div>

          {/* Quiz Templates */}
          <div className="p-4 border-b">
            <h3 className="font-medium text-gray-700 mb-3 flex items-center">
              <LayoutList className="h-4 w-4 mr-2 text-primary" />
              Quiz Templates
            </h3>
            <div className="space-y-2">
              {["Multiple Choice Quiz", "True/False Assessment", "Mixed Format Exam"].map((template, index) => (
                <div 
                  key={index} 
                  className="p-3 border rounded-lg bg-white hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <h4 className="font-medium text-sm">{template}</h4>
                  <p className="text-xs text-gray-500 mt-1">Ready-to-use template with example questions</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quiz Settings */}
          <div className="p-4 flex-1 overflow-y-auto">
            <h3 className="font-medium text-gray-700 mb-3 flex items-center">
              <Settings className="h-4 w-4 mr-2 text-primary" />
              Quiz Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-700 mb-1 block">Time Limit</label>
                <Select defaultValue="30">
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select time limit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 minutes</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="unlimited">No time limit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm text-gray-700 mb-1 block">Shuffle Questions</label>
                <Select defaultValue="yes">
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes, shuffle questions</SelectItem>
                    <SelectItem value="no">No, keep order</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm text-gray-700 mb-1 block">Show Results</label>
                <Select defaultValue="after">
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select when to show results" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediately after each question</SelectItem>
                    <SelectItem value="after">After quiz completion</SelectItem>
                    <SelectItem value="never">Don't show results</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm text-gray-700 mb-1 block">Passing Score</label>
                <div className="flex items-center">
                  <Input 
                    type="number" 
                    defaultValue="70" 
                    className="w-20 mr-2 bg-white"
                  />
                  <span className="text-gray-500">%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizBuilder;
