import React, { Component } from 'react';
import variables from '../../assets/variables';
import LoginCard from '../../components/LoginCard';

export default class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
        
    }

    render() {
        return(
            <div style={styles().page}>
                <div style={styles().logoWrapper}>
                </div>
                <LoginCard/>
            </div>
        );
    }

}

let styles = (url) => ({
    page: {
        fontFamily: '"Montserrat", sans-serif',
        backgroundColor: variables.white2,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        top: 0,
        left: 0,
        minHeight: '100vh',
        minWidth: '100%',
        display: 'inline-block',
        overflow: 'hidden',
        position: 'relative'
    },
    logoWrapper: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: 45
    }
})