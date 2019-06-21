import React, { useState } from "react";
import { useLights } from "common/customHooks";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import LightList from "./LightList";
import DraggableLightList from "./DraggableLightList";

const MainPage = () => {
  const { data, error, loading, networkStatus, refetch } = useLights();
  const [editMode, setEditMode] = useState(false);

  const handleToggleEditMode = () => {
    setEditMode(!editMode);
  };

  let Body;
  if (loading || networkStatus === 4) {
    Body = <Typography variant="body1">Loading...</Typography>;
  } else if (error) {
    Body = <Typography variant="body1">Error.</Typography>;
  } else if (!data.lights.length) {
    Body = <Typography variant="body1">None</Typography>;
  } else if (editMode) {
    Body = <DraggableLightList lights={data.lights} />;
  } else {
    Body = <LightList lights={data.lights} />;
  }
  return (
    <div>
      <Typography variant="h4">Prysma</Typography>
      <Button onClick={handleToggleEditMode}>{editMode ? "Done" : "Edit"}</Button>
      <Button onClick={() => refetch()}>Refetch</Button>
      <Typography variant="h6">Light List</Typography>
      {Body}
    </div>
  );
};

export default MainPage;
