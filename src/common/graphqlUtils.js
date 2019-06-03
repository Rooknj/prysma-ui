import { DISCOVERED_LIGHTS, LIGHTS } from "common/graphqlConstants";

export const removeDiscoveredLightFromCache = (cache, lightToRemove) => {
  // Remove the added light from discoveredLights
  try {
    // Get the discovered lights in the cache
    // This might throw an error if the discoveredLights query hasnt been called yet
    const { discoveredLights } = cache.readQuery({
      query: DISCOVERED_LIGHTS,
    });

    if (discoveredLights.length > 0) {
      // Remove this newly addded light from discoveredLights if it exists
      cache.writeQuery({
        query: DISCOVERED_LIGHTS,
        data: {
          discoveredLights: discoveredLights.filter(light => light.id !== lightToRemove.id),
        },
      });
    }
  } catch (error) {
    if (error.name === "Invariant Violation") return;
    console.error(error);
  }
};

export const addLightToCache = (cache, lightToAdd) => {
  try {
    // Add the added light to GET_LIGHTS
    const { lights } = cache.readQuery({
      query: LIGHTS,
    });

    // If the light already exists, do nothing
    if (lights.find(light => light.id === lightToAdd.id)) return;

    // Write the light to the cache
    cache.writeQuery({
      query: LIGHTS,
      data: { lights: lights.concat([lightToAdd]) },
    });
  } catch (error) {
    if (error.name === "Invariant Violation") return;
    console.error(error);
  }
};

export const removeLightFromCache = (cache, lightToRemove) => {
  try {
    // Get the current lights in the cache
    const { lights } = cache.readQuery({
      query: LIGHTS,
    });

    // Remove the light from the cache
    cache.writeQuery({
      query: LIGHTS,
      data: { lights: lights.filter(light => light.id !== lightToRemove.id) },
    });
  } catch (error) {
    if (error.name === "Invariant Violation") return;
    console.error(error);
  }
};
