/** @packages */
import { TextField } from '@mui/material';
import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

/** @interfaces */
interface ITextFieldPropsAtm {
  error: FieldError | undefined;
  isRequired?: boolean;
  label: string;
  sx?: Record<string, unknown>;
  type?: string;
  width?: string | number;
}

const TextFieldAtm = forwardRef<HTMLInputElement, ITextFieldPropsAtm>(({
  error,
  isRequired = false,
  label,
  sx,
  type = 'text',
  width = '150px',
  ...props
}: ITextFieldPropsAtm, ref) => (
  <TextField
    {...props}
    type={type}
    label={label}
    size="small"
    error={!!error}
    helperText={error?.message}
    variant="outlined"
    required={isRequired}
    sx={{
      width,
      ...sx,
    }}
    inputRef={(e) => {
      if (ref && e && typeof ref === 'function') {
        ref(e);
      }
    }}
  />
));

TextFieldAtm.displayName = 'TextField';

export default TextFieldAtm;
