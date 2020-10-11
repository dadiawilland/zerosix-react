import React, { Component } from "react";
import variables from '../assets/variables';


export default class NavItem extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
        this.setActiveTitle = this.setActiveTitle.bind(this);
    }

    setActiveTitle() {
        this.props.setActiveTitle(this.props.title)
    }

    render() {
        return (
            <div style={styles(this.props.title == this.props.activeTitle).navItem} onClick={this.setActiveTitle}>
                <p style={styles().navTitle}>{this.props.title}</p>
            </div>
        );
    }
}

let styles = (isActive) => ({
    navItem: {
        backgroundColor: isActive == true ? variables.white3 : 'rgba(0, 0, 0, 0)',
        width: 250,
        height: 26,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 50,
        cursor: 'pointer'
    },
    navTitle: {
        lineHeight: '26px',
        fontSize: 21,
        margin: 0,
        fontWeight: 500
    },
})