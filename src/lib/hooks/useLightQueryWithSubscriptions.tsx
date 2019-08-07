import {
  useLightQuery,
  LightQuery,
  LightQueryVariables,
  useLightChangedSubscription,
} from "generated/graphql";
import { QueryHookOptions } from "@apollo/react-hooks";
import { QueryResult } from "@apollo/react-common";

export const useLightQueryWithSubscriptions = (
  queryOptions?: QueryHookOptions<LightQuery, LightQueryVariables>
): QueryResult<LightQuery, LightQueryVariables> => {
  const QueryData = useLightQuery(queryOptions);

  // This will automatically update the light in the cache when it gets a message
  useLightChangedSubscription();

  return QueryData;
};
