import type { CoursePart } from "../types"

const Part = (props: CoursePart) => {
  switch (props.kind) {
    case "basic":
      return (
        <p>
          <strong>
            {props.name} {props.exerciseCount}
          </strong>
          <div>
            <em>{props.description}</em>
          </div>
        </p>
      )

    case "background":
      return (
        <p>
          <strong>
            {props.name} {props.exerciseCount}
          </strong>
          <div>
            <em>{props.description}</em>
          </div>
          <div>submit to: {props.backgroundMaterial}</div>
        </p>
      )
    case "group":
      return (
        <p>
          <strong>
            {props.name} {props.exerciseCount}
          </strong>
          <div>project exercises: {props.groupProjectCount}</div>
        </p>
      )
    case "special":
      return (
        <p>
          <strong>
            {props.name} {props.exerciseCount}
          </strong>
          <div>
            <em>{props.description}</em>
          </div>

          <div>project exercises: {props.requirements.join(", ")}</div>
        </p>
      )
    default:
      return <div>Part</div>
  }
}

export default Part
