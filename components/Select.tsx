import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MUISelect,
} from "@mui/material";

export type Option = {
  label: string;
  value: string | number;
};

interface SelectProps {
  label: string;
  value: string | number;
  onChange: (value: Option) => void;
  options: Option[];
}

const Select: React.FC<SelectProps> = ({ value, onChange, label, options }) => {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-autowidth-label">{label}</InputLabel>
      <MUISelect
        id="select"
        value={value}
        onChange={(e) =>
          onChange(
            options.find((option) => option.value === e.target.value) as Option
          )
        }
        autoWidth
        label={label}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MUISelect>
    </FormControl>
  );
};

export default Select;
