import React from "react";
import {
  useSetLightMutation,
  SetLightMutation,
  SetLightMutationVariables,
} from "generated/graphql";
import throttle from "lodash.throttle";
import { MutationFn, MutationHookOptions } from "react-apollo-hooks";

const throttleSpeed = process.env.REACT_APP_ENV === "test" ? 0 : 500;

export const useThrottledSetLightMutation = (
  baseOptions?: MutationHookOptions<SetLightMutation, SetLightMutationVariables, object> | undefined
): MutationFn<SetLightMutation, SetLightMutationVariables> & {
  cancel(): void;
  flush(): void;
} => {
  const setLight = useSetLightMutation(baseOptions);

  // Use a ref here to store the value of setLightState so that it doesn't change on rerenders.
  // This is necessary for lodash throttle to function properly
  const { current: throttledSetLight } = React.useRef(throttle(setLight, throttleSpeed));

  return throttledSetLight;
};
