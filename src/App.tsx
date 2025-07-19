import styled from "@emotion/styled";
import { SongList } from "./components/SongList";
import { mockSongs } from "./mirage/data/songsMockData"; // TODO: API call from mirage later
import "./index.css";

const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  min-height: 100vh;
  padding: 20px;
  background-color:rgb(235, 221, 221);
`;

const App = () => {
  return (
    <AppContainer>
      <SongList songs={[...mockSongs, ...mockSongs, ...mockSongs, ...mockSongs, ...mockSongs, ...mockSongs, ...mockSongs]} title="MUSIC!!!" />
    </AppContainer>
  );
};

export default App;
