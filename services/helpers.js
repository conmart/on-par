export const sumPar = (holes) =>
  holes.reduce((acc, currHole) => acc + currHole.par, 0);

export const toastError = {
  title: 'An error occurred',
  status: 'error',
  isClosable: true,
};
