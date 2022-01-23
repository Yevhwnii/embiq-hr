import React from "react";
import { BsHandIndexThumb as HandIcon } from "react-icons/bs";
import { CircularProgress as Spinner } from "@mui/material";

import { Driver } from "@api/types";
import Paper from "@components/Paper";

interface DriverCardProps {
  driver: Driver | null;
  loading: boolean;
}

const DriverCard: React.FC<DriverCardProps> = ({ driver, loading }) => {
  let content;
  if (!driver && !loading) {
    content = (
      <div className="flex flex-col justify-center items-center w-full gap-3 rounded-lg h-48 border border-gray-200">
        <HandIcon className="w-8 h-8 text-gray-400" />
        <span className="text-sm text-gray-500 text-center">
          <b>Select</b> a driver to see details
        </span>
      </div>
    );
  }
  if (driver && !loading) {
    content = (
      <div className="border border-gray-200 rounded-lg">
        <div className="shadow-xl md:shadow-lg">
          <img
            src={driver.image}
            className="w-full object-cover object-center h-56 rounded-lg"
          />
        </div>
        <div className="flex flex-col items-center gap-1 mt-4 p-5">
          <span className="font-bold text-lg">{driver.name}</span>
          <span className="text-xs">({driver.birthdate})</span>
          <span className="text-gray-400">{driver.nationality}</span>
        </div>
      </div>
    );
  }

  if (loading) {
    content = (
      <div className="flex flex-col justify-center items-center w-full rounded-lg border border-gray-200 gap-3 h-48">
        <Spinner className="w-8 h-8 text-teal-400" />
        <span className="text-sm text-gray-500 text-center">Loading...</span>
      </div>
    );
  }

  return (
    <Paper className="p-0 w-full md:w-1/3 h-max self-center">{content}</Paper>
  );
};

export default DriverCard;
