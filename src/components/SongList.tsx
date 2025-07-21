import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Plus } from "lucide-react";
import { SongComponent } from "./SongComponent";
import { fetchSongsRequest, Song } from "../store";
import { RootState } from "../store";
import { SONGS_PER_PAGE } from "../constants";
import {
  SongListContainer,
  Header,
  Title,
  AddButton,
  List,
} from "../styles/SongList.styles";
import LoadingComponent from "./Loading";
import { PaginationWrapper } from "../styles/App.styles";
import { Pagination } from "./Pagination";

interface SongListProps {
  title?: string;
  onAddSong: () => void;
  onPlaySong: (song: Song) => void;
  onEditSong: (song: Song) => void;
  onDeleteSong: (song: Song) => void;
  currentlyPlaying: Song | null;
}

export const SongList: React.FC<SongListProps> = ({
  title = "Songs",
  onAddSong,
  onPlaySong,
  onEditSong,
  onDeleteSong,
  currentlyPlaying,
}) => {
  const songs = useSelector((state: RootState) => state.songs.list);
  const loading = useSelector((state: RootState) => state.songs.loading);
  const error = useSelector((state: RootState) => state.songs.error);
  const total = useSelector((state: RootState) => state.songs.total);
  const limit = useSelector((state: RootState) => state.songs.limit);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = limit ? Math.ceil(total / limit) : 1;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSongsRequest({ limit: SONGS_PER_PAGE, page: currentPage }));
  }, [currentPage, dispatch]);

  if (loading) {
    return <LoadingComponent />;
  } else if (error) {
    return <div id="error-songs">Error: {error}</div>;
  }

  return (
    <>
      <SongListContainer id="song-list-container">
        <Header id="song-list-header">
          <Title>{title}</Title>
          <AddButton id="add-song-button" onClick={onAddSong}>
            <Plus size={16} />
            Add Song
          </AddButton>
        </Header>
        <List id="song-list">
          {songs.map((song, index) => (
            <SongComponent
              key={song.id}
              song={song}
              onClick={() => onPlaySong(song)}
              onEdit={() => onEditSong(song)}
              onDelete={() => onDeleteSong(song)}
              isPlaying={currentlyPlaying?.id === song.id}
              index={(currentPage - 1) * SONGS_PER_PAGE + index}
            />
          ))}
        </List>
      </SongListContainer>
      <PaginationWrapper>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </PaginationWrapper>
    </>
  );
};
