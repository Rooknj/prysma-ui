import React from "react";
import { useAddLight, useRemoveLight } from "common/customHooks";

const AddLightPage = () => {
  const addLight = useAddLight();
  const removeLight = useRemoveLight();

  return (
    <div>
      <button onClick={() => addLight("Prysma-Mock11")}>addLight</button>
      <button onClick={() => removeLight("Prysma-Mock11")}>removeLight</button>
    </div>
  );
};

export default AddLightPage;
