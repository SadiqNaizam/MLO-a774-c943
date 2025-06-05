import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ContentCardProps {
  id: string | number;
  title: string;
  description?: string;
  imageUrl?: string;
  type: 'playlist' | 'album' | 'artist' | 'genre'; // To differentiate card types
  onPlayClick?: (id: string | number) => void;
  onClick?: (id: string | number, type: ContentCardProps['type']) => void; // For navigation
}

const ContentCard: React.FC<ContentCardProps> = ({
  id,
  title,
  description,
  imageUrl,
  type,
  onPlayClick,
  onClick,
}) => {
  console.log("Rendering ContentCard:", title, type);

  const handleCardClick = () => {
    if (onClick) {
      onClick(id, type);
    } else {
      console.log("Card clicked, no onClick handler provided for:", title);
    }
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when play button is clicked
    if (onPlayClick) {
      onPlayClick(id);
    } else {
      console.log("Play clicked, no onPlayClick handler for:", title);
    }
  };

  return (
    <Card
      className="w-full max-w-[200px] bg-neutral-800 border-neutral-700 text-neutral-100 rounded-lg overflow-hidden shadow-lg hover:bg-neutral-700 transition-colors group cursor-pointer"
      onClick={handleCardClick}
    >
      <CardHeader className="p-0 relative">
        <AspectRatio ratio={1 / 1} className="bg-neutral-700">
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </AspectRatio>
        {onPlayClick && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-2 right-2 bg-blue-500 hover:bg-blue-400 text-white rounded-full h-10 w-10 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handlePlayClick}
            aria-label={`Play ${title}`}
          >
            <PlayCircle className="h-6 w-6" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="p-3">
        <CardTitle className="text-sm font-semibold truncate text-white">{title}</CardTitle>
        {description && <CardDescription className="text-xs text-neutral-400 truncate">{description}</CardDescription>}
      </CardContent>
      {/* CardFooter can be used for additional actions or info if needed */}
    </Card>
  );
};

export default ContentCard;