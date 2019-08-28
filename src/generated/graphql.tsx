// ---------------------------------------------------
// !!! THIS FILE WAS GENERATED BY GRAPHQL-CODEGEN !!!
// !!!    DO NOT MODIFY THIS FILE BY YOURSELF     !!!
// --------------------------------------------------
import gql from "graphql-tag";
import * as ApolloReactCommon from "@apollo/react-common";
import * as ApolloReactHooks from "@apollo/react-hooks";
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** Object representing a Light */
export type Light = {
  __typename?: "Light";
  id: Scalars["ID"];
  /** The display name of the Light */
  name: Scalars["String"];
  /** Whether the light is connected to the MQTT broker or not */
  connected: Scalars["Boolean"];
  /** Whether the light is switched on or not */
  on: Scalars["Boolean"];
  /** The brightness of the light as a percentage from 0-100 */
  brightness: Scalars["Int"];
  /** The current color of the light in hexadecimal notation */
  color: Scalars["String"];
  /** The currently playing effect of the light */
  effect: Scalars["String"];
  /** The speed of the currently playing effect from 1-7 */
  speed: Scalars["Int"];
  /** The list of effects the light can play */
  supportedEffects: Array<Scalars["String"]>;
  /** The IP Address of the light's controller */
  ipAddress: Scalars["String"];
  /** The MAC Address of the light's controller */
  macAddress: Scalars["String"];
  /** The number of LEDs the light has */
  numLeds: Scalars["Int"];
  /** The UDP port the light is listening on for music visualization data */
  udpPort: Scalars["Int"];
  /** The firmware version the light's controller is running */
  version: Scalars["String"];
  /** The hardware of the light's controller */
  hardware: Scalars["String"];
  /** The order of colors the light strip runs on ex: RGB, GRB, BGR */
  colorOrder: Scalars["String"];
  /** The type of LED strip the light is ex: WS2812B, APA102 */
  stripType: Scalars["String"];
};

