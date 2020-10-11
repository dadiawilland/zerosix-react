import React, { Component } from "react";
import Radium from 'radium';
import variables from '../assets/variables';
import { registration_form } from '../forms/RegistrationForm';
import Input from '../components/Input';
import CustomSelect from '../components/CustomSelect';
import { withRouter } from 'react-router-dom';
import { backend_env } from '../config/config'
import axios from 'axios';

class RegisterCard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            category: '',
            categoryTitle: '',
            name:'',
            password:'',
            confirmPassword:'',
            email:''
        }

        this.goToLogin = this.goToLogin.bind(this);
        this.register = this.register.bind(this);
    }

    optionList = [
        {
            label: 'Buyer',
            value: 'buyer'
        },
        {
            label: 'Seller',
            value: 'seller'
        }
    ]

    customSelectCallback = (selected) => {
        
        if(selected == '') {
            this.setState({category: ''})
        } else {
            this.setState({category: selected.value})
        }

    }

    inputCallback = (input) => {
        this.setState({ [input.name]: input.value });
    }

    goToLogin() {
        this.props.history.push("/login")
    }

    register() {
        if(this.state.name &&
            this.state.password &&
            this.state.confirmPassword &&
            this.state.email &&
            this.state.category) {
                if(this.state.password == this.state.confirmPassword) {
                    const user = {
                        name: this.state.name,
                        email: this.state.email,
                        password: this.state.name,
                        is_superuser: this.state.category === 'buyer' ? false : true
                      };
            
                    axios.post(backend_env + '/api/user/register', { user })
                    .then(res => {
                      console.log(res);
                      console.log(res.data);
                      this.goToLogin()
                    })
                }
        } else {
            console.log('false')
        }
    }

    render() {
        return(
            <div style={styles().wrapper}>
                <div style={styles().card}>
                    {registration_form.map((field) => {
                        return(
                            <Input fieldName={field.name} 
                                    inputType={field.inputType} 
                                    inputLabel={field.inputLabel}
                                    inputCallback={this.inputCallback}/>
                        )
                    })}
                    <CustomSelect optionList={this.optionList} 
                                customSelectCallback={this.customSelectCallback}/>
                <button style={styles().signUpButton} onClick={this.register}>
                    <p style={styles().signUpButtonText}>Sign up</p>
                </button>
                <div style={styles().cancelButton}>
                    <p onClick={this.goToLogin} style={styles().cancelButtonText}>Cancel</p>
                </div>
                </div>
            </div>
        )
    }

}

RegisterCard = Radium(RegisterCard)

let styles = (val) => ({
    wrapper: {
        display: 'flex',
        marginTop: 138,
        justifyContent: 'center',
        marginBottom: 45
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
    }
    , 
    signUpButton: {
        backgroundColor: variables.black2,
        border: 0,
        outline: 0,
        marginTop: 50,
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
    cancelButton: {
        width: 'auto',
        textAlign: 'center'
    },
    cancelButtonText: {
        color: variables.black2,
        display: 'inline-block',
        cursor: 'pointer',
        fontSize: 12,
        fontWeight: 500
    },
    signUpButtonText: {
        margin: 0
    }
})


export default withRouter(RegisterCard)