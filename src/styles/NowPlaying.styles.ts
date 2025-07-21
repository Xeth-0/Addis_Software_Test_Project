import styled from "@emotion/styled";

export const Container = styled.div`
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.backdropBlur};
  backdrop-filter: blur(20px);
  border-top: 1px solid ${({ theme }) => theme.colors.border};
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
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Artist = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.secondaryText};
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
  background: ${(props) => (props.primary ? props.theme.colors.primary : "none")};
  border: none;
  padding: 8px;
  border-radius: 50%;
  cursor: pointer;
  color: ${(props) => (props.primary ? "white" : props.theme.colors.secondaryText)};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${(props) => (props.primary ? props.theme.colors.primaryHover : props.theme.colors.hoverBackground)};
    color: ${(props) => (props.primary ? "white" : props.theme.colors.text)};
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
  background: ${({ theme }) => theme.colors.disabledBackground};
  border-radius: 2px;
  overflow: hidden;
`;

export const Progress = styled.div<{ progress: number }>`
  height: 100%;
  background: ${({ theme }) => theme.colors.primary};
  width: ${(props) => props.progress}%;
  transition: width 0.1s ease;
`;

export const TimeDisplay = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.tertiaryText};
  margin-top: 4px;
`;

export const NowPlayingSidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

export const NowPlayingSidebarContainerArtwork = styled.div`
  width: 100%;
  display: flex;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  margin: 20px;

  img {
    width: 100%;
    height: auto;
    border-radius: 4px;
    display: block;
    object-fit: cover;
  }
`;

export const NowPlayingSidebarContainerMetadata = styled.div<{
  isCollapsed: boolean;
}>`
  display: ${(props) => (props.isCollapsed ? "none" : "flex")};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 4px;
  overflow: hidden;

  span {
    width: max-content;
    width: 90%;
    text-align: center;
    white-space: nowrap;
    display: block;
  }

  #now-playing-sidebar-container-metadata-title {
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
  }

  #now-playing-sidebar-container-metadata-artist {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.secondaryText};
    font-weight: 500;
  }

  #now-playing-sidebar-container-metadata-album {
    font-size: 13px;
    color: ${({ theme }) => theme.colors.mutedText};
  }

  #now-playing-sidebar-container-metadata-year {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.tertiaryText};
  }

  @keyframes scroll-text {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(var(--scroll-distance));
    }
  }
`;
