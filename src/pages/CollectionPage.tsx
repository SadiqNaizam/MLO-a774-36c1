import React from 'react';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import MediaGridCard from '@/components/MediaGridCard';
import TrackListItem from '@/components/TrackListItem';
import PlaybackBar, { PlaybackBarProps } from '@/components/layout/PlaybackBar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Placeholder Data
const userPlaylists = [
  { id: 'pl1', title: 'My Chill Mix', subtitle: '25 songs', type: 'playlist' as const, imageUrl: 'https://source.unsplash.com/random/300x300?playlist,chillwave' },
  { id: 'pl2', title: 'Road Trip Anthems', subtitle: '50 songs', type: 'playlist' as const, imageUrl: 'https://source.unsplash.com/random/300x300?playlist,roadtrip' },
];
const followedArtists = [
  { id: 'art1', title: 'The Midnight', subtitle: 'Synthwave Band', type: 'artist' as const, imageUrl: 'https://source.unsplash.com/random/300x300?artist,band' },
  { id: 'art2', title: 'Aurora', subtitle: 'Pop Artist', type: 'artist' as const, imageUrl: 'https://source.unsplash.com/random/300x300?artist,singer' },
];
const savedAlbums = [
  { id: 'alb1', title: 'Endless Summer', subtitle: 'The Midnight', type: 'album' as const, imageUrl: 'https://source.unsplash.com/random/300x300?album,summer' },
  { id: 'alb2', title: 'Discovery', subtitle: 'Daft Punk', type: 'album' as const, imageUrl: 'https://source.unsplash.com/random/300x300?album,electronic' },
];
const likedTracks = [
  { trackNumber: 1, title: 'Sunset', artist: 'The Midnight', album: 'Endless Summer', duration: '5:12', imageUrl: 'https://source.unsplash.com/random/100x100?track,sunset', onPlay: () => console.log('Play Sunset') },
  { trackNumber: 2, title: 'One More Time', artist: 'Daft Punk', album: 'Discovery', duration: '5:20', imageUrl: 'https://source.unsplash.com/random/100x100?track,dance', onPlay: () => console.log('Play One More Time') },
];

const defaultPlaybackBarProps: PlaybackBarProps = {
  isPlaying: false,
  progress: 0,
  currentTime: 0,
  volume: 50,
  onPlayPause: () => console.log('Collection: Play/Pause clicked'),
  onSkipNext: () => console.log('Collection: Skip Next clicked'),
  onSkipPrevious: () => console.log('Collection: Skip Previous clicked'),
  onSeek: (value: number[]) => console.log('Collection: Seek to', value[0]),
  onVolumeChange: (value: number[]) => console.log('Collection: Volume to', value[0]),
};

const CollectionPage = () => {
  console.log('CollectionPage loaded');
  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header 
          userName="Alex Doe" 
          userAvatarUrl="https://source.unsplash.com/random/100x100?avatar,person" 
          onSearchSubmit={(query) => console.log('Search submitted from Collection:', query)}
        />
        <main className="flex-1 overflow-y-auto pb-20">
          <ScrollArea className="h-full px-4 py-6 lg:px-8">
            <h1 className="text-3xl font-semibold mb-6">Your Collection</h1>
            <Tabs defaultValue="playlists" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="playlists">Playlists</TabsTrigger>
                <TabsTrigger value="artists">Artists</TabsTrigger>
                <TabsTrigger value="albums">Albums</TabsTrigger>
                <TabsTrigger value="liked-songs">Liked Songs</TabsTrigger>
              </TabsList>
              <TabsContent value="playlists">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {userPlaylists.map(item => <MediaGridCard key={item.id} {...item} onClick={(id, type) => console.log(`Clicked ${type} ${id}`)} />)}
                </div>
              </TabsContent>
              <TabsContent value="artists">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {followedArtists.map(item => <MediaGridCard key={item.id} {...item} onClick={(id, type) => console.log(`Clicked ${type} ${id}`)} />)}
                </div>
              </TabsContent>
              <TabsContent value="albums">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {savedAlbums.map(item => <MediaGridCard key={item.id} {...item} onClick={(id, type) => console.log(`Clicked ${type} ${id}`)} />)}
                </div>
              </TabsContent>
              <TabsContent value="liked-songs">
                <div className="space-y-2">
                  {likedTracks.map((track, index) => (
                    <TrackListItem 
                      key={index} 
                      {...track} 
                      isActive={false} 
                      isPlaying={false} 
                      onOptionsClick={() => console.log('Options for', track.title)}
                    />
                  ))}
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

export default CollectionPage;