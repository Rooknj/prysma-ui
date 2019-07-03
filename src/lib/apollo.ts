// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
// Apollo imports
import { ApolloClient } from "apollo-client"; // Base Apollo
import { InMemoryCache } from "apollo-cache-inmemory"; // Local Cache Storage
import { ApolloLink, split } from "apollo-link"; // Handles and manages the different apollo-link packages
import { HttpLink } from "apollo-link-http"; // Use Apollo Over HTTP (Queries, Mutations)
import { WebSocketLink } from "apollo-link-ws"; // Use Apollo Over Websockets (Subscriptions)
import { onError } from "apollo-link-error"; // Do custom logic when a GraphQL or network error occurs
import { getMainDefinition } from "apollo-utilities"; // Aids with splitting links

const serverName = window.location.host;
const wsProtocol = window.location.protocol === "https:" ? "wss:" : "ws:";

// Create an http link:
const httpLink = new HttpLink({
  uri: `${window.location.protocol}//${serverName}/graphql`,
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: `${wsProtocol}//${serverName}/graphql`,
  options: {
    reconnect: true,
    // For authentication over websockets
    // connectionParams: {
    //   authToken: user.authToken,
    // },
  },
});

// This link will handle sending out HTTP and WS requests
const HTTP_WS_LINK = split(
  // Split the links so your query and mutations go to the apollo-link-http while subscriptions go to apollo-link-ws
  ({ query }): boolean => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  wsLink,
  httpLink
);

// This link does custom logic when a GraphQL or network error occurs
const ON_ERROR_LINK = onError(({ graphQLErrors, networkError }): void => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }): void =>
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const CACHE = new InMemoryCache();

// Point apollo towards graphql server
export const client = new ApolloClient({
  link: ApolloLink.from([ON_ERROR_LINK, HTTP_WS_LINK]),
  cache: CACHE,
});
