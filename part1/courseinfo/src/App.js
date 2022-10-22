const Header = (props) => <h1>{props.course.name}</h1>

const Content = ({parts}) => {
  return (
    <div>
      <Part part={parts[0]}/>
      <Part part={parts[1]}/>
      <Part part={parts[2]}/>
    </div>
  )
}

const Part = (props) => <p>{props.part.name} {props.part.exercises}</p>

const Total = ({parts}) => {
  const f = (total, part) => total+part.exercises
  const s = parts.reduce(f, 0)
  return(
    <p>Number of exercises {s}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
    </div>
  )
}

export default App