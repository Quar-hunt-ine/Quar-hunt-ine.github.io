import { Button, Container, Grid, IconButton, Snackbar, TextField } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import questions from '../data/questions'

var CryptoJS = require("crypto-js");
const ques = questions;
const V_Value = process.env.REACT_APP_V_Value;
const T_Value = process.env.REACT_APP_T_Value;

const Question = () => {

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const {questionId} = useParams()
    const history = useHistory()

    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {

        const cipher_text = localStorage.getItem('questionId')

        if(cipher_text===null) {
            history.push('/instructions')
        }

        const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;
        const bytes = CryptoJS.AES.decrypt(cipher_text, SECRET_KEY)
        const local_questionId = bytes.toString(CryptoJS.enc.Utf8)
        
        if(local_questionId!==questionId) {
            history.push(`/question/${local_questionId}`)
        }
        
        setQuestion(ques[local_questionId-1]);

    },[history, questionId])

    const NextQuestion = () => {

        const SECRET_KEY = process.env.REACT_APP_SECRET_KEY
        var cipher_text = CryptoJS.AES.encrypt((parseInt(questionId)+1).toString(), SECRET_KEY)
        localStorage.setItem('questionId', cipher_text)

        if(parseInt(questionId)!==18) {
            history.push(`/question/${questionId+1}`)
        }
        else {
            history.push('/winner')
        }
    }

    const checkAnswer = () => {
        const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;
        const bytes = CryptoJS.AES.decrypt(question.answer, SECRET_KEY)
        const correct_answer = bytes.toString(CryptoJS.enc.Utf8)

        if(answer===correct_answer) {
            setShowSuccess(true)
            NextQuestion()
            setAnswer("")
        }
        else {
            setShowError(true)
        }
    }

    return (
        <div className="question-page">
            <Snackbar
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
                open={showError}
                autoHideDuration={6000}
                message="Wrong Answer"
                action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={() => setShowError(false)}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            />
            <Snackbar
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
                }}
                open={showSuccess}
                autoHideDuration={6000}
                message="Correct Answer"
                action={
                    <IconButton size="small" aria-label="close" color="inherit" onClick={() => setShowSuccess(false)}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            />
            
            <Container>
                {parseInt(questionId)!==18? <h1>Question {question.id}</h1>: <h1>Congratulations!! You are at the final question</h1>}
                <Grid container justify='center'>
                    <Grid item md={6}>
                        {question.text ? question.text.map((item) => {
                            return (
                                <p>{item}</p>
                            )
                        }) : <div></div>}

                        {parseInt(questionId)===18? <><p>V: {V_Value}</p> <p>t: {T_Value}</p></>: <div></div>}
                        
                        {question.imgURL 
                        ?   <div style={{textAlign: 'center', marginBottom: '20px'}}>
                                <img src={question.imgURL} alt="question"/>
                            </div>
                        : <div></div>}
                        
                        <TextField 
                            label="Answer" 
                            variant="outlined" 
                            value={answer}
                            onChange={(e)=>(setAnswer(e.target.value))}
                            fullWidth
                        />
                    </Grid>
                </Grid>
                <div style={{textAlign: 'center', marginTop: '20px'}}>
                    <Button variant="contained" onClick={checkAnswer}>Submit</Button>
                </div>
            </Container>
        </div>
    )
}

export default Question
