import React from "react";

const AboutPage = props => {
  const { match } = props;
  console.log(match);
  return <div>{match.params.id}</div>;
};

export default AboutPage;
