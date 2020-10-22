import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleCourse, getSingleRound } from './firebase';

export const useResourceFromQuery = (round = false) => {
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const { id } = router.query;
    const getResource = round ? getSingleRound : getSingleCourse;
    if (id) {
      getResource(id).then((resource) => {
        resource.id = id;
        setResource(resource);
      }).catch(() => setError(true));
      setLoading(false)
    }
  }, [router.query]);

  return { resource, loading, error };
};
