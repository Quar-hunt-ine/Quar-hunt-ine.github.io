import { Button, Container, Grid } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router';
import questions from '../data/questions';

var CryptoJS = require("crypto-js");
const main_question = questions[17];

const MainQuestion = () => {

    const history = useHistory()

    useEffect(() => {

        const TeamName = localStorage.getItem('TeamName')
        
        if(TeamName===null) {
            history.push('/')
        }
        else {
            const cipher_text = localStorage.getItem('questionId')

            if(cipher_text!==null) {
                const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;
                const bytes = CryptoJS.AES.decrypt(cipher_text, SECRET_KEY)
                const local_questionId = bytes.toString(CryptoJS.enc.Utf8)
                
                history.push(`/question/${local_questionId}`)
            }
        }

    }, [history])

    const startTest = async () => {
        const SECRET_KEY = process.env.REACT_APP_SECRET_KEY
        var cipher_text = CryptoJS.AES.encrypt("1", SECRET_KEY)
        localStorage.setItem('questionId', cipher_text);
        history.push('/question/1');
    }

    return (
        <div className="home-page">
            <Container>
                <h1 style={{textAlign: 'center'}}>Main Question</h1>
                <Grid container justify='center'>
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
        </div>
    )
}

export default MainQuestion
