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
            status: 'start',
            questionKey: '',
            votesRemaining: 5,
            errorMessage: ''
        })
    }

    generateRandomChallenge = (type) => {
        let randomType = ''
        const values = Object.values(this.state.data)
        const length = values.length
        let randomChoice = ''
        let item = ''

        do {
            item = Math.floor(Math.random() * length)
            randomChoice = values[item]
            randomType = randomChoice.type

        }
        while (randomType !== type)

        let key = Object.keys(this.state.data)[item]
        this.setState({
            questionKey: key
        })

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

    playAgainHandler = () => {
        this.setState({
            status: 'start'
        })
    }

    //handle upvotes et al
    voteHandler = (event) => {
        let votesRemaining = this.state.votesRemaining
        if(votesRemaining <= 0){
            this.setState({
                errorMessage: "no votes left!"
            })
            return
        }
        --votesRemaining

        const vote = event.target.name
        const responseKey = event.target.value
        const questionKey = this.state.questionKey
        let newVoteSum = ''
        if(this.state.data){
            if(this.state.data[questionKey].responses[responseKey][vote]){
                newVoteSum = this.state.data[questionKey].responses[responseKey][vote] + 1
            }
            else {
                newVoteSum = 1
            }
        }
        const data = {...this.state.data}
        //technically copying a multilevel object like this incorrectly mutates state. Redux or another state handler would help eliminate this problem
        data[questionKey].responses[responseKey][vote] = newVoteSum
        this.setState({
            data,
            votesRemaining
        })

        axios.put(`https://truth-or-dare-a2f5b.firebaseio.com/truth/${questionKey}/responses/${responseKey}/${vote}.json`, newVoteSum)
            .then( (response) => {
            })
            .catch( (error) => console.log(error))
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
                        name={"ready"}
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
                    <Response
                        voteHandler = {this.voteHandler}
                        questionKey={this.state.questionKey}
                        playAgain = {this.playAgainHandler}
                        data={this.state.data}
                        votesRemaining={this.state.votesRemaining}
                        errorMessage={this.state.errorMessage}
                    ></Response>
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
            </div>
        )
    }

}

export default PlayTheGame