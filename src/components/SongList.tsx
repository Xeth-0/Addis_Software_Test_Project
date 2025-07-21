import { useEffect } from "react";
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

interface SongListProps {
  songs: Song[];
  title?: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onAddSong: () => void;
  onPlaySong: (song: Song) => void;
  onEditSong: (song: Song) => void;
  onDeleteSong: (song: Song) => void;
  currentlyPlaying: Song | null;
}

export const SongList: React.FC<SongListProps> = ({
  title = "Songs",
  songs,
  currentPage,
  totalPages,
  onPageChange,
  onAddSong,
  onPlaySong,
  onEditSong,
  onDeleteSong,
  currentlyPlaying,
}) => {
  return (
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
  );
};
