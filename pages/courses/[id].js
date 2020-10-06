import { Box, Button, Flex, Text, useToast } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useCurrentUser } from '../../services/auth';
import { db, getSingleCourse } from '../../services/firebase';

export default function Course() {
  const toast = useToast();
  const router = useRouter();
  const { currentUser } = useCurrentUser();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const { id: courseId } = router.query;
    if (courseId) {
      getSingleCourse(courseId).then((course) => setCourse(course));
    }
  }, [router.query]);

  const deleteCourse = async () => {
    try {
      await db.collection('courses').doc(router.query.id).delete();
      router.push('/');
    } catch (err) {
      return toast({
        title: 'An error occurred',
        description: 'Something went wrong creating your course.',
        status: 'error',
        isClosable: true,
      });
    }
  };

  const isAuthor =
    course && currentUser && currentUser.uid === course.author_id;

  return (
    <Layout>
      {course && (
        <Flex justify="space-between">
          <Box>
            <Text fontSize="2em">{course.name}</Text>
            <Text>Created By: {course.author_name}</Text>
            <Flex>
              <Text>{course.hole_count} Holes</Text>
              <Text>Total Par: {course.total_par}</Text>
            </Flex>
            <Box>
              <table>
                <thead>
                  <tr>
                    <th>Hole</th>
                    <th>Par</th>
                  </tr>
                </thead>
                <tbody>
                  {course.holes.map(({ par }, i) => {
                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{par}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Box>
          </Box>
          {currentUser && (
            <Flex direction="column">
              <Button>New Round</Button>
              {isAuthor && (
                <>
                  <Button mt={2}>Edit Course</Button>
                  <Button onClick={deleteCourse} variantColor="red" mt={2}>
                    Delete Course
                  </Button>
                </>
              )}
            </Flex>
          )}
        </Flex>
      )}
    </Layout>
  );
}
