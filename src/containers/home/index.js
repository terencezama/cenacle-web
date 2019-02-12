import React, { Component } from 'react'
import {Link} from 'react-router-dom';
export default class Home extends Component {

    state = {
        page: 0
    }
    componentWillMount() {
        // this.setState()

    }
    render() {
        return (
            <div>
                <h1>Cenalce Du St Esprit</h1>
                <Link to={'shares'}>{'Continuer'}</Link>
            </div>
            
        )
    }
}