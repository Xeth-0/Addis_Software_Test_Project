import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Plus } from "lucide-react";

import { fetchSongsRequest, Song, RootState } from "../store";
import {
  SongListContainer,
  Header,
  Title,
  AddButton,
  List,
  SliderContainer,
  SliderWrapper,
  SliderLabel,
  SliderInput,
  SliderValue,
} from "../styles/SongList.styles";

import { SongComponent } from "./SongComponent";
import LoadingComponent from "./LoadingComponent";
import { PaginationComponent } from "./PaginationComponent";

import { PaginationWrapper } from "../styles/App.styles";
import { SONGS_PER_PAGE } from "../constants";

interface SongListProps {
  title?: string;
  onAddSong: () => void;
  onPlaySong: (song: Song) => void;
  onEditSong: (song: Song) => void;
  onDeleteSong: (song: Song) => void;
  currentlyPlaying: Song | null;
}

export const SongListComponent: React.FC<SongListProps> = ({
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

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [songsPerPage, setSongsPerPage] = useState(SONGS_PER_PAGE);

  const totalPages = limit ? Math.ceil(total / limit) : 1;

  useEffect(() => {
    dispatch(fetchSongsRequest({ limit: songsPerPage, page: currentPage }));
  }, [currentPage, dispatch, songsPerPage]);

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

        <SliderContainer>
          <SliderWrapper>
            <SliderLabel>Songs per page</SliderLabel>
            <SliderInput
              type="range"
              min={10}
              max={100}
              step={10}
              value={songsPerPage}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSongsPerPage(parseInt(e.target.value))
              }
            />
            <SliderValue>{songsPerPage}</SliderValue>
          </SliderWrapper>
        </SliderContainer>

        {loading ? (
          <LoadingComponent />
        ) : error ? (
          <div id="error-songs">Error: {error}</div>
        ) : (
          <List id="song-list">
            {songs.map((song, index) => (
              <SongComponent
                key={song.id}
                song={song}
                onClick={() => onPlaySong(song)}
                onEdit={() => onEditSong(song)}
                onDelete={() => onDeleteSong(song)}
                isPlaying={currentlyPlaying?.id === song.id}
                index={(currentPage - 1) * songsPerPage + index}
              />
            ))}
          </List>
        )}
      </SongListContainer>
      <PaginationWrapper>
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </PaginationWrapper>
    </>
  );
};
