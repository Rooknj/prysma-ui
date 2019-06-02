import React from "react";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const AboutPage = props => {
  const { match, location } = props;
  console.log(match);
  return (
    <div>
      <Link to={"/"}>
        <Typography variant="body1">{"< Back to main"}</Typography>
      </Link>
      <Typography variant="h2">{`No Match For ${
        location.pathname
      }`}</Typography>
    </div>
  );
};

export default AboutPage;
