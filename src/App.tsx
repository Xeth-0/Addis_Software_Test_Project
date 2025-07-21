import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addSongRequest,
  deleteSongRequest,
  RootState,
  updateSongRequest,
} from "./store";
import { useState } from "react";
import { Song } from "./store";
import { SongList } from "./components/SongList";
import { SongModal } from "./components/SongModal";
import { NowPlayingBar } from "./components/NowPlaying";
import { SONGS_PER_PAGE } from "./constants";

import {
  Menu,
  Music,
  Heart,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  AppContainer,
  Sidebar,
  SidebarHeader,
  AppTitle,
  ToggleButton,
  SidebarNav,
  NavSection,
  SectionTitle,
  NavItem,
  NavText,
  MainContent,
  ContentArea,
  SongListWrapper,
  PaginationWrapper,
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
        <MobileToggle onClick={toggleSidebar}>
          <Menu size={20} />
        </MobileToggle>

        <MobileOverlay
          isVisible={!isSidebarCollapsed}
          onClick={() => setIsSidebarCollapsed(true)}
        />

        <Sidebar isCollapsed={isSidebarCollapsed}>
          <SidebarHeader
            className="sidebar-header"
            isCollapsed={isSidebarCollapsed}
          >
            <AppTitle className="app-title" isCollapsed={isSidebarCollapsed}>
              Music App
            </AppTitle>
            <ToggleButton onClick={toggleSidebar}>
              {isSidebarCollapsed ? (
                <ChevronRight size={16} />
              ) : (
                <ChevronLeft size={16} />
              )}
            </ToggleButton>
          </SidebarHeader>

          <SidebarNav>
            <NavSection>
              <SectionTitle isCollapsed={isSidebarCollapsed}>
                Music
              </SectionTitle>
              <NavItem
                active={activeNav === "library"}
                isCollapsed={isSidebarCollapsed}
                onClick={() => setActiveNav("library")}
              >
                <span>
                  <Music size={20} />
                </span>
                {!isSidebarCollapsed && (
                  <NavText isCollapsed={false}>Library</NavText>
                )}
              </NavItem>
              <NavItem
                active={activeNav === "favorites"}
                isCollapsed={isSidebarCollapsed}
                onClick={() => setActiveNav("favorites")}
              >
                <span>
                  <Heart size={20} />
                </span>
                {!isSidebarCollapsed && (
                  <NavText isCollapsed={false}>Favorites</NavText>
                )}
              </NavItem>
            </NavSection>

            <NavSection>
              <SectionTitle isCollapsed={isSidebarCollapsed}>
                Settings
              </SectionTitle>
              <NavItem
                active={activeNav === "settings"}
                isCollapsed={isSidebarCollapsed}
                onClick={() => setActiveNav("settings")}
              >
                <span>
                  <Settings size={20} />
                </span>
                {!isSidebarCollapsed && (
                  <NavText isCollapsed={false}>Settings</NavText>
                )}
              </NavItem>
            </NavSection>
          </SidebarNav>
        </Sidebar>

        <MainContent>
          <ContentArea className="content-area">
            {/* <SongListWrapper> */}
            <SongList
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
            <NowPlayingBar
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

        <SongModal
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
