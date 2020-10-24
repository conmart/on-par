import { useEffect, useState } from 'react';
import { Box, Button, Text } from '@chakra-ui/core';
import Layout from '../../components/Layout';
import { useResourceFromQuery } from '../../services/useResourceFromQuery';
import { useCurrentUser } from '../../services/auth';
import { getSingleCourse, updateScore } from '../../services/firebase';
import ScoreCard from '../../components/round/ScoreCard';
import HoleScore from '../../components/round/HoleScore';
import { caclulateScore, findNextHole } from '../../services/helpers';

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
    let updatedRound = { holes: newHoles };
    const nextHole = findNextHole(newHoles);
    if (!nextHole) {
      updatedRound['finished'] = true;
    }
    try {
      await updateScore(round.id, updatedRound);
      goToNextHole(nextHole);
    } catch (err) {
      console.log(err)
    }
  };

  const goToNextHole = (nextHole) => {
    if (currentHole < 8) {
      setCurrentHole(currentHole + 1);
    } else if (nextHole) {
      setCurrentHole(nextHole);
    } else {
      setShowScoreCard(true);
    }
  }

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

  const toggleText = showScoreCard ? 'Enter Score' : 'View ScoreCard';
  const date = new Date(round.created_at).toLocaleDateString();
  const totalScore = caclulateScore(course, round);
  console.log(totalScore, 'totalScore')
  return (
    <Layout title="Round">
      <Box w={300} textAlign='center' m='auto'>
        <Text fontSize="2em">{course?.name}</Text>
        <Text>Date: {date}</Text>
        {showScoreCard ? (
          <ScoreCard course={course} round={round} totalScore={totalScore} />
        ) : (
          <HoleScore
            course={course}
            round={round}
            currentHole={currentHole}
            saveHoleScore={saveHoleScore}
          />
        )}
        <Button mt={2} onClick={() => setShowScoreCard(!showScoreCard)}>
          {toggleText}
        </Button>
      </Box>
    </Layout>
  );
}
