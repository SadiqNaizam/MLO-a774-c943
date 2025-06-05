import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import ContentCard from '@/components/ContentCard';
import MediaPlaybackBar from '@/components/MediaPlaybackBar';
import SongListItem from '@/components/SongListItem';
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search as SearchIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const placeholderSong = {
  title: "Searching...",
  artist: "The System",
  albumArtUrl: "https://source.unsplash.com/random/100x100?albumcover&sig=2",
  duration: 210,
};

const SearchPage: React.FC = () => {
  console.log('SearchPage loaded');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handlePlaySong = (id: string | number) => console.log(`Play song ID: ${id}`);
  const handleLikeSong = (id: string | number) => console.log(`Like song ID: ${id}`);
  const handleAddToPlaylist = (id: string | number) => console.log(`Add song ID ${id} to playlist`);
  
  const handleCardClick = (id: string | number, type: 'playlist' | 'album' | 'artist' | 'genre') => {
    console.log(`Card clicked: ${type} ${id}`);
    if (type === 'playlist' || type === 'album') {
      navigate(`/collection/${id}`);
    }
  };

  // Placeholder search results
  const songsResults = [
    { id: 'song1', title: 'Found It!', artist: 'The Searchers', album: 'Hits Vol. 1', duration: '3:15', albumArtUrl: 'https://source.unsplash.com/random/50x50?music,song&sig=s1' },
    { id: 'song2', title: 'Another Result', artist: 'Query Crew', album: 'Data Beats', duration: '4:02', albumArtUrl: 'https://source.unsplash.com/random/50x50?music,song&sig=s2' },
  ];
  const albumsResults = [
    { id: 'albumSearch1', title: 'Queried Grooves', description: 'Found Albums', imageUrl: 'https://source.unsplash.com/random/200x200?album&sig=as1', type: 'album' as const },
  ];
  const artistsResults = [
     { id: 'artistSearch1', title: 'The Compilers', description: 'Matching Artist', imageUrl: 'https://source.unsplash.com/random/200x200?artist&sig=ats1', type: 'artist' as const },
  ];
   const playlistsResults = [
    { id: 'playlistSearch1', title: 'Search Party Mix', description: 'Relevant Playlist', imageUrl: 'https://source.unsplash.com/random/200x200?playlist&sig=ps1', type: 'playlist' as const },
  ];


  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <main className="ml-64 flex-1 pb-[90px] overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="What do you want to listen to?"
              className="w-full pl-10 pr-4 py-2 rounded-full bg-input border-border focus:ring-ring text-foreground"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {searchTerm && (
            <Tabs defaultValue="songs" className="w-full">
              <TabsList className="bg-muted">
                <TabsTrigger value="songs" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-foreground">Songs</TabsTrigger>
                <TabsTrigger value="albums" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-foreground">Albums</TabsTrigger>
                <TabsTrigger value="artists" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-foreground">Artists</TabsTrigger>
                <TabsTrigger value="playlists" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-foreground">Playlists</TabsTrigger>
              </TabsList>
              <ScrollArea className="h-[calc(100vh-250px)] mt-4"> {/* Adjust height as needed */}
                <TabsContent value="songs">
                  <div className="space-y-2">
                    {songsResults.map(song => (
                      <SongListItem
                        key={song.id}
                        {...song}
                        onPlayClick={handlePlaySong}
                        onLikeClick={handleLikeSong}
                        onAddToPlaylistClick={handleAddToPlaylist}
                      />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="albums">
                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {albumsResults.map(album => (
                      <ContentCard key={album.id} {...album} onClick={handleCardClick} onPlayClick={() => handlePlaySong(album.id)} />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="artists">
                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {artistsResults.map(artist => (
                      <ContentCard key={artist.id} {...artist} onClick={handleCardClick} />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="playlists">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {playlistsResults.map(playlist => (
                      <ContentCard key={playlist.id} {...playlist} onClick={handleCardClick} onPlayClick={() => handlePlaySong(playlist.id)} />
                    ))}\
                  </div>
                </TabsContent>
              </ScrollArea>
            </Tabs>
          )}
          {!searchTerm && (
            <div className="text-center text-muted-foreground pt-10">
              <p>Search for your favorite songs, artists, albums, or playlists.</p>
            </div>
          )}
        </div>
      </main>
      <MediaPlaybackBar currentSong={placeholderSong} />
    </div>
  );
};

export default SearchPage;