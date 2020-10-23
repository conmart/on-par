import {
  Box,
  Button,
  Flex,
  IconButton,
  NumberInput,
  NumberInputField,
  Text,
} from '@chakra-ui/core';
import { useEffect, useState } from 'react';

export default function HoleScore({
  course,
  round,
  currentHole,
  saveHoleScore,
}) {
  const [score, setScore] = useState('');

  useEffect(() => {
    setScore(round.holes[currentHole].score);
  }, [currentHole]);

  const par = course?.holes[currentHole].par;

  const changeScore = (value) => {
    let currentScore = score === '' ? par : score;
    setScore(Math.max(1, currentScore + value));
  };

  return (
    <Box>
      <Text>Hole: {currentHole + 1}</Text>
      <Text>Par: {par}</Text>
      <Text>Your Score:</Text>
      <Flex>
        <NumberInput
          size="lg"
          onChange={(value) => {
            if (value > 0) setScore(value);
          }}
          value={score}
        >
          <NumberInputField type="number" placeholder={par} />
        </NumberInput>
        <Flex direction="column">
          <IconButton
            aria-label="increase score"
            size="lg"
            onClick={() => changeScore(1)}
            icon="triangle-up"
          />
          <Button onClick={() => setScore(par)}>
            Par
          </Button>
          <IconButton
            aria-label="decrease score"
            size="lg"
            onClick={() => changeScore(-1)}
            icon="triangle-down"
          />
        </Flex>
      </Flex>
      <Button onClick={() => saveHoleScore(score)}>Next Hole</Button>
    </Box>
  );
}
