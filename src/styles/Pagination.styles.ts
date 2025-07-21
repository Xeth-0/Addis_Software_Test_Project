import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  background: ${({ theme }) => theme.colors.secondaryBackground};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0 0 8px 8px;
  width: 100%;
  flex-shrink: 0;
`;

export const Button = styled.button<{ disabled?: boolean }>`
  background: ${(props) => (props.disabled ? props.theme.colors.disabledBackground : props.theme.colors.background)};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  padding: 8px 12px;
  border-radius: 6px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  color: ${(props) => (props.disabled ? props.theme.colors.disabledText : props.theme.colors.text)};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 1em;

  &:hover {
    background: ${(props) => (props.disabled ? props.theme.colors.disabledBackground : props.theme.colors.primary)};
    color: ${(props) => (props.disabled ? props.theme.colors.disabledText : "white")};
  }

  @media (max-width: 768px) {
    font-size: 0.8em;
  }
`;

export const PageInfo = styled.span`
  font-size: 1em;
  color: ${({ theme }) => theme.colors.secondaryText};
  margin: 0 16px;

  @media (max-width: 768px) {
    font-size: 0.8em;
  }
`; 