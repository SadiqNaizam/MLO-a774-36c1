import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import TrackListItem from '@/components/TrackListItem';
import PlaybackBar, { PlaybackBarProps, TrackInfo } from '@/components/layout/PlaybackBar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

// Sample Data
const samplePlaylist = {
  id: 'pl_epic_mix_123',
  title: 'Epic Gaming Mix',
  description: 'High-energy tracks to keep you in the zone. Perfect for long gaming sessions.',
  creator: 'GameMasterX',
  coverArtUrl: 'https://source.unsplash.com/random/400x400?playlist,gaming',
  totalDuration: '2h 15m',
  tracks: [
    { id: 't1', trackNumber: 1, title: 'The Only Thing They Fear Is You', artist: 'Mick Gordon', album: 'DOOM Eternal OST', duration: '4:30', imageUrl: 'https://source.unsplash.com/random/100x100?track,doom', onPlay: () => console.log('Play: The Only Thing They Fear Is You') },
    { id: 't2', trackNumber: 2, title: 'Cyberpunk 2077 Main Theme', artist: 'Marcin Przybyłowicz', album: 'Cyberpunk 2077 OST', duration: '3:55', imageUrl: 'https://source.unsplash.com/random/100x100?track,cyberpunk', onPlay: () => console.log('Play: Cyberpunk 2077 Main Theme') },
    { id: 't3', trackNumber: 3, title: 'Silver Scrapes', artist: 'Riot Games', album: 'League of Legends', duration: '3:10', imageUrl: 'https://source.unsplash.com/random/100x100?track,league', onPlay: () => console.log('Play: Silver Scrapes') },
  ]
};

const defaultPlaybackBarProps: PlaybackBarProps = {
  isPlaying: false,
  progress: 0,
  currentTime: 0,
  volume: 50,
  onPlayPause: () => console.log('PlaylistDetail: Play/Pause clicked'),
  onSkipNext: () => console.log('PlaylistDetail: Skip Next clicked'),
  onSkipPrevious: () => console.log('PlaylistDetail: Skip Previous clicked'),
  onSeek: (value: number[]) => console.log('PlaylistDetail: Seek to', value[0]),
  onVolumeChange: (value: number[]) => console.log('PlaylistDetail: Volume to', value[0]),
};

const PlaylistDetailPage = () => {
  const { playlistId } = useParams<{ playlistId: string }>();
  console.log('PlaylistDetailPage loaded for playlistId:', playlistId);

  // In a real app, fetch playlist data based on playlistId
  const playlist = samplePlaylist; 
  const [currentTrack, setCurrentTrack] = React.useState<TrackInfo | undefined>(undefined);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handlePlayTrack = (track: typeof samplePlaylist.tracks[0]) => {
    const trackToPlay: TrackInfo = {
        id: track.id,
        title: track.title,
        artist: track.artist,
        albumArtUrl: track.imageUrl,
        // Convert duration "M:SS" to seconds
        duration: track.duration.split(':').reduce((acc, time) => (60 * acc) + +time, 0) 
    };
    setCurrentTrack(trackToPlay);
    setIsPlaying(true);
    console.log('Playing track:', track.title);
  };
  
  const handlePlayAll = () => {
    if (playlist.tracks.length > 0) {
        handlePlayTrack(playlist.tracks[0]);
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header 
          userName="Alex Doe" 
          userAvatarUrl="https://source.unsplash.com/random/100x100?avatar,person" 
          onSearchSubmit={(query) => console.log('Search submitted from PlaylistDetail:', query)}
        />
        <main className="flex-1 overflow-y-auto pb-20">
          <ScrollArea className="h-full">
            <div className="p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-8 items-center md:items-end">
                <img 
                  src={playlist.coverArtUrl} 
                  alt={playlist.title} 
                  className="w-48 h-48 md:w-56 md:h-56 rounded-lg object-cover shadow-lg"
                />
                <div className="flex-1 text-center md:text-left">
                  <p className="text-sm uppercase text-muted-foreground">Playlist</p>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold my-2 break-words">{playlist.title}</h1>
                  <p className="text-muted-foreground mb-1">{playlist.description}</p>
                  <p className="text-sm text-muted-foreground">
                    Created by <span className="font-semibold text-foreground">{playlist.creator}</span> • {playlist.tracks.length} songs, {playlist.totalDuration}
                  </p>
                  <Button size="lg" className="mt-4" onClick={handlePlayAll}>
                    <Play className="mr-2 h-5 w-5 fill-current" /> Play All
                  </Button>
                </div>
              </div>

              <div className="space-y-1">
                {playlist.tracks.map((track, index) => (
                  <TrackListItem
                    key={track.id}
                    trackNumber={index + 1}
                    title={track.title}
                    artist={track.artist}
                    album={track.album}
                    duration={track.duration}
                    imageUrl={track.imageUrl}
                    onPlay={() => handlePlayTrack(track)}
                    onOptionsClick={() => console.log('Options for track:', track.title)}
                    isPlaying={currentTrack?.id === track.id && isPlaying}
                    isActive={currentTrack?.id === track.id}
                  />
                ))}
              </div>
            </div>
          </ScrollArea>
        </main>
        <PlaybackBar 
            {...defaultPlaybackBarProps} 
            currentTrack={currentTrack} 
            isPlaying={isPlaying}
            onPlayPause={() => setIsPlaying(!isPlaying)}
        />
      </div>
    </div>
  );
};

export default PlaylistDetailPage;