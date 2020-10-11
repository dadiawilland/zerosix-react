import React, { Component, Text } from "react";
import Radium from 'radium';
import variables from '../assets/variables';
import axios from 'axios';
import { backend_env } from '../config/config'
import { withRouter } from 'react-router-dom';

class LoginCard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }

        this.handleChanges = this.handleChanges.bind(this);
        this.goToRegister = this.goToRegister.bind(this);
        this.attemptLogin = this.attemptLogin.bind(this);
        this.buildLoginParams = this.buildLoginParams.bind(this);
    }

    handleChanges(event) {
        let target = event.target
        let value = target.value
        let name = target.name

        this.setState({[name] : value})
    }

    buildLoginParams() {
        let user = {
            name: this.state.username,
            password: this.state.password
        }

        return user
    }

    goToRegister() {
        this.props.history.push("/register")
    }

    attemptLogin() {
        let user = this.buildLoginParams();
        axios.post(backend_env + '/api/user/login', {user})
        .then( res => {
            console.log(res);
            this.props.history.push("/")
        })
    }

    render() {
        return(
            <div style={styles().wrapper}>
                <div style={styles().card}>
                    <input key="username" 
                        style={styles(this.state.username).input} 
                        type="text" 
                        name="username" 
                        placeholder="Username" 
                        onChange={this.handleChanges} 
                        value={this.state.username}/>
                    <input key="password" 
                        style={styles(this.state.password).input} 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        onChange={this.handleChanges} 
                        value={this.state.password}/>   
                    <button style={styles().logInButton} onClick={this.attemptLogin}>
                        <p style={styles().loginButtonText}>Login</p>
                    </button>
                    <div style={styles().signUpButton}>
                        <p onClick={this.goToRegister} style={styles().signUpButtonText}>Sign up</p>
                    </div>
                </div>
            </div>
        );
    }

}

LoginCard = Radium(LoginCard)

let styles = (val) => ({
    wrapper: {
        display: 'flex',
        marginTop: 138,
        justifyContent: 'center',
    },
    card: {
        paddingTop: 48,
        paddingBottom: 15,
        paddingLeft: 25,
        paddingRight: 25,
        width: 300,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 12,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    input: {
        width: '100%',
        height: 25,
        fontSize: 14,
        border: 0,
        backgroundColor: 'rgba(255, 255, 255, 0)',
        marginBottom: 50,
        borderBottom: 'solid 1px',
        borderBottomColor: val == '' ? variables.gray6 : variables.black2,
        color: val == '' ? variables.gray6 : variables.black2,
        ':focus': {
            borderBottom: 'solid 1px ' + variables.black2,
            color: variables.black2,
            outline: 0,
        }
    }, 
    logInButton: {
        backgroundColor: variables.black2,
        border: 0,
        outline: 0,
        padding: '10px 45px',
        alignSelf: 'center',
        borderRadius: 4,
        color: variables.white1,
        fontSize: 14,
        cursor: 'pointer',
        ':active': {
            backgroundColor: variables.white1,
            color: variables.black2
        }
    },
    signUpButton: {
        width: 'auto',
        textAlign: 'center'
    },
    signUpButtonText: {
        color: variables.black2,
        display: 'inline-block',
        cursor: 'pointer',
        fontSize: 12,
        fontWeight: 500
    },
    loginButtonText: {
        margin: 0
    }
})

export default withRouter(LoginCard)