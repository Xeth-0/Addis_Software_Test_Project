import "./index.css";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Menu } from "lucide-react";

import {
  addSongRequest,
  deleteSongRequest,
  Song,
  updateSongRequest,
} from "./store";
import {
  SongListComponent,
  SongModalComponent,
  NowPlayingComponent,
  SidebarComponent,
} from "./components";
import {
  AppContainer,
  MainContent,
  ContentArea,
  PlayerWrapper,
  MobileOverlay,
  MobileToggle,
} from "./styles/App.styles";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<string>("library");
  const [editingSong, setEditingSong] = useState<Song | undefined>(undefined);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [nowPlaying, setNowPlaying] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const dispatch = useDispatch();

  const handleSaveSong = (songData: Omit<Song, "id">) => {
    if (editingSong) {
      const updatedSong: Song = {
        ...editingSong,
        ...songData,
      };
      dispatch(updateSongRequest(updatedSong));
    } else {
      const newSong: Song = {
        ...songData,
        id: Date.now().toString(),
      };
      dispatch(addSongRequest(newSong));
    }
  };

  const handleAddSong = () => {
    console.log("adding song");
    setIsModalOpen(true);
    setEditingSong(undefined);
  };

  const handleEditSong = (song: Song) => {
    console.log("editing song", song);
    setIsModalOpen(true);
    setEditingSong(song);
  };

  const handleDeleteSong = (song: Song) => {
    console.log("deleting song", song);
    dispatch(deleteSongRequest(song.id));
  };

  const handlePlaySong = (song: Song) => {
    setNowPlaying(song);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <>
      <AppContainer className="app-container" id="app-container">
        <MobileToggle
          id="mobile-toggle"
          onClick={toggleSidebar}
          isVisible={isSidebarCollapsed}
        >
          <Menu id="menu-icon" size={20} />
        </MobileToggle>

        <MobileOverlay
          id="mobile-overlay"
          isVisible={!isSidebarCollapsed}
          onClick={() => setIsSidebarCollapsed(true)}
        />

        <SidebarComponent
          isSidebarCollapsed={isSidebarCollapsed}
          toggleSidebar={toggleSidebar}
          activeNav={activeNav}
          setActiveNav={setActiveNav}
        />

        <MainContent>
          <ContentArea className="content-area">
            {/* <SongListWrapper> */}
           
            <SongListComponent
              title={
                activeNav === "library"
                  ? "Library"
                  : activeNav === "favorites"
                  ? "Favorites"
                  : "Settings"
              }
              onPlaySong={handlePlaySong}
              onAddSong={handleAddSong}
              onEditSong={handleEditSong}
              onDeleteSong={handleDeleteSong}
              currentlyPlaying={nowPlaying}
            />
            {/* </SongListWrapper> */}
          </ContentArea>

          <PlayerWrapper>
            <NowPlayingComponent
              song={nowPlaying}
              isPlaying={isPlaying}
              currentTime={0}
              totalTime={0}
              onPlayPause={handlePlayPause}
              onPrevious={() => {}}
              onNext={() => {}}
            />
          </PlayerWrapper>
        </MainContent>

        <SongModalComponent
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          song={editingSong}
          onSave={handleSaveSong}
        />
      </AppContainer>
    </>
  );
};

export default App;
