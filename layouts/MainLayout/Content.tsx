import React from "react";
import { Grid } from "@mui/material";

const Content: React.FC = ({ children }) => {
  return (
    <div className="z-40 relative  min-h-full h-full p-0 md:p-5 pt-24 md:pt-24 flex-1">
      <Grid
        className="mt-5 max-h-full h-full min-h-screen "
        style={{ minHeight: "80vh" }}
        container
        spacing={0}
      >
        <Grid item xs={0} md={1} lg={1} />
        <Grid item xs={12} md={10} lg={10} className="max-h-full flex-1">
          {children}
        </Grid>
        <Grid item xs={0} md={1} lg={1} />
      </Grid>
    </div>
  );
};

export default Content;
