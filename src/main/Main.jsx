import React from "react";
import { useQuery, useMutation, useSubscription } from "react-apollo-hooks";
import {
  LIGHTS,
  SET_LIGHT_STATE,
  LIGHT_CHANGED,
  LIGHT_STATE_CHANGED,
  LIGHT_ADDED,
  LIGHT_REMOVED
} from "common/graphqlConstants.js";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { throttle } from "lodash";

const Main = () => {
  const {
    data,
    error,
    loading,
    networkStatus,
    refetch
    //updateQuery
  } = useQuery(LIGHTS, {
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true
  });
  const setLightState = useMutation(SET_LIGHT_STATE);
  const sub1 = useSubscription(LIGHT_CHANGED, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      console.log(subscriptionData);
    }
  });
  const sub2 = useSubscription(LIGHT_STATE_CHANGED, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      console.log(subscriptionData);
    }
  });
  const sub3 = useSubscription(LIGHT_ADDED, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      console.log(subscriptionData);
    }
  });
  const sub4 = useSubscription(LIGHT_REMOVED, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      console.log(subscriptionData);
    }
  });

  const throttleSpeed = process.env.REACT_APP_ENV === "test" ? 0 : 500;
  const throttledSetLightState = throttle(setLightState, throttleSpeed);
  const handleStateChange = lightState => e => {
    const newLightState = {
      on: e.target.checked
    };

    const newColor = Object.assign({}, lightState.color, newLightState.color);
    // Set up the optimistic response
    const optimisticResponse = {
      __typename: "Mutation",
      setLightState: {
        __typename: "LightState",
        ...lightState,
        ...newLightState,
        color: newColor
      }
    };

    throttledSetLightState({
      variables: {
        lightId: lightState.id,
        lightState: newLightState
      },
      optimisticResponse
    })
      .then(data => console.log("Mutation Data", data))
      .catch(error => console.error("Mutation Error", error));
  };

  let Body;
  if (loading || networkStatus === 4) {
    Body = <div>Loading...</div>;
  } else if (error) {
    Body = <div>Error</div>;
  } else {
    Body = data.lights.map(light => (
      <FormControlLabel
        key={light.id}
        control={
          <Switch
            checked={light.state.on}
            onChange={handleStateChange(light.state)}
            disabled={!light.state.connected}
            color="primary"
          />
        }
        label={light.name}
        labelPlacement="start"
      />
    ));
  }
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Light List</FormLabel>
      <FormGroup aria-label="position" name="position">
        <Button onClick={() => refetch()}>Refetch</Button>
        {Body}
      </FormGroup>
    </FormControl>
  );
};

export default Main;
