import FormControl from "@mui/material/FormControl/FormControl";
import FormHelperText from "@mui/material/FormHelperText/FormHelperText";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import Select from "@mui/material/Select/Select";
import { Controller, Control, FieldErrors } from "react-hook-form";
import { ISite } from "../../../interfaces/ISite";

export default function SiteField({
  control,
  defaultValue = "",
  errors,
  sites = [],
}: {
  control: Control;
  defaultValue: String;
  errors: FieldErrors;
  sites: ISite[];
}) {
  return (
    <Controller
      name="siteId"
      control={control}
      defaultValue={defaultValue}
      rules={{ required: "Куст обязателен" }}
      render={({ field }) => (
        <FormControl margin="normal" fullWidth error={!!errors.siteId}>
          <InputLabel id="site-id-select-label">Куст</InputLabel>
          <Select
            {...field}
            labelId="site-id-select-label"
            id="site-id-select"
            label="Куст"
          >
            {sites.map((site) => (
              <MenuItem key={site.siteId} value={site.siteId}>
                {site.siteName}
              </MenuItem>
            ))}
          </Select>

          {errors.siteId && (
            <FormHelperText error>
              {typeof errors.siteId.message === "string"
                ? errors.siteId.message
                : "Invalid selection"}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
