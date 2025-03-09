import React, { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FileText, 
  Presentation, 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  List, 
  ListOrdered,
  Image as ImageIcon,
  Table as TableIcon,
  Type,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Layout,
  PenTool,
  Palette
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TextEditorProps {
  content: string;
  setContent: (content: string) => void;
  documentTitle: string;
  setDocumentTitle: (title: string) => void;
}

interface Slide {
  id: string;
  content: string;
  layout: 'title' | 'content' | 'two-column' | 'image' | 'blank';
  notes: string;
  background: string;
}

const TextEditor = ({
  content,
  setContent,
  documentTitle,
  setDocumentTitle,
}: TextEditorProps) => {
  const { toast } = useToast();
  const [documentMode, setDocumentMode] = useState<'edit' | 'preview'>('edit');
  const [selectedFont, setSelectedFont] = useState("Arial");
  const [selectedFontSize, setSelectedFontSize] = useState("12");
  const [textFormatting, setTextFormatting] = useState({
    bold: false,
    italic: false,
    underline: false,
    align: 'left',
    list: false,
    orderedList: false
  });
  
  const documentEditorRef = useRef<HTMLTextAreaElement>(null);
  
  const [slides, setSlides] = useState<Slide[]>(() => {
    if (!content) return [{ id: Date.now().toString(), content: "", layout: 'title', notes: "", background: "#ffffff" }];
    
    return content.split('\n\n').map((slideContent, index) => ({
      id: `slide-${index}-${Date.now()}`,
      content: slideContent,
      layout: index === 0 ? 'title' : 'content',
      notes: "",
      background: "#ffffff"
    }));
  });
  
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(0);
  
  useEffect(() => {
    const newContent = slides.map(slide => slide.content).join('\n\n');
    setContent(newContent);
  }, [slides, setContent]);
  
  useEffect(() => {
    if (documentMode === 'edit') {
      const newSlides = content.split('\n\n').map((slideContent, index) => {
        const existingSlide = slides[index];
        return {
          id: existingSlide?.id || `slide-${index}-${Date.now()}`,
          content: slideContent,
          layout: existingSlide?.layout || (index === 0 ? 'title' : 'content'),
          notes: existingSlide?.notes || "",
          background: existingSlide?.background || "#ffffff"
        };
      });
      
      if (JSON.stringify(newSlides.map(s => s.content)) !== JSON.stringify(slides.map(s => s.content))) {
        setSlides(newSlides);
      }
    }
  }, [content, documentMode]);
  
  const applyFormatting = (format: string) => {
    if (!documentEditorRef.current) return;
    
    const textarea = documentEditorRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let newText = content;
    let newPosition = end;
    
    switch (format) {
      case 'bold':
        newText = content.substring(0, start) + `**${selectedText}**` + content.substring(end);
        newPosition = end + 4;
        setTextFormatting(prev => ({ ...prev, bold: !prev.bold }));
        break;
      case 'italic':
        newText = content.substring(0, start) + `*${selectedText}*` + content.substring(end);
        newPosition = end + 2;
        setTextFormatting(prev => ({ ...prev, italic: !prev.italic }));
        break;
      case 'underline':
        newText = content.substring(0, start) + `__${selectedText}__` + content.substring(end);
        newPosition = end + 4;
        setTextFormatting(prev => ({ ...prev, underline: !prev.underline }));
        break;
      case 'align-left':
        setTextFormatting(prev => ({ ...prev, align: 'left' }));
        break;
      case 'align-center':
        setTextFormatting(prev => ({ ...prev, align: 'center' }));
        break;
      case 'align-right':
        setTextFormatting(prev => ({ ...prev, align: 'right' }));
        break;
      case 'list':
        if (selectedText) {
          const listItems = selectedText.split('\n').map(item => `• ${item}`).join('\n');
          newText = content.substring(0, start) + listItems + content.substring(end);
        } else {
          newText = content.substring(0, start) + '• ' + content.substring(end);
        }
        setTextFormatting(prev => ({ ...prev, list: !prev.list }));
        break;
      case 'ordered-list':
        if (selectedText) {
          const listItems = selectedText.split('\n').map((item, i) => `${i + 1}. ${item}`).join('\n');
          newText = content.substring(0, start) + listItems + content.substring(end);
        } else {
          newText = content.substring(0, start) + '1. ' + content.substring(end);
        }
        setTextFormatting(prev => ({ ...prev, orderedList: !prev.orderedList }));
        break;
      case 'image':
        newText = content.substring(0, start) + '![Image description](image-url)' + content.substring(end);
        break;
      case 'table':
        newText = content.substring(0, start) + 
          '\n| Header 1 | Header 2 | Header 3 |\n' +
          '|----------|----------|----------|\n' +
          '| Cell 1   | Cell 2   | Cell 3   |\n' +
          '| Cell 4   | Cell 5   | Cell 6   |\n' + 
          content.substring(end);
        break;
    }
    
    setContent(newText);
    
    setTimeout(() => {
      if (documentEditorRef.current) {
        documentEditorRef.current.focus();
        documentEditorRef.current.setSelectionRange(newPosition, newPosition);
      }
    }, 0);
  };
  
  const handleFontChange = (font: string) => {
    setSelectedFont(font);
    toast({
      title: "Font changed",
      description: `Font changed to ${font}`,
      duration: 1500,
    });
  };
  
  const handleFontSizeChange = (size: string) => {
    setSelectedFontSize(size);
    toast({
      title: "Font size changed",
      description: `Font size changed to ${size}pt`,
      duration: 1500,
    });
  };
  
  const addSlide = () => {
    const newSlide: Slide = {
      id: `slide-${Date.now()}`,
      content: "New slide",
      layout: 'content',
      notes: "",
      background: "#ffffff"
    };
    
    const newSlides = [...slides];
    newSlides.splice(selectedSlideIndex + 1, 0, newSlide);
    setSlides(newSlides);
    setSelectedSlideIndex(selectedSlideIndex + 1);
    
    toast({
      title: "Slide added",
      description: "New slide added successfully",
      duration: 1500,
    });
  };
  
  const deleteSlide = (index: number) => {
    if (slides.length <= 1) {
      toast({
        title: "Cannot delete",
        description: "You need at least one slide in your presentation",
        duration: 2000,
      });
      return;
    }
    
    const newSlides = slides.filter((_, i) => i !== index);
    setSlides(newSlides);
    
    if (index <= selectedSlideIndex) {
      setSelectedSlideIndex(Math.max(0, selectedSlideIndex - 1));
    }
    
    toast({
      title: "Slide deleted",
      description: "Slide deleted successfully",
      duration: 1500,
    });
  };
  
  const moveSlide = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || 
        (direction === 'down' && index === slides.length - 1)) {
      return;
    }
    
    const newSlides = [...slides];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    [newSlides[index], newSlides[newIndex]] = [newSlides[newIndex], newSlides[index]];
    
    setSlides(newSlides);
    setSelectedSlideIndex(newIndex);
  };
  
  const updateSlideContent = (index: number, newContent: string) => {
    const newSlides = [...slides];
    newSlides[index] = { ...newSlides[index], content: newContent };
    setSlides(newSlides);
  };
  
  const updateSlideLayout = (index: number, layout: Slide['layout']) => {
    const newSlides = [...slides];
    newSlides[index] = { ...newSlides[index], layout };
    setSlides(newSlides);
    
    toast({
      title: "Layout changed",
      description: `Slide layout changed to ${layout}`,
      duration: 1500,
    });
  };
  
  const updateSlideBackground = (index: number, color: string) => {
    const newSlides = [...slides];
    newSlides[index] = { ...newSlides[index], background: color };
    setSlides(newSlides);
  };
  
  const updateSlideNotes = (index: number, notes: string) => {
    const newSlides = [...slides];
    newSlides[index] = { ...newSlides[index], notes };
    setSlides(newSlides);
  };
  
  const getSlideContentStyle = (slide: Slide) => {
    switch (slide.layout) {
      case 'title':
        return "text-center flex flex-col justify-center items-center";
      case 'content':
        return "flex flex-col justify-start";
      case 'two-column':
        return "grid grid-cols-2 gap-4";
      case 'image':
        return "flex flex-col items-center justify-center";
      case 'blank':
        return "";
      default:
        return "";
    }
  };
  
  const exportPresentation = () => {
    toast({
      title: "Export feature",
      description: "Export to PowerPoint functionality would be implemented here",
      duration: 2000,
    });
  };
  
  const exportDocument = () => {
    toast({
      title: "Export feature",
      description: "Export to Word/PDF functionality would be implemented here",
      duration: 2000,
    });
  };

  return (
    <div className="flex-1 p-6 bg-gray-50 overflow-auto">
      <Tabs defaultValue="document" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 border-b bg-white rounded-t-xl shadow-sm mb-0 flex-1 mr-4">
            <Input
              type="text"
              placeholder="Untitled document"
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
              className="text-lg font-medium bg-transparent border-none focus:outline-none w-full hover:bg-gray-50 transition-colors p-2 rounded-md"
            />
          </div>
          
          <TabsList className="bg-white border shadow-sm">
            <TabsTrigger value="document" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Document</span>
            </TabsTrigger>
            <TabsTrigger value="slides" className="flex items-center gap-2">
              <Presentation className="h-4 w-4" />
              <span className="hidden sm:inline">Slides</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="document" className="mt-0">
          <Card className="max-w-[850px] mx-auto rounded-t-none shadow-md">
            <div className="border-b p-2 flex flex-wrap gap-1 bg-white sticky top-0 z-10">
              <div className="flex items-center gap-2 mr-4">
                <Select value={selectedFont} onValueChange={handleFontChange}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Font" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Arial">Arial</SelectItem>
                    <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                    <SelectItem value="Calibri">Calibri</SelectItem>
                    <SelectItem value="Georgia">Georgia</SelectItem>
                    <SelectItem value="Verdana">Verdana</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={selectedFontSize} onValueChange={handleFontSizeChange}>
                  <SelectTrigger className="w-[80px]">
                    <SelectValue placeholder="Size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="12">12</SelectItem>
                    <SelectItem value="14">14</SelectItem>
                    <SelectItem value="16">16</SelectItem>
                    <SelectItem value="18">18</SelectItem>
                    <SelectItem value="24">24</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center border-l border-gray-200 pl-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`px-2 ${textFormatting.bold ? 'bg-gray-100' : ''}`}
                  onClick={() => applyFormatting('bold')}
                >
                  <Bold className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`px-2 ${textFormatting.italic ? 'bg-gray-100' : ''}`}
                  onClick={() => applyFormatting('italic')}
                >
                  <Italic className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`px-2 ${textFormatting.underline ? 'bg-gray-100' : ''}`}
                  onClick={() => applyFormatting('underline')}
                >
                  <Underline className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center border-l border-gray-200 pl-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`px-2 ${textFormatting.align === 'left' ? 'bg-gray-100' : ''}`}
                  onClick={() => applyFormatting('align-left')}
                >
                  <AlignLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`px-2 ${textFormatting.align === 'center' ? 'bg-gray-100' : ''}`}
                  onClick={() => applyFormatting('align-center')}
                >
                  <AlignCenter className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`px-2 ${textFormatting.align === 'right' ? 'bg-gray-100' : ''}`}
                  onClick={() => applyFormatting('align-right')}
                >
                  <AlignRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center border-l border-gray-200 pl-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`px-2 ${textFormatting.list ? 'bg-gray-100' : ''}`}
                  onClick={() => applyFormatting('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`px-2 ${textFormatting.orderedList ? 'bg-gray-100' : ''}`}
                  onClick={() => applyFormatting('ordered-list')}
                >
                  <ListOrdered className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center border-l border-gray-200 pl-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="px-2"
                  onClick={() => applyFormatting('image')}
                >
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="px-2"
                  onClick={() => applyFormatting('table')}
                >
                  <TableIcon className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex-1"></div>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={exportDocument}
                className="ml-auto"
              >
                Export
              </Button>
            </div>
            
            <div className="h-[1100px] p-[60px] bg-white overflow-y-auto">
              <Textarea
                ref={documentEditorRef}
                className={`w-full h-full resize-none border-none focus:outline-none focus:ring-0 bg-transparent p-0 font-${selectedFont} text-${selectedFontSize}`}
                placeholder="Type or paste your content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{ 
                  fontFamily: selectedFont, 
                  fontSize: `${selectedFontSize}pt`,
                  textAlign: textFormatting.align as any
                }}
              />
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="slides" className="mt-0">
          <div className="max-w-[850px] mx-auto">
            <div className="bg-white rounded-t-md shadow-sm border p-2 mb-4 flex flex-wrap gap-2 items-center">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={addSlide}
                className="flex items-center gap-1"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Slide
              </Button>
              
              {slides.length > 1 && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => deleteSlide(selectedSlideIndex)}
                  className="flex items-center gap-1 text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </Button>
              )}
              
              <div className="h-5 border-l border-gray-200 mx-1"></div>
              
              <Select 
                value={slides[selectedSlideIndex]?.layout} 
                onValueChange={(val) => updateSlideLayout(selectedSlideIndex, val as Slide['layout'])}
              >
                <SelectTrigger className="w-[130px] h-9">
                  <Layout className="h-3.5 w-3.5 mr-2" />
                  <SelectValue placeholder="Layout" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">Title Slide</SelectItem>
                  <SelectItem value="content">Content</SelectItem>
                  <SelectItem value="two-column">Two Columns</SelectItem>
                  <SelectItem value="image">Image Centered</SelectItem>
                  <SelectItem value="blank">Blank</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="h-5 border-l border-gray-200 mx-1"></div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => moveSlide(selectedSlideIndex, 'up')}
                disabled={selectedSlideIndex === 0}
                className="px-2 py-1"
              >
                <MoveUp className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => moveSlide(selectedSlideIndex, 'down')}
                disabled={selectedSlideIndex === slides.length - 1}
                className="px-2 py-1"
              >
                <MoveDown className="h-4 w-4" />
              </Button>
              
              <div className="h-5 border-l border-gray-200 mx-1"></div>
              
              <div className="flex items-center gap-1">
                <Palette className="h-3.5 w-3.5 text-gray-500" />
                <input 
                  type="color" 
                  value={slides[selectedSlideIndex]?.background}
                  onChange={(e) => updateSlideBackground(selectedSlideIndex, e.target.value)}
                  className="w-6 h-6 rounded cursor-pointer border-0"
                />
              </div>
              
              <div className="flex-1"></div>
              
              <Button 
                variant="default" 
                size="sm" 
                onClick={exportPresentation}
              >
                Export Presentation
              </Button>
            </div>
            
            <div className="flex gap-4">
              <div className="w-32 flex-shrink-0">
                <div className="space-y-2 overflow-y-auto max-h-[600px] pr-2">
                  {slides.map((slide, index) => (
                    <div 
                      key={slide.id}
                      className={`cursor-pointer border-2 rounded-md overflow-hidden aspect-[16/9] flex items-center justify-center text-xs p-1 ${
                        index === selectedSlideIndex 
                          ? 'border-blue-500 shadow-sm' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedSlideIndex(index)}
                      style={{ backgroundColor: slide.background }}
                    >
                      <div className="overflow-hidden w-full h-full flex items-center justify-center">
                        Slide {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex-1">
                {slides.length > 0 && (
                  <div className="space-y-4">
                    <Card 
                      className="aspect-[16/9] shadow-md overflow-hidden" 
                      style={{ backgroundColor: slides[selectedSlideIndex]?.background }}
                    >
                      <div className={`h-full p-8 flex items-center justify-center`}>
                        <Textarea
                          className={`w-full h-full resize-none border-none focus:outline-none focus:ring-0 bg-transparent ${
                            getSlideContentStyle(slides[selectedSlideIndex])
                          }`}
                          placeholder="Edit this slide..."
                          value={slides[selectedSlideIndex]?.content}
                          onChange={(e) => updateSlideContent(selectedSlideIndex, e.target.value)}
                        />
                      </div>
                    </Card>
                    
                    <div className="bg-white border rounded-md p-3">
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <PenTool className="h-3.5 w-3.5 mr-1.5" />
                        Speaker Notes
                      </div>
                      <Textarea
                        className="w-full resize-none border-none bg-gray-50 focus:ring-1 min-h-24"
                        placeholder="Add notes for this slide (only visible to you during presentation)"
                        value={slides[selectedSlideIndex]?.notes}
                        onChange={(e) => updateSlideNotes(selectedSlideIndex, e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TextEditor;
