export const userMadeCourse = (user, course) => {
  return course && user && user.uid === course.author_id
}