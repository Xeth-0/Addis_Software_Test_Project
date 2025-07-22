export const lightTheme = {
  colors: {
    // Core backgrounds (tinted with 78B9B5)
    background: "#eaf6f5", 
    secondaryBackground: "#d2ecea", 
    tertiaryBackground: "#bfe2df", 

    // Text colors (maintain contrast)
    text: "#065084",
    secondaryText: "#0F828C",
    tertiaryText: "#320A6B",
    mutedText: "#78B9B5",

    // Interactive elements
    primary: "#0F828C",
    primaryHover: "#065084",
    secondary: "#320A6B",

    // UI elements
    border: "#0F828C",
    borderLight: "#78B9B5",
    hoverBackground: "#d2ecea",
    activeBackground: "#bfe2df",
    disabledBackground: "#eaf6f5",
    disabledText: "#bfe2df",

    // Overlays and shadows (keep overlays neutral for readability)
    overlay: "rgba(6, 80, 132, 0.08)",
    backdropBlur: "rgba(234, 246, 245, 0.95)",
    boxShadow: "0 2px 4px rgba(50, 10, 107, 0.08)",
    modalShadow: "0 20px 40px rgba(15, 130, 140, 0.18)",
    listShadow: "0 12px 20px rgba(120, 185, 181, 0.12)",
    loadingOverlay: "rgba(234, 246, 245, 0.85)",
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    fontSize: "16px",
  },
};

export const darkTheme = {
  colors: {
    // Core backgrounds (tinted with #222831 and #393E46)
    background: "#222831", 
    secondaryBackground: "#393E46", 
    tertiaryBackground: "#2d323a", 

    // Text colors (high contrast, inspired by #EEEEEE)
    text: "#EEEEEE", 
    secondaryText: "#bfc6ce", 
    tertiaryText: "#7e8a99", 
    mutedText: "#00ADB5", 

    // Interactive elements (tinted with #00ADB5)
    primary: "#00ADB5", 
    primaryHover: "#019ca3", 
    secondary: "#EEEEEE", 

    // UI elements
    border: "#00ADB5", 
    borderLight: "#393E46", 
    hoverBackground: "#31363f", 
    activeBackground: "#23272f", 
    disabledBackground: "#393E46", 
    disabledText: "#7e8a99", 

    // Overlays and shadows (cool, dark overlays)
    overlay: "rgba(34, 40, 49, 0.85)", 
    backdropBlur: "rgba(34, 40, 49, 0.95)", 
    boxShadow: "0 2px 4px rgba(0, 173, 181, 0.10)", 
    modalShadow: "0 20px 40px rgba(0, 173, 181, 0.18)", 
    listShadow: "0 12px 20px rgba(0, 173, 181, 0.10)", 
    loadingOverlay: "rgba(34, 40, 49, 0.85)", 
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    fontSize: "16px",
  },
};
