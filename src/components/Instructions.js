import {Container, Grid} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import React, { useEffect } from 'react'
import { useHistory } from 'react-router';
import instructions from '../data/Instructions';
import warnings from '../data/warnings';

var CryptoJS = require("crypto-js");
const inst = instructions;
const wrngs = warnings;

const Instructions = () => {

    const history = useHistory();

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
                </Grid>

                <h1>Warnings</h1>
                <Grid container justify='center'>
                    <Grid item md={10}>
                        {wrngs.map((item) => {
                            return (
                                <p key={item.id}>{item.id}. {item.text}</p>
                            )
                        })}
                    </Grid>
                </Grid>
                
                <div style={{textAlign: 'center'}}>
                    <Button variant="contained" onClick={() => (history.push('/main-question'))}>Next</Button>
                </div>
            </Container>
        </div>
    )
}

export default Instructions
