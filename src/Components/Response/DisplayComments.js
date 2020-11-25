import React from 'react'

class DisplayComments extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let comments = []
        let commentEntries = Object.entries(this.props.comments)

        commentEntries.sort((a,b) => {
            return(
                (b[1].upVotes - b[1].downVotes) - (a[1].upVotes - a[1].downVotes)
            )
        })

        if(this.props.comments){
            for (let item in commentEntries){
                comments.push(
                    <div key={commentEntries[item][0]} className={"comment"}>
                        <p className={"commentText"}>{commentEntries[item][1].message}</p>
                        <button
                            name={"upVotes"}
                            value={commentEntries[item][0]}
                            className={"upvoteButtons"}
                            onClick={this.props.voteHandler}
                        >⬆ {commentEntries[item][1].upVotes}</button>
                        <button
                            name={"downVotes"}
                            value={commentEntries[item][0]}
                            className={"upvoteButtons"}
                            onClick={this.props.voteHandler}
                        >⬇  {commentEntries[item][1].downVotes}</button>
                        {/*{commentsObject[item].displayTime}*/}
                    </div>
                )
            }
        }

        return(
            <div>
                <p>votes : {this.props.votesRemaining}</p>
                <p className={"red"}>{this.props.errorMessage}</p>
                {comments}
            </div>
        )
    }

}

export default DisplayComments