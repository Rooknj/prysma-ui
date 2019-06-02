import gql from "graphql-tag";

const LIGHT_FIELDS = gql`
  fragment lightFields on Light {
    id
    name
    supportedEffects
    ipAddress
    macAddress
    numLeds
    udpPort
    version
    hardware
    colorOrder
    stripType
  }
`;

const LIGHT_STATE_FIELDS = gql`
  fragment lightStateFields on LightState {
    id
    connected
    on
    brightness
    color {
      r
      g
      b
    }
    effect
    speed
  }
`;

// This needs LIGHT_STATE_FIELDS for some reason
export const LIGHT_ADDED = gql`
  subscription lightAdded {
    lightAdded {
      ...lightFields
      state {
        ...lightStateFields
      }
    }
  }
  ${LIGHT_FIELDS}
  ${LIGHT_STATE_FIELDS}
`;

// This can not have LIGHT_STATE_FIELDS for some reason
export const LIGHT_REMOVED = gql`
  subscription lightRemoved {
    lightRemoved {
      ...lightFields
    }
  }
  ${LIGHT_FIELDS}
`;

export const LIGHT_CHANGED = gql`
  subscription lightChanged {
    lightChanged {
      ...lightFields
    }
  }
  ${LIGHT_FIELDS}
`;

export const LIGHT_STATE_CHANGED = gql`
  subscription lightStateChanged {
    lightStateChanged {
      ...lightStateFields
    }
  }
  ${LIGHT_STATE_FIELDS}
`;

export const LIGHT = gql`
  query light($lightId: String!) {
    light(lightId: $lightId) {
      ...lightFields
      state {
        ...lightStateFields
      }
    }
  }
  ${LIGHT_FIELDS}
  ${LIGHT_STATE_FIELDS}
`;

export const LIGHTS = gql`
  query lights {
    lights {
      ...lightFields
      state {
        ...lightStateFields
      }
    }
  }
  ${LIGHT_FIELDS}
  ${LIGHT_STATE_FIELDS}
`;

export const SET_LIGHT = gql`
  mutation setLight($lightId: String!, $lightData: LightInput!) {
    setLight(lightId: $lightId, lightData: $lightData) {
      ...lightFields
    }
  }
  ${LIGHT_FIELDS}
`;

export const SET_LIGHT_STATE = gql`
  mutation setLightState($lightId: String!, $lightState: LightStateInput!) {
    setLightState(lightId: $lightId, lightState: $lightState) {
      ...lightStateFields
    }
  }
  ${LIGHT_STATE_FIELDS}
`;

export const ADD_LIGHT = gql`
  mutation addLight($lightId: String!, $lightData: LightInput) {
    addLight(lightId: $lightId, lightData: $lightData) {
      ...lightFields
    }
  }
  ${LIGHT_FIELDS}
`;

export const REMOVE_LIGHT = gql`
  mutation removeLight($lightId: String!) {
    removeLight(lightId: $lightId) {
      ...lightFields
    }
  }
  ${LIGHT_FIELDS}
`;

export const DISCOVERED_LIGHTS = gql`
  query discoveredLights {
    discoveredLights {
      ...lightFields
    }
  }
  ${LIGHT_FIELDS}
`;
