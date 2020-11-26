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
            errorMessage: '',
            response: '',
            communityResponses: ''
        })
    }

    generateRandomChallenge = (type) => {
        if(!this.state.data){
            return
        }
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
            questionKey: key,
            challenge: randomChoice.question,
        })
        return randomChoice;
    }

    buttonHandler = (event) => {
        const requestType = event.target.name
        this.setState({
            game: requestType
        })

        //Display a random T/D from data
        this.generateRandomChallenge(requestType)
        this.setState({
            status: 'ready'
        })

        //Send an axios request to update the list of questions for next round
        this.axiosRequest()

    }

    //axios request
    axiosRequest = () => {
        axios.get("https://truth-or-dare-a2f5b.firebaseio.com/truth.json")
            .then( response => {
                let data = response.data

                console.log(response.data)
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
            challenge: '',
            status: 'start',
            questionKey: '',
            votesRemaining: 5,
            errorMessage: '',
            response: '',
            communityResponses: ''
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

        this.setState((prevState, props) => {
            const data = {...prevState.data}
            data[questionKey].responses[responseKey][vote] = newVoteSum
            return {
                data,
                votesRemaining
            }
        })

        axios.put(`https://truth-or-dare-a2f5b.firebaseio.com/truth/${questionKey}/responses/${responseKey}/${vote}.json`, newVoteSum)
            .then( (response) => {
            })
            .catch( (error) => console.log(error))
    }

    ///2-way binding for Response component
    handleChange = (event) => {
        const inputName = event.target.name
        const inputValue = event.target.value
        this.setState({
            [inputName] : inputValue
        })
    }

    //submit response to question
    handleSubmit = (event) => {
        event.preventDefault()
        let message = this.state.response.trim()
        if(message === ''){
            return
        }
        let dataToPost = {
            message,
            timeStamp : new Date().getTime(),
            upVotes: 0,
            downVotes: 0
        }
        //TODO: write a promise so that the data is posted, received, and then displayed (with a loading screen inbetween)
        this.axiosPost(dataToPost)
        this.nextHandler()

    }

    //axios Post request
    axiosPost = (data) => {
        axios.post(`https://truth-or-dare-a2f5b.firebaseio.com/truth/${this.state.questionKey}/responses.json`, data)
            .then( response => {
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    errorMessage: 'could not connect, please try again...'
                })
            })
    }

    //skip response writing step
    nextHandler = () => {
        const communityResponses = this.state.data[this.state.questionKey].responses

        if(communityResponses){
            this.setState({
                communityResponses,
                response: ''
            })
        }
        else{
            this.playAgainHandler()
        }
    }



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
                        handleChange={this.handleChange}
                        nextHandler={this.nextHandler}
                        handleSubmit={this.handleSubmit}
                        communityResponses={this.state.communityResponses}
                        refresh={this.generateRandomChallenge.bind(this, this.state.game)}
                    ></Response>
                </div>
            )
        }
    }

}

export default PlayTheGame