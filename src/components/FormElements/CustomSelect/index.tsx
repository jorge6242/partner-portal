import React, { FunctionComponent } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";


import './index.sass';

type CustomSelectProps = {
  field: string;
  required?: boolean;
  register: Function;
  errorsMessageField: any;
  selectionMessage?: string;
  label?: string;
  loading?: boolean;
  onChange?: any
};

const CustomSelect: FunctionComponent<CustomSelectProps> = ({
  field,
  required = false,
  register,
  errorsMessageField,
  children,
  selectionMessage = 'Seleccione',
  label,
  loading = false,
  onChange,
}) => loading ? (<CircularProgress color="primary" size={40} />) :
    (
      <div className="custom-select-container">
        {label && (<div className="custom-select-container__label">{label}</div>)}
        <select
          ref={register({
            required: required ? "Required" : false
          })}
          name={field}
          onChange={onChange ? onChange : () => {}}
        >
          <option value="">{selectionMessage}</option>
          {children}
        </select>
        <div className="custom-select-container__message">{errorsMessageField}</div>
      </div>
    );

export default CustomSelect;

