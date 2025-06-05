import React, { useState, useRef } from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Maximize2 } from 'lucide-react';

interface SongInfo {
  title: string;
  artist: string;
  albumArtUrl?: string;
  duration: number; // in seconds
}

interface MediaPlaybackBarProps {
  currentSong?: SongInfo;
  // Add props for actual playback control functions: onPlay, onPause, onSeek, onNext, onPrev, onVolumeChange etc.
}

const MediaPlaybackBar: React.FC<MediaPlaybackBarProps> = ({ currentSong }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.75);
  const [isMuted, setIsMuted] = useState(false);
  // const audioRef = useRef<HTMLAudioElement>(null); // Would be used with an actual audio element

  console.log("Rendering MediaPlaybackBar. Current song:", currentSong?.title);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    console.log(isPlaying ? "Pausing" : "Playing");
    // if (audioRef.current) { isPlaying ? audioRef.current.pause() : audioRef.current.play(); }
  };

  const handleSeek = (value: number[]) => {
    setCurrentTime(value[0]);
    console.log("Seeking to:", value[0]);
    // if (audioRef.current) { audioRef.current.currentTime = value[0]; }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    console.log("Volume changed to:", newVolume);
    // if (audioRef.current) { audioRef.current.volume = newVolume; audioRef.current.muted = newVolume === 0; }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // if (audioRef.current) { audioRef.current.muted = !isMuted; }
    if (!isMuted && volume === 0) setVolume(0.5); // Unmute to a default volume if current is 0
    console.log(isMuted ? "Unmuting" : "Muting");
  };
  
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  if (!currentSong) {
    // Optionally render a simplified bar or nothing if no song is playing
    return (
      <footer className="fixed bottom-0 left-0 right-0 bg-neutral-800 border-t border-neutral-700 p-3 h-[90px] flex items-center justify-center text-neutral-400 z-50">
        No song playing.
      </footer>
    );
  }

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-neutral-800 border-t border-neutral-700 p-3 h-[90px] grid grid-cols-3 items-center gap-4 z-50">
      {/* Left: Song Info */}
      <div className="flex items-center space-x-3">
        {currentSong.albumArtUrl && (
          <div className="w-14 h-14 rounded overflow-hidden">
            <AspectRatio ratio={1/1}>
              <img src={currentSong.albumArtUrl} alt={currentSong.title} className="object-cover w-full h-full" />
            </AspectRatio>
          </div>
        )}
        <div>
          <p className="text-sm font-medium text-white truncate">{currentSong.title || "Song Title"}</p>
          <p className="text-xs text-neutral-400 truncate">{currentSong.artist || "Artist Name"}</p>
        </div>
      </div>

      {/* Center: Playback Controls & Seek Bar */}
      <div className="flex flex-col items-center">
        <div className="flex items-center space-x-3 mb-1">
          <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white">
            <SkipBack className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="bg-white text-black hover:bg-neutral-200 rounded-full w-8 h-8" onClick={togglePlayPause}>
            {isPlaying ? <Pause className="h-4 w-4 fill-black" /> : <Play className="h-4 w-4 fill-black" />}
          </Button>
          <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white">
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>
        <div className="w-full max-w-md flex items-center space-x-2">
            <span className="text-xs text-neutral-400">{formatTime(currentTime)}</span>
            <Slider
                value={[currentTime]}
                max={currentSong.duration || 300} // Default duration if not provided
                step={1}
                onValueChange={handleSeek}
                className="w-full [&>span:first-child]:h-1 [&>span:first-child>span]:h-1 [&>span:first-child>span]:bg-blue-400" // Doraemon blue accent
            />
            <span className="text-xs text-neutral-400">{formatTime(currentSong.duration || 300)}</span>
        </div>
      </div>

      {/* Right: Volume & Other Controls */}
      <div className="flex items-center justify-end space-x-3">
        <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white" onClick={toggleMute}>
          {isMuted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </Button>
        <Slider
          value={[isMuted ? 0 : volume]}
          max={1}
          step={0.01}
          onValueChange={handleVolumeChange}
          className="w-24 [&>span:first-child]:h-1 [&>span:first-child>span]:h-1 [&>span:first-child>span]:bg-blue-400" // Doraemon blue accent
        />
         {/* Placeholder for other controls like Fullscreen, Queue etc. */}
        {/* <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white">
          <Maximize2 className="h-5 w-5" />
        </Button> */}
      </div>
      {/* <audio ref={audioRef} src={currentSong.audioUrl} onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)} onLoadedMetadata={(e) => { if(!currentSong.duration) setDuration(e.currentTarget.duration)}} /> */}
    </footer>
  );
};

export default MediaPlaybackBar;