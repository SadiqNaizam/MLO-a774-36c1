import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, MoreHorizontal, Music2, CheckCircle, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


interface TrackListItemProps {
  trackNumber?: number | string;
  title: string;
  artist: string;
  album?: string;
  duration: string; // e.g., "3:45"
  imageUrl?: string; // Optional album art for the track
  isPlaying?: boolean;
  isActive?: boolean; // Is this the currently loaded track, playing or paused
  isPlayable?: boolean; // Can this track be played (e.g., not region locked)
  onPlay: () => void;
  onPause?: () => void; // If pause control is directly on item
  onOptionsClick?: () => void; // For a context menu
  className?: string;
}

const TrackListItem: React.FC<TrackListItemProps> = ({
  trackNumber,
  title,
  artist,
  album,
  duration,
  imageUrl,
  isPlaying,
  isActive,
  isPlayable = true,
  onPlay,
  onPause,
  onOptionsClick,
  className,
}) => {
  console.log("Rendering TrackListItem:", title, "Playing:", isPlaying, "Active:", isActive);

  const handlePlayPauseClick = () => {
    if (isPlaying && onPause) {
      onPause();
    } else if (isPlayable) {
      onPlay();
    }
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-2 md:p-3 rounded-md hover:bg-muted/50 transition-colors group",
        isActive && "bg-muted/80",
        !isPlayable && "opacity-60 cursor-not-allowed",
        className
      )}
      role="button"
      tabIndex={isPlayable ? 0 : -1}
      onClick={isPlayable && !isActive ? onPlay : undefined} // Play if not active, otherwise let play button handle
      onKeyDown={(e) => { if(e.key === 'Enter' && isPlayable && !isActive) onPlay()}}
    >
      <div className="w-6 text-center text-muted-foreground text-sm hidden sm:block">
        {isActive && isPlaying ? (
          <Volume2 className="h-4 w-4 mx-auto text-primary" />
        ) : (
          trackNumber || <Music2 className="h-4 w-4 mx-auto" />
        )}
      </div>

      {imageUrl && (
        <img src={imageUrl} alt={album || title} className="h-10 w-10 rounded object-cover" />
      )}

      <div className="flex-1 min-w-0">
        <p className={cn("font-medium truncate", isActive ? "text-primary" : "text-foreground")}>{title}</p>
        <p className="text-xs text-muted-foreground truncate">{artist} {album && `• ${album}`}</p>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {isPlayable && (
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 focus:opacity-100",
              isActive && "opacity-100" // Always show for active track
            )}
            onClick={(e) => {
                e.stopPropagation(); // Prevent row click if button is clicked
                handlePlayPauseClick();
            }}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current" />}
          </Button>
        )}

        <span className="text-sm text-muted-foreground w-10 text-right hidden sm:inline-block">{duration}</span>

        {onOptionsClick && isPlayable && (
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 focus:opacity-100"
                onClick={(e) => {
                    e.stopPropagation();
                    // onOptionsClick(); // Or let dropdown handle it
                }}
                aria-label="More options"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={(e) => {e.stopPropagation(); console.log("Add to queue")}}>Add to Queue</DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => {e.stopPropagation(); console.log("Add to playlist")}}>Add to Playlist</DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => {e.stopPropagation(); console.log("View artist")}}>View Artist</DropdownMenuItem>
                {/* Add more options */}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default TrackListItem;