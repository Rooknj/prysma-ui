import React from "react";
import { useLights } from "common/customHooks";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import LightList from "./LightList";

const MainPage = () => {
  const { data, error, loading, networkStatus, refetch } = useLights();

  let Body;
  if (loading || networkStatus === 4) {
    Body = <Typography variant="body1">Loading...</Typography>;
  } else if (error) {
    Body = <Typography variant="body1">Error.</Typography>;
  } else if (!data.lights.length) {
    Body = <Typography variant="body1">None</Typography>;
  } else {
    Body = (
      <div>
        <LightList lights={data.lights} />
      </div>
    );
  }
  return (
    <div>
      <Typography variant="h4">Prysma</Typography>
      <Button onClick={() => refetch()}>Refetch</Button>
      <Typography variant="h6">Light List</Typography>
      {Body}
    </div>
  );
};

export default MainPage;
