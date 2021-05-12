import { Container } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router'

var CryptoJS = require("crypto-js");

const Winner = () => {

    const history = useHistory()

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
                    
                if(local_questionId!=="19") {
                    history.push(`/question/${local_questionId}`)
                }
            }
        }
    },[history])

    return (
        <div className="winner-page">
            <Container>
                <h1>Congratulations!!!!!</h1>
            </Container>
        </div>
    )
}

export default Winner
