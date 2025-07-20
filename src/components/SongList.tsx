import styled from "@emotion/styled";
import { SongComponent } from "./SongComponent";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { fetchSongsRequest, Song } from "../types";
import { RootState } from "../store";

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
  title?: string;
}

export const SongList: React.FC<SongListProps> = ({ title = "Songs" }) => {
  const songs = useSelector((state: RootState) => state.songs.list);
  const loading = useSelector((state: RootState) => state.songs.loading);
  const error = useSelector((state: RootState) => state.songs.error);

  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch songs from Mirage server using redux-saga
    dispatch(fetchSongsRequest());
  }, []);

  if (loading) {
    return <div>Loading songs...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleSongClick = (song: Song) => {
    console.log("Playing:", song.title);
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
