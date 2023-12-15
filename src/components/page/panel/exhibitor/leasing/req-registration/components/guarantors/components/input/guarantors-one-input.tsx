import {
  FormControl,
  FormHelperText,
  InputAdornment,
  TextField,
} from "@mui/material";

export const GuarantorsOneInput = ({
  changeHandler,
  formik,
  name,
  label,
  placeholder,
  type,
  showEndAdorMent,
  showEndAdorMentValue,
  classes,
  classNames,
  defaultValue,
  disabled = false,
  subName,
}: any) => {
  
  const check_error =
    Object.keys(formik.errors).length !== 0 &&
    formik.touched.guarantors &&  formik?.touched?.guarantors[0] &&
    formik?.touched?.guarantors[0][subName] &&
    formik?.errors.guarantors &&
    formik?.errors?.guarantors[0] &&
    formik?.errors.guarantors[0][subName];

  return (
    <FormControl
      className={`relative h-fit ${classNames}`}
      sx={{
        label: {
          color: "#1242E0",
          fontSize: "14px",
          padding: "0 32px 0 0",
          background: "#fff",
          fontFamily: "IranSans",
        },
      }}
    >
      <TextField
        autoComplete="off"
        inputProps={{
          style: {
            height: "10px",
          },
        }}
        disabled={disabled}
        error={check_error}
        sx={{
          ".MuiInputBase-root": { borderRadius: "3px", fontSize: "12px" },
          fontSize: "14px",
        }}
        className={`${classes} form-inp`}
        variant="outlined"
        fullWidth
        value={formik?.values[name]}
        label={label}
        name={name}
        type={type}
        onChange={formik ? formik.handleChange : changeHandler}
        {...formik?.getFieldProps({ name })}
        defaultValue={defaultValue ? defaultValue : formik?.values[name]}
        placeholder={placeholder}
        InputProps={{
          startAdornment: <></>,
          endAdornment: showEndAdorMent && (
            <InputAdornment position="end">
              <span className="text-xs">{showEndAdorMentValue}</span>
            </InputAdornment>
          ),
        }}
      />

      {check_error && (
        <FormHelperText
          className="p-0"
          sx={{
            marginLeft: 0,
            fontFamily: "IranSans",
            marginRight: 0,
            textAlign: "right",
            color: "#D90201",
          }}
        >
          {check_error}
        </FormHelperText>
      )}
    </FormControl>
  );
};

GuarantorsOneInput.defaultProps = {
  type: "text",
  showEndAdorMent: false,
  classes: "bg-white",
  defaultValue: "",
};
