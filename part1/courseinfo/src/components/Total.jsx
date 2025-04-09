const Total = (props) =>{
    //console.log('Exporting Total');
    //console.log('Props: ' + props.exercises1);
    return (
        <div>
            <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
        </div>
    )
}

export default Total;