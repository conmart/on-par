import { Box, Flex, Text } from '@chakra-ui/core';
import GolferScore from './GolferScore';

export default function ScoreCard({ course, round, totalScore, editHole }) {
  return (
    <Box w="100%" pt={2}>
      <table className='score-card'>
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
      <Flex justify="space-between" pt={3}>
        <Text fontSize={20}>Total Score:</Text>
        <Text w={126} fontSize={20} fontWeight="bold">
          {totalScore}
        </Text>
      </Flex>
    </Box>
  );
}
