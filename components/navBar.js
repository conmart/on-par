import { Flex, Button, Text } from '@chakra-ui/core';
import { useContext } from 'react';
import { AuthContext } from '../services/auth';
import { signInWithGoogle, signOut } from '../services/firebase';

export default function NavBar() {
  const { currentUser } = useContext(AuthContext);

  return (
    <Flex position="sticky" top={0} bg="green.600" p={4}>
      <Flex
        m="auto"
        maxW={1000}
        justify="space-between"
        w="100%"
        align="center"
      >
        <Text fontSize="2em" color="white">
          OnPar
        </Text>
        <Flex>
          {currentUser ? (
            <Button variantColor="pink" onClick={async () => await signOut()}>
              Sign out
            </Button>
          ) : (
            <Button
              variantColor="pink"
              onClick={async () => await signInWithGoogle()}
            >
              sign In
            </Button>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}
