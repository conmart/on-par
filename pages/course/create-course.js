import { Radio, RadioGroup, Text } from '@chakra-ui/core';
import Layout from '../../components/Layout';
import { useCurrentUser } from '../../services/auth';
import { createCourse } from '../../services/firebase';
import CourseForm from '../../components/course/CourseForm';
import { useState } from 'react';
import { Formik, Form } from 'formik';

export default function NewCourse() {
  const { currentUser } = useCurrentUser();
  const [holeCount, setHoleCount] = useState(18);

  const saveCourse = (values) => {
    const totalPar = values.holes.reduce(
      (acc, currVal) => acc + currVal.par,
      0
    );
    values['total_par'] = totalPar;
    console.log(values, 'endvalues');
  };

  return (
    <Layout title="Create New Course">
      <Text fontSize="2em">Create a new course</Text>
      {currentUser ? (
        <>
          <RadioGroup
            onChange={(e) => setHoleCount(e.target.value)}
            value={holeCount}
          >
            <Radio value={9}>9 Holes</Radio>
            <Radio value={18}>18 Holes</Radio>
          </RadioGroup>
          <Formik
            initialValues={{
              name: '',
              author_id: currentUser.uid,
              author_name: currentUser.displayName,
              holes: [],
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
              <CourseForm holeCount={holeCount} />
            </Form>
          </Formik>
        </>
      ) : (
        <Text>You must be logged in to create a course.</Text>
      )}
    </Layout>
  );
}
