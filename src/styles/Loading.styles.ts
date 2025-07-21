import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const overlayBg = "rgba(255, 255, 255, 0.85)";

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${overlayBg};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

export const bounce = keyframes`
  0%, 80%, 100% { transform: scale(0); }
  40%          { transform: scale(1); }
`;

export const DotsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Dot = styled.div<{ size: number; color: string; delay: string }>`
  background-color: ${(props) => props.color};
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 50%;
  margin: 0 ${(props) => props.size / 2}px;
  animation: ${bounce} 1.4s infinite ease-in-out both;
  animation-delay: ${(props) => props.delay};
`; 