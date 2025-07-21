import styled from "@emotion/styled";

export const Container = styled.div`
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(248, 248, 248, 0.95);
  backdrop-filter: blur(20px);
  border-top: 1px solid #e5e5e5;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  z-index: 100;
  margin-top: auto;
`;

export const SongInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
`;

export const Thumbnail = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  object-fit: cover;
`;

export const Details = styled.div`
  min-width: 0;
  flex: 1;
`;

export const Title = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Artist = styled.div`
  font-size: 12px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ControlButton = styled.button<{ primary?: boolean }>`
  background: ${(props) => (props.primary ? "#007AFF" : "none")};
  border: none;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  color: ${(props) => (props.primary ? "white" : "#666")};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${(props) => (props.primary ? "#0056CC" : "#e0e0e0")};
    color: ${(props) => (props.primary ? "white" : "#333")};
  }
`;

export const ProgressContainer = styled.div`
  flex: 1;
  max-width: 300px;
  margin: 0 16px;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: #e0e0e0;
  border-radius: 2px;
  overflow: hidden;
`;

export const Progress = styled.div<{ progress: number }>`
  height: 100%;
  background: #007aff;
  width: ${(props) => props.progress}%;
  transition: width 0.1s ease;
`;

export const TimeDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: #666;
  margin-top: 4px;
`; 