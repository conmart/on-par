import { Button, Text, Link } from '@chakra-ui/core';
import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import Layout from '../components/Layout';
import { getAllCourses } from '../services/firebase';

export default function Home() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getAllCourses().then((courses) => setCourses(courses));
  }, []);

  return (
    <Layout>
      <Text fontSize="2em">All Courses</Text>
      <table>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Holes</th>
            <th>Par</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => {
            return (
              <NextLink
                key={course.id}
                href={"/courses/[id]"}
                as={`/courses/${course.id}`}
              >
                <tr>
                  <td>{course['name']}</td>
                  <td>{course['hole_count']}</td>
                  <td>{course['total_par']}</td>
                </tr>
              </NextLink>
            );
          })}
        </tbody>
      </table>
      <NextLink href="/courses/create-course">
        <Button as={Link}>Create new course</Button>
      </NextLink>
    </Layout>
  );
}
