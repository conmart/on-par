import { Box, Text } from '@chakra-ui/core';
import { useState } from 'react';

export default function HoleScore({ course, round, currentHole }) {
  const [score, setScore] = useState(round.holes[currentHole].score);

  return (
    <Box>
      <Text>Hole: {currentHole + 1}</Text>
      <Text>Par: {course.holes[currentHole].par}</Text>
    </Box>
  );
}
