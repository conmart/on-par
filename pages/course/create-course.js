import { Button, Text } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import InputField from '../../components/InputField';
import Layout from '../../components/layout';
import { useCurrentUser } from '../../services/auth';
import { createCourse } from '../../services/firebase';
import { holes } from './utils';

export default function NewCourse() {
  const { currentUser } = useCurrentUser();

  return (
    <Layout title="Create New Course">
      <Text fontSize="2em">Create a new course</Text>
      {currentUser ? (<Formik
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
        {({ isSubmitting, values }) => {
          return (
            <Form>
              <InputField
                name="name"
                placeholder="New Golf Course"
                label="Course Name"
              />
              <Button type="submit" isLoading={isSubmitting}>
                Create Course
              </Button>
            </Form>
          );
        }}
      </Formik>) : (
        <Text>You must be logged in to create a course.</Text>
      )}
    </Layout>
  );
}
