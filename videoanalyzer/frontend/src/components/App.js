import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Upload from './Upload'
import Navbar from './layouts/Navbar';
import { BrowserRouter as Router,Route } from 'react-router-dom'
import Result from './Result'

export default class App extends Component {
    render() {
        return (
            <Router>
            <div>
                <Navbar/>
                <Route exact path='/' component={Upload}/>
            </div>
            </Router>
        )
    }
}

ReactDOM.render(<App/>,document.getElementById('app'));
