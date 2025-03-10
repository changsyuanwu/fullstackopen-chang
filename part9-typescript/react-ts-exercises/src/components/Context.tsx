import { CoursePart } from "../types";

interface ContentProps {
  courseParts: CoursePart[]
};

const Content = (props: ContentProps) => {
  return (
    <div>
      {
        props.courseParts.map(part => {
          return <p key={part.name}>{part.name} {part.exerciseCount}</p>
        })
      }
    </div>
  )
};

export default Content;