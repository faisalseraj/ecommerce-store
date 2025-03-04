import AsyncSelect from "react-select/async";
import React from "react";

// import { ColourOption, colourOptions } from '../data';

export const SelectAsync = ({
  options,
  onChange,
}: {
  options: any;
  onChange: any;
}) => {
  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      loadOptions={options}
      onChange={onChange}
    />
  );
};
