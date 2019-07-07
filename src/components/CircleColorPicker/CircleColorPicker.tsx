import React, { useEffect, useRef } from "react";
import iro from "@jaames/iro";

export interface CircleColorPickerProps {
  color: string;
  width: number;
  onChange: (color: string) => void;
}

const CircleColorPicker = (
  props: CircleColorPickerProps
): React.FunctionComponentElement<CircleColorPickerProps> => {
  const { onChange, color, width } = props;

  const [inUse, setInUse] = React.useState(false);
  const colorPickerEl = useRef<HTMLDivElement>(null);
  const iroColorPicker = useRef<iro.ColorPicker | null>(null);

  // Initialize the color picker
  useEffect((): void => {
    iroColorPicker.current = new iro.ColorPicker(colorPickerEl.current, {
      // Set the size of the color picker
      // width,
      // Set the initial color to pure red
      // color,
      // Only use the color wheel
      layout: [
        {
          component: iro.ui.Wheel,
          options: {},
        },
      ],
    });
    iroColorPicker.current.on("input:start", (): void => setInUse(true));
    iroColorPicker.current.on("input:end", (): void => setInUse(false));
  }, []);

  // Reassign the onChange function if it changes
  useEffect((): (() => void) => {
    const test = ({ hexString }: iro.Color): void => {
      // hexString from iro.js is always lowercase but the API should always return uppercase
      onChange(hexString.toUpperCase());
    };

    if (iroColorPicker && iroColorPicker.current) {
      iroColorPicker.current.on("input:change", test);
    }

    return (): void => {
      if (iroColorPicker && iroColorPicker.current) {
        iroColorPicker.current.off("input:change", test);
      }
    };
  }, [onChange]);

  // Reassign the colorpicker's color if the color prop changes and the picker is not currently being used
  useEffect((): void => {
    if (!iroColorPicker || !iroColorPicker.current) {
      return;
    }
    // Don't reassign the color if it hasn't changed
    // We need to do this to prevent accidentally calling the input:change event twice
    if (iroColorPicker.current.color.hexString === color.toLowerCase()) {
      return;
    }
    if (inUse) {
      return;
    }
    iroColorPicker.current.color.hexString = color.toLowerCase();

    // We are not including inUse in the dependencies array because we do not want this effect to be triggered when inUse changes
    // We only want this effect to be triggered on a color change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);

  // Resize the colorpicker if the width prop changes
  useEffect((): void => {
    if (!iroColorPicker || !iroColorPicker.current) {
      return;
    }
    iroColorPicker.current.resize(width);
  }, [width]);

  return <div id="color-picker-container" ref={colorPickerEl} />;
};

CircleColorPicker.defaultProps = {
  color: "#FF0000",
  width: 320,
  onChange: (): void => {},
};

export default CircleColorPicker;
