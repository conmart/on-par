import { useState } from 'react';
import Layout from '../../components/Layout';

export default function Round() {
  const [round, setRound] = useState(null);
  const [currentHole, setCurrentHole] = useState(1);
  const [showScoreCard, setShowScoreCard] = useState(false);

  return <Layout title="New Round"><div>New Round</div></Layout>;
}
