import { Box, Button, useToast } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import { db } from '../../services/firebase';
import { toastError } from '../../services/helpers';
import GolferScore from './GolferScore';

export default function ScoreCard({ course, round, editHole }) {
  const toast = useToast();
  const router = useRouter();

  const deleteRound = async () => {
    try {
      await db.collection('rounds').doc(round.id).delete();
      router.push('/profile');
    } catch (err) {
      return toast({
        ...toastError,
        description: 'Something went wrong deleting this round',
      });
    }
  };

  return (
    <Box>
      <Box w="100%" pt={2}>
        <table className="score-card">
          <thead>
            <tr>
              <th>Hole</th>
              <th>Par</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {course?.holes.map(({ par }, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{par}</td>
                  <GolferScore
                    par={par}
                    score={round?.holes[i].score}
                    editHole={() => editHole(i)}
                  />
                </tr>
              );
            })}
          </tbody>
        </table>
      </Box>
      <Button mt={4} onClick={deleteRound} variantColor="red">
        Delete Round
      </Button>
    </Box>
  );
}
