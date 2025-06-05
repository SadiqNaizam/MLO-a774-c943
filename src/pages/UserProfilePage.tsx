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
    <div className="flex min-h-screen bg-neutral-950 text-neutral-100">
      <Sidebar />
      <main className="ml-64 flex-1 pb-[90px] overflow-y-auto">
        <div className="p-6 md:p-10 max-w-3xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-white">User Profile</h1>

          <Card className="bg-neutral-900 border-neutral-700">
            <CardHeader>
              <CardTitle className="text-white">Profile Information</CardTitle>
              <CardDescription className="text-neutral-400">View and update your account details.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="https://source.unsplash.com/random/100x100?avatar,user&sig=profile" alt="@username" />
                    <AvatarFallback>DF</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" className="border-neutral-600 hover:bg-neutral-700">Change Avatar</Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username" className="text-neutral-300">Username</Label>
                  <Input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-neutral-800 border-neutral-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-neutral-300">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-neutral-800 border-neutral-700 text-white"
                  />
                </div>
                <Button type="submit" className="bg-blue-500 hover:bg-blue-400 text-white">Save Changes</Button>
              </form>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900 border-neutral-700">
            <CardHeader>
              <CardTitle className="text-white">Preferences</CardTitle>
              <CardDescription className="text-neutral-400">Manage your application settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-neutral-300">Theme</Label>
                <ThemeSwitcherControl />
              </div>
              {/* Add more preferences here */}
            </CardContent>
          </Card>
          
          <Card className="bg-neutral-900 border-neutral-700">
            <CardHeader>
              <CardTitle className="text-white">Account Actions</CardTitle>
            </CardHeader>
            <CardContent>
                <Button variant="destructive" onClick={handleLogout} className="w-full sm:w-auto">
                    Log Out
                </Button>
                 <p className="text-xs text-neutral-500 mt-4">
                    For more information, visit our <a href="/terms" className="underline hover:text-blue-400">Terms of Service</a> or <a href="/help" className="underline hover:text-blue-400">Help Center</a>.
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