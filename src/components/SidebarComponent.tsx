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
import { Song } from "../store";
import {
  NowPlayingSidebarContainer,
  NowPlayingSidebarContainerArtwork,
  NowPlayingSidebarContainerMetadata,
} from "../styles/NowPlaying.styles";

interface SidebarComponentProps {
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
  nowPlaying: Song | null;
}

export const SidebarComponent = ({
  isSidebarCollapsed,
  toggleSidebar,
  activeNav,
  setActiveNav,
  nowPlaying,
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
          {nowPlaying && (
            <NowPlayingSidebarContainer className="now-playing-sidebar-container">
              <NowPlayingSidebarContainerArtwork className="now-playing-sidebar-container-artwork">
                <img
                  src={nowPlaying.images.large || nowPlaying.images.small || ""}
                  srcSet={`${nowPlaying.images.small} 60w, ${nowPlaying.images.medium} 420w, ${nowPlaying.images.large} 560w`}
                  sizes="(max-width: 600px) 60px, (max-width: 1024px) 420px, 560px"
                  alt="now-playing"
                  loading="lazy"
                />
              </NowPlayingSidebarContainerArtwork>
              <NowPlayingSidebarContainerMetadata className="now-playing-sidebar-container-metadata">
                <span id="now-playing-sidebar-container-metadata-title">
                  {nowPlaying.title}
                </span>
                <span id="now-playing-sidebar-container-metadata-artist">
                  {nowPlaying.artist}
                </span>
                <span id="now-playing-sidebar-container-metadata-album">
                  {nowPlaying.album}
                </span>
                <span id="now-playing-sidebar-container-metadata-year">
                  {nowPlaying.year}
                </span>
              </NowPlayingSidebarContainerMetadata>
            </NowPlayingSidebarContainer>
          )}
        </NavSection>
      </SidebarNav>
    </Sidebar>
  );
};

export default SidebarComponent;
