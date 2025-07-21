import { Edit, Edit2, Play, Trash } from "lucide-react";
import { Song } from "../store";
import {
  SongContainer,
  Thumbnail,
  SongInfo,
  Title,
  Details,
  Duration,
  Actions,
  ActionButton,
  SongNumber,
} from "../styles/SongComponent.styles";

interface SongProps {
  song: Song;
  onClick?: () => void;
  onPlay?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  isPlaying?: boolean;
  index: number;
}

export const SongComponent: React.FC<SongProps> = ({
  song,
  onClick,
  isPlaying,
  onPlay,
  onEdit,
  onDelete,
  index,
}) => {
  return (
    <SongContainer
      id={`song-container-${song.id}`}
      className="song-container"
      onClick={onClick}
    >
      <SongNumber>{index + 1}</SongNumber>
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
