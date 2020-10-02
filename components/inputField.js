import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/core';
import { useField } from 'formik';

export default function InputField({ label, ...props }) {
  const [field, { error }] = useField(props);
  // console.log(props, 'textprops')

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input {...field} {...props} id={field.name} size='lg' />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
}
