import { Box } from '@chakra-ui/core';

export default function GolferScore({ par, score, editHole }) {
  const diff = score - par;
  console.log(diff, 'diff')

  return (
    <td onClick={editHole}>
      <Box cursor="pointer">{score}</Box>
    </td>
  );
}
