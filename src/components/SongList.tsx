import styled from '@emotion/styled';
import { SongComponent } from './SongComponent';
import { Song as SongType } from '../types';

const Container = styled.div`
	width: 80%;
	height: 100%;
  margin: 0 auto;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: 16px;
  background: #f8f8f8;
  border-bottom: 1px solid #e5e5e5;
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

const List = styled.div`
  background: white;
`;

interface SongListProps {
  songs: SongType[];
  title?: string;
}

export const SongList: React.FC<SongListProps> = ({ songs, title = "Songs" }) => {
  const handleSongClick = (song: SongType) => {
    console.log('Playing:', song.title);
  };

  return (
    <Container>
      <Header>{title}</Header>
      <List>
        {songs.map((song) => (
          <SongComponent 
            key={song.id} 
            song={song} 
            onClick={() => handleSongClick(song)}
          />
        ))}
      </List>
    </Container>
  );
};