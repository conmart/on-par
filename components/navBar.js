import { Flex, Button, Text, Link } from '@chakra-ui/core';
import { useState } from 'react';
import NextLink from 'next/link';
import { useCurrentUser } from '../services/auth';
import { signInWithGoogle, signUserOut } from '../services/firebase';

export default function NavBar() {
  const { currentUser } = useCurrentUser();
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    setLoading(true);
    await signInWithGoogle();
    setLoading(false);
  };

  const signOut = async () => {
    setLoading(true);
    await signUserOut();
    setLoading(false);
  }

  return (
    <Flex position="sticky" top={0} bg="green.500" p={4} zIndex={2}>
      <Flex
        m="auto"
        maxW={1000}
        justify="space-between"
        w="100%"
        align="center"
      >
        <NextLink href="/">
          <Text as={Link} fontSize="2em" color="white">
            OnPar
          </Text>
        </NextLink>
        {currentUser ? (
          <Flex>
            <Button
              onClick={() => console.log('clicked profile')}
              variant="link"
              mr={2}
              p={2}
              color="white"
            >
              Profile
            </Button>
            <Button variantColor="blue" onClick={signOut} isLoading={loading}>
              Sign Out
            </Button>
          </Flex>
        ) : (
          <Button variantColor="blue" onClick={signIn} isLoading={loading}>
            Sign In
          </Button>
        )}
      </Flex>
    </Flex>
  );
}
