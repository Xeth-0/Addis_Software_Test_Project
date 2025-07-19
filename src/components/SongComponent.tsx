import styled from '@emotion/styled';
import { Song } from '../types';

const SongContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background: white;
  border-bottom: 1px solid #e5e5e5;
  cursor: pointer;
  transition: background-color 0.1s ease;

  &:hover {
    background: #f7f7f7;
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

interface SongProps {
  song: Song;
  onClick?: () => void;
}

// TODO: Add delete and edit buttons.

export const SongComponent: React.FC<SongProps> = ({ song, onClick }) => {
  return (
    <SongContainer onClick={onClick}>
      <Thumbnail src={song.thumbnail} alt={`${song.album} artwork`} />
      <SongInfo>
        <Title>{song.title}</Title>
        <Details>{song.artist} • {song.album} • {song.year}</Details>
      </SongInfo>
      <Duration>{song.duration}</Duration>
    </SongContainer>
  );
};