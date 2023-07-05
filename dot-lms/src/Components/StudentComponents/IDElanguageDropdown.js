import React from "react";
import Select from "react-select";
import { languageOptions } from "../constants/languageOptions";

const IDElanguageDropdown = ({ onSelectChange }) => {
  return (
    <Select
      placeholder={`Filter By Category`}
      options={languageOptions}
    //   styles={customStyles}
      defaultValue={languageOptions[0]}
      onChange={(selectedOption) => onSelectChange(selectedOption)}
    />
  );
};

export default IDElanguageDropdown;
