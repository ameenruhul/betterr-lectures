
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Globe, Plus } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const CalendarConnector = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [calendarUrl, setCalendarUrl] = useState("");
  const [calendarType, setCalendarType] = useState<string | null>(null);

  const handleConnect = () => {
    if (calendarUrl && calendarType) {
      console.log(`Connecting to ${calendarType} calendar: ${calendarUrl}`);
      setIsConnected(true);
    }
  };

  return (
    <div className="mb-2 mt-4">
      {isConnected ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge variant="gradient" className="px-3 py-1">
              <Calendar className="w-4 h-4 mr-1" />
              {calendarType} Connected
            </Badge>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsConnected(false)} 
            className="text-sm text-gray-500"
          >
            Disconnect
          </Button>
        </div>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full border-dashed border-gray-300 text-gray-600">
              <Plus className="w-4 h-4 mr-2" />
              Connect to Calendar
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Connect Your Calendar</DialogTitle>
              <DialogDescription>
                Link your preferred calendar to keep track of all your teaching activities in one place.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={calendarType === "Google" ? "default" : "outline"}
                  className={`flex items-center justify-center ${calendarType === "Google" ? "bg-red-violet-gradient" : ""}`}
                  onClick={() => setCalendarType("Google")}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Google Calendar
                </Button>
                <Button
                  variant={calendarType === "Outlook" ? "default" : "outline"} 
                  className={`flex items-center justify-center ${calendarType === "Outlook" ? "bg-red-violet-gradient" : ""}`}
                  onClick={() => setCalendarType("Outlook")}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Outlook Calendar
                </Button>
                <Button
                  variant={calendarType === "Apple" ? "default" : "outline"}
                  className={`flex items-center justify-center ${calendarType === "Apple" ? "bg-red-violet-gradient" : ""}`}
                  onClick={() => setCalendarType("Apple")}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Apple Calendar
                </Button>
                <Button
                  variant={calendarType === "Other" ? "default" : "outline"}
                  className={`flex items-center justify-center ${calendarType === "Other" ? "bg-red-violet-gradient" : ""}`}
                  onClick={() => setCalendarType("Other")}
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Other Calendar
                </Button>
              </div>
              
              {calendarType && (
                <div className="space-y-2">
                  <Label htmlFor="calendarUrl">Calendar URL or API Key</Label>
                  <Input 
                    id="calendarUrl" 
                    value={calendarUrl} 
                    onChange={(e) => setCalendarUrl(e.target.value)}
                    placeholder={`Enter your ${calendarType} calendar URL...`}
                  />
                  <p className="text-xs text-gray-500">
                    {calendarType === "Google" && "Paste your Google Calendar sharing URL or API key"}
                    {calendarType === "Outlook" && "Paste your Outlook Calendar sharing URL or API key"}
                    {calendarType === "Apple" && "Paste your Apple Calendar sharing URL or API key"}
                    {calendarType === "Other" && "Paste your Calendar iCal URL or API endpoint"}
                  </p>
                </div>
              )}
            </div>
            
            <Button 
              onClick={handleConnect} 
              disabled={!calendarUrl || !calendarType}
              className="bg-red-violet-gradient"
            >
              Connect Calendar
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CalendarConnector;
