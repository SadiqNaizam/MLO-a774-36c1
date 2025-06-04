import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Maximize2, Shuffle, Repeat } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrackInfo {
  id: string;
  title: string;
  artist: string;
  albumArtUrl?: string;
  duration: number; // in seconds
}

interface PlaybackBarProps {
  currentTrack?: TrackInfo;
  isPlaying: boolean;
  progress: number; // 0-100
  currentTime: number; // in seconds
  volume: number; // 0-100
  isMuted?: boolean;
  isShuffle?: boolean;
  repeatMode?: 'off' | 'one' | 'all';
  onPlayPause: () => void;
  onSkipNext: () => void;
  onSkipPrevious: () => void;
  onSeek: (value: number[]) => void; // Slider gives [value]
  onVolumeChange: (value: number[]) => void; // Slider gives [value]
  onToggleMute?: () => void;
  onToggleShuffle?: () => void;
  onToggleRepeat?: () => void;
  onToggleFullScreen?: () => void; // For a potential full-screen player view
  className?: string;
}

const formatTime = (timeInSeconds: number): string => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const PlaybackBar: React.FC<PlaybackBarProps> = ({
  currentTrack,
  isPlaying,
  progress,
  currentTime,
  volume,
  isMuted,
  isShuffle,
  repeatMode = 'off',
  onPlayPause,
  onSkipNext,
  onSkipPrevious,
  onSeek,
  onVolumeChange,
  onToggleMute,
  onToggleShuffle,
  onToggleRepeat,
  onToggleFullScreen,
  className,
}) => {
  console.log("Rendering PlaybackBar. Track:", currentTrack?.title, "Playing:", isPlaying);

  if (!currentTrack) {
    // Optionally render a minimal bar or nothing if no track
    return (
        <footer className={cn("fixed bottom-0 left-0 right-0 z-50 h-20 bg-background/95 backdrop-blur border-t border-border/40 flex items-center justify-center", className)}>
            <p className="text-muted-foreground text-sm">No track selected.</p>
        </footer>
    );
  }

  return (
    <footer className={cn("fixed bottom-0 left-0 right-0 z-50 h-20 bg-background/95 backdrop-blur border-t border-border/40", className)}>
      <div className="container flex h-full max-w-screen-2xl items-center justify-between px-4 md:px-8">
        {/* Left: Track Info */}
        <div className="flex items-center gap-3 w-1/4 min-w-0">
          {currentTrack.albumArtUrl && (
            <AspectRatio ratio={1 / 1} className="w-12 h-12">
              <img
                src={currentTrack.albumArtUrl}
                alt={currentTrack.title}
                className="rounded-md object-cover w-full h-full"
              />
            </AspectRatio>
          )}
          <div className="flex flex-col min-w-0">
            <p className="text-sm font-medium truncate">{currentTrack.title}</p>
            <p className="text-xs text-muted-foreground truncate">{currentTrack.artist}</p>
          </div>
        </div>

        {/* Center: Playback Controls & Progress */}
        <div className="flex flex-col items-center justify-center gap-1 flex-grow w-1/2 max-w-xl">
          <div className="flex items-center gap-2">
            {onToggleShuffle && (
                 <Button variant="ghost" size="icon" onClick={onToggleShuffle} className={cn(isShuffle && "text-primary")}>
                    <Shuffle className="h-4 w-4" />
                </Button>
            )}
            <Button variant="ghost" size="icon" onClick={onSkipPrevious}>
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button variant="default" size="icon" onClick={onPlayPause} className="h-10 w-10 rounded-full">
              {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={onSkipNext}>
              <SkipForward className="h-5 w-5" />
            </Button>
            {onToggleRepeat && (
                 <Button variant="ghost" size="icon" onClick={onToggleRepeat} className={cn(repeatMode !== 'off' && "text-primary")}>
                    <Repeat className={cn("h-4 w-4", repeatMode === 'one' && "/* style for repeat one if needed */")} />
                     {/* TODO: Icon for repeat one (e.g., Repeat1) if available or a badge */}
                </Button>
            )}
          </div>
          <div className="flex items-center gap-2 w-full">
            <span className="text-xs text-muted-foreground">{formatTime(currentTime)}</span>
            <Slider
              defaultValue={[0]}
              value={[progress]}
              max={100}
              step={1}
              onValueChange={onSeek}
              className="flex-grow"
              aria-label="Track progress"
            />
            <span className="text-xs text-muted-foreground">{formatTime(currentTrack.duration)}</span>
          </div>
        </div>

        {/* Right: Volume & Other Controls */}
        <div className="flex items-center gap-2 w-1/4 justify-end">
           {onToggleMute && (
             <Button variant="ghost" size="icon" onClick={onToggleMute}>
                {isMuted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
           )}
          <Slider
            defaultValue={[50]}
            value={[isMuted ? 0 : volume]}
            max={100}
            step={1}
            onValueChange={onVolumeChange}
            className="w-24 hidden sm:block"
            aria-label="Volume control"
          />
          {onToggleFullScreen && (
             <Button variant="ghost" size="icon" onClick={onToggleFullScreen}>
                <Maximize2 className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </footer>
  );
};

export default PlaybackBar;