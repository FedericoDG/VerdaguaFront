import {Autocomplete, createFilterOptions, TextField} from '@mui/material'
import {getIn} from 'formik'

const CustomAutocomplete = ({
  textFieldProps,
  field,
  form,
  label,
  options,
  setFieldValue,
  ...props
}) => {
  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    limit: 500,
  })
  const errorText = getIn(form.touched, field.name) && getIn(form.errors, field.name)

  return (
    <Autocomplete
      {...props}
      {...field}
      // disableClearable
      filterOptions={filterOptions}
      isOptionEqualToValue={(option, value) => option.value === value?.value}
      noOptionsText="No existe"
      options={[...options]}
      renderInput={(otherProps) => (
        <TextField
          {...otherProps}
          {...textFieldProps}
          InputProps={{
            ...otherProps.InputProps,
          }}
          error={!!errorText}
          helperText={errorText?.label || errorText}
          label={label}
        />
      )}
      value={field.value}
      onChange={(e, value) => {
        form.setFieldValue(field.name, value)
        if (setFieldValue) {
          setFieldValue(value)
        }
      }}
    />
  )
}

export default CustomAutocomplete
