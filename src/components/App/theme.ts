import { createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";

export default createMuiTheme({
  palette: {
    type: "dark",
    primary: red,
    background: {
      default: "#212121",
    },
  },
  overrides: {
    MuiAppBar: {
      colorDefault: {
        backgroundColor: "#333333",
      },
    },
  },
});
