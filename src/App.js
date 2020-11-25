import './App.css';
import React from 'react'
import SubmitIdea from "./Components/SubmitIdea/SubmitIdea";
import PlayTheGame from "./Components/PlayTheGame/PlayTheGame";
import ModeSelector from "./Components/ModeSelector";

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            mode : 'start'
        }
    }

    modeHandler = (event) => {
        const mode = event.target.name
        this.setState({
            mode
        })
    }

    render() {
        let title = []
        let main = <PlayTheGame></PlayTheGame>
        if (this.state.mode === "write"){
            main = <SubmitIdea></SubmitIdea>
        }
        if (this.state.mode === "start"){
            main = []
            title = <div className={"title"}>
                <h2>truth or dare</h2>
            </div>
        }


        return (

            <div className={"wrapper"}>
                {title}
                <ModeSelector
                handler={this.modeHandler}
                mode = {this.state.mode}
                ></ModeSelector>
                {main}
            </div>
        );
    }
}

export default App;
