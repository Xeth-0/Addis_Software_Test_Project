export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  year: number;
  images: {
    small: string | null;
    medium: string | null;
    large: string | null;
  };
  previewUrl: string | null;
  duration: string;
}

export interface NowPlaying {
  song: Song | null;
  isPlaying: boolean;
  currentTime: number;
  totalTime: number;
}
