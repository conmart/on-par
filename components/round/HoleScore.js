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
  roundFinished,
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

  const finalHole = currentHole + 1 >= course.hole_count;
  const buttonText = finalHole || roundFinished ? 'Save Score' : 'Next Hole';
  const buttonColor = 'teal';

  return (
    <Box>
      <Flex justify="space-around" py={3}>
        <Text fontSize={26}>Hole {currentHole + 1}</Text>
        <Text fontSize={26}>Par: {par}</Text>
      </Flex>
      <Text>Your Score:</Text>
      <Flex direction="column" py={2}>
        <IconButton
          aria-label="increase score"
          size="lg"
          onClick={() => changeScore(1)}
          icon="triangle-up"
          variantColor={buttonColor}
        />
        <Flex my={3} justify="space-between">
          <NumberInput
            w="45%"
            size="lg"
            onChange={(value) => {
              if (value > 0) setScore(value);
            }}
            value={score}
          >
            <NumberInputField type="number" placeholder={par} />
          </NumberInput>
          <Button
            variantColor="green"
            w="45%"
            size="lg"
            onClick={() => setScore(par)}
          >
            Par
          </Button>
        </Flex>
        <IconButton
          aria-label="decrease score"
          size="lg"
          onClick={() => changeScore(-1)}
          icon="triangle-down"
          variantColor={buttonColor}
        />
      </Flex>
      <Button mt={2} onClick={() => saveHoleScore(score)} variantColor="blue">
        {buttonText}
      </Button>
    </Box>
  );
}
