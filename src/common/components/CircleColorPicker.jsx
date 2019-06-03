import React from "react";
import PropTypes from "prop-types";
import { CustomPicker } from "react-color";
import iro from "@jaames/iro";

class CircleColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    const { hex, height, width } = this.props;
    this.colorWheel = new iro.ColorPicker(this.myRef.current, {
      color: hex,
      height: height || 320,
      width: width || 320,
    });
    this.colorWheel.on("color:change", this.onIroChange);
  }

  shouldComponentUpdate(nextProps) {
    const { hex } = this.props;
    return hex !== nextProps.hex;
  }

  componentDidUpdate(prevProps) {
    const { hex } = this.props;
    if (hex !== prevProps.hex) {
      this.colorWheel.color.hexString = hex;
    }
  }

  componentWillUnmount() {
    this.colorWheel.off("color:change", this.onIroChange);
  }

  onIroChange = color => {
    const { hex, onChange } = this.props;
    if (hex !== color.hexString) {
      onChange(color.hexString);
    }
  };

  render() {
    return <div className="ColorWheel" ref={this.myRef} />;
  }
}

CircleColorPicker.propTypes = {
  color: PropTypes.shape({
    r: PropTypes.number.isRequired,
    g: PropTypes.number.isRequired,
    b: PropTypes.number.isRequired,
  }).isRequired,
  hex: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
};

CircleColorPicker.defaultProps = {
  height: 320,
  width: 320,
};

export default CustomPicker(CircleColorPicker);
