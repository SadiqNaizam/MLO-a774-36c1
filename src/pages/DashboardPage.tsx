import React from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import MediaGridCard from '@/components/MediaGridCard';
import PlaybackBar, { PlaybackBarProps } from '@/components/layout/PlaybackBar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar'; // For Header, though Header handles its own Avatar.

// Placeholder data for Dashboard
const recentlyPlayedItems = [
  { id: 'album1', title: 'Midnight Grooves', subtitle: 'Chillhop Essentials', type: 'album' as const, imageUrl: 'https://source.unsplash.com/random/300x300?album,chillhop' },
  { id: 'playlist2', title: 'Workout Beats', subtitle: 'High Energy Hits', type: 'playlist' as const, imageUrl: 'https://source.unsplash.com/random/300x300?playlist,gym' },
];

const newForYouItems = [
  { id: 'artist3', title: 'Luna Bloom', subtitle: 'Indie Pop Artist', type: 'artist' as const, imageUrl: 'https://source.unsplash.com/random/300x300?musician,female' },
  { id: 'album4', title: 'Neon Dreams', subtitle: 'Synthwave Journey', type: 'album' as const, imageUrl: 'https://source.unsplash.com/random/300x300?album,synthwave' },
  { id: 'playlist5', title: 'Focus Flow', subtitle: 'Instrumental Concentration', type: 'playlist' as const, imageUrl: 'https://source.unsplash.com/random/300x300?playlist,study' },
];

const topMixes = [
    { id: 'mix1', title: 'Daily Mix 1', subtitle: 'Based on your listening', type: 'playlist' as const, imageUrl: 'https://source.unsplash.com/random/300x300?mix,abstract1' },
    { id: 'mix2', title: 'Pop Rising', subtitle: 'The latest pop hits', type: 'playlist' as const, imageUrl: 'https://source.unsplash.com/random/300x300?mix,popmusic' },
];

const defaultPlaybackBarProps: PlaybackBarProps = {
  isPlaying: false,
  progress: 0,
  currentTime: 0,
  volume: 50,
  onPlayPause: () => console.log('Dashboard: Play/Pause clicked'),
  onSkipNext: () => console.log('Dashboard: Skip Next clicked'),
  onSkipPrevious: () => console.log('Dashboard: Skip Previous clicked'),
  onSeek: (value: number[]) => console.log('Dashboard: Seek to', value[0]),
  onVolumeChange: (value: number[]) => console.log('Dashboard: Volume to', value[0]),
  // currentTrack: { id: 'sample1', title: 'Ambient Dreams', artist: 'Serenity Now', duration: 180, albumArtUrl: 'https://source.unsplash.com/random/100x100?ambient' }
};

const DashboardPage = () => {
  console.log('DashboardPage loaded');
  const userName = "Alex Doe"; // Example User

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header 
          userName={userName} 
          userAvatarUrl="https://source.unsplash.com/random/100x100?avatar,person" 
          onSearchSubmit={(query) => console.log('Search submitted from Dashboard:', query)} 
        />
        <main className="flex-1 overflow-y-auto pb-20"> {/* pb-20 for PlaybackBar height */}
          <ScrollArea className="h-full px-4 py-6 lg:px-8">
            <div className="space-y-8">
              <h1 className="text-3xl font-semibold">Good Morning, {userName}!</h1>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Recently Played</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {recentlyPlayedItems.map(item => (
                    <MediaGridCard key={item.id} {...item} onClick={(id, type) => console.log(`Clicked ${type} ${id}`)} />
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">New For You</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {newForYouItems.map(item => (
                    <MediaGridCard key={item.id} {...item} onClick={(id, type) => console.log(`Clicked ${type} ${id}`)} />
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Top Mixes</h2>
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {topMixes.map(item => (
                    <MediaGridCard key={item.id} {...item} onClick={(id, type) => console.log(`Clicked ${type} ${id}`)} />
                  ))}
                </div>
              </section>
            </div>
          </ScrollArea>
        </main>
        <PlaybackBar {...defaultPlaybackBarProps} />
      </div>
    </div>
  );
};

export default DashboardPage;