import { AppBar, Button, Toolbar } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router'
// import Timer from './Timer';

const NavBar = () => {

    const history = useHistory();

    const Restart = () => {
        localStorage.clear()
        history.push("/")
    }

    return (
        <AppBar position="fixed" className="nav-bar" style={{ background: '#9C5513' }}>
            <Toolbar>
                <img src="/assets/img/Nirmaan_Logo.png" alt="nirmaan logo"/>
                <h4>Nirmaan 2021</h4>
                <img src="/assets/img/ASCE_Logo.png" style={{marginLeft: 'auto'}} alt="asce-logo"/>
                <h4 style={{marginLeft: '20px', marginRight: '20px'}}>Quar-hunt-ine</h4>
                <img src="/assets/img/IE-Logo.png" style={{marginRight: 'auto'}} alt="ie-logo"/>
                {/* <Timer/> */}
                <Button onClick={Restart} variant="contained">Restart</Button>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar
