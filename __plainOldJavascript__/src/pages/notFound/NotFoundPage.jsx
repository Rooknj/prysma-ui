import React from "react";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import customPropTypes from "common/customPropTypes";

const NotFoundPage = props => {
  const { location } = props;
  return (
    <div>
      <Link to="/">
        <Typography variant="body1">{"< Back to main"}</Typography>
      </Link>
      <Typography variant="h2">{`No Match For ${location.pathname}`}</Typography>
    </div>
  );
};

NotFoundPage.propTypes = {
  location: customPropTypes.location.isRequired,
};

export default NotFoundPage;
