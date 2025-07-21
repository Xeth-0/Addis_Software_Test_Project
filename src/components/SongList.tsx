import styled from "@emotion/styled";
import { SongComponent } from "./SongComponent";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Plus } from "lucide-react";

import { fetchSongsRequest, Song } from "../store";
import { RootState } from "../store";

const SongListContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    max-width: 400px;
    margin: 0 auto;
  }
`;

const Header = styled.div`
  padding: 16px;
  background: #f8f8f8;
  border-bottom: 1px solid #e5e5e5;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

const AddButton = styled.button`
  background: #005503;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background: #00a037;
  }
`;

const List = styled.div`
  background: white;
`;

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
        {songs.map((song) => (
          <SongComponent
            key={song.id}
            song={song}
            onClick={() => onPlaySong(song)}
            onEdit={() => onEditSong(song)}
            onDelete={() => onDeleteSong(song)}
            isPlaying={currentlyPlaying?.id === song.id}
          />
        ))}
      </List>
    </SongListContainer>
  );
};
