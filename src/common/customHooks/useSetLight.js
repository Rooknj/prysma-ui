import { useMutation } from "react-apollo-hooks";
import { SET_LIGHT } from "common/graphqlConstants.js";
import React from "react";
import { throttle } from "lodash";
const throttleSpeed = process.env.REACT_APP_ENV === "test" ? 0 : 500;

const useSetLight = () => {
  const setLight = useMutation(SET_LIGHT);

  // Use a ref here to store the value of setLightState so that it doesn't change on rerenders.
  // This is necessary for lodash throttle to function properly
  const { current: throttledSetLight } = React.useRef(
    throttle(setLight, throttleSpeed)
  );

  const easySetLight = (lightId, lightData) => {
    return throttledSetLight({
      variables: {
        lightId,
        lightData,
      },
    });
  };

  return easySetLight;
};

export default useSetLight;
