import { Box, Button, Flex, Text } from '@chakra-ui/core';

export default function RoundFooter({
  goToNextHole,
  roundFinished,
  showScoreCard,
  setShowScoreCard,
  totalScore,
}) {
  return (
    <Box
      bg="gray.700"
      position="fixed"
      zIndex={2}
      bottom="-5px"
      pt={2}
      pb={50}
      w="100%"
      maxW={500}
      left="50%"
      transform="translateX(-50%)"
      borderRadius="7px 7px 0 0"
    >
      <Flex justify="space-around" color="white" py={3} w={200} m="auto">
        <Text fontSize={20} fontWeight="bold">
          Total Score:
        </Text>
        <Text fontSize={20} fontWeight="bold">
          {totalScore}
        </Text>
      </Flex>
      {!roundFinished && (
        <>
          {showScoreCard ? (
            <Button variantColor="blue" my={2} onClick={goToNextHole}>
              Score Next Hole
            </Button>
          ) : (
            <Button
              variantColor="blue"
              my={2}
              onClick={() => setShowScoreCard(true)}
            >
              View ScoreCard
            </Button>
          )}
        </>
      )}
    </Box>
  );
}
