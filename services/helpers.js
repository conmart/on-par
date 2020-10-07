export const sumPar = (holes) =>
  holes.reduce((acc, currHole) => acc + currHole.par, 0);
