import React from "react";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const AboutPage = props => {
  const { match } = props;
  console.log(match);
  return (
    <div>
      <Link to={"/"}>
        <Typography variant="body1">{"< Back"}</Typography>
      </Link>
      {match.params.id}
    </div>
  );
};

export default AboutPage;
