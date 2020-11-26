import React from "react";

const Buttons = (props) => {
    let selectedButtonStyle = {
        border: "2px solid black",
        backgroundColor: "slategray",
        color: "white",
        fontWeight: "normal"
    }
    let firstStyle = null
    let secondStyle = null

    if(props.game === "advice"){
        firstStyle = selectedButtonStyle
    }
    else if(props.game === "confession"){
        secondStyle = selectedButtonStyle
    }


    return(
        <div >
            <button
                style={firstStyle}
                className={"tdButtons"}
                name={"advice"}
                onClick={props.handler}
            >advice</button>
            {props.children}
            <button
                style={secondStyle}
                className={"tdButtons"}
                name={"confession"}
                onClick={props.handler}
            >confessions</button>
        </div>
    )
}

export default Buttons