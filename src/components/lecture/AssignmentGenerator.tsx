
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  BookOpen, 
  ClipboardList, 
  FileText, 
  Save,
  Plus,
  PencilLine,
  Trash2,
  Sparkles,
  Clock,
  BookMarked
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Assignment {
  id: string;
  title: string;
  description: string;
  questions: AssignmentQuestion[];
  dueDate: string;
  totalPoints: number;
}

interface AssignmentQuestion {
  id: string;
  text: string;
  type: "essay" | "problem" | "code" | "research";
  points: number;
}

const AssignmentGenerator = () => {
  const { toast } = useToast();
  const [assignment, setAssignment] = useState<Assignment>({
    id: "1",
    title: "Introduction to Data Structures",
    description: "This assignment will test your understanding of basic data structures including arrays, linked lists, and hash tables.",
    questions: [
      {
        id: "q1",
        text: "Explain the difference between arrays and linked lists. Include pros and cons of each data structure.",
        type: "essay",
        points: 20
      },
      {
        id: "q2",
        text: "Implement a stack data structure using arrays. Include push, pop, and peek operations.",
        type: "code",
        points: 25
      },
      {
        id: "q3",
        text: "Calculate the time complexity for searching, insertion, and deletion operations in a hash table. Explain your reasoning.",
        type: "problem",
        points: 15
      }
    ],
    dueDate: "2023-12-15",
    totalPoints: 60
  });
  
  const [newQuestionText, setNewQuestionText] = useState("");
  const [newQuestionType, setNewQuestionType] = useState<AssignmentQuestion["type"]>("essay");
  const [newQuestionPoints, setNewQuestionPoints] = useState(10);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Add a new question to the assignment
  const handleAddQuestion = () => {
    if (!newQuestionText) {
      toast({
        title: "Question text is required",
        description: "Please enter text for your question",
        variant: "destructive"
      });
      return;
    }
    
    const newQuestion: AssignmentQuestion = {
      id: `q${assignment.questions.length + 1}`,
      text: newQuestionText,
      type: newQuestionType,
      points: newQuestionPoints
    };
    
    setAssignment({
      ...assignment,
      questions: [...assignment.questions, newQuestion],
      totalPoints: assignment.totalPoints + newQuestionPoints
    });
    
    setNewQuestionText("");
    setNewQuestionPoints(10);
    setNewQuestionType("essay");
    
    toast({
      title: "Question added",
      description: "Your question has been added to the assignment"
    });
  };
  
  // Delete a question
  const handleDeleteQuestion = (questionId: string) => {
    const questionToDelete = assignment.questions.find(q => q.id === questionId);
    
    if (!questionToDelete) return;
    
    setAssignment({
      ...assignment,
      questions: assignment.questions.filter(q => q.id !== questionId),
      totalPoints: assignment.totalPoints - questionToDelete.points
    });
    
    toast({
      title: "Question deleted",
      description: "The question has been removed from the assignment"
    });
  };
  
  // Start editing a question
  const handleEditQuestion = (questionId: string) => {
    const questionToEdit = assignment.questions.find(q => q.id === questionId);
    
    if (!questionToEdit) return;
    
    setNewQuestionText(questionToEdit.text);
    setNewQuestionType(questionToEdit.type);
    setNewQuestionPoints(questionToEdit.points);
    setEditingQuestionId(questionId);
  };
  
  // Save edited question
  const handleSaveEditedQuestion = () => {
    if (!editingQuestionId) return;
    
    const oldQuestion = assignment.questions.find(q => q.id === editingQuestionId);
    
    if (!oldQuestion) return;
    
    const updatedQuestions = assignment.questions.map(q => 
      q.id === editingQuestionId 
        ? { ...q, text: newQuestionText, type: newQuestionType, points: newQuestionPoints }
        : q
    );
    
    setAssignment({
      ...assignment,
      questions: updatedQuestions,
      totalPoints: assignment.totalPoints - oldQuestion.points + newQuestionPoints
    });
    
    setNewQuestionText("");
    setNewQuestionPoints(10);
    setNewQuestionType("essay");
    setEditingQuestionId(null);
    
    toast({
      title: "Question updated",
      description: "Your question has been updated"
    });
  };
  
  // Generate an assignment with AI
  const handleGenerateAssignment = () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const generatedAssignment: Assignment = {
        id: "2",
        title: "Advanced Data Structures and Algorithms",
        description: "This assignment explores advanced data structures and algorithmic concepts including trees, graphs, and dynamic programming.",
        questions: [
          {
            id: "q1",
            text: "Implement a balanced binary search tree and analyze its time complexity for common operations.",
            type: "code",
            points: 25
          },
          {
            id: "q2",
            text: "Compare and contrast depth-first search and breadth-first search algorithms. When would you use each approach?",
            type: "essay",
            points: 20
          },
          {
            id: "q3",
            text: "Solve the knapsack problem using dynamic programming. Show your work and explain your approach.",
            type: "problem",
            points: 30
          },
          {
            id: "q4",
            text: "Research and summarize a recent advancement in algorithm design or data structures. Cite at least three scholarly sources.",
            type: "research",
            points: 25
          }
        ],
        dueDate: "2023-12-22",
        totalPoints: 100
      };
      
      setAssignment(generatedAssignment);
      setIsGenerating(false);
      
      toast({
        title: "Assignment generated",
        description: "AI has created a new assignment based on your course content"
      });
    }, 2000);
  };
  
  // Save the assignment
  const handleSaveAssignment = () => {
    toast({
      title: "Assignment saved",
      description: "Your assignment has been saved successfully"
    });
  };
  
  return (
    <div className="flex flex-col h-full overflow-hidden bg-white">
      {/* Header */}
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold flex items-center text-primary mb-2">
          <ClipboardList className="mr-2 h-5 w-5" />
          Assignment Generator
        </h2>
        <p className="text-sm text-gray-500">Create and customize assignments for your students</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-6">
          {/* Assignment Details */}
          <div className="mb-8 bg-white p-6 rounded-lg border shadow-sm">
            <div className="mb-4">
              <Label htmlFor="title" className="text-base font-medium">Assignment Title</Label>
              <Input 
                id="title" 
                value={assignment.title}
                onChange={(e) => setAssignment({...assignment, title: e.target.value})}
                className="mt-1"
              />
            </div>
            
            <div className="mb-4">
              <Label htmlFor="description" className="text-base font-medium">Description</Label>
              <Textarea 
                id="description"
                value={assignment.description}
                onChange={(e) => setAssignment({...assignment, description: e.target.value})}
                className="mt-1 min-h-[100px]"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-2">
              <div>
                <Label htmlFor="dueDate" className="text-base font-medium">Due Date</Label>
                <Input 
                  id="dueDate"
                  type="date"
                  value={assignment.dueDate}
                  onChange={(e) => setAssignment({...assignment, dueDate: e.target.value})}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label className="text-base font-medium">Total Points</Label>
                <div className="mt-1 bg-gray-100 px-4 py-2 rounded-md text-lg font-medium">
                  {assignment.totalPoints} pts
                </div>
              </div>
            </div>
          </div>
          
          {/* Questions List */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FileText className="mr-2 h-5 w-5 text-primary" />
              Assignment Questions
            </h3>
            
            <div className="space-y-4">
              {assignment.questions.map((question, index) => (
                <div 
                  key={question.id} 
                  className="bg-white p-4 rounded-lg border shadow-sm"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-gray-500">Question {index + 1}</span>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditQuestion(question.id)}
                        className="h-8 w-8 p-0"
                      >
                        <PencilLine className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteQuestion(question.id)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <p className="text-gray-800 mb-3">{question.text}</p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className={cn(
                      "px-2 py-1 rounded-full font-medium",
                      question.type === "essay" && "bg-blue-100 text-blue-800",
                      question.type === "problem" && "bg-purple-100 text-purple-800",
                      question.type === "code" && "bg-emerald-100 text-emerald-800",
                      question.type === "research" && "bg-amber-100 text-amber-800"
                    )}>
                      {question.type.charAt(0).toUpperCase() + question.type.slice(1)}
                    </span>
                    <span className="font-medium">{question.points} points</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Add New Question Form */}
          <div className="bg-gray-50 p-6 rounded-lg border mb-8">
            <h3 className="text-lg font-semibold mb-4">
              {editingQuestionId ? "Edit Question" : "Add New Question"}
            </h3>
            
            <div className="mb-4">
              <Label htmlFor="questionText" className="text-sm font-medium">Question Text</Label>
              <Textarea 
                id="questionText"
                value={newQuestionText}
                onChange={(e) => setNewQuestionText(e.target.value)}
                placeholder="Enter your question here..."
                className="mt-1 min-h-[100px]"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Label htmlFor="questionType" className="text-sm font-medium">Question Type</Label>
                <select
                  id="questionType"
                  value={newQuestionType}
                  onChange={(e) => setNewQuestionType(e.target.value as AssignmentQuestion["type"])}
                  className="mt-1 w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                >
                  <option value="essay">Essay</option>
                  <option value="problem">Problem</option>
                  <option value="code">Code</option>
                  <option value="research">Research</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="points" className="text-sm font-medium">Points</Label>
                <Input 
                  id="points"
                  type="number"
                  value={newQuestionPoints}
                  onChange={(e) => setNewQuestionPoints(parseInt(e.target.value))}
                  min={1}
                  max={100}
                  className="mt-1"
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              {editingQuestionId ? (
                <Button onClick={handleSaveEditedQuestion}>
                  Save Changes
                </Button>
              ) : (
                <Button onClick={handleAddQuestion}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Question
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Actions */}
      <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handleGenerateAssignment}
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
              Generate with AI
            </>
          )}
        </Button>
        
        <div className="flex space-x-3">
          <Button variant="outline" className="bg-white">
            <BookOpen className="h-4 w-4 mr-2" />
            Preview
          </Button>
          
          <Button onClick={handleSaveAssignment}>
            <Save className="h-4 w-4 mr-2" />
            Save Assignment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentGenerator;
