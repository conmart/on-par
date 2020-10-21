import { Box, Button, Flex, Text, useToast, Link } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import Layout from '../../components/Layout';
import { useCurrentUser } from '../../services/auth';
import { db } from '../../services/firebase';
import { useCourseFromQuery } from '../../services/useCourseFromQuery';
import { toastError } from '../../services/helpers';

export default function Course() {
  const toast = useToast();
  const router = useRouter();
  const { currentUser } = useCurrentUser();
  const { course, loading, error } = useCourseFromQuery();
  const isAuthor = course && course.author_id === currentUser?.uid;

  // TODO: Protect delete with alert dialogue
  const deleteCourse = async () => {
    try {
      await db.collection('courses').doc(course.id).delete();
      router.push('/');
    } catch (err) {
      return toast({
        ...toastError,
        description: 'Something went wrong deleting your course.',
      });
    }
  };

  const newRound = async () => {
    const round = {
      user_id: currentUser.uid,
      course_id: course.id,
      created_at: Date.now(),
      holes: new Array(course.hole_count).fill({ score: '' })
    };
    try {
      const roundRef = await db.collection('rounds').add(round);
      router.push(`/rounds/${roundRef.id}`);
    } catch(err) {
      console.log(err, 'newRound Errr')
      return toast({ ...toastError, description: 'Unable to create new round'});
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
              <Button as={Link} onClick={newRound}>
                New Round
              </Button>
              {isAuthor && (
                <>
                  <NextLink
                    href={'/courses/edit/[id]'}
                    as={`/courses/edit/${course.id}`}
                  >
                    <Button as={Link} mt={2}>
                      Edit Course
                    </Button>
                  </NextLink>
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
