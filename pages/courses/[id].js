import { Box, Button, Flex, Text, useToast } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useCurrentUser } from '../../services/auth';
import { db } from '../../services/firebase';
import { useCourseFromQuery } from '../../services/useCourseFromQuery';

export default function Course() {
  const toast = useToast();
  const router = useRouter();
  const { currentUser } = useCurrentUser();
  const { course, loading, error } = useCourseFromQuery();
  const isAuthor = course && course.author_id === currentUser?.uid;

  const deleteCourse = async () => {
    try {
      await db.collection('courses').doc(course.id).delete();
      router.push('/');
    } catch (err) {
      return toast({
        title: 'An error occurred',
        description: 'Something went wrong deleting your course.',
        status: 'error',
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Layout>
        <Box>...loading</Box>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Box>Unable to find this golf course</Box>
      </Layout>
    );
  }

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
