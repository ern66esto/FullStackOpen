const Header = (props) => {
    //console.log('Exporting Header props: ' + props.course.name);
    return (
        <div>
            <h1>{props.course.name}</h1>
        </div>
    )
}
export default Header;