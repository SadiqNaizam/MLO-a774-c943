import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import ContentCard from '@/components/ContentCard';
import MediaPlaybackBar from '@/components/MediaPlaybackBar';
import SongListItem from '@/components/SongListItem';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const placeholderSong = {
  title: "Library Groove",
  artist: "Your Collection",
  albumArtUrl: "https://source.unsplash.com/random/100x100?albumcover&sig=3",
  duration: 240,
};

const LibraryPage: React.FC = () => {
  console.log('LibraryPage loaded');
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const navigate = useNavigate();

  const handlePlaySong = (id: string | number) => console.log(`Play song ID: ${id}`);
  const handleLikeSong = (id: string | number) => console.log(`Like song ID: ${id}`);
  const handleAddToPlaylistDialog = (id: string | number) => console.log(`Trigger add to playlist dialog for song ID ${id}`);

  const handleCardClick = (id: string | number, type: 'playlist' | 'album' | 'artist' | 'genre') => {
    console.log(`Card clicked: ${type} ${id}`);
    if (type === 'playlist' || type === 'album') {
      navigate(`/collection/${id}`);
    }
  };

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      console.log(`Creating new playlist: ${newPlaylistName}`);
      // Add logic to actually create playlist
      setNewPlaylistName('');
      // Potentially close dialog via a ref or another state
    }
  };

  const userPlaylists = [
    { id: 'userPlaylist1', title: 'My Awesome Mix', description: 'Curated by Me', imageUrl: 'https://source.unsplash.com/random/200x200?playlist,user&sig=up1', type: 'playlist' as const },
    { id: 'userPlaylist2', title: 'Road Trip Anthems', description: 'For the long drive', imageUrl: 'https://source.unsplash.com/random/200x200?playlist,roadtrip&sig=up2', type: 'playlist' as const },
  ];

  const likedSongs = [
    { id: 'likedSong1', title: 'Favorite Tune', artist: 'Heart Beats', album: 'Love It Loud', duration: '3:30', albumArtUrl: 'https://source.unsplash.com/random/50x50?music,love&sig=ls1', isLiked: true },
    { id: 'likedSong2', title: 'Can\'t Stop Listening', artist: 'Repeat Offender', album: 'On Loop', duration: '2:55', albumArtUrl: 'https://source.unsplash.com/random/50x50?music,repeat&sig=ls2', isLiked: true },
  ];
  
  const savedAlbums = [
    { id: 'savedAlbum1', title: 'Classic Rock Hits', description: 'Various Artists', imageUrl: 'https://source.unsplash.com/random/200x200?album,rock&sig=sa1', type: 'album' as const },
  ];

  const followedArtists = [
     { id: 'followedArtist1', title: 'The Headliners', description: 'Rock Band', imageUrl: 'https://source.unsplash.com/random/200x200?artist,band&sig=fa1', type: 'artist' as const },
  ];


  return (
    <div className="flex min-h-screen bg-neutral-950 text-neutral-100">
      <Sidebar />
      <main className="ml-64 flex-1 pb-[90px] overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">Your Library</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="bg-blue-500 hover:bg-blue-400 text-white border-blue-500">
                  <PlusCircle className="mr-2 h-4 w-4" /> Create Playlist
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-neutral-800 border-neutral-700 text-white">
                <DialogHeader>
                  <DialogTitle>Create New Playlist</DialogTitle>
                  <DialogDescription>Give your new playlist a name.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="playlist-name" className="text-right">Name</Label>
                    <Input
                      id="playlist-name"
                      value={newPlaylistName}
                      onChange={(e) => setNewPlaylistName(e.target.value)}
                      className="col-span-3 bg-neutral-700 border-neutral-600"
                      placeholder="My Awesome Playlist"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                     <Button type="button" variant="secondary" className="hover:bg-neutral-600">Cancel</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button type="submit" onClick={handleCreatePlaylist} className="bg-blue-500 hover:bg-blue-400">Create</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Tabs defaultValue="playlists" className="w-full">
            <TabsList className="bg-neutral-800">
              <TabsTrigger value="playlists" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white">Playlists</TabsTrigger>
              <TabsTrigger value="songs" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white">Liked Songs</TabsTrigger>
              <TabsTrigger value="albums" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white">Albums</TabsTrigger>
              <TabsTrigger value="artists" className="data-[state=active]:bg-neutral-700 data-[state=active]:text-white">Artists</TabsTrigger>
            </TabsList>
            <ScrollArea className="h-[calc(100vh-280px)] mt-4"> {/* Adjust height */}
              <TabsContent value="playlists">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {userPlaylists.map(playlist => (
                    <ContentCard key={playlist.id} {...playlist} onClick={handleCardClick} onPlayClick={() => handlePlaySong(playlist.id)}/>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="songs">
                <div className="space-y-1">
                  {likedSongs.map(song => (
                    <SongListItem
                      key={song.id}
                      {...song}
                      onPlayClick={handlePlaySong}
                      onLikeClick={handleLikeSong}
                      onAddToPlaylistClick={handleAddToPlaylistDialog}
                    />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="albums">
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {savedAlbums.map(album => (
                      <ContentCard key={album.id} {...album} onClick={handleCardClick} onPlayClick={() => handlePlaySong(album.id)}/>
                    ))}
                  </div>
              </TabsContent>
              <TabsContent value="artists">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {followedArtists.map(artist => (
                      <ContentCard key={artist.id} {...artist} onClick={handleCardClick} />
                    ))}
                  </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </div>
      </main>
      <MediaPlaybackBar currentSong={placeholderSong} />
    </div>
  );
};

export default LibraryPage;