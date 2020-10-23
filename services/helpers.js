export const sumPar = (holes) =>
  holes.reduce((acc, currHole) => acc + currHole.par, 0);

export const toastError = {
  title: 'An error occurred',
  status: 'error',
  isClosable: true,
};

export const findNextHole = (roundHoles) => {
  for (let i = 0; i < roundHoles.length; i ++) {
    if (roundHoles[i].score === '') {
      return i;
    }
  }
  return false;
}

export const caclulateScore = (courseHoles, roundHoles) => {
  let totalScore = 0;
  for (let i = 0; i < roundHoles.length; i ++) {
    const score = roundHoles[i].score
    if (score) {
      totalScore += score - courseHoles[i].par
    }
  }
  let formattedScore = 'par'
  if (totalScore > 0) {
    formattedScore = '+' + totalScore;
  } else if (totalScore < 0) {
    formattedScore = formattedScore.toString();
  }
  return formattedScore;
}
