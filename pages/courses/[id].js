import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { getSingleCourse } from '../../services/firebase';

export default function Course() {
  const router = useRouter();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const { id: courseId } = router.query;
    if (courseId) {
      getSingleCourse(courseId).then((course) => setCourse(course));
    }
  }, [router.query]);

  return (
    <Layout>
      <div>Single Course Page</div>
      {course && <div>found course {course.name}</div>}
    </Layout>
  );
}
