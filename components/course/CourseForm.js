import { Box, Button, Flex, Text } from '@chakra-ui/core';
import { useFormikContext } from 'formik';
import { Fragment, useEffect } from 'react';
import InputField from '../InputField';

export default function CourseForm({ holes }) {
  console.log(holes, 'holes')
  const { values, isSubmitting, setFieldValue } = useFormikContext();
  // console.log(fc)

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
            <InputField
              name={`holes[${i}].par`}
              placeholder={3}
              label="Par"
              type="number"
            />
            <InputField
              name={`holes[${i}].yards`}
              placeholder=""
              label="Yards"
              type="number"
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
