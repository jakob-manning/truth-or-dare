import React from 'react'
import axios from "axios";
import DisplayComments from "./DisplayComments";

class Response extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            response: '',
            errorText: '',
            communityResponses: ''
        }
    }

    handleChange = (event) => {
        const inputName = event.target.name
        const inputValue = event.target.value
        this.setState({
            [inputName] : inputValue
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        let message = this.state.response.trim()

        if(message === ''){
            return
        }

        let data = {
            message,
            timeStamp : new Date().getTime(),
            upVotes: 0,
            downVotes: 0
        }
        this.axiosPost(data)

        this.nextHandler()

        //TODO: push to axios (use question key as location on database)
        //TODO: take all responses with the same tag and display
    }

    nextHandler = () => {
        const communityResponses = this.props.data[this.props.questionKey].responses
        this.setState({
            response: '',
            communityResponses
        })

    }

    //axios Post request
    axiosPost = (data) => {
        axios.post(`https://truth-or-dare-a2f5b.firebaseio.com/truth/${this.props.questionKey}/responses.json`, data)
            .then( response => {
            })
            .catch(error => console.log(error))
    }

    //axios get request
    // axiosGet = () => {
    //     axios.get(`https://truth-or-dare-a2f5b.firebaseio.com/truth/${this.props.questionKey}/responses.json`)
    //         .then(response => {
    //             console.log(response)
    //             this.setState({
    //                 communityResponses: response.data
    //             })
    //         })
    //         .catch(error => {
    //             console.log(error)
    //             this.setState({
    //                 errorText: 'unable to load, please try again'
    //             })
    //         })
    // }

    render() {

        if(!this.state.communityResponses){
            return(
                <div>
                    {this.state.errorText}
                    <h2>{this.props.responseType}</h2>
                    <form className={"form"} onSubmit={this.handleSubmit}>
                    <textarea
                        className={"inputField commentInput"}
                        name={"response"}
                        rows={"4"}
                        cols={"40"}
                        value={this.props.currentIdea}
                        placeholder={this.props.promptText}
                        onChange={this.handleChange}
                    />
                        <br />
                        <div className={"center"}>
                            <button
                                className={"submitButton tdButtons"}
                                type="submit"
                            >save
                            </button>
                            <button
                                className={"submitButton tdButtons"}
                                onClick={this.nextHandler}
                            >skip
                            </button>
                        </div>
                    </form>
                </div>
            )
        }
        if(this.state.communityResponses){
            return (
                <div>
                    <DisplayComments
                        comments = {this.state.communityResponses}
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
