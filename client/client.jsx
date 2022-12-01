import React from "react";
import ReactDOM  from "react-dom";
import {App} from './App';
import {handleModifyAnswerVotes} from '../shared/utils';

let state = undefined;

fetch("http://localhost:7777/data")
.then(data => data.json())
.then(json => {
    state = json;
    console.log("Got the state", state);
    render();
})

function handleVote(answerId, increment){
    state.answers = handleModifyAnswerVotes(state.answers, answerId, increment);

    fetch(`vote/${answerId}?increment=${increment}`);
    render();
}
// first param is the component
// 2nd param is look for the container
//ReactDOM.render(<App />, document.querySelector('#Container'))

function render(){
    ReactDOM.hydrate(<App {...state} handleModifyAnswerVotes={handleVote}/>, document.querySelector('#Container'));
}

//render();