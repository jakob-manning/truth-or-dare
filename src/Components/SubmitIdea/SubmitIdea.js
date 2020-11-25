import React from 'react'
import axios from "axios";
import Buttons from "../TDButtons";

class SubmitIdea extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            type: "truth",
            currentIdea: '',
            promptText: "answer truthfully",
            test: ''

        })
        this.submitRef =  React.createRef()
        this.inputRef =  React.createRef()
    }

    //Use state to handle form input
    handleChange = (event) => {
        const inputName = event.target.name
        const inputValue = event.target.value
        this.setState({
            [inputName] : inputValue
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
//TODO: remove white space and empty entries
        let question = this.state.currentIdea.trim()
        if (question === ''){
            this.setState({
                currentIdea: ''
            })
            return;
        }

        let data = {
            question,
            timeStamp : new Date().getTime(),
            type: this.state.type
        }

        //axios search
        this.axiosRequest(data)
        this.setState({
            currentIdea: ''
        })
    }

    //axios http request
    axiosRequest = (Data) => {
        axios.post("https://truth-or-dare-a2f5b.firebaseio.com/truth.json", Data)
            .then( response => {
                console.log(response)
            })
            .catch(error => console.log(error))
    }

    tdButtonHandler = (event) => {
        const inputName = event.target.name
        let currentPromptText = this.state.promptText
        let promptText = "i dare you to"
        if (inputName === "truth"){
            promptText = "answer truthfully"
        }
        this.setState({
            type : inputName,
            promptText
        })
    }

    render() {
        return (
            <div>
                <h2>write a new...</h2>
                <Buttons
                    handler = {this.tdButtonHandler}
                    game = {this.state.type}
                ></Buttons>
                <form className={"form"} onSubmit={this.handleSubmit}>
                    <textarea
                        className={"inputField commentInput"}
                        name={"currentIdea"}
                        rows={"4"}
                        cols={"40"}
                        value={this.state.currentIdea}
                        placeholder={this.state.promptText}
                        onChange={this.handleChange}
                        ref={this.inputRef}
                    />
                    <br />
                    <div className={"center"}>
                        <button
                            className={"submitButton largeButton"}
                            type="submit"
                            ref = {this.submitRef}
                        >save
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default SubmitIdea