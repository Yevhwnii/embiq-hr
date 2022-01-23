import { Option } from "@components/Select";

export const seasonSelectOptions: Option[] = [
  { label: "2020", value: 2020 },
  { label: "2019", value: 2019 },
  { label: "2018", value: 2018 },
  { label: "2017", value: 2017 },
  { label: "2016", value: 2016 },
  { label: "2015", value: 2015 },
  { label: "2014", value: 2014 },
  { label: "2013", value: 2013 },
  { label: "2012", value: 2012 },
];

export const defaultSeasonSelectOption = { label: "2020", value: 2020 };

export interface Data {
  driver: string;
  position: number;
  team: string;
  time: string;
}

export interface HeadCell {
  id: keyof Data;
  label: string;
}

export const headCells: readonly HeadCell[] = [
  {
    id: "driver",
    label: "Driver name",
  },
  {
    id: "position",
    label: "Position",
  },
  {
    id: "team",
    label: "Driver team",
  },
  {
    id: "time",
    label: "Time",
  },
];
