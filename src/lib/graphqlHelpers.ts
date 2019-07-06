import { Light, LightsQuery, DiscoveredLightsQuery } from "generated/graphql";
import { DataProxy } from "apollo-cache";
import { LIGHTS, DISCOVERED_LIGHTS } from "./graphqlConstants";

export const removeLightFromCache = (proxy: DataProxy, lightToRemove: Light): void => {
  try {
    const result = proxy.readQuery<LightsQuery>({
      query: LIGHTS,
    });
    if (!result || !result.lights) return;
    const { lights } = result;

    proxy.writeQuery({
      query: LIGHTS,
      data: {
        lights: lights.filter((light): boolean => light.id !== lightToRemove.id),
      },
    });
  } catch (error) {
    // If there is an invariant error, this shouldnt be an issue so ignore it
    if (error.name === "Invariant Violation") return;
    throw error;
  }
};

export const addLightToCache = (proxy: DataProxy, lightToAdd: Light): void => {
  try {
    const result = proxy.readQuery<LightsQuery>({
      query: LIGHTS,
    });
    if (!result || !result.lights) return;
    const { lights } = result;

    proxy.writeQuery({
      query: LIGHTS,
      data: { lights: lights.concat([lightToAdd]) },
    });
  } catch (error) {
    // If there is an invariant error, this shouldnt be an issue so ignore it
    if (error.name === "Invariant Violation") return;
    throw error;
  }
};

export const removeDiscoveredLightFromCache = (
  proxy: DataProxy,
  discoveredLightToRemove: Light
): void => {
  try {
    const result = proxy.readQuery<DiscoveredLightsQuery>({
      query: DISCOVERED_LIGHTS,
    });
    if (!result || !result.discoveredLights) return;
    const { discoveredLights } = result;

    proxy.writeQuery({
      query: DISCOVERED_LIGHTS,
      data: {
        discoveredLights: discoveredLights.filter(
          (light): boolean => light.id !== discoveredLightToRemove.id
        ),
      },
    });
  } catch (error) {
    // If there is an invariant error, this shouldnt be an issue so ignore it
    if (error.name === "Invariant Violation") return;
    throw error;
  }
};
