import { Box } from '@chakra-ui/core';

export default function GolferScore({ par, score, editHole }) {

  return (
    <td onClick={editHole}>
      <Box cursor="pointer">{score}</Box>
    </td>
  );
}
