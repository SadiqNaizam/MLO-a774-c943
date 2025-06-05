import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import MediaPlaybackBar from '@/components/MediaPlaybackBar';
import ThemeSwitcherControl from '@/components/ThemeSwitcherControl';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// For a real form, you'd use react-hook-form and zod
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const placeholderSongForBar = {
  title: "Profile Tunes",
  artist: "User Settings FM",
  albumArtUrl: "https://source.unsplash.com/random/100x100?albumcover&sig=5",
  duration: 150,
};

// Basic schema for demonstration if using react-hook-form
// const profileFormSchema = z.object({
//   username: z.string().min(2, "Username must be at least 2 characters."),
//   email: z.string().email("Invalid email address."),
// });

const UserProfilePage: React.FC = () => {
  console.log('UserProfilePage loaded');

  // Placeholder form state (without react-hook-form for simplicity as per instructions)
  const [username, setUsername] = React.useState("DoraemonFan123");
  const [email, setEmail] = React.useState("doraemon@example.com");

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile updated with:", { username, email });
    // Add API call logic here
  };

  const handleLogout = () => {
    console.log("User logged out");
    // Add logout logic (clear token, redirect to login)
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <main className="ml-64 flex-1 pb-[90px] overflow-y-auto">
        <div className="p-6 md:p-10 max-w-3xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-foreground">User Profile</h1>

          <Card className="bg-card border-border text-card-foreground">
            <CardHeader>
              <CardTitle className="text-card-foreground">Profile Information</CardTitle>
              <CardDescription className="text-muted-foreground">View and update your account details.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="https://source.unsplash.com/random/100x100?avatar,user&sig=profile" alt="@username" />
                    <AvatarFallback>DF</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" className="border-border hover:bg-accent/10 text-accent-foreground">Change Avatar</Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username" className="text-foreground">Username</Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-input border-border text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-input border-border text-foreground"
                  />
                </div>
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">Save Changes</Button>
              </form>
            </CardContent>
          </Card>

          <Card className="bg-card border-border text-card-foreground">
            <CardHeader>
              <CardTitle className="text-card-foreground">Preferences</CardTitle>
              <CardDescription className="text-muted-foreground">Manage your application settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-foreground">Theme</Label>
                <ThemeSwitcherControl />
              </div>
              {/* Add more preferences here */}
            </CardContent>
          </Card>
          
          <Card className="bg-card border-border text-card-foreground">
            <CardHeader>
              <CardTitle className="text-card-foreground">Account Actions</CardTitle>
            </CardHeader>
            <CardContent>
                <Button variant="destructive" onClick={handleLogout} className="w-full sm:w-auto">
                    Log Out
                </Button>
                 <p className="text-xs text-muted-foreground mt-4">
                    For more information, visit our <a href="/terms" className="underline hover:text-primary">Terms of Service</a> or <a href="/help" className="underline hover:text-primary">Help Center</a>.
                </p>
            </CardContent>
          </Card>

        </div>
      </main>
      <MediaPlaybackBar currentSong={placeholderSongForBar} />
    </div>
  );
};

export default UserProfilePage;