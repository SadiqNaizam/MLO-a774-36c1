import React from 'react';
// import { useSearchParams, useParams } from 'react-router-dom'; // For actual implementation
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import MediaGridCard from '@/components/MediaGridCard';
import TrackListItem from '@/components/TrackListItem';
import PlaybackBar, { PlaybackBarProps, TrackInfo } from '@/components/layout/PlaybackBar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Play, UserPlus, Check } from 'lucide-react';

// This page is versatile: it can show search results or an entity (album, artist)
// For this example, we'll mock an Album entity view.

// Mock data for an Album entity
const sampleAlbumEntity = {
  id: 'album_entity_1',
  title: 'Cosmic Odyssey',
  artist: 'Galaxy Voyagers',
  releaseYear: '2023',
  coverArtUrl: 'https://source.unsplash.com/random/400x400?album,cosmic',
  tracks: [
    { id: 'sa_t1', trackNumber: 1, title: 'Stardust Prelude', artist: 'Galaxy Voyagers', album: 'Cosmic Odyssey', duration: '3:15', imageUrl: 'https://source.unsplash.com/random/100x100?track,stars', onPlay: () => console.log('Play Stardust Prelude') },
    { id: 'sa_t2', trackNumber: 2, title: 'Nebula Dance', artist: 'Galaxy Voyagers', album: 'Cosmic Odyssey', duration: '4:02', imageUrl: 'https://source.unsplash.com/random/100x100?track,nebula', onPlay: () => console.log('Play Nebula Dance') },
    { id: 'sa_t3', trackNumber: 3, title: 'Zero Gravity', artist: 'Galaxy Voyagers', album: 'Cosmic Odyssey', duration: '3:50', imageUrl: 'https://source.unsplash.com/random/100x100?track,space', onPlay: () => console.log('Play Zero Gravity') },
  ],
  artistBio: 'Galaxy Voyagers are an electronic music duo known for their atmospheric soundscapes and driving rhythms, taking listeners on journeys through sound.',
  artistImageUrl: 'https://source.unsplash.com/random/400x400?artist,electronicduo'
};

// Mock data for Search Results
const searchResults = {
    tracks: [
        { id: 'st1', trackNumber: 1, title: 'Found Track A', artist: 'Searcher', album: 'Results Album', duration: '3:30', onPlay: () => console.log('Play Found Track A') },
    ],
    albums: [
        { id: 'sa1', title: 'Found Album X', subtitle: 'Searcher', type: 'album' as const, imageUrl: 'https://source.unsplash.com/random/300x300?album,search1' },
    ],
    artists: [
        { id: 'sar1', title: 'Found Artist Z', subtitle: 'Musician', type: 'artist' as const, imageUrl: 'https://source.unsplash.com/random/300x300?artist,search2' },
    ],
};


const defaultPlaybackBarProps: PlaybackBarProps = {
  isPlaying: false,
  progress: 0,
  currentTime: 0,
  volume: 50,
  onPlayPause: () => console.log('Search/Entity: Play/Pause clicked'),
  onSkipNext: () => console.log('Search/Entity: Skip Next clicked'),
  onSkipPrevious: () => console.log('Search/Entity: Skip Previous clicked'),
  onSeek: (value: number[]) => console.log('Search/Entity: Seek to', value[0]),
  onVolumeChange: (value: number[]) => console.log('Search/Entity: Volume to', value[0]),
};

// Simulate view type: 'search' or 'album' or 'artist'
type ViewType = 'search' | 'album' | 'artist';

