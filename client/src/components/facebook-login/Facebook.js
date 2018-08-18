import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login'

export default class Facebook extends Component {

    state = {
        isLoggedIn: false,
        userID: '',
        name: '',
        email: '',
        picture:''
    }

    componentClicked = () => {
        console.log("Clicked");
           
    }

    responseFacebook = response => {
        console.log("Responsed");
        this.setState({
            isLoggedIn: true,
            userID: response.userID,
            name: response.name,
            email: response.email,
            picture: response.picture.data.url
        })
    }

    render() {
      
        let fbContent
        if (this.state.isLoggedIn) {
            fbContent = (
                <div>
                    
                </div>
            );
        } else {
            fbContent = (<FacebookLogin
                appId="852681318254191"
                autoLoad={true}
                fields="name,email,picture"
                onClick={this.componentClicked}
                callback={this.responseFacebook} />)
        }

    return (
      <div>
        {fbContent}
      </div>
    )
  }
}
