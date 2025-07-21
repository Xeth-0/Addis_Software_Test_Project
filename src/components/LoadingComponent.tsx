import { Overlay, DotsWrapper, Dot } from "../styles/Loading.styles";

const LoadingComponent = ({
  size = 16,
  color = "#3498db",
}) => {

  return (
    <Overlay>
      <DotsWrapper>
        <Dot size={size} color={color} delay="0s" />
        <Dot size={size} color={color} delay="0.16s" />
        <Dot size={size} color={color} delay="0.32s" />
      </DotsWrapper>
    </Overlay>
  );
};

export default LoadingComponent;
