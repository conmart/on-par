import { Button, Text, Link } from '@chakra-ui/core';
import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import Layout from '../components/layout';
import { getAllCourses } from '../services/firebase';

export default function Home() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getAllCourses().then((courses) => setCourses(courses));
  }, [])

  return (
    <Layout>
      <Text fontSize="2em">All Courses</Text>
      {courses.map((course) => {
        return <div key={course.id}>{course.name}</div>;
      })}
      <NextLink href="/course/create-course">
        <Button as={Link}>Create new course</Button>
      </NextLink>
    </Layout>
  );
}
