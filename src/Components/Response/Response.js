import React from 'react'

const Response = (props) => {

    let handleChange = () => {
        //TODO: setup 2-way binding
    }

    let handleSubmit = () => {
        //TODO: push to axios (use question key as location on database)
        //TODO: take all responses with the same tag and display
    }

    return(
        <div>
            <h2>{props.responseType}</h2>
            <form className={"form"} onSubmit={handleSubmit}>
                    <textarea
                        className={"inputField commentInput"}
                        name={"currentIdea"}
                        rows={"4"}
                        cols={"40"}
                        value={props.currentIdea}
                        placeholder={props.promptText}
                        onChange={handleChange}
                    />
                <br />
                <div className={"center"}>
                    <button
                        className={"submitButton largeButton"}
                        type="submit"
                    >save
                    </button>
                </div>
            </form>
        </div>
    )

}

export default Response