export type LightInput = {
  /** Set the display name of the light */
  name?: Maybe<Scalars["String"]>;
  /** Power the light on or off */
  on?: Maybe<Scalars["Boolean"]>;
  /** Change the brightness of the light (a value 0-100) */
  brightness?: Maybe<Scalars["Int"]>;
  /** Change the color of the light (must be in hexadecimal format) */
  color?: Maybe<Scalars["String"]>;
  /** Change the currently playing effect of the light */
  effect?: Maybe<Scalars["String"]>;
  /** Change the speed of the light (a value 1-7) */
  speed?: Maybe<Scalars["Int"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  /** Change some of the light's data (use setLightState to change the state) */
  setLight: Light;
  /** Add a new light */
  addLight: Light;
  /** Remove a currently added light */
  removeLight: Light;
};

export type MutationSetLightArgs = {
  lightData: LightInput;
  id: Scalars["String"];
};

export type MutationAddLightArgs = {
  id: Scalars["String"];
};

export type MutationRemoveLightArgs = {
  id: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  /** Get a light by it's ID */
  light: Light;
  /** Get all currently added lights in the order they were added */
  lights: Array<Light>;
  /** Get all currently added lights in the order they were added */
  discoveredLights: Array<Light>;
};

export type QueryLightArgs = {
  id: Scalars["String"];
};

export type Subscription = {
  __typename?: "Subscription";
  lightChanged: Light;
  lightAdded: Light;
  lightRemoved: Light;
};
export type LightFieldsFragment = { __typename?: "Light" } & Pick<
  Light,
  | "id"
  | "name"
  | "connected"
  | "on"
  | "brightness"
  | "color"
  | "effect"
  | "speed"
  | "supportedEffects"
  | "ipAddress"
  | "macAddress"
  | "numLeds"
  | "udpPort"
  | "version"
  | "hardware"
  | "colorOrder"
  | "stripType"
>;

export type LightQueryVariables = {
  id: Scalars["String"];
};

export type LightQuery = { __typename?: "Query" } & {
  light: { __typename?: "Light" } & LightFieldsFragment;
};

export type LightsQueryVariables = {};

export type LightsQuery = { __typename?: "Query" } & {
  lights: Array<{ __typename?: "Light" } & LightFieldsFragment>;
};

export type DiscoveredLightsQueryVariables = {};

export type DiscoveredLightsQuery = { __typename?: "Query" } & {
  discoveredLights: Array<{ __typename?: "Light" } & LightFieldsFragment>;
};

export type SetLightMutationVariables = {
  id: Scalars["String"];
  lightData: LightInput;
};

export type SetLightMutation = { __typename?: "Mutation" } & {
  setLight: { __typename?: "Light" } & LightFieldsFragment;
};

export type ChangeOnMutationVariables = {
  id: Scalars["String"];
  lightData: LightInput;
};

export type ChangeOnMutation = { __typename?: "Mutation" } & {
  setLight: { __typename?: "Light" } & Pick<Light, "id" | "on">;
};

export type AddLightMutationVariables = {
  id: Scalars["String"];
};

export type AddLightMutation = { __typename?: "Mutation" } & {
  addLight: { __typename?: "Light" } & LightFieldsFragment;
};

export type RemoveLightMutationVariables = {
  id: Scalars["String"];
};

export type RemoveLightMutation = { __typename?: "Mutation" } & {
  removeLight: { __typename?: "Light" } & LightFieldsFragment;
};

export type LightChangedSubscriptionVariables = {};

export type LightChangedSubscription = { __typename?: "Subscription" } & {
  lightChanged: { __typename?: "Light" } & LightFieldsFragment;
};

export type LightAddedSubscriptionVariables = {};

export type LightAddedSubscription = { __typename?: "Subscription" } & {
  lightAdded: { __typename?: "Light" } & LightFieldsFragment;
};

export type LightRemovedSubscriptionVariables = {};

export type LightRemovedSubscription = { __typename?: "Subscription" } & {
  lightRemoved: { __typename?: "Light" } & LightFieldsFragment;
};
export const LightFieldsFragmentDoc = gql`
  fragment lightFields on Light {
    id
    name
    connected
    on
    brightness
    color
    effect
    speed
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
export const LightDocument = gql`
  query light($id: String!) {
    light(id: $id) {
      ...lightFields
    }
  }
  ${LightFieldsFragmentDoc}
`;

export function useLightQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<LightQuery, LightQueryVariables>
) {
  return ApolloReactHooks.useQuery<LightQuery, LightQueryVariables>(LightDocument, baseOptions);
}
export function useLightLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<LightQuery, LightQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<LightQuery, LightQueryVariables>(LightDocument, baseOptions);
}

export type LightQueryHookResult = ReturnType<typeof useLightQuery>;
export type LightQueryResult = ApolloReactCommon.QueryResult<LightQuery, LightQueryVariables>;
export const LightsDocument = gql`
  query lights {
    lights {
      ...lightFields
    }
  }
  ${LightFieldsFragmentDoc}
`;

export function useLightsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<LightsQuery, LightsQueryVariables>
) {
  return ApolloReactHooks.useQuery<LightsQuery, LightsQueryVariables>(LightsDocument, baseOptions);
}
export function useLightsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<LightsQuery, LightsQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<LightsQuery, LightsQueryVariables>(
    LightsDocument,
    baseOptions
  );
}

export type LightsQueryHookResult = ReturnType<typeof useLightsQuery>;
export type LightsQueryResult = ApolloReactCommon.QueryResult<LightsQuery, LightsQueryVariables>;
export const DiscoveredLightsDocument = gql`
  query discoveredLights {
    discoveredLights {
      ...lightFields
    }
  }
  ${LightFieldsFragmentDoc}
`;

export function useDiscoveredLightsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    DiscoveredLightsQuery,
    DiscoveredLightsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<DiscoveredLightsQuery, DiscoveredLightsQueryVariables>(
    DiscoveredLightsDocument,
    baseOptions
  );
}
export function useDiscoveredLightsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    DiscoveredLightsQuery,
    DiscoveredLightsQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<DiscoveredLightsQuery, DiscoveredLightsQueryVariables>(
    DiscoveredLightsDocument,
    baseOptions
  );
}

export type DiscoveredLightsQueryHookResult = ReturnType<typeof useDiscoveredLightsQuery>;
export type DiscoveredLightsQueryResult = ApolloReactCommon.QueryResult<
  DiscoveredLightsQuery,
  DiscoveredLightsQueryVariables
>;
export const SetLightDocument = gql`
  mutation setLight($id: String!, $lightData: LightInput!) {
    setLight(id: $id, lightData: $lightData) {
      ...lightFields
    }
  }
  ${LightFieldsFragmentDoc}
`;
export type SetLightMutationFn = ApolloReactCommon.MutationFunction<
  SetLightMutation,
  SetLightMutationVariables
>;

export function useSetLightMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<SetLightMutation, SetLightMutationVariables>
) {
  return ApolloReactHooks.useMutation<SetLightMutation, SetLightMutationVariables>(
    SetLightDocument,
    baseOptions
  );
}
export type SetLightMutationHookResult = ReturnType<typeof useSetLightMutation>;
export type SetLightMutationResult = ApolloReactCommon.MutationResult<SetLightMutation>;
export type SetLightMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SetLightMutation,
  SetLightMutationVariables
>;
export const ChangeOnDocument = gql`
  mutation changeOn($id: String!, $lightData: LightInput!) {
    setLight(id: $id, lightData: $lightData) {
      id
      on
    }
  }
`;
export type ChangeOnMutationFn = ApolloReactCommon.MutationFunction<
  ChangeOnMutation,
  ChangeOnMutationVariables
>;

export function useChangeOnMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<ChangeOnMutation, ChangeOnMutationVariables>
) {
  return ApolloReactHooks.useMutation<ChangeOnMutation, ChangeOnMutationVariables>(
    ChangeOnDocument,
    baseOptions
  );
}
export type ChangeOnMutationHookResult = ReturnType<typeof useChangeOnMutation>;
export type ChangeOnMutationResult = ApolloReactCommon.MutationResult<ChangeOnMutation>;
export type ChangeOnMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ChangeOnMutation,
  ChangeOnMutationVariables
>;
export const AddLightDocument = gql`
  mutation addLight($id: String!) {
    addLight(id: $id) {
      ...lightFields
    }
  }
  ${LightFieldsFragmentDoc}
`;
export type AddLightMutationFn = ApolloReactCommon.MutationFunction<
  AddLightMutation,
  AddLightMutationVariables
>;

export function useAddLightMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<AddLightMutation, AddLightMutationVariables>
) {
  return ApolloReactHooks.useMutation<AddLightMutation, AddLightMutationVariables>(
    AddLightDocument,
    baseOptions
  );
}
export type AddLightMutationHookResult = ReturnType<typeof useAddLightMutation>;
export type AddLightMutationResult = ApolloReactCommon.MutationResult<AddLightMutation>;
export type AddLightMutationOptions = ApolloReactCommon.BaseMutationOptions<
  AddLightMutation,
  AddLightMutationVariables
>;
export const RemoveLightDocument = gql`
  mutation removeLight($id: String!) {
    removeLight(id: $id) {
      ...lightFields
    }
  }
  ${LightFieldsFragmentDoc}
`;
export type RemoveLightMutationFn = ApolloReactCommon.MutationFunction<
  RemoveLightMutation,
  RemoveLightMutationVariables
>;

export function useRemoveLightMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RemoveLightMutation,
    RemoveLightMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<RemoveLightMutation, RemoveLightMutationVariables>(
    RemoveLightDocument,
    baseOptions
  );
}
export type RemoveLightMutationHookResult = ReturnType<typeof useRemoveLightMutation>;
export type RemoveLightMutationResult = ApolloReactCommon.MutationResult<RemoveLightMutation>;
export type RemoveLightMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RemoveLightMutation,
  RemoveLightMutationVariables
>;
export const LightChangedDocument = gql`
  subscription lightChanged {
    lightChanged {
      ...lightFields
    }
  }
  ${LightFieldsFragmentDoc}
`;

export function useLightChangedSubscription(
  baseOptions?: ApolloReactHooks.SubscriptionHookOptions<
    LightChangedSubscription,
    LightChangedSubscriptionVariables
  >
) {
  return ApolloReactHooks.useSubscription<
    LightChangedSubscription,
    LightChangedSubscriptionVariables
  >(LightChangedDocument, baseOptions);
}
export type LightChangedSubscriptionHookResult = ReturnType<typeof useLightChangedSubscription>;
export type LightChangedSubscriptionResult = ApolloReactCommon.SubscriptionResult<
  LightChangedSubscription
>;
export const LightAddedDocument = gql`
  subscription lightAdded {
    lightAdded {
      ...lightFields
    }
  }
  ${LightFieldsFragmentDoc}
`;

export function useLightAddedSubscription(
  baseOptions?: ApolloReactHooks.SubscriptionHookOptions<
    LightAddedSubscription,
    LightAddedSubscriptionVariables
  >
) {
  return ApolloReactHooks.useSubscription<LightAddedSubscription, LightAddedSubscriptionVariables>(
    LightAddedDocument,
    baseOptions
  );
}
export type LightAddedSubscriptionHookResult = ReturnType<typeof useLightAddedSubscription>;
export type LightAddedSubscriptionResult = ApolloReactCommon.SubscriptionResult<
  LightAddedSubscription
>;
export const LightRemovedDocument = gql`
  subscription lightRemoved {
    lightRemoved {
      ...lightFields
    }
  }
  ${LightFieldsFragmentDoc}
`;

export function useLightRemovedSubscription(
  baseOptions?: ApolloReactHooks.SubscriptionHookOptions<
    LightRemovedSubscription,
    LightRemovedSubscriptionVariables
  >
) {
  return ApolloReactHooks.useSubscription<
    LightRemovedSubscription,
    LightRemovedSubscriptionVariables
  >(LightRemovedDocument, baseOptions);
}
export type LightRemovedSubscriptionHookResult = ReturnType<typeof useLightRemovedSubscription>;
export type LightRemovedSubscriptionResult = ApolloReactCommon.SubscriptionResult<
  LightRemovedSubscription
>;
