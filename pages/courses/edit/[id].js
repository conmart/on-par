import { Box, Text, useToast } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import CourseForm from '../../../components/course/CourseForm';
import Layout from '../../../components/Layout';
import { useCurrentUser } from '../../../services/auth';
import { db } from '../../../services/firebase';
import { sumPar } from '../../../services/helpers';
import { useCourseFromQuery } from '../../../services/useCourseFromQuery';

export default function EditCourse() {
  const router = useRouter();
  const toast = useToast();
  const { course, loading, error } = useCourseFromQuery();
  const { currentUser } = useCurrentUser();
  const isAuthor = course && course.author_id === currentUser?.uid;

  const updateCourse = async (values) => {
    values['total_par'] = sumPar(values.holes);

    try {
      await db.collection('courses').doc(values.id).update(values);
      router.push(`/courses/${values.id}`);
    } catch (err) {
      console.log('error', err);
      return toast({
        title: 'An error occurred',
        description: 'Something went wrong updating your course.',
        status: 'error',
        isClosable: true,
      });
    }
  };

  if (loading || !isAuthor) {
    return (
      <Layout>
        <Box>...loading</Box>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Box>Something went wrong.</Box>
      </Layout>
    );
  }

  return (
    <Layout title="Edit Course">
        <Text fontSize="2em">Edit Course</Text>
          <Formik
            initialValues={course}
            validate={(values) => {
              const errors = {};
              if (!values.name) {
                errors.name = 'Name is required';
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              await updateCourse(values);
              setSubmitting(false);
            }}
          >
            <Form>
              <CourseForm
                submitText="Update Course"
                holeCount={course.hole_count}
              />
            </Form>
          </Formik>
    </Layout>
  );
}
