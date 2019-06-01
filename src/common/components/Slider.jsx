import React from "react";
import Slider from "@material-ui/lab/Slider";
import styled from "styled-components";

const StyledSlider = styled(Slider)`
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const SmoothSlider = props => {
  const { value, onChange, ...other } = props;
  const [internalValue, setInternalValue] = React.useState(value);

  React.useEffect(() => {
    setInternalValue(value);
  }, [value]); // Only re-run the effect if count changes

  const handleChange = (_, newValue) => {
    setInternalValue(newValue);
    onChange(newValue);
  };

  return (
    <StyledSlider value={internalValue} onChange={handleChange} {...other} />
  );
};

export default SmoothSlider;
