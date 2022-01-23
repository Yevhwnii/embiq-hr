import { CircularProgress as Spinner } from "@mui/material";
import Head from "next/head";
import React from "react";

const LoadingOverlay = () => {
  return (
    <>
      <Head>
        <title>Loading...</title>
      </Head>
      <div className="w-full h-full relative flex flex-col items-center justify-center">
        <Spinner
          style={{ transform: "translate(-50%, 50%)" }}
          size=""
          className="top-1/2 text-teal-500 left-1/2 w-8 h-8"
        />
        <span className="text-lg  mt-4">Loading...</span>
      </div>
    </>
  );
};

export default LoadingOverlay;
