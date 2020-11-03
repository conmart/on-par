import { Box } from '@chakra-ui/core';

export default function GolferScore({ par, score, editHole }) {
  const diff = score - par;

  const calcScoreModifier = () => {
    const absDiff = Math.abs(diff);
    let class1 = 'score-sym';
    let class2 = '';
    
    if (absDiff > 1) {
      class2 = 'score-sym small-sym';
      if (absDiff > 2) {
        class1 += ' solid-border'
      }
    }
    if (diff < 0) {
      class1 += ' circle';
      class2 += ' circle';
    }

    return [class1, class2]
  };

  const [spanClass1, spanClass2] = calcScoreModifier();

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
