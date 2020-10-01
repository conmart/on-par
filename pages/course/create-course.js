import { Box, Button, Flex, Radio, RadioGroup, Text } from '@chakra-ui/core';
import Layout from '../../components/Layout';
import { useCurrentUser } from '../../services/auth';
import { createCourse } from '../../services/firebase';
import { shortCourse, regCourse } from '../../components/course/utils';
import CourseForm from '../../components/course/CourseForm';
import { useState } from 'react';
import { Formik, Form } from 'formik';
import InputField from '../../components/InputField';

export default function NewCourse() {
  const { currentUser } = useCurrentUser();
  const [holeCount, setHoleCount] = useState('');
  // see if above will work ^^^

  const saveCourse = (values) => {
    console.log(values, 'endvalues');
  };

  const holes = holeCount === 'short' ? shortCourse : regCourse;

  return (
    <Layout title="Create New Course">
      <Text fontSize="2em">Create a new course</Text>
      {currentUser ? (
        <>
          <RadioGroup
            onChange={(e) => setHoleCount(e.target.value)}
            value={holeCount}
          >
            <Radio value="short">9 Holes</Radio>
            <Radio value="reg">18 Holes</Radio>
          </RadioGroup>
          {holeCount && (
            <Formik
              initialValues={{
                name: '',
                author_id: currentUser.uid,
                author_name: currentUser.displayName,
                holes,
              }}
              validate={(values) => {
                const errors = {};
                if (!values.name) {
                  errors.name = 'Name is required';
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  saveCourse(values);
                  setSubmitting(false);
                }, 500);
              }}
              validateOnChange={false}
              validateOnBlur={false}
            >
              <Form>
                <CourseForm holes={holes} />
              </Form>
            </Formik>
          )}
        </>
      ) : (
        <Text>You must be logged in to create a course.</Text>
      )}
    </Layout>
  );
}
