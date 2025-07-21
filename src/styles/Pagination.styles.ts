import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  background: #f8f8f8;
  border-top: 1px solid #e5e5e5;
  border-radius: 0 0 8px 8px;
  width: 100%;
  flex-shrink: 0;
`;

export const Button = styled.button<{ disabled?: boolean }>`
  background: ${(props) => (props.disabled ? "#f0f0f0" : "white")};
  border: 1px solid #ddd;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  color: ${(props) => (props.disabled ? "#999" : "#333")};
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;

  &:hover {
    background: ${(props) => (props.disabled ? "#f0f0f0" : "#00a0b7")};
  }
`;

export const PageInfo = styled.span`
  font-size: 14px;
  color: #666;
  margin: 0 16px;
`; 