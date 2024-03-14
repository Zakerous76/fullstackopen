const Header = (props) => {
 return (
  <h1>{props.course}</h1>
 )

}

const Content = (props) => {
  return (
    <>
      <p>
        {props.content[0]} {props.content[1]}
      </p>
      <p>
        {props.content[2]} {props.content[3]}
      </p>
      <p>
        {props.content[4]} {props.content[5]}
      </p>
    </>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.total}</p>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      <Content content={[part1, exercises1, part2, exercises2, part3, exercises3]}/>
      <Total total={exercises1+exercises2+exercises3}/>
    </div>
  )
}

export default App
