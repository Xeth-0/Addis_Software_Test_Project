import styled from "@emotion/styled";

export const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
  background-color: rgb(235, 221, 221);
`;

export const Sidebar = styled.div<{ isCollapsed: boolean }>`
  width: ${(props) => (props.isCollapsed ? "60px" : "240px")};
  background: #f8f9fa;
  border-right: 1px solid #e5e7eb;
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
    box-shadow: ${(props) => (props.isCollapsed ? "none" : "2px 0 8px rgba(0,0,0,0.1)")};
  }
`;

export const SidebarHeader = styled.div<{ isCollapsed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.isCollapsed ? "center" : "space-between")};
  padding: 16px;
  height: 5vh;
  border-bottom: 1px solid #e5e7eb;
  background: #fff;
`;

export const AppTitle = styled.h1<{ isCollapsed: boolean }>`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
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
  color: #6b7280;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: #f3f4f6;
    color: #374151;
  }
`;

export const SidebarNav = styled.nav`
  flex: 1;
  padding: 16px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const NavSection = styled.div`
  margin-bottom: 24px;
`;

export const SectionTitle = styled.h3<{ isCollapsed: boolean }>`
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
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
  background: ${(props) => (props.active ? "#3b82f6" : "transparent")};
  color: ${(props) => (props.active ? "white" : "#374151")};
  transition: all 0.2s ease;
  justify-content: ${(props) => (props.isCollapsed ? "center" : "flex-start")};

  &:hover {
    background: ${(props) => (props.active ? "#2563eb" : "#f3f4f6")};
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
    background: rgba(0, 0, 0, 0.5);
    z-index: 5;
  }
`;

export const MobileToggle = styled.button<{ isVisible: boolean }>`
  display: none;
  
  @media (max-width: 768px) {
    display: ${(props) => (props.isVisible ? "flex" : "none")};
    position: fixed;
    top: 2px;
    left: 2px;
    z-index: 15;
    background: white;
    border: 1px solid #e5e7eb;
    padding: 8px;
    border-radius: 8px;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
`; 