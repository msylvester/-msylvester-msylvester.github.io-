const ColorPicker = props => {
    return (<input
        type="color"
        value={props.inputColor}
        onChange={(e) => { props.setColor(e.target.value) }}
    />);
};
export default ColorPicker;