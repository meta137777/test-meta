import { FormControl, FormHelperText, TextField } from "@mui/material";

export default function GuarantorsTwoTextarea({
  formik,
  name,
  label,
  placeholder,
  row,
  customClass,
  subName,
}: any) {
  const check_error =
    Object.keys(formik.errors).length !== 0 &&
    formik.touched.guarantors &&
    formik?.touched?.guarantors[1] &&
    formik?.touched?.guarantors[1][subName] &&
    formik?.errors.guarantors &&
    formik?.errors?.guarantors[1] &&
    formik?.errors.guarantors[1][subName];
  return (
    <FormControl
      className={customClass}
      sx={{
        label: {
          color: "#1242E0",
          fontSize: "14px",
          padding: "0 32px 0 0",
          background: "#fff",
        },
      }}
    >
      <TextField
        error={check_error}
        sx={{
          ".MuiInputBase-root": { borderRadius: "3px", fontSize: "12px" },
          fontSize: "14px",
        }}
        fullWidth
        label={label}
        placeholder={placeholder}
        name={name}
        {...formik.getFieldProps({ name })}
        multiline
        rows={row ? row : "10"}
        InputProps={{
          startAdornment: <></>,
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
}
