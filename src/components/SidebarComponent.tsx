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
import { useEffect, useRef } from "react";
import { useTheme } from "../styles/theme/ThemeContext";

const useScrollingText = (text: string) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const parentElement = el.parentElement;
    if (!parentElement) return;

    const isOverflowing = el.scrollWidth > parentElement.offsetWidth;
    if (isOverflowing) {
      const distance = el.scrollWidth - parentElement.offsetWidth + 20;
      el.style.animation = `scroll-text 4s infinite alternate ease-in-out`;
      el.style.setProperty("--scroll-distance", `-${distance}px`);
      el.style.textAlign = "left";
    } else {
      el.style.animation = "none";
      el.style.textAlign = "center";
    }
  }, [text]);

  return ref;
};

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
  const titleRef = useScrollingText(nowPlaying?.title || "");
  const artistRef = useScrollingText(nowPlaying?.artist || "");
  const albumRef = useScrollingText(nowPlaying?.album || "");
  const yearRef = useScrollingText(nowPlaying?.year?.toString() || "");
  const { isDark } = useTheme();

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
            <NowPlayingSidebarContainerMetadata
              className="now-playing-sidebar-container-metadata"
              isCollapsed={isSidebarCollapsed}
            >
              <span
                id="now-playing-sidebar-container-metadata-title"
                ref={titleRef}
              >
                {nowPlaying.title}
              </span>
              <span
                id="now-playing-sidebar-container-metadata-artist"
                ref={artistRef}
              >
                {nowPlaying.artist}
              </span>
              <span
                id="now-playing-sidebar-container-metadata-album"
                ref={albumRef}
              >
                {nowPlaying.album}
              </span>
              <span
                id="now-playing-sidebar-container-metadata-year"
                ref={yearRef}
              >
                {nowPlaying.year}
              </span>
            </NowPlayingSidebarContainerMetadata>
          </NowPlayingSidebarContainer>
        )}
      </SidebarNav>
    </Sidebar>
  );
};

export default SidebarComponent;
