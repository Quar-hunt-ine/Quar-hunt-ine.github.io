import {Container, Grid} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React, { useEffect } from 'react'
import { useHistory } from 'react-router';
import instructions from '../data/Instructions';
import questions from '../data/questions';

var CryptoJS = require("crypto-js");
const inst = instructions;
const main_question = questions[17];

const Instructions = () => {

    const history = useHistory();

    useEffect(() => {
        const local_questionId = localStorage.getItem('questionId');
        if(local_questionId!=null) {
            history.push(`/question/${local_questionId}`)
        }
    }, [history])

    const startTest = async () => {
        const SECRET_KEY = process.env.REACT_APP_SECRET_KEY
        var cipher_text = CryptoJS.AES.encrypt("1", SECRET_KEY)
        localStorage.setItem('questionId', cipher_text);
        history.push('/question/1');
    }

    

    return (
        <div className="homepage">
            <Container>
                <h1>Instructions</h1>
                <Grid container justify='center'>
                    <Grid item md={10}>
                        {inst.map((item) => {
                            return (
                                <p key={item.id}>{item.id}. {item.text}</p>
                            )
                        })}
                    </Grid>
                    <Grid item md={10}>
                        <h2 style={{textAlign: 'center'}}>Main Question</h2>
                    </Grid>
                    <Grid item md={10}>
                        {main_question.text.map((item) => {
                            return (
                                <p>{item}</p>
                            )
                        })}
                        <p>To get the value of V and t you have to solve for the treasure and after you solve for the treasure, this question will reappear at the end with the missing values of V and t given.</p>
                    </Grid>
                </Grid>
                
                <div style={{textAlign: 'center'}}>
                    <Button variant="contained" onClick={startTest}>Start</Button>
                </div>
            </Container>
            {/* Home Page
            <Button variant="contained" onClick={startTest}>Start</Button> */}
        </div>
    )
}

export default Instructions
