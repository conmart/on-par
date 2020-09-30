import { Button, Text } from '@chakra-ui/core';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Layout from '../../components/layout';
import { useCurrentUser } from '../../services/auth';
import { createCourse } from '../../services/firebase';

export default function NewCourse() {
  const { currentUser } = useCurrentUser();

  return (
    <Layout title="Create New Course">
      <Text fontSize="2em">Create a new course</Text>
      <Formik
        initialValues={{
          name: '',
          author_id: currentUser.uid,
          author_name: currentUser.displayName,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Required';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            createCourse(values);
            setSubmitting(false);
          }, 500);
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Form>
              <Field name="name" />
              <ErrorMessage name="name" component="div" />
              <Button type="submit" isLoading={isSubmitting}>
                Create Course
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Layout>
  );
}
