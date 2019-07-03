import client from "./apolloClient";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";

describe("Apollo Client", () => {
  test("Has a link", () => {
    expect(client.link).toBeDefined();
  });
  test("Has a cache", () => {
    expect(client.cache).toBeDefined();
  });
});

describe("Client Link", () => {
  test("is an ApolloLink", () => {
    expect(client.link).toBeInstanceOf(ApolloLink);
  });
});

describe("Client Cache", () => {
  test("is an InMemoryCache", () => {
    expect(client.cache).toBeInstanceOf(InMemoryCache);
  });
});
