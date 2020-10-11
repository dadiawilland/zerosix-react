import React, { Component, useState } from "react";
import Radium from 'radium';
import variables from '../assets/variables';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";

export default class Input extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value: null,
            borderBottom: 'solid 1px ' + variables.gray6
        }

        this.handleChanges = this.handleChanges.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.setSelectedDate = this.setSelectedDate.bind(this);
    }

    handleChanges(event) {
        let target = event.target
        let value = target.value

        this.setState({value : value})
        this.props.inputCallback({name: this.props.fieldName,
                                    value: value});
    }

    onFocus = () => {
        this.setState({
            borderBottom: 'solid 1px ' + variables.black2,
        })
    }

    onBlur = () => {
        if(this.state.value === null || this.state.value === '') {
            this.setState({
                borderBottom: 'solid 1px ' + variables.gray6
            })
        }
    }

    setSelectedDate = (date) => {
        let selectedDay = {year: date.year, month: date.month, day:date.day}
        let stringVal = date.year.toString() + '-' + date.month.toString() + '-' + date.day.toString()
        this.setState({value : selectedDay})
        this.props.inputCallback({name: this.props.fieldName,
            value: stringVal});
    }

    renderCustomInput = ({ ref }) => (
        <input
          readOnly
          ref={ref}
          placeholder={this.props.inputLabel}
          value={this.state.value == null ? null : 
                this.state.value.year + '/' +
                this.state.value.month + '/' +
                this.state.value.day}
          style={styles(this.state.value, 'datepicker').input}
        />
      )

    render() {

        return(<div>
            {this.props.inputType !== "date" && <input key={this.props.fieldName}
                name={this.props.fieldName}
                type={this.props.inputType}
                placeholder={this.props.inputLabel}
                style={[styles(this.state.value).input,{borderBottom: this.state.borderBottom}]}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onChange={this.handleChanges}
                value={this.state?.value?.toString()}/>}
            {this.props.inputType === "date" && <DatePicker 
                value={this.state.value}
                onChange={this.setSelectedDate}
                inputPlaceholder="Select Birthdate"
                renderInput={this.renderCustomInput}
                shouldHighlightWeekends
                />}
            </div>
        )
    }

}

Input = Radium(Input)

let styles = (val, type) => ({
    input: {
        width: type == 'datepicker' ? '200%' : '100%',
        height: 25,
        fontSize: 14,
        marginBottom: 50,
        border: 0,
        backgroundColor: 'rgba(255, 255, 255, 0)',
        borderBottom: 'solid 1px',
        borderBottomColor: val == null || val == '' ? variables.gray6 : variables.black2,
        color: val == null || val == '' ? variables.gray6 : variables.black2,
        outline: 0
    }
})