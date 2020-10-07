import { Box, Button, Flex, Text } from '@chakra-ui/core';
import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import InputField from '../InputField';
import NumInput from '../NumInput';

export default function CourseForm({ submitText, holeCount }) {
  const { values, isSubmitting, setFieldValue } = useFormikContext();

  useEffect(() => {
    const { holes } = values
    if (holeCount > holes.length) {
      const diff = holeCount - holes.length
      const additionalHoles = new Array(diff).fill({ yards: '', par: 3 });
      setFieldValue('holes', holes.concat(additionalHoles))
    } else if (holeCount < holes.length) {
      setFieldValue('holes', holes.slice(0, holeCount))
    }
  }, [holeCount])

  return (
    <>
      <InputField
        name="name"
        label="Course Name"
      />
      {values.holes.map((_, i) => (
        <Box key={i}>
          <Text>{'Hole ' + (i + 1)}</Text>
          <Flex>
            <NumInput
              name={`holes[${i}].par`}
              label="Par"
              min={1}
              max={7}
              includeStepper
            />
            <NumInput
              name={`holes[${i}].yards`}
              label="Yards"
            />
          </Flex>
        </Box>
      ))}
      <Button type="submit" isLoading={isSubmitting}>
        {submitText}
      </Button>
    </>
  );
}
