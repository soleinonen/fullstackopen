const Header = ({text}) => <h3>{text}</h3>

const Part = ({part}) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part => <Part key={part.id} part={part}/>)}
    </div>
  )
}

const Summary = ({parts}) => {
  const total = parts.reduce((total, part) => total+part.exercises, 0)
  return <b>total of {total} exercises</b>
}

const Course = ({course}) => {
  return (
    <div>
      <Header text={course.name}/>
      <Content parts={course.parts}/>
      <Summary parts={course.parts}/>
    </div>
  )
}

export default Course