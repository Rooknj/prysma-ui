import {
  useLightQuery,
  LightQuery,
  LightQueryVariables,
  useLightChangedSubscription,
} from "generated/graphql";
import { QueryHookResult, QueryHookOptions } from "react-apollo-hooks";

export const useLightQueryWithSubscriptions = (
  queryOptions?: QueryHookOptions<LightQueryVariables, object>
): QueryHookResult<LightQuery, LightQueryVariables> => {
  const QueryData = useLightQuery(queryOptions);

  // This will automatically update the light in the cache when it gets a message
  useLightChangedSubscription();

  return QueryData;
};
