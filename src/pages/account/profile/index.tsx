
import React, { useEffect, useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PencilLine } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ProfileData {
  name: string;
  email: string;
  institution: string;
  about: string;
}

const ProfilePage = () => {
  const { toast } = useToast();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<ProfileData | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/profile/info`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        if (data.status === 200) {
          setProfileData(data.data);
          setEditedData(data.data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setEditedData(prev => prev ? { ...prev, [field]: value } : null);
  };

  const handleSubmit = async () => {
    if (!editedData) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/profile/info`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedData),
      });

      const data = await response.json();
      if (data.status === 200) {
        setProfileData(editedData);
        setIsEditing(false);
        toast({
          title: "Success",
          description: "Your profile has been updated successfully.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update profile. Please try again.",
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while updating your profile.",
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Update your account details and profile information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage alt="User avatar" src="/placeholder.svg" />
                <AvatarFallback>{profileData?.name?.split(' ').map(n => n[0]).join('') || 'U'}</AvatarFallback>
              </Avatar>
              <Button 
                size="sm" 
                variant="outline" 
                className="absolute bottom-0 right-0 h-8 w-8 p-0 rounded-full"
              >
                <PencilLine className="h-4 w-4" />
                <span className="sr-only">Edit avatar</span>
              </Button>
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  id="fullName" 
                  placeholder="John Doe" 
                  value={editedData?.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  readOnly={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="johndoe@example.com" 
                  value={editedData?.email || ''}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  readOnly={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="institution">Institution</Label>
                <Input 
                  id="institution" 
                  placeholder="University of Technology" 
                  value={editedData?.institution || ''}
                  onChange={(e) => handleInputChange('institution', e.target.value)}
                  readOnly={!isEditing}
                />
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <Label htmlFor="bio">About</Label>
            <textarea 
              id="bio" 
              className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
              placeholder="Tell us about yourself, your teaching experience, and areas of expertise..."
              value={editedData?.about || ''}
              onChange={(e) => handleInputChange('about', e.target.value)}
              readOnly={!isEditing}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-4">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => {
                setIsEditing(false);
                setEditedData(profileData);
              }}>Cancel</Button>
              <Button onClick={handleSubmit}>Save Changes</Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfilePage;
