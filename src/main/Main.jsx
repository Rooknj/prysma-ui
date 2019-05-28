import React from "react";
import { Query } from "react-apollo";
import { LIGHTS } from "common/graphqlConstants.js";

const Main = () => {
  return (
    <Query
      query={LIGHTS}
      fetchPolicy="cache-and-network"
      notifyOnNetworkStatusChange
    >
      {({ loading, error, data, subscribeToMore, refetch, networkStatus }) => {
        if (loading || networkStatus === 4) return <div>Loading...</div>;
        if (error) return <div>Error</div>;
        return data.lights.map(light => (
          <div key={light.id}>
            <span>{JSON.stringify(light)}</span>
            <hr />
          </div>
        ));
      }}
    </Query>
  );
};

export default Main;
