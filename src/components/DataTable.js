import React, { Component } from 'react';

export default class DataTable extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            headers: {},
            items: {}
        }

        this.getTableHeaders = this.getTableHeaders.bind(this)
    }

    componentDidMount() {
        console.log(this.props.userList?.users)
    }

    componentDidUpdate() {
        console.log(this.props.userList?.users)
    }

    getTableHeaders() {
        // this.props.userList?.users.map
    }

    render() {
        return(
            <table>
                <tbody>
                    <tr>
                        <th>asd</th>
                    </tr>
                    <tr>
                        <td>asfasf</td>
                    </tr>
                </tbody>
            </table>
        )
    }
}