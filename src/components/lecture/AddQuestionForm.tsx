
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  text: string;
  type: "multiple-choice" | "true-false" | "short-answer";
  options: QuestionOption[];
  points: number;
}

interface AddQuestionFormProps {
  onAddQuestion: (question: Question) => void;
  onCancel: () => void;
}

const AddQuestionForm = ({ onAddQuestion, onCancel }: AddQuestionFormProps) => {
  const { toast } = useToast();
  const [questionType, setQuestionType] = useState<"multiple-choice" | "true-false" | "short-answer">("multiple-choice");
  const [options, setOptions] = useState<QuestionOption[]>([
    { id: `${Date.now()}-1`, text: "Option 1", isCorrect: true },
    { id: `${Date.now()}-2`, text: "Option 2", isCorrect: false },
    { id: `${Date.now()}-3`, text: "Option 3", isCorrect: false },
    { id: `${Date.now()}-4`, text: "Option 4", isCorrect: false }
  ]);
  const [questionText, setQuestionText] = useState("");
  const [points, setPoints] = useState(10);

  const handleTypeChange = (type: "multiple-choice" | "true-false" | "short-answer") => {
    setQuestionType(type);
    
    // Reset options based on type
    if (type === "multiple-choice") {
      setOptions([
        { id: `${Date.now()}-1`, text: "Option 1", isCorrect: true },
        { id: `${Date.now()}-2`, text: "Option 2", isCorrect: false },
        { id: `${Date.now()}-3`, text: "Option 3", isCorrect: false },
        { id: `${Date.now()}-4`, text: "Option 4", isCorrect: false }
      ]);
    } else if (type === "true-false") {
      setOptions([
        { id: `${Date.now()}-1`, text: "True", isCorrect: true },
        { id: `${Date.now()}-2`, text: "False", isCorrect: false }
      ]);
    } else {
      setOptions([]);
    }
  };

  const handleAddOption = () => {
    setOptions([
      ...options,
      { 
        id: `${Date.now()}-${options.length + 1}`, 
        text: `Option ${options.length + 1}`, 
        isCorrect: false 
      }
    ]);
  };

  const handleRemoveOption = (optionId: string) => {
    if (options.length <= 2) {
      toast({
        title: "Cannot remove option",
        description: "Questions must have at least 2 options",
        variant: "destructive"
      });
      return;
    }
    
    const updatedOptions = options.filter(opt => opt.id !== optionId);
    
    // If we're removing the correct option, set the first remaining option as correct
    if (options.find(opt => opt.id === optionId)?.isCorrect) {
      updatedOptions[0].isCorrect = true;
    }
    
    setOptions(updatedOptions);
  };

  const handleSetCorrectOption = (optionId: string) => {
    setOptions(options.map(opt => ({ 
      ...opt, 
      isCorrect: opt.id === optionId 
    })));
  };

  const handleUpdateOptionText = (optionId: string, newText: string) => {
    setOptions(options.map(opt => 
      opt.id === optionId ? { ...opt, text: newText } : opt
    ));
  };

  const handleSubmit = () => {
    if (!questionText.trim()) {
      toast({
        title: "Question text is required",
        description: "Please enter text for your question",
        variant: "destructive"
      });
      return;
    }

    const newQuestion: Question = {
      id: Date.now().toString(),
      text: questionText,
      type: questionType,
      options: options,
      points: points
    };

    onAddQuestion(newQuestion);
    resetForm();
  };

  const resetForm = () => {
    setQuestionText("");
    setQuestionType("multiple-choice");
    setOptions([
      { id: `${Date.now()}-1`, text: "Option 1", isCorrect: true },
      { id: `${Date.now()}-2`, text: "Option 2", isCorrect: false },
      { id: `${Date.now()}-3`, text: "Option 3", isCorrect: false },
      { id: `${Date.now()}-4`, text: "Option 4", isCorrect: false }
    ]);
    setPoints(10);
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Add New Question</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onCancel}
          className="h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-4">
        {/* Question Type */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Question Type</label>
          <Select 
            value={questionType} 
            onValueChange={(value) => handleTypeChange(
              value as "multiple-choice" | "true-false" | "short-answer"
            )}
          >
            <SelectTrigger className="bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
              <SelectItem value="true-false">True/False</SelectItem>
              <SelectItem value="short-answer">Short Answer</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Question Text */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Question Text</label>
          <Textarea 
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="Enter your question here"
            className="resize-none bg-white"
          />
        </div>
        
        {/* Points */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">Points</label>
          <Input 
            type="number" 
            value={points}
            onChange={(e) => setPoints(parseInt(e.target.value) || 0)}
            className="bg-white w-24"
          />
        </div>
        
        {/* Options */}
        {questionType !== "short-answer" && (
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Answer Options</label>
            <div className="space-y-2">
              {options.map((option) => (
                <div 
                  key={option.id} 
                  className={`flex items-center p-3 rounded-lg border ${
                    option.isCorrect ? "bg-green-50 border-green-200" : ""
                  }`}
                >
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`h-6 w-6 p-0 mr-3 rounded-full ${
                      option.isCorrect 
                        ? "bg-green-500 text-white hover:bg-green-600" 
                        : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                    }`}
                    onClick={() => handleSetCorrectOption(option.id)}
                  >
                    {option.isCorrect && <div className="h-2 w-2 rounded-full bg-white"></div>}
                  </Button>
                  <Input 
                    value={option.text}
                    onChange={(e) => handleUpdateOptionText(option.id, e.target.value)}
                    className={`border-0 bg-transparent focus-visible:ring-0 p-0 ${
                      option.isCorrect ? "font-medium" : ""
                    }`}
                  />
                  {options.length > 2 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0 ml-auto hover:bg-red-50 hover:text-red-500"
                      onClick={() => handleRemoveOption(option.id)}
                    >
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
              ))}

              {questionType === "multiple-choice" && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-2"
                  onClick={handleAddOption}
                >
                  <Plus className="h-3.5 w-3.5 mr-1" />
                  Add Option
                </Button>
              )}
            </div>
          </div>
        )}
        
        {/* Actions */}
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button onClick={handleSubmit}>Add Question</Button>
        </div>
      </div>
    </div>
  );
};

export default AddQuestionForm;
