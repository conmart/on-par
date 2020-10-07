import { Radio, RadioGroup, Text, useToast } from '@chakra-ui/core';
import Layout from '../../components/Layout';
import { useCurrentUser } from '../../services/auth';
import { db } from '../../services/firebase';
import CourseForm from '../../components/course/CourseForm';
import { useState } from 'react';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import { sumPar } from '../../services/helpers';

export default function NewCourse() {
  const router = useRouter();
  const toast = useToast();
  const { currentUser } = useCurrentUser();
  const [holeCount, setHoleCount] = useState(18);

  const saveCourse = async (values) => {
    values['total_par'] = sumPar(values.holes);
    values['hole_count'] = values.holes.length;

    try {
      const courseRef = await db.collection('courses').add(values);
      router.push(`/courses/${courseRef.id}`);
    } catch (err) {
      return toast({
        title: 'An error occurred',
        description: 'Something went wrong creating your course.',
        status: 'error',
        isClosable: true,
      });
    }
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
            onSubmit={async (values, { setSubmitting }) => {
              await saveCourse(values);
              setSubmitting(false);
            }}
            validateOnChange={false}
            validateOnBlur={false}
          >
            <Form>
              <CourseForm submitText="Create Course" holeCount={holeCount} />
            </Form>
          </Formik>
        </>
      ) : (
        <Text>You must be logged in to create a course.</Text>
      )}
    </Layout>
  );
}
