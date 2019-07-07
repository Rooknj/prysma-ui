import React, { ChangeEvent } from "react";
import Slider, { SliderProps } from "@material-ui/lab/Slider";
import styled from "styled-components";
import { isArray } from "util";

const StyledSlider = styled(Slider)`
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

interface SmoothSliderProps extends Omit<SliderProps, "value" | "onChange"> {
  value: number;
  onChange: (value: number) => void;
}

const SmoothSlider = (
  props: SmoothSliderProps
): React.FunctionComponentElement<SmoothSliderProps> => {
  const { value, onChange, ...other } = props;
  const [internalValue, setInternalValue] = React.useState(value);

  // TODO: Figure out how to make a smooth animation when updating brightness through subscriptions
  React.useEffect((): void => {
    setInternalValue(value);
  }, [value]); // Only re-run the effect if count changes

  const handleChange = (_: ChangeEvent<{}>, newValue: number | number[]): void => {
    if (isArray(newValue)) return;
    setInternalValue(newValue);
    onChange(newValue);
  };

  return <StyledSlider value={internalValue} onChange={handleChange} {...other} />;
};

SmoothSlider.defaultProps = {
  onChange: (): void => {},
};

export default SmoothSlider;
