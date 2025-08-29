import type { CoursePart } from "../types"
import Part from "./Part"

interface Content {
  courseParts: Array<CoursePart>
}

const Content = (props: Content) => {
  return (
    <div>
      {props.courseParts.map((coursePart: CoursePart) => {
        return <Part {...coursePart} />
      })}
    </div>
  )
}

export default Content
