import { Box } from '@chakra-ui/core';

export default function GolferScore({ par, score, editHole }) {
  const diff = score ? score - par : false;

  const styleScoreModifier = () => {
    const absDiff = Math.abs(diff);
    let class1 = diff < 0 ? 'circle score-sym' : 'score-sym';
    let class2 = diff < 0 ? 'circle ' : '';

    if (absDiff > 1) {
      class2 += 'score-sym small-sym';
      if (absDiff > 2) {
        class1 += ' solid-border'
      }
    }

    return [class1, class2]
  };

  const [spanClass1, spanClass2] = styleScoreModifier();

  return (
    <td onClick={editHole}>
      <Box cursor="pointer" position="relative">
        {!!diff && (
          <>
            <span className={spanClass1} />
            <span className={spanClass2} />
          </>
        )}
        {score}
      </Box>
    </td>
  );
}
