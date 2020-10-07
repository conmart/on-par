import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleCourse } from './firebase';

export const useCourseFromQuery = () => {
  const [course, setCourse] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const { id: courseId } = router.query;
    if (courseId) {
      getSingleCourse(courseId).then((course) => {
        course.id = courseId;
        setCourse(course);
      });
    }
  }, [router.query]);

  return course;
};
