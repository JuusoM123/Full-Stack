const Header = (props) => {
  return(
    <div>    
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return(
    <div>    
      <p>{props.part.name} {props.part.exercises}</p>
    </div>
  )
}

const Content = (props) => {
  return(
    <div>    
      <Part part={props.part1}/>
      <Part part={props.part2}/>
      <Part part={props.part2}/>
    </div>
  )
}

const Footer = (props) => {
  const number = props.part1.exercises + props.part2.exercises + props.part3.exercises
  return(
    <div>    
      <p>Number of excercices {number}</p>
    </div>
  )

}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course}/>
      <Content part1={part1} part2={part2} part3={part3}/>
      <Footer part1={part1} part2={part2} part3={part3}/>
      
    </div>
  )
}

export default App