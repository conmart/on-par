import { Box } from "@chakra-ui/core";

export default function ScoreCard({ course, round }) {
  return (
    <Box>
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
    </Box>
  );
}
