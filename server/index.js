//const express = require('express');
import React from "react";
import express from "express";

import {readFileSync} from 'fs';
import {App} from '../client/App';
import { renderToString} from 'react-dom/server';
import {handleModifyAnswerVotes} from '../shared/utils';

const data = {
    questions: [
        {
            questionId: "Q1",
            content: "Should we use Jquery or Fetch for Ajax?"
        },
        {
            questionId: "Q2",
            content: "What is the best feature or React?"
        }
    ],
    answers: [
        {
            answerId: "A1",
            questionId: "Q1",
            upvotes: 3,
            content: "JQuery"
        },
        {
            answerId: "A2",
            questionId: "Q1",
            upvotes: 1,
            content: "Fetch"
        },
        {
            answerId: "A3",
            questionId: "Q2",
            upvotes: 2,
            content: "Performance"
        },
        {
            answerId: "A4",
            questionId: "Q2",
            upvotes: 5,
            content: "Ease of use"
        }
    ]
}

const app = new express();

app.use(express.static("dist"));

app.get("/vote/:answerId", (req,res)=> {
    const {query, params} = req;
    data.answers = handleModifyAnswerVotes(data.answers, params.answerId, +query.increment);
    res.send("OK");
})

app.get('/data', async (_req, res) => {
    res.json(data);
});

app.get('/', async (_req, res) => {
    const index = readFileSync(`public/index.html`, `utf8`);
    const rendered = renderToString(<App {...data}/>);
    res.send(index.replace('{{rendered}}',rendered));
    // res.send(
    //     `<h1>React is excellent</h1>`
    // )
})

app.listen(7777);
console.log("Server is listening");