import React, { Component } from 'react'

class Popup extends Component {
    render() {
        return (
            <div className="collection">
               <p className="collection-item">
               <i className="small material-icons" style={{padding:10}}>warning</i>
               <span className="padd" style={{paddingBottom:30,paddingLeft:30}}>Error: extension must be included in the file name.</span>
                </p> 

            </div>
        )
    }
}

export default Popup