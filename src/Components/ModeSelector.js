import React from "react";

const ModeSelector = (props) => {

    let selectedButtonStyle = {
        padding: "5px 10px 5px 10px",
        borderBottom: "4px solid black",
        backgroundColor: "slategray",
        color: "white",
        fontWeight: "normal"
    }

    let writeStyle = null
    let playStyle = null

    if(props.mode === "write"){
        writeStyle = selectedButtonStyle
    }
    if(props.mode === "play"){
        playStyle = selectedButtonStyle
    }

    return(
        <div className={"modeSelector"}>
            <button
                className={"largeButton"}
                style={writeStyle}
                name={"write"}
                onClick={props.handler}
            >ask</button>
            <button
                className={"largeButton playStyle"}
                style={playStyle}
                name={"play"}
                onClick={props.handler}
            >play</button>
        </div>
    )
}

export default ModeSelector