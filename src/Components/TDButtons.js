import React from "react";

const Buttons = (props) => {
    let selectedButtonStyle = {
        border: "2px solid black",
        backgroundColor: "slategray",
        color: "white",
        fontWeight: "normal"
    }
    let truthStyle = null
    let dareStyle = null

    if(props.game === "truth"){
        truthStyle = selectedButtonStyle
    }
    else if(props.game === "dare"){
        dareStyle = selectedButtonStyle
    }


    return(
        <div >
            <button
                style={truthStyle}
                className={"tdButtons"}
                name={"truth"}
                onClick={props.handler}
            >truth</button>
            {props.children}
            <button
                style={dareStyle}
                className={"tdButtons"}
                name={"dare"}
                onClick={props.handler}
            >dare</button>
        </div>
    )
}

export default Buttons