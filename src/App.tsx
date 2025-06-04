import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Import new pages
import DashboardPage from "./pages/DashboardPage";
import DiscoverPage from "./pages/DiscoverPage";
import CollectionPage from "./pages/CollectionPage";
import PlaylistDetailPage from "./pages/PlaylistDetailPage";
import SearchAndEntityPage from "./pages/SearchAndEntityPage"; 
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists in src/pages/

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} /> 
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/collection" element={<CollectionPage />} />
          {/* Sub-routes for collection can be handled by CollectionPage's Tabs and internal state based on Sidebar links */}
          {/* Example: /collection/playlists, /collection/artists (Sidebar links to these) */}
          {/* The CollectionPage would use these parts of the path to select the default tab */}
          <Route path="/collection/:tab" element={<CollectionPage />} />


          <Route path="/playlist/:playlistId" element={<PlaylistDetailPage />} />
          
          {/* SearchAndEntityPage will handle search results and entity views like album/artist details */}
          <Route path="/search" element={<SearchAndEntityPage />} />
          {/* For more specific entity URLs, you might add: */}
          {/* <Route path="/album/:albumId" element={<SearchAndEntityPage mode="album" />} /> */}
          {/* <Route path="/artist/:artistId" element={<SearchAndEntityPage mode="artist" />} /> */}
          {/* This would require SearchAndEntityPage to accept a mode prop or parse the URL further */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;