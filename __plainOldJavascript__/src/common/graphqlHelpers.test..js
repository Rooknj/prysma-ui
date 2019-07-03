import { DISCOVERED_LIGHTS, LIGHTS } from "common/graphqlConstants";
import {
  removeDiscoveredLightFromCache,
  addLightToCache,
  removeLightFromCache,
} from "./graphqlHelpers";

const MOCK_CACHE = {
  readQuery: jest.fn(),
  writeQuery: jest.fn(),
};

const MOCK_LIGHT = { id: "Prysma-Mock" };

beforeEach(() => {
  MOCK_CACHE.readQuery.mockClear();
  MOCK_CACHE.writeQuery.mockClear();
});

describe("removeDiscoveredLightFromCache", () => {
  test("removes the light from the discoveredLights query", () => {
    const mockLight = Object.assign({}, MOCK_LIGHT);
    MOCK_CACHE.readQuery.mockImplementationOnce(() => ({
      discoveredLights: [mockLight],
    }));

    removeDiscoveredLightFromCache(MOCK_CACHE, mockLight);

    expect(MOCK_CACHE.writeQuery).toHaveBeenCalledWith({
      query: DISCOVERED_LIGHTS,
      data: { discoveredLights: [] },
    });
  });
  test("does not remove any lights if the light is not in the cache", () => {
    const mockLight = Object.assign({}, MOCK_LIGHT);
    const differentMockLight = Object.assign({}, MOCK_LIGHT, { id: "Prysma-12345" });
    MOCK_CACHE.readQuery.mockImplementationOnce(() => ({
      discoveredLights: [mockLight],
    }));

    removeDiscoveredLightFromCache(MOCK_CACHE, differentMockLight);

    expect(MOCK_CACHE.writeQuery).toHaveBeenCalledWith({
      query: DISCOVERED_LIGHTS,
      data: { discoveredLights: [mockLight] },
    });
  });
  test("does nothing if the cache is empty", () => {
    const mockLight = Object.assign({}, MOCK_LIGHT);
    MOCK_CACHE.readQuery.mockImplementationOnce(() => ({
      discoveredLights: [],
    }));

    removeDiscoveredLightFromCache(MOCK_CACHE, mockLight);

    expect(MOCK_CACHE.writeQuery).not.toHaveBeenCalled();
  });
  test("does not throw if an Invariant Violation Error is thrown", () => {
    const mockLight = Object.assign({}, MOCK_LIGHT);
    const err = new Error("Invariant Violation");
    err.name = "Invariant Violation";
    MOCK_CACHE.readQuery.mockImplementationOnce(() => {
      throw err;
    });

    expect(() => removeDiscoveredLightFromCache(MOCK_CACHE, mockLight)).not.toThrow(err);
  });
  test("throws an error if any other error is thrown", () => {
    const mockLight = Object.assign({}, MOCK_LIGHT);
    const err = new Error("Regular Error");
    MOCK_CACHE.readQuery.mockImplementationOnce(() => {
      throw err;
    });

    expect(() => removeDiscoveredLightFromCache(MOCK_CACHE, mockLight)).toThrow(err);
  });
});

describe("addLightToCache", () => {
  test("adds the light to the lights query", () => {
    const mockLight = Object.assign({}, MOCK_LIGHT);
    MOCK_CACHE.readQuery.mockImplementationOnce(() => ({
      lights: [],
    }));

    addLightToCache(MOCK_CACHE, mockLight);

    expect(MOCK_CACHE.writeQuery).toHaveBeenCalledWith({
      query: LIGHTS,
      data: { lights: [mockLight] },
    });
  });
  test("does nothing if the light is already in the cache", () => {
    const mockLight = Object.assign({}, MOCK_LIGHT);
    MOCK_CACHE.readQuery.mockImplementationOnce(() => ({
      lights: [mockLight],
    }));

    addLightToCache(MOCK_CACHE, mockLight);

    expect(MOCK_CACHE.writeQuery).not.toHaveBeenCalled();
  });
  test("does nothing if an Invariant Error is thrown", () => {
    const mockLight = Object.assign({}, MOCK_LIGHT);
    const err = new Error("Invariant Violation");
    err.name = "Invariant Violation";
    MOCK_CACHE.readQuery.mockImplementationOnce(() => {
      throw err;
    });

    expect(() => addLightToCache(MOCK_CACHE, mockLight)).not.toThrow(err);
  });
  test("throws an error if any other error is thrown", () => {
    const mockLight = Object.assign({}, MOCK_LIGHT);
    const err = new Error("Regular Error");
    MOCK_CACHE.readQuery.mockImplementationOnce(() => {
      throw err;
    });

    expect(() => addLightToCache(MOCK_CACHE, mockLight)).toThrow(err);
  });
});

describe("removeLightFromCache", () => {
  test("removes the light from the lights query", () => {
    const mockLight = Object.assign({}, MOCK_LIGHT);
    MOCK_CACHE.readQuery.mockImplementationOnce(() => ({
      lights: [mockLight],
    }));

    removeLightFromCache(MOCK_CACHE, mockLight);

    expect(MOCK_CACHE.writeQuery).toHaveBeenCalledWith({ query: LIGHTS, data: { lights: [] } });
  });
  test("does not remove other lights if the light is not in the cache", () => {
    const mockLight = Object.assign({}, MOCK_LIGHT);
    const differentMockLight = Object.assign({}, MOCK_LIGHT, { id: "Prysma-12345" });
    MOCK_CACHE.readQuery.mockImplementationOnce(() => ({
      lights: [mockLight],
    }));

    removeLightFromCache(MOCK_CACHE, differentMockLight);

    expect(MOCK_CACHE.writeQuery).toHaveBeenCalledWith({
      query: LIGHTS,
      data: { lights: [mockLight] },
    });
  });
  test("does nothing if an Invariant Error is thrown", () => {
    const mockLight = Object.assign({}, MOCK_LIGHT);
    const err = new Error("Invariant Violation");
    err.name = "Invariant Violation";
    MOCK_CACHE.readQuery.mockImplementationOnce(() => {
      throw err;
    });

    expect(() => removeLightFromCache(MOCK_CACHE, mockLight)).not.toThrow(err);
  });
  test("throws an error if any other error is thrown", () => {
    const mockLight = Object.assign({}, MOCK_LIGHT);
    const err = new Error("Regular Error");
    MOCK_CACHE.readQuery.mockImplementationOnce(() => {
      throw err;
    });

    expect(() => removeLightFromCache(MOCK_CACHE, mockLight)).toThrow(err);
  });
});
