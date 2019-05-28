import PropTypes from "prop-types";

export const lightColor = PropTypes.shape({
  r: PropTypes.number.isRequired,
  g: PropTypes.number.isRequired,
  b: PropTypes.number.isRequired
});

export const lightState = PropTypes.shape({
  id: PropTypes.string.isRequired,
  connected: PropTypes.bool,
  on: PropTypes.bool,
  brightness: PropTypes.number,
  color: lightColor,
  effect: PropTypes.string,
  speed: PropTypes.number
});

export const light = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  supportedEffects: PropTypes.arrayOf(PropTypes.string),
  ipAddress: PropTypes.string,
  macAddress: PropTypes.string,
  numLeds: PropTypes.number,
  udpPort: PropTypes.number,
  version: PropTypes.string,
  hardware: PropTypes.string,
  colorOrder: PropTypes.string,
  stripType: PropTypes.string,
  state: lightState
});
