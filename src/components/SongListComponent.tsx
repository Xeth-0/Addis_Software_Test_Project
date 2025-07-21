import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Plus, Sun, Moon } from "lucide-react";

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
  ControlsContainer,
  ThemeToggleButton,
  ErrorMessage,
} from "../styles/SongList.styles";
import { useTheme } from "../styles/theme/ThemeContext";

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
  currentPage: number;
  setCurrentPage: (page: number) => void;
  currentlyPlaying: Song | null;
}

export const SongListComponent: React.FC<SongListProps> = ({
  title = "Songs",
  onAddSong,
  onPlaySong,
  onEditSong,
  onDeleteSong,
  currentlyPlaying,
  currentPage,
  setCurrentPage,
}) => {
  const songs = useSelector((state: RootState) => state.songs.list);
  const favorites = useSelector((state: RootState) => state.songs.favorites);
  const loading = useSelector((state: RootState) => state.songs.loading);
  const error = useSelector((state: RootState) => state.songs.error);
  const total = useSelector((state: RootState) => state.songs.total);
  const limit = useSelector((state: RootState) => state.songs.limit);
  const { isDark, toggleTheme } = useTheme();

  const dispatch = useDispatch();

  const [songsPerPage, setSongsPerPage] = useState(SONGS_PER_PAGE);

  const isFavorites = title === "Favorites";
  const listSongs = isFavorites ? favorites : songs;

  // Calculate totalPages based on the current list
  const totalPages = isFavorites
    ? Math.max(1, Math.ceil(favorites.length / songsPerPage))
    : limit
    ? Math.ceil(total / limit)
    : 1;

  // Only fetch songs if not showing favorites
  useEffect(() => {
    if (!isFavorites) {
      dispatch(fetchSongsRequest({ limit: songsPerPage, page: currentPage }));
    }
  }, [currentPage, dispatch, songsPerPage, isFavorites]);

  // For favorites, pagination is client side
  const paginatedSongs = isFavorites
    ? listSongs.slice(
        (currentPage - 1) * songsPerPage,
        currentPage * songsPerPage
      )
    : listSongs;

  return (
    <>
      <SongListContainer id="song-list-container">
        <Header id="song-list-header">
          <Title>{title}</Title>
          <ThemeToggleButton id="theme-toggle" onClick={toggleTheme}>
            {!isDark ? <Sun size={20} /> : <Moon size={20} />}
          </ThemeToggleButton>
        </Header>

        <ControlsContainer>
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
          <AddButton id="add-song-button" onClick={onAddSong}>
            <Plus size={16} />
            Add Song
          </AddButton>
        </ControlsContainer>

        {loading ? (
          <LoadingComponent />
        ) : error ? (
          <ErrorMessage id="error-songs">Error: {error}</ErrorMessage>
        ) : (
          <List id="song-list">
            {paginatedSongs.length > 0 ? (
              paginatedSongs.map((song, index) => (
                <SongComponent
                  key={song.id}
                  song={song}
                  onClick={() => onPlaySong(song)}
                  onEdit={() => onEditSong(song)}
                  onDelete={() => onDeleteSong(song)}
                  isPlaying={currentlyPlaying?.id === song.id}
                  index={(currentPage - 1) * songsPerPage + index}
                />
              ))
            ) : (
              <ErrorMessage id="no-songs">No songs found</ErrorMessage>
            )}
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
