import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import ContentCard from '@/components/ContentCard';
import MediaPlaybackBar from '@/components/MediaPlaybackBar';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { useNavigate } from 'react-router-dom';

const placeholderSong = {
  title: "Dreaming On",
  artist: "NEFFEX",
  albumArtUrl: "https://source.unsplash.com/random/100x100?albumcover&sig=1",
  duration: 180, // 3 minutes
};

const HomePage: React.FC = () => {
  console.log('HomePage loaded');
  const navigate = useNavigate();

  const handleCardClick = (id: string | number, type: 'playlist' | 'album' | 'artist' | 'genre') => {
    console.log(`Card clicked: ${type} ${id}`);
    if (type === 'playlist' || type === 'album') {
      navigate(`/collection/${id}`);
    }
    // Add navigation for artist/genre if needed
  };

  const handlePlayAction = (id: string | number) => {
    console.log(`Play action for item ID: ${id}`);
    // Logic to start playing the item, e.g., update a global state for MediaPlaybackBar
  };

  const newReleases = [
    { id: 'album1', title: 'Future Sounds', description: 'Electronic Gems', imageUrl: 'https://source.unsplash.com/random/200x200?album,electronic&sig=1', type: 'album' as const },
    { id: 'album2', title: 'Acoustic Mornings', description: 'Coffee Shop Vibes', imageUrl: 'https://source.unsplash.com/random/200x200?album,acoustic&sig=2', type: 'album' as const },
    { id: 'album3', title: 'Synthwave Dreams', description: 'Retro Beats', imageUrl: 'https://source.unsplash.com/random/200x200?album,synthwave&sig=3', type: 'album' as const },
    { id: 'album4', title: 'Lofi Nights', description: 'Chillhop Essentials', imageUrl: 'https://source.unsplash.com/random/200x200?album,lofi&sig=4', type: 'album' as const },
  ];

  const featuredPlaylists = [
    { id: 'playlist1', title: 'Chill Vibes', description: 'Relax and unwind', imageUrl: 'https://source.unsplash.com/random/200x200?playlist,chill&sig=5', type: 'playlist' as const },
    { id: 'playlist2', title: 'Workout Hits', description: 'Energy boosters', imageUrl: 'https://source.unsplash.com/random/200x200?playlist,workout&sig=6', type: 'playlist' as const },
    { id: 'playlist3', title: 'Focus Flow', description: 'Instrumental study', imageUrl: 'https://source.unsplash.com/random/200x200?playlist,focus&sig=7', type: 'playlist' as const },
    { id: 'playlist4', title: 'Indie Discovery', description: 'Fresh new artists', imageUrl: 'https://source.unsplash.com/random/200x200?playlist,indie&sig=8', type: 'playlist' as const },
  ];

  return (
    <div className="flex min-h-screen bg-neutral-950 text-neutral-100">
      <Sidebar />
      <main className="ml-64 flex-1 pb-[90px] overflow-y-auto">
        <div className="p-6 space-y-10">
          <section>
            <Label className="text-2xl font-bold mb-4 block text-white">New Releases</Label>
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex space-x-4 pb-4">
                {newReleases.map(item => (
                  <ContentCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    imageUrl={item.imageUrl}
                    type={item.type}
                    onClick={handleCardClick}
                    onPlayClick={handlePlayAction}
                  />
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </section>

          <section>
            <Label className="text-2xl font-bold mb-4 block text-white">Featured Playlists</Label>
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex space-x-4 pb-4">
                {featuredPlaylists.map(item => (
                  <ContentCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    imageUrl={item.imageUrl}
                    type={item.type}
                    onClick={handleCardClick}
                    onPlayClick={handlePlayAction}
                  />
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </section>

          {/* Add more sections like 'Recently Played', 'Recommended', 'Browse Genres' as needed */}
        </div>
      </main>
      <MediaPlaybackBar currentSong={placeholderSong} />
    </div>
  );
};

export default HomePage;