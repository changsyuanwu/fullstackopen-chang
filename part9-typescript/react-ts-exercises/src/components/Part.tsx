import { CoursePart } from "../types"

interface PartProps {
  part: CoursePart
}

const partStyle = {
  marginBottom: "1em"
}

const Part = (props: PartProps) => {
  switch (props.part.kind) {
    case "basic":
      return (
        <div style={partStyle}>
          <b>
            {props.part.name} {props.part.exerciseCount}
          </b>
          <br />
          <i>{props.part.description}</i>
        </div>
      );
    case "group":
      return (
        <div style={partStyle}>
          <b>
            {props.part.name} {props.part.exerciseCount}
          </b>
          <br />
          group project exercises {props.part.groupProjectCount}
        </div>
      );
    case "background":
      return (
        <div style={partStyle}>
          <b>
            {props.part.name} {props.part.exerciseCount}
          </b>
          <br />
          <i>{props.part.description}</i>
          <br />
          learn more at <a href={props.part.backgroundMaterial}>{props.part.backgroundMaterial}</a>
        </div>
      );
    case "special":
      return (
        <div style={partStyle}>
          <b>
            {props.part.name} {props.part.exerciseCount}
          </b>
          <br />
          <i>{props.part.description}</i>
          <br />
          required skills: {props.part.requirements.join(", ")}
        </div>
      );
  }
};


export default Part