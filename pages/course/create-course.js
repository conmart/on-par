import { Button, Text } from '@chakra-ui/core';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useContext } from 'react';
import Layout from '../../components/layout';
import { AuthContext } from '../../services/auth';

export default function NewCourse() {
  const fac = useContext(AuthContext);

  console.log(fac)

  return (
    <Layout title="Create New Course">
      <Text fontSize="2em">Create a new course</Text>
      <Formik
      initialValues={{ name: '' }}
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
