const Course = (props) => {
const header = props.course.name;
const courses = props.course.parts;
let sumOfExercises = courses.reduce((sum, course) => sum + course.exercises, 0);
return (
    <>
        <h1>{header}</h1>
        <ul>
            {courses.map(course => <li key={course.id}>{course.name} {course.exercises}</li> )}
        </ul>
        <h3>Total of { sumOfExercises } exercises</h3>
    </>
)
}

export default Course;