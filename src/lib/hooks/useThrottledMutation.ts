import React from "react";
import throttle from "lodash.throttle";

const throttleSpeed = process.env.REACT_APP_ENV === "test" ? 0 : 500;

/**
 * This hook will throttle any graphql mutation function passed to it
 * @param mutation mutation function
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useThrottledMutation = <T extends (...args: any) => any>(mutation: T): T => {
  // Use a ref here to store the value of setLightState so that it doesn't change on rerenders.
  // This is necessary for lodash throttle to function properly
  const { current: throttledMutation } = React.useRef(throttle(mutation, throttleSpeed));

  return throttledMutation;
};
