import React, { Component } from 'react'
import { FirebaseContext } from '../Firebase';



const SignUp = () => {
    <div>
        <h1>SignUp</h1>
        <FirebaseContext.Provider>
            {firebase => <SignUpForm firebase={firebase}/>}
        </FirebaseContext.Provider>
    </div>
}

class SignUpForm extends Component {
    state = {
        username: '',
        email: '',
        passwordOne: '',
        passwordTwo: '',
        error: null
    }

    onSubmit = event => {
        const { email, passwordOne } = this.state
        event.preventDefault()
        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => console.log(authUser))
            .catch(error => {
                this.setState({error})
            })
    }

    onChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error
        } = this.state

        const isInvalid =
        passwordOne !== passwordTwo ||
        passwordOne === '' ||
        email === '' ||
        username === ''

        return (
            <form onSubmit={this.onSubmit}>
                <input
                    name='username'
                    value={username}
                    onChange={this.onChange}
                    type='text'
                    placeholder='Full Name'
                    />
                <input
                    name='email'
                    value={email}
                    onChange={this.onChange}
                    type='text'
                    placeholder='email'
                    />
                <input
                    name='passwordOne'
                    value={passwordOne}
                    onChange={this.onChange}
                    type='text'
                    placeholder='Password'
                    />
                <input
                    name='passwordTwo'
                    value={passwordTwo}
                    onChange={this.onChange}
                    type='text'
                    placeholder='Confirm Password'
                    />
                    <button type='submit' disabled={isInvalid}>Sign Up</
                    button>
            </form>
        )
    }
}

export default SignUp