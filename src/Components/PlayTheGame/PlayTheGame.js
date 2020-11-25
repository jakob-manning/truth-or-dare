import React from 'react'
import Buttons from "../TDButtons";
import axios from "axios";
import Response from "../Response/Response";

class PlayTheGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            game: '',
            data: '',
            challenge: '',
            status: 'start'
        })
    }

    generateRandomChallenge = (type) => {
        let randomType = ''
        const values = Object.values(this.state.data)
        const length = values.length
        let randomChoice = ''

        do {
            let item = Math.floor(Math.random() * length)
            randomChoice = values[item]
            randomType = randomChoice.type
        }
        while (randomType !== type)
        return randomChoice;
    }

    buttonHandler = (event) => {
        const requestType = event.target.name
        this.setState({
            game: requestType
        })

        //Display a random T/D from data
        let result = this.generateRandomChallenge(requestType)
        this.setState({
            challenge: result.question,
            status: 'check'
        })

        //Send an axios request to update the list of questions for next round
        this.axiosRequest()
        let data = {...this.state.data}

    }

    //axios request
    axiosRequest = () => {
        axios.get("https://truth-or-dare-a2f5b.firebaseio.com/truth.json")
            .then( response => {
                let data = response.data
                this.setState({
                    data
                })
            })
            .catch(error => console.log(error))
    }

    componentDidMount() {
        this.axiosRequest()
    }

    confirmationHandler = (event) => {
        const response = event.target.name
        this.setState({
            status: response
        })
    }

    //TODO: add sanity check to play
    render() {

        if(this.state.status === 'start'){
            return(
                <div className={"play"}>
                    <Buttons
                        game = {this.state.game}
                        handler = {this.buttonHandler}
                    >or</Buttons>
                </div>
            )
        }
        if(this.state.status === 'check'){
            return(
                <div className={"play"}>
                    <Buttons
                        game = {this.state.game}
                        handler = {this.buttonHandler}
                    >or</Buttons>
                    <h2>{this.state.game}: are you sure?</h2>
                    <button
                        className={"tdButtons"}
                        name={"reacy"}
                        onClick={this.confirmationHandler}
                    >Yes</button>
                    <button
                        className={"tdButtons"}
                        name={"start"}
                        onClick={this.confirmationHandler}
                    >No</button>
                </div>
                )
        }
        if(this.state.status === 'ready'){
            return(
                <div className={"play"}>
                    <h2>{this.state.challenge}</h2>
                </div>
            )
        }
        if(this.state.status === 'resolved'){
            return(
                <div className={"play"}>
                    <h2>{this.state.challenge}</h2>
                </div>
            )
        }

        return(
            <div className={"play"}>
                <Buttons
                    game = {this.state.game}
                    handler = {this.buttonHandler}
                >or</Buttons>
                <p>{this.state.challenge}</p>
                <Response></Response>

            </div>
        )
    }

}

export default PlayTheGame