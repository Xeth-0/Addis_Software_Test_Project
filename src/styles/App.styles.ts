import styled from "@emotion/styled";

export const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Sidebar = styled.div<{ isCollapsed: boolean }>`
  width: ${(props) => (props.isCollapsed ? "60px" : "240px")};
  background: ${({ theme }) => theme.colors.secondaryBackground};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  flex-shrink: 0;
  z-index: 10;

  @media (max-width: 768px) {
    position: fixed;
    left: ${(props) => (props.isCollapsed ? "-240px" : "0")};
    width: 240px;
    height: 100vh;
    box-shadow: ${(props) =>
      props.isCollapsed ? "none" : `${props.theme.colors.boxShadow}`};
  }
`;

export const SidebarHeader = styled.div<{ isCollapsed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.isCollapsed ? "center" : "space-between"};
  padding: 16px;
  height: 5vh;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
`;

export const AppTitle = styled.h1<{ isCollapsed: boolean }>`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  opacity: ${(props) => (props.isCollapsed ? "0" : "1")};
  transition: opacity 0.3s ease;
  white-space: nowrap;
  overflow: hidden;
`;

export const ToggleButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.hoverBackground};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const SidebarNav = styled.nav`
  flex: 1;
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const NavSection = styled.div`
  margin-bottom: 24px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const SectionTitle = styled.h3<{ isCollapsed: boolean }>`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.secondaryText};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 8px 0;
  padding: 0 16px;
  opacity: ${(props) => (props.isCollapsed ? "0" : "1")};
  transition: opacity 0.3s ease;
`;

export const NavItem = styled.div<{ active?: boolean; isCollapsed: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  margin: 0 8px;
  border-radius: 8px;
  cursor: pointer;
  background: ${(props) =>
    props.active ? props.theme.colors.primary : "transparent"};
  color: ${(props) => (props.active ? "white" : props.theme.colors.text)};
  transition: all 0.2s ease;
  justify-content: ${(props) => (props.isCollapsed ? "center" : "flex-start")};

  &:hover {
    background: ${(props) =>
      props.active
        ? props.theme.colors.primaryHover
        : props.theme.colors.hoverBackground};
  }
`;

export const NavText = styled.span<{ isCollapsed: boolean }>`
  opacity: ${(props) => (props.isCollapsed ? "0" : "1")};
  transition: opacity 0.3s ease;
  white-space: nowrap;
  overflow: hidden;
`;

export const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

export const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0;

  @media (max-width: 768px) {
    padding-bottom: 0;
  }
`;

export const SongListWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  margin-bottom: 20px;
`;

export const PaginationWrapper = styled.div`
  flex-shrink: 0;
`;

export const PlayerWrapper = styled.div`
  flex-shrink: 0;
`;

export const MobileOverlay = styled.div<{ isVisible: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: ${(props) => (props.isVisible ? "block" : "none")};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.colors.overlay};
    z-index: 5;
  }
`;

export const MobileToggle = styled.button<{ isVisible: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: ${(props) => (props.isVisible ? "flex" : "none")};
    position: fixed;
    top: 16px;
    left: 16px;
    z-index: 15;
    background: ${({ theme }) => theme.colors.background};
    border: 1px solid ${({ theme }) => theme.colors.border};
    padding: 12px;
    border-radius: 12px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    box-shadow: ${({ theme }) => theme.colors.boxShadow};
    transition: all 0.2s ease;

    &:hover {
      background: ${({ theme }) => theme.colors.hoverBackground};
      transform: scale(1.05);
    }

    &:active {
      transform: scale(0.95);
    }

    @media (max-width: 768px) {
      float: right;
    }
  }
`;
