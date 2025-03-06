
import React, { useState } from "react";
import { 
  ArrowLeft, 
  ArrowRight, 
  Brain, 
  Check, 
  Clock, 
  FileQuestion, 
  HelpCircle, 
  Lightbulb, 
  Search, 
  Sparkles, 
  ThumbsUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Question {
  id: string;
  text: string;
  options?: { id: string; text: string }[];
  type: "multiple-choice" | "true-false" | "short-answer";
}

const QuizSolver = () => {
  const { toast } = useToast();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [shortAnswers, setShortAnswers] = useState<Record<string, string>>({});
  const [explanations, setExplanations] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);

  // Sample quiz data
  const quizTitle = "Introduction to Neural Networks";
  const questions: Question[] = [
    {
      id: "1",
      text: "Which of the following is NOT a type of neural network architecture?",
      type: "multiple-choice",
      options: [
        { id: "1", text: "Convolutional Neural Network (CNN)" },
        { id: "2", text: "Recurrent Neural Network (RNN)" },
        { id: "3", text: "Quantum Neural Network (QNN)" },
        { id: "4", text: "Statistical Neural Network (SNN)" }
      ]
    },
    {
      id: "2",
      text: "True or False: The activation function in a neural network adds non-linearity to the model.",
      type: "true-false",
      options: [
        { id: "1", text: "True" },
        { id: "2", text: "False" }
      ]
    },
    {
      id: "3",
      text: "Explain the purpose of the backpropagation algorithm in neural networks.",
      type: "short-answer"
    }
  ];

  const activeQuestion = questions[activeQuestionIndex];

  // Go to next question
  const handleNextQuestion = () => {
    if (activeQuestionIndex < questions.length - 1) {
      setActiveQuestionIndex(activeQuestionIndex + 1);
    }
  };

  // Go to previous question
  const handlePrevQuestion = () => {
    if (activeQuestionIndex > 0) {
      setActiveQuestionIndex(activeQuestionIndex - 1);
    }
  };

  // Select an option for multiple choice or true/false
  const handleSelectOption = (questionId: string, optionId: string) => {
    setSelectedOptions({
      ...selectedOptions,
      [questionId]: optionId
    });
  };

  // Update short answer
  const handleUpdateShortAnswer = (questionId: string, answer: string) => {
    setShortAnswers({
      ...shortAnswers,
      [questionId]: answer
    });
  };

  // Generate an explanation with AI
  const handleGenerateExplanation = (questionId: string) => {
    setIsGenerating(true);

    // Simulate AI generating an explanation
    setTimeout(() => {
      let explanation = '';
      
      // Different explanations based on question type
      if (activeQuestion.type === 'multiple-choice') {
        explanation = `The correct answer is "Statistical Neural Network (SNN)". This is a fabricated term. The common neural network architectures include:
        
1. Convolutional Neural Networks (CNNs) - Specialized for processing grid-like data such as images
2. Recurrent Neural Networks (RNNs) - Designed for sequential data with memory capabilities
3. Quantum Neural Networks (QNNs) - Quantum computing applications of neural networks
        
SNNs are not a standard neural network architecture in the field of deep learning.`;
      } else if (activeQuestion.type === 'true-false') {
        explanation = `The correct answer is "True". Activation functions are crucial components in neural networks that add non-linearity to the model.

Without activation functions, a neural network would simply be a linear regression model, regardless of its depth. Activation functions like ReLU, Sigmoid, and Tanh allow neural networks to learn complex patterns and relationships in data.`;
      } else {
        explanation = `The backpropagation algorithm is used to train neural networks by adjusting the weights and biases to minimize the loss function.

It works by:
1. Calculating the gradient of the loss function with respect to each weight
2. Propagating these gradients backwards through the network, from the output layer to the input layer
3. Updating weights using an optimization algorithm (like gradient descent)

This process enables the neural network to learn from its mistakes and improve predictions over time.`;
      }
      
      setExplanations({
        ...explanations,
        [questionId]: explanation
      });
      
      setIsGenerating(false);
      
      toast({
        title: "Explanation generated",
        description: "AI has created an explanation for this question"
      });
    }, 2000);
  };

  // Search for information
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Please enter a search term",
        description: "Enter keywords to search for information",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Searching for information",
      description: `Finding information about "${searchQuery}"`
    });
  };

  // Calculate progress
  const progress = ((activeQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white">
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-amber-50 to-white">
        <h2 className="text-xl font-semibold flex items-center text-primary mb-2">
          <FileQuestion className="mr-2 h-5 w-5" />
          Quiz Solver
        </h2>
        <p className="text-sm text-gray-500">Get help solving quizzes and understanding correct answers</p>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Question */}
        <div className="w-2/3 flex flex-col overflow-hidden border-r">
          {/* Quiz Info & Progress */}
          <div className="p-4 border-b bg-gray-50">
            <h3 className="font-medium text-gray-800 mb-2">{quizTitle}</h3>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
              <div 
                className="bg-primary h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <div className="text-gray-500">
                Question {activeQuestionIndex + 1} of {questions.length}
              </div>
              <div className="flex items-center text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                25:00 remaining
              </div>
            </div>
          </div>

          {/* Question */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-2xl mx-auto">
              {/* Question Text */}
              <div className="mb-8">
                <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-3">
                  Question {activeQuestionIndex + 1}
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">{activeQuestion.text}</h3>
                
                {/* Instructions based on question type */}
                <p className="text-sm text-gray-500 italic">
                  {activeQuestion.type === 'multiple-choice' && "Select the best answer from the options below."}
                  {activeQuestion.type === 'true-false' && "Select whether the statement is true or false."}
                  {activeQuestion.type === 'short-answer' && "Provide a brief answer in your own words."}
                </p>
              </div>

              {/* Answer Area */}
              <div className="space-y-4">
                {/* Multiple Choice Options */}
                {activeQuestion.type === 'multiple-choice' && activeQuestion.options && (
                  <div className="space-y-3">
                    {activeQuestion.options.map((option) => (
                      <div 
                        key={option.id} 
                        className={cn(
                          "flex items-center p-4 border rounded-lg cursor-pointer transition-all",
                          selectedOptions[activeQuestion.id] === option.id
                            ? "bg-primary/10 border-primary/30"
                            : "bg-white hover:bg-gray-50"
                        )}
                        onClick={() => handleSelectOption(activeQuestion.id, option.id)}
                      >
                        <div 
                          className={cn(
                            "w-5 h-5 rounded-full border flex items-center justify-center mr-3",
                            selectedOptions[activeQuestion.id] === option.id
                              ? "border-primary bg-primary text-white"
                              : "border-gray-300"
                          )}
                        >
                          {selectedOptions[activeQuestion.id] === option.id && (
                            <Check className="h-3 w-3" />
                          )}
                        </div>
                        <span className="text-gray-800">{option.text}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* True/False Options */}
                {activeQuestion.type === 'true-false' && activeQuestion.options && (
                  <div className="flex space-x-3">
                    {activeQuestion.options.map((option) => (
                      <div 
                        key={option.id} 
                        className={cn(
                          "flex-1 flex items-center justify-center p-4 border rounded-lg cursor-pointer transition-all",
                          selectedOptions[activeQuestion.id] === option.id
                            ? "bg-primary/10 border-primary/30"
                            : "bg-white hover:bg-gray-50"
                        )}
                        onClick={() => handleSelectOption(activeQuestion.id, option.id)}
                      >
                        <div 
                          className={cn(
                            "w-5 h-5 rounded-full border flex items-center justify-center mr-2",
                            selectedOptions[activeQuestion.id] === option.id
                              ? "border-primary bg-primary text-white"
                              : "border-gray-300"
                          )}
                        >
                          {selectedOptions[activeQuestion.id] === option.id && (
                            <Check className="h-3 w-3" />
                          )}
                        </div>
                        <span className="text-gray-800 font-medium">{option.text}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Short Answer */}
                {activeQuestion.type === 'short-answer' && (
                  <Textarea 
                    value={shortAnswers[activeQuestion.id] || ''}
                    onChange={(e) => handleUpdateShortAnswer(activeQuestion.id, e.target.value)}
                    placeholder="Type your answer here..."
                    className="min-h-[150px] bg-white"
                  />
                )}
              </div>

              {/* Explanation (if available) */}
              {explanations[activeQuestion.id] && (
                <div className="mt-8 p-4 bg-green-50 border border-green-100 rounded-lg">
                  <h4 className="font-medium text-green-700 flex items-center mb-2">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Explanation
                  </h4>
                  <div className="text-sm text-gray-700 whitespace-pre-line">
                    {explanations[activeQuestion.id]}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="p-4 border-t flex justify-between bg-gray-50">
            <Button 
              variant="outline" 
              onClick={handlePrevQuestion}
              disabled={activeQuestionIndex === 0}
              className="bg-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => handleGenerateExplanation(activeQuestion.id)}
              disabled={isGenerating}
              className="bg-white"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-primary border-opacity-50 border-t-transparent rounded-full"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2 text-primary" />
                  Explain Answer
                </>
              )}
            </Button>
            
            <Button 
              onClick={handleNextQuestion}
              disabled={activeQuestionIndex === questions.length - 1}
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Right Panel - AI Help */}
        <div className="w-1/3 flex flex-col overflow-hidden">
          {/* Search Bar */}
          <div className="p-4 border-b">
            <div className="relative">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for related concepts..."
                className="pr-20 bg-white shadow-sm"
              />
              <Button 
                className="absolute right-0 top-0 h-full rounded-l-none"
                onClick={handleSearch}
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* AI Helper */}
          <div className="p-4 border-b">
            <h3 className="font-medium text-gray-700 mb-3 flex items-center">
              <Brain className="h-4 w-4 mr-2 text-primary" />
              AI Study Helper
            </h3>
            
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start bg-white hover:bg-primary/5"
                onClick={() => {
                  toast({
                    title: "Studying key concepts",
                    description: "AI is generating study materials for this topic"
                  });
                }}
              >
                <BookIcon className="h-4 w-4 mr-2 text-purple-500" />
                Study Key Concepts
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start bg-white hover:bg-primary/5"
                onClick={() => {
                  toast({
                    title: "Finding examples",
                    description: "AI is finding relevant examples for this question"
                  });
                }}
              >
                <ListCheckIcon className="h-4 w-4 mr-2 text-indigo-500" />
                Show Similar Examples
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full justify-start bg-white hover:bg-primary/5"
                onClick={() => {
                  toast({
                    title: "Breaking down the question",
                    description: "AI is analyzing this question step by step"
                  });
                }}
              >
                <HelpCircle className="h-4 w-4 mr-2 text-blue-500" />
                Break Down Question
              </Button>
            </div>
          </div>

          {/* Study Resources */}
          <div className="flex-1 overflow-y-auto p-4">
            <h3 className="font-medium text-gray-700 mb-3">Related Study Resources</h3>
            
            <div className="space-y-3">
              {[
                {
                  title: "Neural Network Architectures",
                  type: "Article",
                  difficulty: "Intermediate",
                  time: "10 min read"
                },
                {
                  title: "Backpropagation Explained",
                  type: "Video",
                  difficulty: "Advanced",
                  time: "15 min watch"
                },
                {
                  title: "Activation Functions in Neural Networks",
                  type: "Tutorial",
                  difficulty: "Beginner",
                  time: "8 min read"
                },
                {
                  title: "Deep Learning Fundamentals",
                  type: "Course",
                  difficulty: "Intermediate",
                  time: "2 hr course"
                }
              ].map((resource, index) => (
                <div 
                  key={index} 
                  className="border rounded-lg p-3 bg-white hover:shadow-md transition-shadow cursor-pointer"
                >
                  <h4 className="font-medium text-primary">{resource.title}</h4>
                  <div className="flex items-center mt-1 space-x-2">
                    <span className="inline-flex items-center bg-gray-100 px-2 py-0.5 rounded text-xs font-medium">
                      {resource.type}
                    </span>
                    <span className="inline-flex items-center bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-medium">
                      {resource.difficulty}
                    </span>
                    <span className="text-xs text-gray-500">{resource.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Custom icons to avoid adding dependencies
const BookIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
  </svg>
);

const ListCheckIcon = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 12H3" />
    <path d="M16 6H3" />
    <path d="M16 18H3" />
    <path d="M18 9l3 3-3 3" />
  </svg>
);

export default QuizSolver;
