import { Box, Flex, Text } from "@chakra-ui/core";

export default function ScoreCard({ course, round, totalScore }) {
  return (
    <Box w="100%">
      <table>
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
                <td>{round?.holes[i].score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Flex>
        <Text>Total Score</Text>
        <Text>{totalScore}</Text>
      </Flex>
    </Box>
  );
}
