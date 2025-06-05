import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, MoreHorizontal, Heart, PlusCircle } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"; // Assuming shadcn DropdownMenu

interface SongListItemProps {
  id: string | number;
  title: string;
  artist: string;
  album?: string;
  duration: string; // e.g., "3:45"
  albumArtUrl?: string;
  isPlaying?: boolean;
  isLiked?: boolean;
  onPlayClick: (id: string | number) => void;
  onLikeClick?: (id: string | number) => void;
  onAddToPlaylistClick?: (id: string | number) => void; // Triggers dialog
  // onQueueClick?: (id: string | number) => void;
  // onShareClick?: (id: string | number) => void;
}

const SongListItem: React.FC<SongListItemProps> = ({
  id,
  title,
  artist,
  album,
  duration,
  albumArtUrl,
  isPlaying = false,
  isLiked = false,
  onPlayClick,
  onLikeClick,
  onAddToPlaylistClick,
}) => {
  console.log("Rendering SongListItem:", title);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPlayClick(id);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLikeClick?.(id);
  };
  
  const handleAddToPlaylist = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToPlaylistClick?.(id);
  };

  return (
    <div className="flex items-center p-2 space-x-3 hover:bg-neutral-800 rounded-md group transition-colors w-full">
      {/* Optional: Play button / Index number */}
      <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white w-8 h-8" onClick={handlePlay}>
        {/* In a real scenario, this might show index number and change to Play icon on hover */}
        <Play className={`h-5 w-5 ${isPlaying ? 'text-blue-400' : ''}`} />
      </Button>

      {albumArtUrl && (
        <img src={albumArtUrl} alt={title} className="w-10 h-10 rounded object-cover" />
      )}

      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${isPlaying ? 'text-blue-400' : 'text-white'}`}>{title}</p>
        <p className="text-xs text-neutral-400 truncate">{artist} {album && `• ${album}`}</p>
      </div>

      {/* Optional: Like button (visible on hover) */}
      {onLikeClick && (
        <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity" onClick={handleLike} aria-label="Like song">
          <Heart className={`h-4 w-4 ${isLiked ? 'fill-blue-400 text-blue-400' : ''}`} />
        </Button>
      )}
      
      <span className="text-xs text-neutral-400 hidden sm:block">{duration}</span>

      {/* More options Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity" aria-label="More options">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-neutral-800 border-neutral-700 text-neutral-100">
          {onAddToPlaylistClick && (
            <DropdownMenuItem onClick={handleAddToPlaylist} className="hover:!bg-neutral-700 focus:!bg-neutral-700">
              <PlusCircle className="mr-2 h-4 w-4" /> Add to Playlist
            </DropdownMenuItem>
          )}
          {/* Add other options like Add to Queue, Go to Album, Go to Artist etc. */}
          <DropdownMenuItem className="hover:!bg-neutral-700 focus:!bg-neutral-700">Add to queue</DropdownMenuItem>
          <DropdownMenuSeparator className="bg-neutral-700"/>
          <DropdownMenuItem className="hover:!bg-neutral-700 focus:!bg-neutral-700">Share</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SongListItem;