import React from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import { Song } from "../store";
import {
  Container,
  SongInfo,
  Thumbnail,
  Details,
  Title,
  Artist,
  Controls,
  ControlButton,
  ProgressContainer,
  ProgressBar,
  Progress,
  TimeDisplay,
} from "../styles/NowPlaying.styles";
import { useTheme } from "../styles/theme/ThemeContext";
import album_placeholder from "../../public/album_placeholder.avif";

interface NowPlayingBarProps {
  song: Song | null;
  isPlaying: boolean;
  currentTime: number;
  totalTime: number;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export const NowPlayingComponent: React.FC<NowPlayingBarProps> = ({
  song,
  isPlaying,
  currentTime,
  totalTime,
  onPlayPause,
  onPrevious,
  onNext,
}) => {
  if (!song) return null;

  const { isDark } = useTheme();

  const progress = totalTime > 0 ? (currentTime / totalTime) * 100 : 0;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Container>
      <SongInfo>
        <Thumbnail
          src={album_placeholder}
          srcSet={
            `${song.images.large} 1x, ${song.images.medium} 2x, ${song.images.small} 3x` ||
            `${album_placeholder} 1x`
          }
          alt={`${song.album} artwork`}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = album_placeholder;
            e.currentTarget.srcset = `${album_placeholder} 1x`;
          }}
          loading="lazy"
        />
        <Details>
          <Title>{song.title}</Title>
          <Artist>{song.artist}</Artist>
        </Details>
      </SongInfo>

      <Controls>
        <ControlButton onClick={onPrevious}>
          <SkipBack size={16} />
        </ControlButton>
        <ControlButton primary onClick={onPlayPause}>
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </ControlButton>
        <ControlButton onClick={onNext}>
          <SkipForward size={16} />
        </ControlButton>
      </Controls>

      <ProgressContainer>
        <ProgressBar>
          <Progress progress={progress} />
        </ProgressBar>
        <TimeDisplay>
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(totalTime)}</span>
        </TimeDisplay>
      </ProgressContainer>
    </Container>
  );
};
