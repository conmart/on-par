import {
  Box,
  Button,
  Flex,
  IconButton,
  NumberInput,
  NumberInputField,
  Text,
} from '@chakra-ui/core';
import { useState } from 'react';

export default function HoleScore({ course, round, currentHole }) {
  const [score, setScore] = useState(round.holes[currentHole].score);

  const par = course.holes[currentHole].par;

  return (
    <Box>
      <Text>Hole: {currentHole + 1}</Text>
      <Text>Par: {par}</Text>
      <Flex>
        <NumberInput
          size="lg"
          onChange={(value) => setScore(value)}
          value={score}
        >
          <NumberInputField type="number" />
        </NumberInput>
        <Flex direction="column">
          <IconButton
            aria-label="increase score"
            size="lg"
            onClick={() => setScore(score + 1)}
            icon="triangle-up"
          />
          <IconButton
            aria-label="decrease score"
            size="lg"
            onClick={() => setScore(score - 1)}
            icon="triangle-down"
          />
        </Flex>
      </Flex>
    </Box>
  );
}
