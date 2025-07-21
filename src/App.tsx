import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addSongRequest,
  deleteSongRequest,
  RootState,
  updateSongRequest,
} from "./store";
import { useEffect, useState } from "react";
import { fetchSongsRequest, Song } from "./store";
import { SongList } from "./components/SongList";
import { SongModal } from "./components/SongModal";
import LoadingComponent from "./components/Loading";
import { Pagination } from "./components/Pagination";
import { NowPlayingBar } from "./components/NowPlaying";
import { SONGS_PER_PAGE } from "./constants";
import { 
  Menu, 
  Music, 
  Heart, 
  Settings, 
  ChevronLeft, 
  ChevronRight 
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
  const songs = useSelector((state: RootState) => state.songs.list);
  const loading = useSelector((state: RootState) => state.songs.loading);
  const error = useSelector((state: RootState) => state.songs.error);
  const total = useSelector((state: RootState) => state.songs.total);
  const page = useSelector((state: RootState) => state.songs.page);
  const limit = useSelector((state: RootState) => state.songs.limit);

  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<string>("library");
  const [editingSong, setEditingSong] = useState<Song | undefined>(undefined);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [nowPlaying, setNowPlaying] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSongsRequest({ limit: SONGS_PER_PAGE, page: currentPage }));
  }, [currentPage, dispatch]);
  
  if (loading) {
    return <LoadingComponent />;
  } else if (error) {
    return <div id="error-songs">Error: {error}</div>;
  }
  
  const totalPages = limit ? Math.ceil(total / limit) : 1;

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
          <SidebarHeader isCollapsed={isSidebarCollapsed}>
            <AppTitle isCollapsed={isSidebarCollapsed}>Music App</AppTitle>
            <ToggleButton onClick={toggleSidebar}>
              {isSidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </ToggleButton>
          </SidebarHeader>

          <SidebarNav>
            <NavSection>
              <SectionTitle isCollapsed={isSidebarCollapsed}>Music</SectionTitle>
              <NavItem 
                active={activeNav === "library"} 
                isCollapsed={isSidebarCollapsed}
                onClick={() => setActiveNav("library")}
              >
                <Music size={20} />
                <NavText isCollapsed={isSidebarCollapsed}>Library</NavText>
              </NavItem>
              <NavItem 
                active={activeNav === "favorites"} 
                isCollapsed={isSidebarCollapsed}
                onClick={() => setActiveNav("favorites")}
              >
                <Heart size={20} />
                <NavText isCollapsed={isSidebarCollapsed}>Favorites</NavText>
              </NavItem>
            </NavSection>

            <NavSection>
              <SectionTitle isCollapsed={isSidebarCollapsed}>Settings</SectionTitle>
              <NavItem 
                active={activeNav === "settings"} 
                isCollapsed={isSidebarCollapsed}
                onClick={() => setActiveNav("settings")}
              >
                <Settings size={20} />
                <NavText isCollapsed={isSidebarCollapsed}>Settings</NavText>
              </NavItem>
            </NavSection>
          </SidebarNav>
        </Sidebar>

        <MainContent>
          <ContentArea>
            <SongListWrapper>
              <SongList
                title={activeNav === "library" ? "Library" : activeNav === "favorites" ? "Favorites" : "Settings"}
                songs={songs}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                onPlaySong={handlePlaySong}
                onAddSong={handleAddSong}
                onEditSong={handleEditSong}
                onDeleteSong={handleDeleteSong}
                currentlyPlaying={nowPlaying}
              />
            </SongListWrapper>

            <PaginationWrapper>
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </PaginationWrapper>
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
