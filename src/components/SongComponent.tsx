import styled from "@emotion/styled";
import { Song } from "../store";
import { Edit, Edit2, Play, Trash } from "lucide-react";

const SongContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background: white;
  border-bottom: 1px solid #e5e5e5;
  cursor: pointer;
  transition: background-color 0.1s ease;
  position: relative;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #f7f7f7;

    .song-actions {
      opacity: 1;
    }
  }

  &:active {
    background: #e8e8e8;
  }
`;

const Thumbnail = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 4px;
  margin-right: 12px;
  object-fit: cover;
  flex-shrink: 0;
`;

const SongInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #000;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Details = styled.div`
  font-size: 12px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Duration = styled.div`
  font-size: 12px;
  color: #999;
  margin-left: 8px;
  flex-shrink: 0;
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.2s ease;
  margin-left: 8px;
`;


const ActionButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;
  color: #666;
  transition: all 0.2s ease;

  &:hover {
    background: #e0e0e0;
    color: #333;
  }
`;

interface SongProps {
  song: Song;
  onClick?: () => void;
  onPlay?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  isPlaying?: boolean;
}

export const SongComponent: React.FC<SongProps> = ({
  song,
  onClick,
  isPlaying,
  onPlay,
  onEdit,
  onDelete,
}) => {
  return (
    <SongContainer
      id={`song-container-${song.id}`}
      className="song-container"
      onClick={onClick}
    >
      <picture>
        <source
          srcSet={`${song.images.large} 1x, ${song.images.medium} 2x, ${song.images.small} 3x`}
          media="(min-width: 768px)"
        />
        <Thumbnail
          srcSet={`${song.images.large} 1x, ${song.images.medium} 2x, ${song.images.small} 3x`}
          alt={`${song.album} artwork`}
          loading="lazy"
        />
      </picture>

      <SongInfo>
        <Title style={{ color: isPlaying ? "#007AFF" : "#000" }}>
          {song.title}
        </Title>
        <Details>
          {song.artist} • {song.album} • {song.year}
        </Details>
      </SongInfo>
      <Duration>{song.duration}</Duration>
      <Actions className="song-actions">
        <ActionButton onClick={onPlay} title="Play" aria-label="Play">
          <Play size={16} color={isPlaying ? "#007AFF" : "#666"} />
        </ActionButton>
        <ActionButton onClick={onEdit} title="Edit">
          <Edit2 size={16} color="#666" />
        </ActionButton>
        <ActionButton onClick={onDelete} title="Delete">
          <Trash size={16} color="#ff0000" />
        </ActionButton>
      </Actions>
    </SongContainer>
  );
};
