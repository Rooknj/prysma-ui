import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

// TODO: Make Into Empty State Page
const NotFound = (
  props: RouteComponentProps
): React.FunctionComponentElement<RouteComponentProps> => {
  const { location } = props;
  return (
    <div>
      <Link to="/">
        <Typography variant="body1">{"< Back to Home"}</Typography>
      </Link>
      <Typography variant="h2">{`No Match For ${location.pathname}`}</Typography>
    </div>
  );
};

export default NotFound;
export interface NotFound extends ReturnType<typeof NotFound> {}
