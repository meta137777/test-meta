import { FormControl, FormHelperText, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

export const GuarantorsOneSelectBox = ({
  formik,
  options,
  name,
  label,
  selectedValue,
  handleClick,
  width,
  subName,
}: any) => {
  const check_error =
  Object.keys(formik.errors).length !== 0 &&
  formik.touched.guarantors && formik?.touched?.guarantors[0] &&
  formik?.touched?.guarantors[0][subName] &&
  formik?.errors.guarantors &&
  formik?.errors?.guarantors[0] &&
  formik?.errors.guarantors[0][subName];

  return (
    <FormControl
      sx={{
        label: {
          color: "#1242E0",
          fontSize: "14px",
          padding: "0 32px 0 0",
          background: "#fff",
        },
        width: width,
      }}
    >
      <TextField
        onChange={handleClick}
        name={name}
        sx={{
          ".MuiInputBase-root": {
            borderRadius: "3px",
            fontSize: "12px",
            height: "43px",
          },
          fontSize: "14px",
          input: {
            height: "10px",
          },
          background: "#FFF",
          borderRadius: "3px",
        }}
        error={check_error
        }
        displayempty
        {...formik?.getFieldProps({ name })}
        label={label}
        defaultValue={selectedValue}
        InputProps={{
          startAdornment: <></>,
        }}
        select
      >
        <MenuItem
          selected
          disabled
          value="انتخاب کنید"
          sx={{ fontSize: "12px" }}
        >
          {selectedValue ? selectedValue : "انتخاب کنید"}
        </MenuItem>

        {options?.map((option) =>
          option?.areas ? (
            option?.areas?.map((area, index) => {
              return (
                <MenuItem
                  key={index}
                  value={area}
                  data-score={option.score ? option.score : ""}
                  onClick={handleClick}
                  sx={{ fontSize: "12px" }}
                >
                  {area}
                </MenuItem>
              );
            })
          ) : (
            <MenuItem
              key={option.value}
              value={option.value}
              data-score={option.score ? option.score : ""}
              onClick={handleClick}
              sx={{ fontSize: "12px" }}
            >
              {option.label ? option.label : option.value}
            </MenuItem>
          )
        )}
      </TextField>

      {check_error && (
          <FormHelperText
            className="p-0"
            sx={{ marginLeft: 0, color: "#D90201" }}
          >
            {check_error}
          </FormHelperText>
        )}
    </FormControl>
  );
};
