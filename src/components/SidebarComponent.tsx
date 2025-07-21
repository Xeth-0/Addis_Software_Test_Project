import {
  NavItem,
  NavSection,
  NavText,
  SectionTitle,
  Sidebar,
  SidebarNav,
  SidebarHeader,
} from "../styles/App.styles";
import { AppTitle } from "../styles/App.styles";
import { ToggleButton } from "../styles/App.styles";
import { ChevronRight } from "lucide-react";
import { ChevronLeft } from "lucide-react";
import { Music } from "lucide-react";
import { Heart } from "lucide-react";
import { Settings } from "lucide-react";

interface SidebarComponentProps {
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
}

export const SidebarComponent = ({
  isSidebarCollapsed,
  toggleSidebar,
  activeNav,
  setActiveNav,
}: SidebarComponentProps) => {
  return (
    <Sidebar isCollapsed={isSidebarCollapsed}>
      <SidebarHeader
        className="sidebar-header"
        isCollapsed={isSidebarCollapsed}
      >
        <AppTitle className="app-title" isCollapsed={isSidebarCollapsed}>
          Music App
        </AppTitle>
        <ToggleButton onClick={toggleSidebar}>
          {isSidebarCollapsed ? (
            <ChevronRight size={16} />
          ) : (
            <ChevronLeft size={16} />
          )}
        </ToggleButton>
      </SidebarHeader>

      <SidebarNav>
        <NavSection>
          <SectionTitle isCollapsed={isSidebarCollapsed}>Music</SectionTitle>
          <NavItem
            active={activeNav === "library"}
            isCollapsed={isSidebarCollapsed}
            onClick={() => setActiveNav("library")}
          >
            <span>
              <Music size={20} />
            </span>
            {!isSidebarCollapsed && (
              <NavText isCollapsed={false}>Library</NavText>
            )}
          </NavItem>
          <NavItem
            active={activeNav === "favorites"}
            isCollapsed={isSidebarCollapsed}
            onClick={() => setActiveNav("favorites")}
          >
            <span>
              <Heart size={20} />
            </span>
            {!isSidebarCollapsed && (
              <NavText isCollapsed={false}>Favorites</NavText>
            )}
          </NavItem>
        </NavSection>

        <NavSection>
          
        </NavSection>
      </SidebarNav>
    </Sidebar>
  );
};

export default SidebarComponent;