const SearchAndEntityPage = () => {
  // const [searchParams] = useSearchParams();
  // const { type, id } = useParams(); // For entity routes like /album/:id
  // const query = searchParams.get('q');

  // For demonstration, we'll switch viewType. In a real app, this would be determined by route/params.
  const [viewType, setViewType] = React.useState<ViewType>('album'); // Default to album view for demo
  const [currentTrack, setCurrentTrack] = React.useState<TrackInfo | undefined>(undefined);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isFollowingArtist, setIsFollowingArtist] = React.useState(false);


  console.log('SearchAndEntityPage loaded. Current view:', viewType);

  const handlePlayAlbumTrack = (track: typeof sampleAlbumEntity.tracks[0]) => {
    const trackToPlay: TrackInfo = {
        id: track.id,
        title: track.title,
        artist: track.artist,
        albumArtUrl: track.imageUrl,
        duration: track.duration.split(':').reduce((acc, time) => (60 * acc) + +time, 0) 
    };
    setCurrentTrack(trackToPlay);
    setIsPlaying(true);
  };

  const renderAlbumView = () => (
    <div>
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-8 items-center md:items-end">
        <img src={sampleAlbumEntity.coverArtUrl} alt={sampleAlbumEntity.title} className="w-48 h-48 md:w-56 md:h-56 rounded-lg object-cover shadow-lg" />
        <div className="flex-1 text-center md:text-left">
          <p className="text-sm uppercase text-muted-foreground">Album</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold my-2 break-words">{sampleAlbumEntity.title}</h1>
          <p className="text-xl text-muted-foreground">
            By <span className="font-semibold text-foreground hover:underline cursor-pointer" onClick={() => setViewType('artist')}>{sampleAlbumEntity.artist}</span> • {sampleAlbumEntity.releaseYear}
          </p>
          <Button size="lg" className="mt-4" onClick={() => handlePlayAlbumTrack(sampleAlbumEntity.tracks[0])}>
            <Play className="mr-2 h-5 w-5 fill-current" /> Play Album
          </Button>
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-3">Tracks</h2>
      <div className="space-y-1">
        {sampleAlbumEntity.tracks.map((track, index) => (
          <TrackListItem
            key={track.id}
            trackNumber={index + 1}
            {...track}
            onPlay={() => handlePlayAlbumTrack(track)}
            isPlaying={currentTrack?.id === track.id && isPlaying}
            isActive={currentTrack?.id === track.id}
          />
        ))}
      </div>
    </div>
  );

  const renderArtistView = () => (
    <div>
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-8 items-center md:items-end">
            <img src={sampleAlbumEntity.artistImageUrl} alt={sampleAlbumEntity.artist} className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover shadow-lg" />
            <div className="flex-1 text-center md:text-left">
                <p className="text-sm uppercase text-muted-foreground">Artist</p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold my-2 break-words">{sampleAlbumEntity.artist}</h1>
                <p className="text-muted-foreground mb-3 line-clamp-3">{sampleAlbumEntity.artistBio}</p>
                <Button 
                    variant={isFollowingArtist ? "secondary" : "default"} 
                    onClick={() => setIsFollowingArtist(!isFollowingArtist)}
                    className="mt-2"
                >
                    {isFollowingArtist ? <Check className="mr-2 h-4 w-4" /> : <UserPlus className="mr-2 h-4 w-4" />}
                    {isFollowingArtist ? 'Following' : 'Follow'}
                </Button>
            </div>
        </div>
        <h2 className="text-2xl font-semibold mb-4 mt-8">Top Tracks</h2>
         <div className="space-y-1 mb-8">
            {sampleAlbumEntity.tracks.slice(0,2).map((track, index) => ( // Show a few tracks as "top tracks"
            <TrackListItem
                key={`top-${track.id}`}
                trackNumber={index + 1}
                {...track}
                onPlay={() => handlePlayAlbumTrack(track)}
                isPlaying={currentTrack?.id === track.id && isPlaying}
                isActive={currentTrack?.id === track.id}
            />
            ))}
        </div>
        <h2 className="text-2xl font-semibold mb-4">Albums by {sampleAlbumEntity.artist}</h2>
         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <MediaGridCard id="album_art_1" title={sampleAlbumEntity.title} subtitle={sampleAlbumEntity.releaseYear} type="album" imageUrl={sampleAlbumEntity.coverArtUrl} onClick={() => setViewType('album')} />
            {/* Add more albums if available */}
        </div>
    </div>
  );

  const renderSearchView = () => (
    <div>
        <h1 className="text-3xl font-semibold mb-6">Search Results for "Your Query"</h1>
        {/* Add buttons to switch view for demo */}
        <div className="mb-4 space-x-2">
            <Button onClick={() => setViewType('album')}>Show Album Demo</Button>
            <Button onClick={() => setViewType('artist')}>Show Artist Demo</Button>
        </div>
        <Tabs defaultValue="tracks" className="w-full">
            <TabsList className="mb-4">
                <TabsTrigger value="tracks">Tracks</TabsTrigger>
                <TabsTrigger value="albums">Albums</TabsTrigger>
                <TabsTrigger value="artists">Artists</TabsTrigger>
                {/* <TabsTrigger value="playlists">Playlists</TabsTrigger> */}
            </TabsList>
            <TabsContent value="tracks">
                <div className="space-y-1">
                {searchResults.tracks.map((track, index) => (
                    <TrackListItem key={track.id} trackNumber={index + 1} {...track} isPlaying={false} isActive={false} />
                ))}
                </div>
            </TabsContent>
            <TabsContent value="albums">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {searchResults.albums.map(album => <MediaGridCard key={album.id} {...album} />)}
                </div>
            </TabsContent>
            <TabsContent value="artists">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {searchResults.artists.map(artist => <MediaGridCard key={artist.id} {...artist} />)}
                </div>
            </TabsContent>
        </Tabs>
    </div>
  );


  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header 
          userName="Alex Doe" 
          userAvatarUrl="https://source.unsplash.com/random/100x100?avatar,person" 
          onSearchSubmit={(query) => {
            console.log('Search submitted from SearchPage:', query);
            setViewType('search'); // Switch to search view on new search
          }}
        />
        <main className="flex-1 overflow-y-auto pb-20">
          <ScrollArea className="h-full p-4 sm:p-6 lg:p-8">
            {viewType === 'album' && renderAlbumView()}
            {viewType === 'artist' && renderArtistView()}
            {viewType === 'search' && renderSearchView()}
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

export default SearchAndEntityPage;