import Part from "./Part";
function Content(props){
    //console.log('Exporting Content props: ' + props.parts.parts[0].name);
    return (
        <div>
            <Part name={props.parts.parts[0].name} exercises={props.parts.parts[0].exercises} />
            <Part name={props.parts.parts[1].name} exercises={props.parts.parts[1].exercises} />
            <Part name={props.parts.parts[2].name} exercises={props.parts.parts[2].exercises} />
        </div>
    )
}

export default Content;