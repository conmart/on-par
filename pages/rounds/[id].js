import { useEffect, useState } from 'react';
import { Box, Button, Text } from '@chakra-ui/core';
import Layout from '../../components/Layout';
import { useResourceFromQuery } from '../../services/useResourceFromQuery';
import { useCurrentUser } from '../../services/auth';
import { getSingleCourse, updateScore } from '../../services/firebase';
import ScoreCard from '../../components/round/ScoreCard';
import HoleScore from '../../components/round/HoleScore';

export default function Round() {
  const { resource: round, loading, error } = useResourceFromQuery(true);
  const { currentUser } = useCurrentUser();
  const [course, setCourse] = useState(null);
  const [currentHole, setCurrentHole] = useState(0);
  const [showScoreCard, setShowScoreCard] = useState(false);
  const isGolfer = round && round.user_id === currentUser?.uid;

  useEffect(() => {
    console.log('affected')
    if (round) {
      getSingleCourse(round.course_id).then((course) => setCourse(course));
    }
  }, [round]);

  const saveHoleScore = async (holeScore) => {
    let newHoles = [...round.holes];
    newHoles[currentHole].score = holeScore;
    console.log(newHoles);
    try {
      await updateScore(round.id, newHoles);
      // console.log(updatedRound)
      setCurrentHole(currentHole + 1);
    } catch (err) {
      console.log(err)
    }
  };

  if (loading || !isGolfer) {
    return (
      <Layout>
        <Box>...loading</Box>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Box>Unable to find this round</Box>
      </Layout>
    );
  }

  const date = new Date(round.created_at).toLocaleDateString();
  return (
    <Layout title="Round">
      <Text>{course?.name}</Text>
      <Text>Date: {date}</Text>
      {showScoreCard ? (
        <ScoreCard course={course} round={round} />
      ) : (
        <HoleScore
          course={course}
          round={round}
          currentHole={currentHole}
          saveHoleScore={saveHoleScore}
        />
      )}
      <Button onClick={() => setShowScoreCard(!showScoreCard)}>
        toggle comps
      </Button>
    </Layout>
  );
}
