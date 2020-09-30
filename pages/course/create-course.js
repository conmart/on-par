import { Button, Text } from '@chakra-ui/core';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Layout from '../../components/layout';
import { useCurrentUser } from '../../services/auth';

export default function NewCourse() {
  const { currentUser } = useCurrentUser();
  console.log(currentUser.displayName)

  return (
    <Layout title="Create New Course">
      <Text fontSize="2em">Create a new course</Text>
      <Formik
      initialValues={{ name: '', author: 'test' }}
      validate={values => {
        const errors = {};
        if (!values.name) {
          errors.name = 'Required';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log(values);
          setSubmitting(false)
        }, 500)
      }}
      >
        {({ isSubmitting }) => {
          return (
            <Form>
              <Field name='name' />
              <ErrorMessage name='name' component='div' />
              <Button type="submit" isLoading={isSubmitting}>Create Course</Button>
            </Form>
          )
        }}
      </Formik>
    </Layout>
  );
}
