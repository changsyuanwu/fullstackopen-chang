import { CoursePart } from "../types";
import Part from "./Part";

interface ContentProps {
  courseParts: CoursePart[]
};

const Content = (props: ContentProps) => {
  return (
    <div>
      {
        props.courseParts.map(part => {
          return <Part part={part} key={part.name} />
        })
      }
    </div>
  )
};

export default Content;