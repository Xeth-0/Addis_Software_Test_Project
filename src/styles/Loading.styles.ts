import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

export const Overlay = styled.div`
  width: 100%;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.loadingOverlay};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const bounce = keyframes`
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
`;

export const DotsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Dot = styled.div<{
  size: number;
  color?: string;
  delay: string;
}>`
  background-color: ${(props) => props.color || props.theme.colors.primary};
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 50%;
  margin: 0 ${(props) => props.size / 2}px;
  animation: ${bounce} 1.4s infinite ease-in-out both;
  animation-delay: ${(props) => props.delay};
`; 