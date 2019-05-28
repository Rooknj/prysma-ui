import React from "react";
import { useQuery } from "react-apollo-hooks";
import { LIGHTS } from "common/graphqlConstants.js";

const Main = () => {
  const { data, error, loading, networkStatus } = useQuery(LIGHTS, {
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true
  });

  if (loading || networkStatus === 4) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  return data.lights.map(light => (
    <div key={light.id}>
      <span>{JSON.stringify(light)}</span>
      <hr />
    </div>
  ));
};

export default Main;
