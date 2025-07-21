import styled from "@emotion/styled";

export const SongListContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.colors.listShadow};

  @media (max-width: 768px) {
    padding: 0;
    margin: 0;
  }
`;

export const Header = styled.div`
  padding: 16px;
  height: 5vh;
  background: ${({ theme }) => theme.colors.secondaryBackground};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const AddButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  color: white;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`;

export const List = styled.div`
  background: ${({ theme }) => theme.colors.background};
  flex: 1;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: ${({ theme }) => theme.colors.tertiaryBackground};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  flex-wrap: wrap;
`;

export const SliderContainer = styled.div`
  padding: 12px 16px;
  background: ${({ theme }) => theme.colors.tertiaryBackground};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: 300px;
`;

export const SliderLabel = styled.label`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.secondaryText};
  flex-shrink: 0;
  min-width: 90px;
`;

export const SliderInput = styled.input`
  flex: 1;
  height: 4px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 2px;
  outline: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: ${({ theme }) => theme.colors.primaryHover};
    }
  }

  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 50%;
    border: none;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: ${({ theme }) => theme.colors.primaryHover};
    }
  }
`;

export const SliderValue = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  flex-shrink: 0;
  min-width: 24px;
  text-align: center;
`;

export const ThemeToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  svg {
    display: block;
  }
`;
