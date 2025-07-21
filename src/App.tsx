import styled from "@emotion/styled";
import { SongList } from "./components/SongList";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { addSongRequest, deleteSongRequest, RootState, updateSongRequest } from "./store";
import { useEffect, useState } from "react";
import { fetchSongsRequest, Song } from "./store";
import { SongModal } from "./components/SongModal";
import LoadingComponent from "./components/Loading";

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 100vh;
  padding: 0;
  background-color: rgb(235, 221, 221);
`;

const Sidebar = styled.div`
  width: 240px;
  background: #f0f0f0;
  border-right: 1px solid #e0e0e0;
  padding: 20px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
`;

const AppTitle = styled.h1`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

const NavItem = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 4px;
  background: ${(props) => (props.active ? "#007AFF" : "transparent")};
  color: ${(props) => (props.active ? "white" : "#333")};
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => (props.active ? "#0056CC" : "#e8e8e8")};
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const ContentArea = styled.div`
  flex: 1;
  padding: 40px;
  padding-bottom: 120px;

  @media (max-width: 768px) {
    padding: 0;
    padding-bottom: 100px;
  }
`;

const SONGS_PER_PAGE = 10;

const App = () => {
  const songs = useSelector((state: RootState) => state.songs.list);
  const loading = useSelector((state: RootState) => state.songs.loading);
  const error = useSelector((state: RootState) => state.songs.error);

  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActiveNav, setIsActiveNav] = useState<string | null>("library");
  const [editingSong, setEditingSong] = useState<Song | undefined>(undefined);
  // const [nowPlaying, setNowPlaying] = useState<Song | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSongsRequest());
  }, []);

  if (loading) {
    return <LoadingComponent />;
  } else if (error) {
    return <div id="error-songs">Error: {error}</div>;
  }
  
  const handleSaveSong = (songData: Omit<Song, "id">) => {
    if (editingSong) {
      const updatedSong: Song = {
        ...editingSong,
        ...songData,
      };
      dispatch(updateSongRequest(updatedSong));
    } else {
      // creating a song
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


  return (
    <AppContainer className="app-container" id="app-container">
      <SongList
        title="MUSIC!!!"
        songs={songs}
        currentPage={currentPage}
        totalPages={Math.ceil(songs.length / SONGS_PER_PAGE)}
        onPageChange={setCurrentPage}
        onPlaySong={() => {}}
        onAddSong={handleAddSong}
        onEditSong={handleEditSong}
        onDeleteSong={handleDeleteSong}
        currentlyPlaying={null}
      />
      <SongModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        song={editingSong}
        onSave={handleSaveSong}
      />
    </AppContainer>
  );
};

export default App;
