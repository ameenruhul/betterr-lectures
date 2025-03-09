
import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StickyNote, Plus, X, Edit, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Note {
  id: number;
  content: string;
  color: string;
  position: { x: number; y: number };
  editing: boolean;
}

const colorOptions = [
  { name: "yellow", value: "bg-amber-100 border-amber-300" },
  { name: "blue", value: "bg-blue-100 border-blue-300" },
  { name: "green", value: "bg-green-100 border-green-300" },
  { name: "purple", value: "bg-purple-100 border-purple-300" },
  { name: "pink", value: "bg-pink-100 border-pink-300" },
];

const StickyNotes = () => {
  const [notes, setNotes] = useState<Note[]>([
    { id: 1, content: "Review chapter 3 for tomorrow's lecture", color: "bg-amber-100 border-amber-300", position: { x: 50, y: 50 }, editing: false },
    { id: 2, content: "Prepare quiz for Friday", color: "bg-blue-100 border-blue-300", position: { x: 250, y: 150 }, editing: false },
    { id: 3, content: "Office hours 2-4pm on Wednesday", color: "bg-green-100 border-green-300", position: { x: 450, y: 100 }, editing: false },
  ]);
  const [selectedColor, setSelectedColor] = useState(colorOptions[0].value);
  
  const addNote = () => {
    const newId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) + 1 : 1;
    // Place the new note in a somewhat random position
    const randomX = 100 + Math.random() * 400;
    const randomY = 100 + Math.random() * 200;
    
    setNotes([...notes, { 
      id: newId, 
      content: "New note", 
      color: selectedColor, 
      position: { x: randomX, y: randomY },
      editing: true
    }]);
  };
  
  const updateNotePosition = (id: number, x: number, y: number) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, position: { x, y } } : note
    ));
  };
  
  const startEditing = (id: number) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, editing: true } : note
    ));
  };
  
  const saveNote = (id: number, content: string) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, content, editing: false } : note
    ));
  };
  
  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };
  
  const actionButtons = (
    <div className="flex items-center space-x-2">
      <div className="flex space-x-1 mr-2">
        {colorOptions.map((color) => (
          <button
            key={color.name}
            className={cn(
              "w-6 h-6 rounded-full border-2",
              color.value,
              selectedColor === color.value && "ring-2 ring-ai-magenta ring-offset-2"
            )}
            onClick={() => setSelectedColor(color.value)}
            aria-label={`Select ${color.name} color`}
          />
        ))}
      </div>
      <Button onClick={addNote} className="bg-red-violet-gradient">
        <Plus className="mr-2 h-4 w-4" />
        Add Note
      </Button>
    </div>
  );
  
  return (
    <PageLayout title="Sticky Notes" actionButtons={actionButtons}>
      <Card className="border-0 shadow-md">
        <CardHeader className="bg-gradient-to-r from-amber-100 to-yellow-100 pb-2">
          <CardTitle className="flex items-center text-xl font-medium text-gray-800">
            <StickyNote className="mr-2 h-6 w-6 text-ai-magenta" />
            Your Sticky Notes Board
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative h-[80vh] bg-gray-50 overflow-hidden">
            <div className="absolute top-4 left-4">
              <Badge variant="outline" className="bg-white">
                {notes.length} notes
              </Badge>
            </div>
            
            {/* Grid background */}
            <div className="absolute inset-0" style={{ 
              backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)',
              backgroundSize: '20px 20px' 
            }}></div>
            
            {notes.map((note) => (
              <div
                key={note.id}
                className={cn(
                  "absolute w-64 p-4 shadow-md rounded cursor-move transition-shadow",
                  note.color
                )}
                style={{ 
                  left: `${note.position.x}px`, 
                  top: `${note.position.y}px`,
                  zIndex: note.editing ? 10 : 1
                }}
                onMouseDown={(e) => {
                  if (!note.editing) {
                    const startX = e.clientX;
                    const startY = e.clientY;
                    const startLeft = note.position.x;
                    const startTop = note.position.y;
                    
                    const onMouseMove = (moveEvent: MouseEvent) => {
                      const newX = startLeft + (moveEvent.clientX - startX);
                      const newY = startTop + (moveEvent.clientY - startY);
                      updateNotePosition(note.id, newX, newY);
                    };
                    
                    const onMouseUp = () => {
                      document.removeEventListener('mousemove', onMouseMove);
                      document.removeEventListener('mouseup', onMouseUp);
                    };
                    
                    document.addEventListener('mousemove', onMouseMove);
                    document.addEventListener('mouseup', onMouseUp);
                  }
                }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
                  <div className="flex space-x-1">
                    {note.editing ? (
                      <button 
                        className="text-green-600 hover:text-green-800 transition-colors"
                        onClick={() => {
                          const textContent = document.getElementById(`note-${note.id}`)?.textContent || "Empty note";
                          saveNote(note.id, textContent);
                        }}
                      >
                        <Check className="h-4 w-4" />
                      </button>
                    ) : (
                      <button 
                        className="text-gray-600 hover:text-gray-800 transition-colors"
                        onClick={() => startEditing(note.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    )}
                    <button 
                      className="text-red-500 hover:text-red-700 transition-colors"
                      onClick={() => deleteNote(note.id)}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div 
                  id={`note-${note.id}`}
                  contentEditable={note.editing}
                  suppressContentEditableWarning={true}
                  className={cn(
                    "focus:outline-none min-h-[80px]",
                    note.editing && "border-b border-gray-300"
                  )}
                >
                  {note.content}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default StickyNotes;
