// FullScreenLoader.jsx
import React from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const overlayBg = "rgba(255, 255, 255, 0.85)";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${overlayBg};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const bounce = keyframes`
  0%, 80%, 100% { transform: scale(0); }
  40%          { transform: scale(1); }
`;

const DotsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Dot = styled.div<{ size: number; color: string; delay: string }>`
  background-color: ${(props) => props.color};
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 50%;
  margin: 0 ${(props) => props.size / 2}px;
  animation: ${bounce} 1.4s infinite ease-in-out both;
  animation-delay: ${(props) => props.delay};
`;

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
