import { Box, Button, Flex, Text } from '@chakra-ui/core';
import { useFormikContext } from 'formik';
import { Fragment, useEffect } from 'react';
import InputField from '../InputField';
import NumInput from '../NumInput';

export default function CourseForm({ holes }) {
  const { values, isSubmitting, setFieldValue } = useFormikContext();

  useEffect(() => {
    setFieldValue('holes', holes)
  }, [holes])

  return (
    <Fragment>
      <InputField
        name="name"
        placeholder="New Golf Course"
        label="Course Name"
      />
      {values.holes.map((hole, i) => (
        <Box key={i}>
          <Text>{'Hole ' + hole.number}</Text>
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
        Create Course
      </Button>
    </Fragment>
  );
}
