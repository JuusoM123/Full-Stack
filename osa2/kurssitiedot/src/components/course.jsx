const Header = (props) => {
    return(
      <div>    
        <h1>{props.course.name}</h1>
      </div>
    )
  }
  
const Content = (props) => {
    
    return(
        <div>
            <ul>
                {props.course.parts.map( course =>
                <li key = {course.id}>
                {course.name} {course.exercises}
                </li>
            )}
            </ul>

        </div>
    )
}
  
const TotalExercises = (props) => {
     return (props.course.parts.reduce((sum, course) => sum + course.exercises, 0));
}

const Course = (props) => {
    const totalExercises = props.course.parts.reduce((sum, course) => sum + course.exercises, 0);
  
    return (
      <div>
        <Header course={props.course}/>
        <ul>
          <Content course ={props.course}/>
          <li>Total of <TotalExercises course={props.course}/> exercises</li>
        </ul>
      </div>
      )
}

export default Course