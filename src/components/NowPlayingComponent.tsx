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
          src={
            song.images.small || song.images.medium || song.images.large || "https://via.placeholder.com/150"
          }
          alt={`${song.album} artwork`}
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
