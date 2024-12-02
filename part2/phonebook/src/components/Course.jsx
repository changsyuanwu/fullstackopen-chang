import CourseHeader from "./CourseHeader";
import Total from "./Total";
import Content from "./Content";

const Course = ({ course }) => {
  return (
    <>
      <CourseHeader course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
}

export default Course