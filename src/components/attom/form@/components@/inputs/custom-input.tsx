import { FormControl, InputAdornment, TextField } from "@mui/material";

export const CustomInput = ({
  changeHandler,
  name,
  label,
  placeholder,
  type,
  showEndAdorMent,
  showEndAdorMentValue,
  classes,
  classNames,
  value,
}: any) => {
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
        sx={{
          ".MuiInputBase-root": { borderRadius: "3px", fontSize: "12px" },
          fontSize: "14px",
        }}
        className={`${classes} form-inp`}
        variant="outlined"
        fullWidth
        value={value}
        label={label}
        name={name}
        type={type}
        onChange={changeHandler}
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
    </FormControl>
  );
};

CustomInput.defaultProps = {
  type: "text",
  showEndAdorMent: false,
  classes: "bg-white",
};
