// FullScreenLoader.jsx
import React from "react";
import {
  Overlay,
  DotsWrapper,
  Dot,
} from "../styles/Loading.styles";

const overlayBg = "rgba(255, 255, 255, 0.85)";

const LoadingComponent = ({
  size = 16,
  color = "#3498db",
  overlayColor = overlayBg,
}) => (
  <Overlay style={{ backgroundColor: overlayColor }}>
    <DotsWrapper>
      <Dot size={size} color={color} delay="0s" />
      <Dot size={size} color={color} delay="0.16s" />
      <Dot size={size} color={color} delay="0.32s" />
    </DotsWrapper>
  </Overlay>
);

export default LoadingComponent;
