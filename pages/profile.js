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
    const uid = currentUser?.uid;
    if (uid) {
      getUserRounds(uid).then((rounds) => setRounds(rounds));
      getUserCourses(uid).then((courses) => setCourses(courses));
    }
  }, [currentUser]);

  console.log(courses, 'user courses');
  console.log(rounds, 'found Rounds');

  return (
    <Layout>
      <Box>
        <Text>Your Rounds</Text>
        <table className="reg-table">
          <thead>
            <tr>
              <th>Course</th>
              <th>Date</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {rounds.map((round) => {
              const date = new Date(round.created_at).toLocaleDateString();
              return (
                <NextLink
                  key={round.id}
                  href={'/rounds/[id]'}
                  as={`/rounds/${round.id}`}
                >
                  <tr>
                    <td>{round.course_name}</td>
                    <td>{date}</td>
                    <td>{round.total_score}</td>
                  </tr>
                </NextLink>
              );
            })}
          </tbody>
        </table>
      </Box>
    </Layout>
  );
}
