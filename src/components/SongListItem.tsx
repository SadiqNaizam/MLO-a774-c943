import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, MoreHorizontal, Heart, PlusCircle } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

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
    <div className="flex items-center p-2 space-x-3 hover:bg-accent/10 rounded-md group transition-colors w-full">
      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground w-8 h-8" onClick={handlePlay}>
        <Play className={`h-5 w-5 ${isPlaying ? 'text-primary' : ''}`} />
      </Button>

      {albumArtUrl && (
        <img src={albumArtUrl} alt={title} className="w-10 h-10 rounded object-cover bg-muted" />
      )}

      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium truncate ${isPlaying ? 'text-primary' : 'text-foreground'}`}>{title}</p>
        <p className="text-xs text-muted-foreground truncate">{artist} {album && `• ${album}`}</p>
      </div>

      {onLikeClick && (
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity" onClick={handleLike} aria-label="Like song">
          <Heart className={`h-4 w-4 ${isLiked ? 'fill-primary text-primary' : ''}`} />
        </Button>
      )}
      
      <span className="text-xs text-muted-foreground hidden sm:block">{duration}</span>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity" aria-label="More options">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-popover border-border text-popover-foreground">
          {onAddToPlaylistClick && (
            <DropdownMenuItem onClick={handleAddToPlaylist} className="hover:!bg-accent/20 focus:!bg-accent/20">
              <PlusCircle className="mr-2 h-4 w-4" /> Add to Playlist
            </DropdownMenuItem>
          )}
          <DropdownMenuItem className="hover:!bg-accent/20 focus:!bg-accent/20">Add to queue</DropdownMenuItem>
          <DropdownMenuSeparator className="bg-border"/>
          <DropdownMenuItem className="hover:!bg-accent/20 focus:!bg-accent/20">Share</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SongListItem;