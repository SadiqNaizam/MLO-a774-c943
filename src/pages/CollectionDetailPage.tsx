import React from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import MediaPlaybackBar from '@/components/MediaPlaybackBar';
import SongListItem from '@/components/SongListItem';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Play, Shuffle, MoreVertical, Heart, ListPlus } from 'lucide-react';

const placeholderSongForBar = {
  title: "Collection Item",
  artist: "Various Artists",
  albumArtUrl: "https://source.unsplash.com/random/100x100?albumcover&sig=4",
  duration: 190,
};

const CollectionDetailPage: React.FC = () => {
  const { id: collectionId } = useParams<{ id: string }>();
  console.log(`CollectionDetailPage loaded for ID: ${collectionId}`);

  // Placeholder data - in a real app, fetch based on collectionId
  const collectionDetails = {
    id: collectionId || 'defaultId',
    type: 'playlist', // or 'album'
    title: `Awesome ${collectionId?.startsWith('playlist') ? 'Playlist' : 'Album'} ${collectionId}`,
    creator: 'User Name or Artist',
    description: 'A collection of great tracks to enjoy. Perfect for focusing or just chilling out.',
    coverArtUrl: 'https://source.unsplash.com/random/400x400?music,collection&sig=' + collectionId,
    duration: '2h 30min',
    trackCount: 10,
  };

  const tracks = Array.from({ length: 10 }, (_, i) => ({
    id: `track${i + 1}`,
    title: `Song Title ${i + 1}`,
    artist: `Artist Name ${i % 3 + 1}`,
    album: collectionDetails.type === 'album' ? collectionDetails.title : `Album Name ${i % 2 + 1}`,
    duration: `${Math.floor(Math.random() * 3) + 2}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
    albumArtUrl: `https://source.unsplash.com/random/50x50?song&sig=t${i}`,
    isLiked: i % 4 === 0,
  }));

  const handlePlaySong = (id: string | number) => console.log(`Play song ID: ${id} from collection ${collectionId}`);
  const handleLikeSong = (id: string | number) => console.log(`Like song ID: ${id} from collection ${collectionId}`);
  const handleAddToPlaylist = (id: string | number) => console.log(`Add song ID ${id} to playlist from collection ${collectionId}`);
  const handlePlayAll = () => console.log(`Play all tracks from ${collectionId}`);
  const handleShufflePlay = () => console.log(`Shuffle play tracks from ${collectionId}`);

  return (
    <div className="flex min-h-screen bg-neutral-950 text-neutral-100">
      <Sidebar />
      <main className="ml-64 flex-1 pb-[90px] overflow-y-auto">
        <ScrollArea className="h-full">
          <div className="p-6">
            {/* Header Section */}
            <header className="flex flex-col md:flex-row items-start md:items-end gap-6 mb-8">
              <div className="w-48 h-48 md:w-60 md:h-60 flex-shrink-0 rounded-md overflow-hidden shadow-lg">
                <AspectRatio ratio={1 / 1}>
                  <img src={collectionDetails.coverArtUrl} alt={collectionDetails.title} className="object-cover w-full h-full" />
                </AspectRatio>
              </div>
              <div className="flex flex-col justify-end">
                <Label className="text-xs uppercase text-neutral-400">{collectionDetails.type}</Label>
                <h1 className="text-4xl md:text-6xl font-bold text-white break-words">{collectionDetails.title}</h1>
                <p className="text-neutral-300 mt-2">{collectionDetails.description}</p>
                <p className="text-sm text-neutral-400 mt-1">
                  Created by <span className="text-white font-medium">{collectionDetails.creator}</span> • {collectionDetails.trackCount} songs, {collectionDetails.duration}
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <Button onClick={handlePlayAll} size="lg" className="bg-blue-500 hover:bg-blue-400 text-white rounded-full px-6">
                    <Play className="mr-2 h-5 w-5 fill-white" /> Play
                  </Button>
                  <Button onClick={handleShufflePlay} variant="outline" size="icon" className="text-neutral-300 border-neutral-600 hover:bg-neutral-700 hover:text-white">
                    <Shuffle className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="text-neutral-300 border-neutral-600 hover:bg-neutral-700 hover:text-white">
                    <Heart className="h-5 w-5" /> {/* Add to Library / Like Collection */}
                  </Button>
                   <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon" className="text-neutral-300 border-neutral-600 hover:bg-neutral-700 hover:text-white">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-neutral-800 border-neutral-700 text-neutral-100">
                      <DropdownMenuItem className="hover:!bg-neutral-700">Add to queue</DropdownMenuItem>
                      <DropdownMenuItem className="hover:!bg-neutral-700">Add to another playlist</DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-neutral-700" />
                      <DropdownMenuItem className="hover:!bg-neutral-700">Report</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </header>

            {/* Tracks List Section */}
            <section>
              <Table className="w-full">
                <TableHeader className="border-b border-neutral-700">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="w-10 text-neutral-400">#</TableHead>
                    <TableHead className="text-neutral-400">Title</TableHead>
                    <TableHead className="text-neutral-400 hidden md:table-cell">Album</TableHead>
                    <TableHead className="text-neutral-400 text-right">Duration</TableHead>
                    <TableHead className="w-16 text-center text-neutral-400">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tracks.map((track, index) => (
                    <TableRow key={track.id} className="border-none hover:bg-neutral-800/50 group">
                      <TableCell className="text-neutral-400">{index + 1}</TableCell>
                      <TableCell>
                        <SongListItem
                            id={track.id}
                            title={track.title}
                            artist={track.artist}
                            albumArtUrl={track.albumArtUrl}
                            duration={track.duration} // SongListItem uses duration string, here its for display
                            isLiked={track.isLiked}
                            onPlayClick={() => handlePlaySong(track.id)}
                            onLikeClick={() => handleLikeSong(track.id)}
                            onAddToPlaylistClick={() => handleAddToPlaylist(track.id)}
                         />
                      </TableCell>
                      <TableCell className="text-neutral-300 hidden md:table-cell">{track.album}</TableCell>
                      <TableCell className="text-neutral-400 text-right">{track.duration}</TableCell>
                       <TableCell className="text-center opacity-0 group-hover:opacity-100 transition-opacity">
                         {/* Simplified SongListItem already has its own dropdown, so this cell might be redundant if SongListItem is full-width */}
                         {/* Could add actions specific to this table row if needed */}
                       </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </section>
          </div>
        </ScrollArea>
      </main>
      <MediaPlaybackBar currentSong={placeholderSongForBar} />
    </div>
  );
};

export default CollectionDetailPage;