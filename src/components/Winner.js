import { Container } from '@material-ui/core'
import { GoogleSpreadsheet } from 'google-spreadsheet';
import React, { useEffect } from 'react'
import { useHistory } from 'react-router'

var CryptoJS = require("crypto-js");

const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
const SHEET_ID = process.env.REACT_APP_SHEET_ID;
const CLIENT_EMAIL = process.env.REACT_APP_GOOGLE_CLIENT_EMAIL;
const PRIVATE_KEY = process.env.REACT_APP_GOOGLE_SERVICE_PRIVATE_KEY;

const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

const TeamName = localStorage.getItem('TeamName')
const Name1 = localStorage.getItem('Name1')
const Email1 = localStorage.getItem('Email1')
const Name2 = localStorage.getItem('Name2')
const Email2 = localStorage.getItem('Email2')


const Winner = () => {

    const history = useHistory()

    useEffect(() => {

        const cipher_text = localStorage.getItem('questionId')

        if(cipher_text===null) {
            history.push('/instructions')
        }

        const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;
        const bytes = CryptoJS.AES.decrypt(cipher_text, SECRET_KEY)
        const local_questionId = bytes.toString(CryptoJS.enc.Utf8)
        
        if(local_questionId!=="19") {
            history.push(`/question/${local_questionId}`)
        }

        const appendSpreadsheet = async (row) => {
            try {
                await doc.useServiceAccountAuth({
                    client_email: CLIENT_EMAIL,
                    private_key: PRIVATE_KEY,
                });
                // loads document properties and worksheets
                await doc.loadInfo();
    
                const sheet = doc.sheetsById[SHEET_ID];
                await sheet.addRow(row);
            } catch (e) {
                console.error('Error: ', e);
            }
        };

        const newRow = { 
            TeamName: TeamName, 
            Name1: Name1,
            Email1: Email1,
            Name2: Name2,
            Email2: Email2,
            Time : new Date().toLocaleString()
        };

        appendSpreadsheet(newRow)

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
