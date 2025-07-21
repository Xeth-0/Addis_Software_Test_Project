import styled from "@emotion/styled";

export const SongListContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0;
  background: white;
  border-radius: 8px;
  overflow-y: scroll;
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 0;
    margin: 0;
  }
`;

export const Header = styled.div`
  padding: 16px;
  height: 5vh;
  background: #f8f8f8;
  border-bottom: 1px solid #e5e5e5;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

export const AddButton = styled.button`
  background: #3E065F;
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
    background: #00a037;
  }
`;

export const List = styled.div`
  background: white;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const SliderContainer = styled.div`
  padding: 12px 16px;
  background: #fafafa;
  border-bottom: 1px solid #e5e5e5;
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
  color: #666;
  flex-shrink: 0;
  min-width: 90px;
`;

export const SliderInput = styled.input`
  flex: 1;
  height: 4px;
  background: #e5e5e5;
  border-radius: 2px;
  outline: none;
  cursor: pointer;
  
  &::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    background: #005503;
    border-radius: 50%;
    cursor: pointer;
    transition: background 0.2s ease;
    
    &:hover {
      background: #00a037;
    }
  }
  
  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background: #005503;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    transition: background 0.2s ease;
    
    &:hover {
      background: #00a037;
    }
  }
`;

export const SliderValue = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #333;
  flex-shrink: 0;
  min-width: 24px;
  text-align: center;
`; 