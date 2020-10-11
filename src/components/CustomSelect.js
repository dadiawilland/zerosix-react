import React, { Component } from 'react';
import variables from '../assets/variables';
import Radium from 'radium';

export default class CustomSelect extends Component {

    constructor(props) {
        super(props)
        this.state = {
            category: '',
            openList: false,
        }

        this.handleList = this.handleList.bind(this)
        this.handleOptionClick = this.handleOptionClick.bind(this)
        this.erase = this.erase.bind(this)
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
      }

    handleClickOutside = e => {
        if (
            !e.target.classList.contains("custom-select-option") &&
            !e.target.classList.contains("selected-text") &&
            !e.target.classList.contains("selected") &&
            !e.target.classList.contains("category-input")
        ) {
            this.setState({openList: false});
        }
    };

    erase() {
        this.setState({category: ''})
        this.props.customSelectCallback('');
    }

    handleList() {
        this.setState({openList : !this.state.openList})
    }

    handleOptionClick(option) {
        this.setState({category: option.label})
        this.props.customSelectCallback(option);
    }

    render() {
        return(
            <div style={styles().customSelectContainer} 
                className="custom-select-option">
                <div style={styles().eraseBtn} 
                    onClick={() => this.erase()}>
                        {this.state.category != '' ? 'x' : ''}
                </div>  
                <div style={styles(this.state.openList).selectedText} 
                    onClick={this.handleList} c
                    className="selected-text">
                    <p style={styles(null, null, this.state.category == '').selected}
                        className="selected">
                        {this.state.category != '' ? this.state.category : 'Select Member Type'}
                    </p>
                    {this.state.openList &&  (<ul style={styles().selectOptions}>
                        {this.props.optionList.map((option, index) => {
                            return(
                                <li key={option.value} 
                                    className="category-input"
                                    style={styles(null, (this.props.optionList.length - 1) == index).list}
                                    onClick={() => this.handleOptionClick(option)}>
                                    {option.label}
                                </li>
                            )
                        })}
                    </ul>)}
                </div>
            </div>
        )
    }

}

let styles = (isActive, isLast, isBlank) => ({
    customSelectContainer: {
        fontFamily: '"Montserrat", sans-serif',
        display: 'inline-block',
        minWidth: 200,
        textAlign: 'left',
        position: 'relative'
    },
    selectedText: {
        padding: '10px 0px 10px 0px',
        borderRadius: 17,
        border: 0,
        fontWeight: '500',
        color: variables.black2,
        backgroundColor: variables.white1,
        boxShadow: "2px 4px 10px rgba(225, 225, 225, 1)",
        fontSize: 13, 
        borderBottomLeftRadius: isActive == false ? 17 : 0,
        borderBottomRightRadius: isActive == false ? 17 : 0,
        zIndex: 1,
    },
    selected: {
        margin: '0px 0px 0px 30px',
        cursor: 'pointer',
        color: isBlank == true ? variables.gray8 : variables.black2
    },
    eraseBtn: {
        position: 'absolute',
        right: 10,
        bottom: 9,
        margin: 0,
        cursor: 'pointer',
        width: 20,
        color: variables.gray7,
        ':hover': {
            color: variables.black2
        }
    },
    selectOptions: {
        margin: 0,
        padding: 0,
        textAlign: 'left',
        position: 'absolute',
        width: '100%',
        top: 35,
        borderBottomLeftRadius: 17,
        borderBottomRightRadius: 17,
        boxShadow: "0px 4px 10px rgba(225, 225, 225, 1)",
        zIndex: 2
    },
    list: {
        listStyleType: 'none',
        padding: '10px 30px',
        backgroundColor: variables.white1,
        cursor: 'pointer',
        borderBottomLeftRadius: isLast == true ? 17 : 0,
        borderBottomRightRadius: isLast == true ? 17 : 0,
        ':hover': {
            backgroundColor: variables.white2
        }
    }
      
})

CustomSelect = Radium(CustomSelect)