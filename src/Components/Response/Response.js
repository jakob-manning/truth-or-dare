import React from 'react'
import axios from "axios";
import DisplayComments from "./DisplayComments";

class Response extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorText: ''
        }
    }

    render() {
        let seeAnswers = []
        if(this.props.data[this.props.questionKey].responses){
            seeAnswers = <button
                className={"submitButton tdButtons"}
                onClick={this.props.nextHandler}>see answers</button>
        }

        if(!this.props.communityResponses){
            return(
                <div>
                    {this.props.errorMessage}
                    <h2>{this.props.responseType}</h2>
                    <form className={"form"} onSubmit={this.props.handleSubmit}>
                    <textarea
                        className={"inputField commentInput"}
                        name={"response"}
                        rows={"4"}
                        cols={"40"}
                        value={this.props.currentIdea}
                        placeholder={this.props.promptText}
                        onChange={this.props.handleChange}
                    />
                        <br />
                        <div className={"center"}>
                            <button
                                className={"submitButton tdButtons"}
                                type="submit"
                            >save
                            </button>
                            {seeAnswers}
                        </div>
                    </form>
                    <button
                        className={"submitButton tdButtons"}
                        onClick={this.props.refresh}
                    >refresh</button>
                </div>
            )
        }
        if(this.props.communityResponses){
            return (
                <div>
                    <DisplayComments
                        comments = {this.props.communityResponses}
                        voteHandler = {this.props.voteHandler}
                        data={this.props.data}
                        votesRemaining={this.props.votesRemaining}
                        errorMessage={this.props.errorMessage}
                    ></DisplayComments>
                    <button onClick={this.props.playAgain} className={"tdButtons wideButton"}>Play Again</button>
                </div>
            )
        }
    }
}

export default Response
