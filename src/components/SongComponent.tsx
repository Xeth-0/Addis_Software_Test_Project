import { Edit, Edit2, Heart, Play, Trash } from "lucide-react";
import { addFavorite, removeFavorite, RootState, Song } from "../store";
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
import { useDispatch, useSelector } from "react-redux";

import album_placeholder from "../../public/album_placeholder.avif";

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
  const dispatch = useDispatch();
  const isFavorite = useSelector((state: RootState) =>
    state.songs.favorites.some((favorite) => favorite.id === song.id)
  );

  function onFavorite(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    if (isFavorite) {
      dispatch(removeFavorite(song));
    } else {
      dispatch(addFavorite(song));
    }
  }

  return (
    <SongContainer
      id={`song-container-${song.id}`}
      className="song-container"
      onClick={onClick}
      isPlaying={isPlaying || false}
    >
      <SongNumber>{index + 1}</SongNumber>

      <Thumbnail
        src={album_placeholder}
        srcSet={`${song.images.large} 1x, ${song.images.medium} 2x, ${song.images.small} 3x` || `${album_placeholder} 1x`}
        alt={`${song.album} artwork`}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = album_placeholder;
          e.currentTarget.srcset = `${album_placeholder} 1x`;
        }}
        loading="lazy"
      />

      <SongInfo>
        <Title isPlaying={isPlaying || false}>{song.title}</Title>
        <Details>
          {song.artist} • {song.album} • {song.year}
        </Details>
      </SongInfo>
      <ActionButton onClick={onFavorite} title="Favorite">
        <Heart
          size={16}
          color={isFavorite ? "#FF5050" : "#666"}
          fill={isFavorite ? "#FF5959" : "none"}
        />
      </ActionButton>
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
