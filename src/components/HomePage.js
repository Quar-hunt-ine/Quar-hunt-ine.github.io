import { Button, Container, Grid, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useHistory } from 'react-router'

const HomePage = () => {

    const [teamName, setTeamName] = useState('')
    const [name1, setName1] = useState('')
    const [email1, setEmail1] = useState('')
    const [name2, setName2] = useState('')
    const [email2, setEmail2] = useState('')

    const history = useHistory();

    const Next = () => {
        if(!teamName || !name1 || !email1) {
            alert("Enter all the required fields")
        }
        else {
            localStorage.setItem('TeamName', teamName)
            localStorage.setItem('Name1', name1)
            localStorage.setItem('Email1', email1)

            if(name2) {
                localStorage.setItem('Name2', name2)
                localStorage.setItem('Email2', email2)
            }

            history.push('/instructions')
        }
    }

    return (
        <div className="homepage">
            <Container>
                <Grid container justify='center'>
                    <Grid item md={6}>
                        <TextField 
                            label="Team Name*" 
                            variant="outlined"
                            value={teamName}
                            onChange={(e)=>(setTeamName(e.target.value))}
                            fullWidth
                        />
                        <h3>Team Member 1*</h3>
                        <TextField 
                            label="Name*" 
                            variant="outlined"
                            value={name1}
                            onChange={(e)=>(setName1(e.target.value))}
                            fullWidth
                        />
                        <TextField 
                            label="Email*" 
                            variant="outlined"
                            style={{marginTop: '10px'}}
                            value={email1}
                            onChange={(e)=>(setEmail1(e.target.value))}
                            fullWidth
                        />
                        <h3>Team Member 2</h3>
                        <TextField 
                            label="Name" 
                            variant="outlined"
                            value={name2}
                            onChange={(e)=>(setName2(e.target.value))}
                            fullWidth
                        />
                        <TextField 
                            label="Email" 
                            variant="outlined"
                            style={{marginTop: '10px'}}
                            value={email2}
                            onChange={(e)=>(setEmail2(e.target.value))}
                            fullWidth
                        />
                    </Grid>
                </Grid> 
                <div style={{textAlign: 'center', marginTop: '20px'}}>
                    <Button variant="contained" onClick={Next}>Next</Button>
                </div>
            </Container>
        </div>
    )
}

export default HomePage
