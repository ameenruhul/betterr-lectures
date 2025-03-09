
import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { BellRing, Check, Plus, Trash } from "lucide-react";
import { cn } from "@/lib/utils";

interface Reminder {
  id: number;
  title: string;
  date: Date;
  completed: boolean;
}

const Reminders = () => {
  const [reminders, setReminders] = useState<Reminder[]>([
    { id: 1, title: "Grade midterm papers", date: new Date(2023, 10, 15), completed: false },
    { id: 2, title: "Faculty meeting", date: new Date(2023, 10, 16), completed: false },
    { id: 3, title: "Submit course outline", date: new Date(2023, 10, 18), completed: true },
  ]);
  const [newReminder, setNewReminder] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  const toggleReminderStatus = (id: number) => {
    setReminders(reminders.map(reminder => 
      reminder.id === id ? { ...reminder, completed: !reminder.completed } : reminder
    ));
  };
  
  const addReminder = () => {
    if (newReminder && selectedDate) {
      const newId = reminders.length > 0 ? Math.max(...reminders.map(r => r.id)) + 1 : 1;
      setReminders([...reminders, { id: newId, title: newReminder, date: selectedDate, completed: false }]);
      setNewReminder("");
    }
  };
  
  const deleteReminder = (id: number) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };
  
  const actionButtons = (
    <Button onClick={addReminder} className="bg-red-violet-gradient" disabled={!newReminder || !selectedDate}>
      <Plus className="mr-2 h-4 w-4" />
      Add Reminder
    </Button>
  );
  
  return (
    <PageLayout title="Reminders" actionButtons={actionButtons}>
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="border-0 shadow-md">
          <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100 pb-2">
            <CardTitle className="flex items-center text-xl font-medium text-gray-800">
              <BellRing className="mr-2 h-6 w-6 text-ai-magenta" />
              Teacher Reminders
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex space-x-4 mb-6">
              <div className="flex-1">
                <Label htmlFor="reminder" className="text-gray-700">Reminder</Label>
                <Input
                  id="reminder"
                  placeholder="Enter a new reminder"
                  value={newReminder}
                  onChange={(e) => setNewReminder(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-gray-700">Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[240px] mt-1 justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium text-gray-700 mb-2">Your Reminders</h3>
              {reminders.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No reminders yet. Add your first reminder above.</p>
              ) : (
                <div className="space-y-3">
                  {reminders.map((reminder) => (
                    <div 
                      key={reminder.id} 
                      className={`p-4 rounded-md border flex justify-between items-center ${
                        reminder.completed ? 'bg-gray-50 border-gray-200' : 'bg-amber-50 border-amber-200'
                      }`}
                    >
                      <div className={reminder.completed ? 'text-gray-500' : ''}>
                        <p className={`font-medium ${reminder.completed ? 'line-through' : ''}`}>{reminder.title}</p>
                        <p className="text-sm">{format(reminder.date, "PPP")}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => toggleReminderStatus(reminder.id)}
                          className={`min-w-20 ${
                            reminder.completed ? 'border-gray-200' : 'border-amber-200'
                          }`}
                        >
                          {reminder.completed ? (
                            <>
                              <Check className="h-4 w-4 mr-1 text-green-500" />
                              Completed
                            </>
                          ) : 'Mark Done'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteReminder(reminder.id)}
                          className="text-red-500"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Reminders;
