import React, { FunctionComponent } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import moment from 'moment';
import CustomNumberFormat from "./CustomNumberFormat";

const email = {
  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
  message: "Correo invalido"
}

const numbers = {
  value : new RegExp('^[0-9.]+$'),
  message: "Solo numeros"
}

function getParseDateTime() {
  //"2017-05-24T10:30"
  //"2020-01-01T2:01
  const newDate = moment().format("YYYY-MM-DD");
  const time = moment().format("hh:mm");
  const parse = `${newDate}T${time}`;
  return parse;
}

function getPattern(type: string){
  switch (type) {
    case 'email':
      return email;
      case 'number':
      return numbers;
    default:
      return {};
  }
}

type CustomTextFieldProps = {
  placeholder: string;
  field: string;
  required?: boolean;
  register: Function;
  errorsField?: any;
  errorsMessageField?: any;
  type?: string;
  disable?: boolean;
  maxLength?: number;
  inputType?: string;
  Icon?: React.ReactType;
  multiline?: boolean;
  maxDate?: any;
  formatNumber?: boolean;
};

const CustomTextField: FunctionComponent<CustomTextFieldProps> = ({
  placeholder,
  field,
  required = false,
  register,
  errorsField,
  errorsMessageField,
  type = 'text',
  disable = false,
  maxLength = 150,
  inputType,
  Icon,
  multiline = false,
  maxDate,
  formatNumber
}) => (
  <TextField
    rows={multiline ? "4" : ""}
    multiline={multiline}
    label={placeholder}
    disabled={disable}
    size="small"
    margin="dense"
    fullWidth
    autoFocus
    placeholder={multiline ? '' : placeholder}
    name={field}
    type={type}
    inputProps={{
      maxLength,
      // max: type === 'date' ? getParseDateTime() : null
    }}
    inputRef={register({
      required: required ? "Required" : false,
      pattern: inputType ? getPattern(inputType) : null
    })}
    InputLabelProps={{
      shrink: true,
    }}
    InputProps={{
      inputProps: { max: type === 'date' && maxDate ? maxDate : null },
      inputComponent: formatNumber && CustomNumberFormat as any,
      startAdornment: Icon ? (
        <InputAdornment position="start">
          <Icon />
        </InputAdornment>
      ) : null 
    }}
    required={errorsField ? true : false}
    error={errorsField ? true : false}
    helperText={errorsField && errorsMessageField}
  />
);


export default CustomTextField;