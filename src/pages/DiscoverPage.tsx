import React from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import MediaGridCard from '@/components/MediaGridCard';
import PlaybackBar, { PlaybackBarProps } from '@/components/layout/PlaybackBar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Placeholder data for DiscoverPage
const newReleases = [
  { id: 'album_nr1', title: 'Future Echoes', subtitle: 'Electronic Waves', type: 'album' as const, imageUrl: 'https://source.unsplash.com/random/300x300?album,future' },
  { id: 'album_nr2', title: 'Acoustic Mornings', subtitle: 'Stripped Back Sessions', type: 'album' as const, imageUrl: 'https://source.unsplash.com/random/300x300?album,acoustic' },
];
const popularGenres = [
  { id: 'genre_pop', title: 'Pop Hits', subtitle: 'Catchy & Current', type: 'genre' as const, imageUrl: 'https://source.unsplash.com/random/300x300?genre,pop' },
  { id: 'genre_rock', title: 'Rock Anthems', subtitle: 'Classic & Modern', type: 'genre' as const, imageUrl: 'https://source.unsplash.com/random/300x300?genre,rock' },
];
const moodPlaylists = [
  { id: 'mood_chill', title: 'Chill Vibes', subtitle: 'Relax and Unwind', type: 'playlist' as const, imageUrl: 'https://source.unsplash.com/random/300x300?playlist,chill' },
  { id: 'mood_focus', title: 'Deep Focus', subtitle: 'Instrumental Concentration', type: 'playlist' as const, imageUrl: 'https://source.unsplash.com/random/300x300?playlist,focus' },
];

const defaultPlaybackBarProps: PlaybackBarProps = {
  isPlaying: false,
  progress: 0,
  currentTime: 0,
  volume: 50,
  onPlayPause: () => console.log('Discover: Play/Pause clicked'),
  onSkipNext: () => console.log('Discover: Skip Next clicked'),
  onSkipPrevious: () => console.log('Discover: Skip Previous clicked'),
  onSeek: (value: number[]) => console.log('Discover: Seek to', value[0]),
  onVolumeChange: (value: number[]) => console.log('Discover: Volume to', value[0]),
};

const DiscoverPage = () => {
  console.log('DiscoverPage loaded');
  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header 
          userName="Alex Doe" 
          userAvatarUrl="https://source.unsplash.com/random/100x100?avatar,person" 
          onSearchSubmit={(query) => console.log('Search submitted from Discover:', query)}
        />
        <main className="flex-1 overflow-y-auto pb-20">
          <ScrollArea className="h-full px-4 py-6 lg:px-8">
            <h1 className="text-3xl font-semibold mb-6">Discover</h1>
            <Tabs defaultValue="new-releases" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="new-releases">New Releases</TabsTrigger>
                <TabsTrigger value="genres">Popular Genres</TabsTrigger>
                <TabsTrigger value="moods">Moods & Playlists</TabsTrigger>
              </TabsList>
              <TabsContent value="new-releases">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {newReleases.map(item => <MediaGridCard key={item.id} {...item} onClick={(id, type) => console.log(`Clicked ${type} ${id}`)} />)}
                </div>
              </TabsContent>
              <TabsContent value="genres">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {popularGenres.map(item => <MediaGridCard key={item.id} {...item} onClick={(id, type) => console.log(`Clicked ${type} ${id}`)} />)}
                </div>
              </TabsContent>
              <TabsContent value="moods">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {moodPlaylists.map(item => <MediaGridCard key={item.id} {...item} onClick={(id, type) => console.log(`Clicked ${type} ${id}`)} />)}
                </div>
              </TabsContent>
            </Tabs>
          </ScrollArea>
        </main>
        <PlaybackBar {...defaultPlaybackBarProps} />
      </div>
    </div>
  );
};

export default DiscoverPage;