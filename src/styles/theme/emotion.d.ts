import "@emotion/react";

// Cursor generated. Didn't know this was required for emotion.

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      // Core backgrounds
      background: string;
      secondaryBackground: string;
      tertiaryBackground: string;

      // Text colors
      text: string;
      secondaryText: string;
      tertiaryText: string;
      mutedText: string;

      // Interactive elements
      primary: string;
      primaryHover: string;
      secondary: string;

      // UI elements
      border: string;
      borderLight: string;
      hoverBackground: string;
      activeBackground: string;
      disabledBackground: string;
      disabledText: string;

      // Overlays and shadows
      overlay: string;
      backdropBlur: string;
      boxShadow: string;
      modalShadow: string;
      listShadow: string;
      loadingOverlay: string;
    };
    typography: {
      fontFamily: string;
      fontSize: string;
    };
  }
}
