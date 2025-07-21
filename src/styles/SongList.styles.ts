import styled from "@emotion/styled";

export const SongListContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  background: white;
  border-radius: 8px;
  overflow-y: scroll;
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    max-width: 400px;
    margin: 0 auto;
  }
`;

export const Header = styled.div`
  padding: 16px;
  height: 5vh;
  background: #f8f8f8;
  border-bottom: 1px solid #e5e5e5;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

export const AddButton = styled.button`
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

export const List = styled.div`
  background: white;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
`; 