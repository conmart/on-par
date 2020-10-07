import Layout from '../../../components/Layout';
import { useCourseFromQuery } from '../../../services/useCourseFromQuery'

export default function EditCourse() {
  const course = useCourseFromQuery();

  return (
    <Layout>
      <div>Edit course</div>
    </Layout>
  );
}