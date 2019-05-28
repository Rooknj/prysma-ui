import React from "react";
import { useQuery } from "react-apollo-hooks";
import { LIGHTS } from "common/graphqlConstants.js";

const Main = () => {
  const { data, error, loading, networkStatus, refetch } = useQuery(LIGHTS, {
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true
  });

  let Body;
  if (loading || networkStatus === 4) Body = <div>Loading...</div>;
  else if (error) Body = <div>Error</div>;
  else
    Body = data.lights.map(light => (
      <div key={light.id}>
        <span>{JSON.stringify(light)}</span>
        <hr />
      </div>
    ));
  return (
    <div>
      <button onClick={() => refetch()}>Refetch</button>
      {Body}
    </div>
  );
};

export default Main;
