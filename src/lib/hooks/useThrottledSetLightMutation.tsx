import React from "react";
import {
  useSetLightMutation,
  SetLightMutation,
  SetLightMutationVariables,
} from "generated/graphql";
import throttle from "lodash.throttle";
import { MutationHookOptions, MutationTuple } from "@apollo/react-hooks";
import { throttleSpeed } from "lib/graphqlConstants";

export const useThrottledSetLightMutation = (
  baseOptions?: MutationHookOptions<SetLightMutation, SetLightMutationVariables> | undefined
): MutationTuple<SetLightMutation, SetLightMutationVariables> => {
  const [setLight, result] = useSetLightMutation(baseOptions);

  // Use a ref here to store the value of setLightState so that it doesn't change on rerenders.
  // This is necessary for lodash throttle to function properly
  const { current: throttledSetLight } = React.useRef(throttle(setLight, throttleSpeed));

  return [throttledSetLight, result];
};
