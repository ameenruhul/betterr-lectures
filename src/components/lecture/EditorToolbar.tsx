
import React from "react";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { 
  Save, 
  Download, 
  FileUp, 
  Presentation,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Image,
  Link,
  Table,
  Palette,
  Highlighter,
  Undo,
  Redo,
  IndentDecrease,
  IndentIncrease,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EditorToolbarProps {
  onSave: () => void;
  onDownloadPDF: () => void;
  onCreatePPTX: () => void;
}

const EditorToolbar = ({ onSave, onDownloadPDF, onCreatePPTX }: EditorToolbarProps) => {
  return (
    <div className="border-b bg-white shadow-sm">
      {/* File and Edit Options */}
      <div className="p-2 border-b flex items-center space-x-2">
        <div className="flex space-x-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="hover:bg-gray-100 transition-colors"
                  onClick={onSave}
                >
                  <Save className="h-4 w-4 mr-1" />
                  Save
                </Button>
              </TooltipTrigger>
              <TooltipContent>Save document</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Button variant="ghost" size="sm" className="hover:bg-gray-100 transition-colors">
            Edit
          </Button>
          <Button variant="ghost" size="sm" className="hover:bg-gray-100 transition-colors">
            View
          </Button>
          <Button variant="ghost" size="sm" className="hover:bg-gray-100 transition-colors">
            Insert
          </Button>
          <Button variant="ghost" size="sm" className="hover:bg-gray-100 transition-colors">
            Format
          </Button>
        </div>
        
        <div className="flex-1" />
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={onDownloadPDF}
          className="hover:bg-gray-50 transition-all"
        >
          <Download className="mr-2 h-4 w-4 text-primary" />
          PDF
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onCreatePPTX}
          className="hover:bg-gray-50 transition-all"
        >
          <Presentation className="mr-2 h-4 w-4 text-primary" />
          PPTX
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          className="hover:bg-gray-50 transition-all"
        >
          <FileUp className="mr-2 h-4 w-4 text-primary" />
          Share
        </Button>
      </div>

      {/* Formatting Toolbar */}
      <div className="p-2 flex flex-col gap-2 bg-gray-50">
        {/* Row 1: Undo/Redo, Font, Size */}
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <Button variant="ghost" size="sm" className="rounded-md bg-white hover:bg-gray-100 transition-all">
              <Undo className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="rounded-md bg-white hover:bg-gray-100 transition-all">
              <Redo className="h-4 w-4" />
            </Button>
          </div>
          <div className="w-px h-4 bg-gray-300 mx-2" />
          <select className="text-sm border rounded px-2 py-1 bg-white w-40">
            <option>Arial</option>
            <option>Times New Roman</option>
            <option>Calibri</option>
            <option>Georgia</option>
            <option>Helvetica</option>
          </select>
          <select className="text-sm border rounded w-20 px-2 py-1 bg-white">
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
            <option>14</option>
            <option>16</option>
            <option>18</option>
            <option>24</option>
            <option>36</option>
          </select>
        </div>

        {/* Row 2: Text Formatting */}
        <div className="flex items-center space-x-1">
          <ToggleGroup type="multiple" className="bg-white p-1 rounded-md">
            <ToggleGroupItem value="bold" aria-label="Toggle bold" className="rounded-sm data-[state=on]:bg-gray-100">
              <Bold className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle italic" className="rounded-sm data-[state=on]:bg-gray-100">
              <Italic className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Toggle underline" className="rounded-sm data-[state=on]:bg-gray-100">
              <Underline className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="color" aria-label="Select color" className="rounded-sm data-[state=on]:bg-gray-100">
              <Palette className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="highlight" aria-label="Highlight text" className="rounded-sm data-[state=on]:bg-gray-100">
              <Highlighter className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
          
          <div className="w-px h-4 bg-gray-300 mx-2" />
          
          <ToggleGroup type="single" className="bg-white p-1 rounded-md">
            <ToggleGroupItem value="left" aria-label="Align left" className="rounded-sm data-[state=on]:bg-gray-100">
              <AlignLeft className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Align center" className="rounded-sm data-[state=on]:bg-gray-100">
              <AlignCenter className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Align right" className="rounded-sm data-[state=on]:bg-gray-100">
              <AlignRight className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
          
          <div className="w-px h-4 bg-gray-300 mx-2" />
          
          <ToggleGroup type="multiple" className="bg-white p-1 rounded-md">
            <ToggleGroupItem value="list" aria-label="Bullet list" className="rounded-sm data-[state=on]:bg-gray-100">
              <List className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="orderedList" aria-label="Numbered list" className="rounded-sm data-[state=on]:bg-gray-100">
              <ListOrdered className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="indent-decrease" aria-label="Decrease indent" className="rounded-sm data-[state=on]:bg-gray-100">
              <IndentDecrease className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="indent-increase" aria-label="Increase indent" className="rounded-sm data-[state=on]:bg-gray-100">
              <IndentIncrease className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
          
          <div className="w-px h-4 bg-gray-300 mx-2" />
          
          <ToggleGroup type="multiple" className="bg-white p-1 rounded-md">
            <ToggleGroupItem value="image" aria-label="Insert image" className="rounded-sm data-[state=on]:bg-gray-100">
              <Image className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="table" aria-label="Insert table" className="rounded-sm data-[state=on]:bg-gray-100">
              <Table className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="link" aria-label="Insert link" className="rounded-sm data-[state=on]:bg-gray-100">
              <Link className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
    </div>
  );
};

export default EditorToolbar;
