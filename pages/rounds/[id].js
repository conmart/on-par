import { useEffect, useState } from 'react';
import { Box, Button, Flex, Text } from '@chakra-ui/core';
import Layout from '../../components/Layout';
import { useResourceFromQuery } from '../../services/useResourceFromQuery';
import { useCurrentUser } from '../../services/auth';
import { getSingleCourse, updateScore } from '../../services/firebase';
import ScoreCard from '../../components/round/ScoreCard';
import HoleScore from '../../components/round/HoleScore';
import { caclulateScore, findNextHole } from '../../services/helpers';
import RoundFooter from '../../components/round/RoundFooter';

export default function Round() {
  const { resource: round, loading, error } = useResourceFromQuery(true);
  const { currentUser } = useCurrentUser();
  const [course, setCourse] = useState(null);
  const [currentHole, setCurrentHole] = useState(0);
  const [showScoreCard, setShowScoreCard] = useState(true);
  const isGolfer = round && round.user_id === currentUser?.uid;

  useEffect(() => {
    if (round) {
      getSingleCourse(round.course_id).then((course) => setCourse(course));
    }
  }, [round]);

  const saveHoleScore = async (holeScore) => {
    let newHoles = [...round.holes];
    newHoles[currentHole].score = holeScore;
    const totalScore = caclulateScore(course?.holes, newHoles);
    let updatedRound = { holes: newHoles, total_score: totalScore };
    try {
      await updateScore(round.id, updatedRound);
      incrementHole();
    } catch (err) {
      console.log(err);
    }
  };

  const incrementHole = () => {
    const nextHole = currentHole + 1;
    if (nextHole < course.hole_count && !roundFinished) {
      setCurrentHole(nextHole);
    } else {
      setShowScoreCard(true);
    }
  };

  const goToNextHole = () => {
    const score = round.holes[currentHole].score;
    if (nextUnscoredHole !== false) {
      if (score) {
        setCurrentHole(nextUnscoredHole);
      }
      setShowScoreCard(false);
    }
  };

  const editHole = (holeIndex) => {
    setCurrentHole(holeIndex);
    setShowScoreCard(false);
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
  const totalScore = caclulateScore(course?.holes, round?.holes);
  const nextUnscoredHole = findNextHole(round.holes);
  const roundFinished = nextUnscoredHole === false;

  return (
    <Layout title="Round">
      <Box w={280} textAlign="center" m="auto" pb={200}>
        <Text fontSize={26}>{course?.name}</Text>
        <Text>Date: {date}</Text>
        {showScoreCard ? (
          <ScoreCard
            course={course}
            round={round}
            editHole={editHole}
          />
        ) : (
          <HoleScore
            course={course}
            round={round}
            currentHole={currentHole}
            saveHoleScore={saveHoleScore}
            roundFinished={roundFinished}
          />
        )}
          <RoundFooter
            goToNextHole={goToNextHole}
            roundFinished={roundFinished}
            showScoreCard={showScoreCard}
            setShowScoreCard={setShowScoreCard}
            totalScore={totalScore}
          />
      </Box>
    </Layout>
  );
}
