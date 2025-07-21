import styled from "@emotion/styled";

export const SongContainer = styled.div`
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

  @media (max-width: 768px) {
    padding: 8px 12px;
  }

  @media (max-width: 768px) {
    .song-actions {
      opacity: 1;
    }
  }
`;

export const Thumbnail = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 4px;
  margin-right: 12px;
  object-fit: cover;
  flex-shrink: 0;
`;

export const SongInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const Title = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #000;
  margin-bottom: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Details = styled.div`
  font-size: 12px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Duration = styled.div`
  font-size: 12px;
  color: #999;
  margin-left: 8px;
  flex-shrink: 0;
`;

export const Actions = styled.div`
  display: flex;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.2s ease;
  margin-left: 8px;
`;

export const ActionButton = styled.button`
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

export const SongNumber = styled.div`
  font-size: 12px;
  color: #666;
  margin-right: 8px;
  flex-shrink: 0;
`; 