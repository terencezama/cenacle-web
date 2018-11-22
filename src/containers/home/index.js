import React, { Component } from 'react'

export default class Home extends Component {

    state = {
        page: 0
    }
    componentWillMount() {
        // this.setState()

    }
    render() {
        return (
            <h1>
                Homey
            </h1>
        )
    }
}