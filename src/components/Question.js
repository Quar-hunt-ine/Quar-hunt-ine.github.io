import { Button, Container, Grid, IconButton, Snackbar, TextField } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import questions from '../data/questions'

var CryptoJS = require("crypto-js");
const ques = questions;
const V_Value = process.env.REACT_APP_V_Value;
const T_Value = process.env.REACT_APP_T_Value;

const SHEET_ID = [2142584393, 726637169, 1339565251, 208636639, 1324951177, 498098596, 947939642, 932597636, 1750764149, 1669416164, 4524496, 813507386, 110234965, 1937890974, 1279576612, 338932454, 1097222156, 0]

const Question = () => {

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const {questionId} = useParams()
    const history = useHistory()

    const [showError, setShowError] = useState(false);

    useEffect(() => {

        const TeamName = localStorage.getItem('TeamName')
        
        if(TeamName===null) {
            history.push('/')
        }
        else {
            const cipher_text = localStorage.getItem('questionId')

            if(cipher_text===null) {
                history.push('/instructions')
            }
            else {
                const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;
                const bytes = CryptoJS.AES.decrypt(cipher_text, SECRET_KEY)
                const local_questionId = bytes.toString(CryptoJS.enc.Utf8)
                    
                if(local_questionId!==questionId) {
                    history.push(`/question/${local_questionId}`)
                }
                
                setQuestion(ques[local_questionId-1]);
            }
        }

    },[history, questionId])

    const appendSpreadsheet = async (row) => {
        const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
        const CLIENT_EMAIL = process.env.REACT_APP_GOOGLE_CLIENT_EMAIL;
        const PRIVATE_KEY = process.env.REACT_APP_GOOGLE_SERVICE_PRIVATE_KEY;

        const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

        try {
            await doc.useServiceAccountAuth({
                client_email: CLIENT_EMAIL,
                private_key: PRIVATE_KEY,
            });
            // loads document properties and worksheets
            await doc.loadInfo();

            const sheet = doc.sheetsById[SHEET_ID[questionId-1]];
            await sheet.addRow(row);
        } catch (e) {
            console.error('Error: ', e);
        }
    };

    const NextQuestion = () => {

        const TeamName = localStorage.getItem('TeamName')
        const Name1 = localStorage.getItem('Name1')
        const Email1 = localStorage.getItem('Email1')
        const Name2 = localStorage.getItem('Name2')
        const Email2 = localStorage.getItem('Email2')

        const newRow = { 
            TeamName: TeamName, 
            Name1: Name1,
            Email1: Email1,
            Name2: Name2,
            Email2: Email2,
            Time : new Date().toLocaleString()
        };

        appendSpreadsheet(newRow)

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
            setAnswer("")
            setShowError(false)
            NextQuestion()
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
