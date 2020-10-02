import {
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/core';
import { useField, useFormikContext } from 'formik';

export default function NumInput({ label, includeStepper, ...props }) {
  const [field, { error }] = useField(props);
  const { setFieldValue } = useFormikContext();

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <NumberInput
        {...field}
        {...props}
        size="lg"
        type="number"
        id={field.name}
        onChange={(newValue) => {
          setFieldValue(field.name, newValue);
        }}
      >
        <NumberInputField type="number" />
        {includeStepper && (
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        )}
      </NumberInput>
    </FormControl>
  );
}
