import { Box, Text } from '@chakra-ui/core';
import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import Layout from '../components/Layout';
import { useCurrentUser } from '../services/auth';
import { getUserCourses, getUserRounds } from '../services/firebase';

export default function Profile() {
  const { currentUser } = useCurrentUser();
  const [rounds, setRounds] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const uid = currentUser?.uid
    if (uid) {
      getUserRounds(uid).then((rounds) => setRounds(rounds));
      getUserCourses(uid).then((courses) => setCourses(courses));
    }
  }, [currentUser]);

  console.log(courses, 'user courses')

  return (
    <Layout>
      <Box>
        <Text>Your Rounds</Text>
        {rounds.map((round) => {
          return (
            <NextLink
              key={round.id}
              href={'/rounds/[id]'}
              as={`/rounds/${round.id}`}
            >
              <a>
                {round.id}, {round.holes.length}
              </a>
            </NextLink>
          );
        })}
      </Box>
    </Layout>
  );
}
