import { useMutation } from "react-apollo-hooks";
import { SET_LIGHT_STATE } from "common/graphqlConstants.js";
import React from "react";
import { throttle } from "lodash";
const throttleSpeed = process.env.REACT_APP_ENV === "test" ? 0 : 500;

const useSetLightState = () => {
  const setLightState = useMutation(SET_LIGHT_STATE);

  // Use a ref here to store the value of setLightState so that it doesn't change on rerenders.
  // This is necessary for lodash throttle to function properly
  const { current: throttledSetLightState } = React.useRef(
    throttle(setLightState, throttleSpeed)
  );

  const optimisticSetLightState = (
    lightId,
    newLightState,
    currentLightState = null
  ) => {
    let optimisticResponse;
    // If the currentLightState is provided
    if (currentLightState && Object.entries(currentLightState).length === 0) {
      const newColor = Object.assign(
        {},
        currentLightState.color,
        newLightState.color
      );
      // Set up the optimistic response
      optimisticResponse = {
        __typename: "Mutation",
        setLightState: {
          __typename: "LightState",
          ...currentLightState,
          ...newLightState,
          color: newColor,
        },
      };
    }

    return throttledSetLightState({
      variables: {
        lightId: lightId,
        lightState: newLightState,
      },
      optimisticResponse,
    });
  };

  return optimisticSetLightState;
};

export default useSetLightState;
