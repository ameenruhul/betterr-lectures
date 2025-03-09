
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  ArrowRight, 
  Brain, 
  Check, 
  Clock, 
  FileText, 
  HelpCircle, 
  Lightbulb, 
  Search, 
  Sparkles, 
  Upload,
  BookMarked
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AssignmentQuestion {
  id: string;
  text: string;
  type: "essay" | "problem" | "code" | "research";
  points: number;
}

interface Assignment {
  id: string;
  title: string;
  description: string;
  questions: AssignmentQuestion[];
  dueDate: string;
  totalPoints: number;
}

const AssignmentSolver = () => {
  const { toast } = useToast();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResourcePanel, setShowResourcePanel] = useState(true);

  // Sample assignment data
  const assignment: Assignment = {
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
  };

  const activeQuestion = assignment.questions[activeQuestionIndex];

  // Go to next question
  const handleNextQuestion = () => {
    if (activeQuestionIndex < assignment.questions.length - 1) {
      setActiveQuestionIndex(activeQuestionIndex + 1);
    }
  };

  // Go to previous question
  const handlePrevQuestion = () => {
    if (activeQuestionIndex > 0) {
      setActiveQuestionIndex(activeQuestionIndex - 1);
    }
  };

  // Update answer for a question
  const handleUpdateAnswer = (questionId: string, answer: string) => {
    setAnswers({
      ...answers,
      [questionId]: answer
    });
  };

  // Generate a solution with AI
  const handleGenerateSolution = (questionId: string) => {
    setIsGenerating(true);

    // Simulate AI generating a solution
    setTimeout(() => {
      let generatedSolution = '';
      
      // Different solutions based on question type
      if (activeQuestion.type === 'essay') {
        generatedSolution = `Arrays and linked lists are both fundamental data structures but differ significantly in their implementation and performance characteristics:

**Arrays:**
- Pros:
  - Constant-time access (O(1)) to elements by index
  - Memory-efficient (minimal overhead per element)
  - Cache locality (elements are stored contiguously in memory)
  - Fast iteration due to memory locality
- Cons:
  - Fixed size in many languages (not dynamically resizable)
  - Expensive insertion/deletion in the middle (O(n))
  - Requires contiguous memory allocation
  - Inefficient when size needs to change frequently

**Linked Lists:**
- Pros:
  - Dynamic size (grows/shrinks efficiently)
  - Efficient insertion/deletion anywhere in the list (O(1) once position is found)
  - No need for contiguous memory allocation
  - Memory can be allocated as needed
- Cons:
  - Slower element access (O(n) in worst case)
  - Higher memory overhead (each node requires extra pointers)
  - Poor cache locality
  - Extra memory needed for pointers

The choice between arrays and linked lists depends on the specific use case. Arrays are preferable when random access is frequent and the size is relatively stable. Linked lists are better when frequent insertion/deletion operations occur and memory allocation needs to be dynamic.`;
      } else if (activeQuestion.type === 'code') {
        generatedSolution = `Here's an implementation of a stack data structure using arrays in JavaScript:

\`\`\`javascript
class Stack {
  constructor() {
    this.items = [];
    this.size = 0;
  }

  // Push operation: adds an element to the top of the stack
  push(element) {
    this.items[this.size] = element;
    this.size++;
    return this;
  }

  // Pop operation: removes and returns the top element
  pop() {
    if (this.isEmpty()) {
      return "Underflow"; // Stack is empty
    }
    
    this.size--;
    return this.items.pop();
  }

  // Peek operation: returns the top element without removing it
  peek() {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    
    return this.items[this.size - 1];
  }

  // Helper methods
  isEmpty() {
    return this.size === 0;
  }

  getSize() {
    return this.size;
  }

  clear() {
    this.items = [];
    this.size = 0;
    return this;
  }

  print() {
    let str = "";
    for (let i = 0; i < this.size; i++) {
      str += this.items[i] + " ";
    }
    return str;
  }
}

// Example usage:
const stack = new Stack();
stack.push(10);
stack.push(20);
stack.push(30);
console.log("Stack: " + stack.print()); // Stack: 10 20 30
console.log("Top element: " + stack.peek()); // Top element: 30
console.log("Popped: " + stack.pop()); // Popped: 30
console.log("Stack after pop: " + stack.print()); // Stack: 10 20
console.log("Stack size: " + stack.getSize()); // Stack size: 2
\`\`\`

This implementation includes all the required operations:
- push: adds an element to the top of the stack in O(1) time
- pop: removes and returns the top element in O(1) time
- peek: returns the top element without removing it in O(1) time

The implementation also includes additional helper methods for convenience.`;
      } else {
        generatedSolution = `# Time Complexity Analysis for Hash Table Operations

## Searching

**Average Case: O(1)**
- When the hash function distributes keys uniformly and there are few collisions, finding an element requires:
  1. Computing the hash (O(1))
  2. Accessing the array at that index (O(1))

**Worst Case: O(n)**
- This occurs when many keys hash to the same index (many collisions)
- In the worst case, all n elements hash to the same bucket, requiring a linear search through all elements

## Insertion

**Average Case: O(1)**
- Computing the hash value (O(1))
- Inserting at the calculated index (O(1))

**Worst Case: O(n)**
- If using chaining for collision resolution and the hash table has many collisions, insertion might require traversing the linked list at a particular bucket (O(n))
- With open addressing, finding an empty slot could take O(n) in a nearly-full table

## Deletion

**Average Case: O(1)**
- Computing the hash value (O(1))
- Deleting the element (O(1))

**Worst Case: O(n)**
- Similar to searching, if many collisions exist, we might need to traverse through many elements to find the one to delete

## Reasoning

The efficiency of hash table operations depends primarily on:

1. **Load Factor**: The ratio of elements to buckets. As this approaches 1, the likelihood of collisions increases.

2. **Hash Function Quality**: A good hash function distributes keys uniformly across buckets, minimizing collisions.

3. **Collision Resolution Strategy**:
   - **Chaining**: Links collided elements in a list, which can degrade to O(n) if many elements hash to the same bucket
   - **Open Addressing**: Finds alternative slots for collided elements, which works well with low load factors but degrades with higher occupancy

Most implementations maintain a low load factor (typically < 0.75) and rehash the table when this threshold is exceeded, ensuring that operations remain close to O(1) in practice.`;
      }
      
      setFeedback({
        ...feedback,
        [questionId]: generatedSolution
      });
      
      setIsGenerating(false);
      
      toast({
        title: "Solution generated",
        description: "AI has created a solution for this question"
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
  const progress = ((activeQuestionIndex + 1) / assignment.questions.length) * 100;

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white">
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-blue-50 to-white">
        <h2 className="text-xl font-semibold flex items-center text-primary mb-2">
          <BookMarked className="mr-2 h-5 w-5" />
          Assignment Solver
        </h2>
        <p className="text-sm text-gray-500">Get help solving assignments and understanding concepts</p>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Question */}
        <div className={`${showResourcePanel ? 'w-2/3' : 'w-full'} flex flex-col overflow-hidden border-r transition-all duration-300`}>
          {/* Assignment Info & Progress */}
          <div className="p-4 border-b bg-gray-50">
            <h3 className="font-medium text-gray-800 mb-2">{assignment.title}</h3>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
              <div 
                className="bg-primary h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <div className="text-gray-500">
                Question {activeQuestionIndex + 1} of {assignment.questions.length}
              </div>
              <div className="flex items-center text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                Due: {new Date(assignment.dueDate).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Question */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-2xl mx-auto">
              {/* Question Text */}
              <div className="mb-8">
                <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-3">
                  Question {activeQuestionIndex + 1} • {activeQuestion.points} points
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">{activeQuestion.text}</h3>
                
                {/* Question type badge */}
                <div className={cn(
                  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                  activeQuestion.type === "essay" && "bg-blue-100 text-blue-800",
                  activeQuestion.type === "problem" && "bg-purple-100 text-purple-800",
                  activeQuestion.type === "code" && "bg-emerald-100 text-emerald-800",
                  activeQuestion.type === "research" && "bg-amber-100 text-amber-800"
                )}>
                  {activeQuestion.type.charAt(0).toUpperCase() + activeQuestion.type.slice(1)} Question
                </div>
              </div>

              {/* Answer Area */}
              <div className="space-y-4">
                <label className="font-medium text-gray-700">Your Answer</label>
                <Textarea 
                  value={answers[activeQuestion.id] || ''}
                  onChange={(e) => handleUpdateAnswer(activeQuestion.id, e.target.value)}
                  placeholder={`Type your ${activeQuestion.type} answer here...`}
                  className="min-h-[200px] bg-white"
                />
              </div>

              {/* AI Feedback (if available) */}
              {feedback[activeQuestion.id] && (
                <div className="mt-8 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                  <h4 className="font-medium text-blue-700 flex items-center mb-2">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    AI Solution
                  </h4>
                  <div className="text-sm text-gray-700 prose max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-sm">
                      {feedback[activeQuestion.id]}
                    </pre>
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
              onClick={() => handleGenerateSolution(activeQuestion.id)}
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
                  Get AI Solution
                </>
              )}
            </Button>
            
            <Button
              variant="outline"
              className="md:hidden bg-white"
              onClick={() => setShowResourcePanel(!showResourcePanel)}
            >
              <Search className="h-4 w-4" />
            </Button>
            
            <Button 
              onClick={handleNextQuestion}
              disabled={activeQuestionIndex === assignment.questions.length - 1}
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Right Panel - Resources */}
        {showResourcePanel && (
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
                AI Study Assistant
              </h3>
              
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start bg-white hover:bg-primary/5"
                  onClick={() => {
                    toast({
                      title: "Analyzing question",
                      description: "AI is breaking down the question structure"
                    });
                  }}
                >
                  <HelpCircle className="h-4 w-4 mr-2 text-blue-500" />
                  Analyze Question
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start bg-white hover:bg-primary/5"
                  onClick={() => {
                    toast({
                      title: "Finding resources",
                      description: "AI is gathering related study materials"
                    });
                  }}
                >
                  <FileText className="h-4 w-4 mr-2 text-purple-500" />
                  Find Resources
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start bg-white hover:bg-primary/5"
                  onClick={() => {
                    toast({
                      title: "Checking your answer",
                      description: "AI is reviewing your current answer"
                    });
                  }}
                >
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  Check My Answer
                </Button>
              </div>
            </div>

            {/* Study Resources */}
            <div className="flex-1 overflow-y-auto p-4">
              <h3 className="font-medium text-gray-700 mb-3">Related Study Resources</h3>
              
              <div className="space-y-3">
                {[
                  {
                    title: "Data Structures: Arrays vs. Linked Lists",
                    type: "Article",
                    source: "CS Academy",
                    relevance: "High"
                  },
                  {
                    title: "Implementing Stacks in Different Languages",
                    type: "Tutorial",
                    source: "ProgrammingHub",
                    relevance: "Medium"
                  },
                  {
                    title: "Hash Tables Explained",
                    type: "Video",
                    source: "CS50",
                    relevance: "High"
                  },
                  {
                    title: "Time Complexity Analysis for Beginners",
                    type: "Guide",
                    source: "AlgoExpert",
                    relevance: "Medium"
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
                      <span className="text-xs text-gray-500">{resource.source}</span>
                      <span className={cn(
                        "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
                        resource.relevance === "High" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      )}>
                        {resource.relevance} relevance
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssignmentSolver;
