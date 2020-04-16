import React, {Component} from 'react'
import {connect} from 'react-redux'
import HomeQuestion from './HomeQuestion'

class Question extends Component{

    render(){
        const {question, user, currentUser} = this.props
        
        if(question === null){
            return(
                <div>This Question doesn't exist...</div>
            )
        }
        const {id,author} = question
        
        const {avatarURL} = user
        console.log(avatarURL)
        const answer = currentUser['answers'][id] ? currentUser['answers'][id] : 'optionOne'
        console.log(answer)
        return (
            <div className = 'question'>
                <div className = 'author-name'>
                    <h3>
                        {`${currentUser['name']} asks:`}
                    </h3>
                </div>
                <div className = 'question-info'>
                    <div className = 'vl'>
                        <img src = {avatarURL} alt = {`Avatar of ${author}`} className = 'avatar' />
                    </div>
                    <HomeQuestion id = {id} answer= {(question[answer]['text'])}/>
                </div>
            </div>
        )
    }
}

function mapStateToProps({authedUser,users,questions},{id}){
    const question = questions[id]
    const user = question ? users[question['author']]: null
    const currentUser = users[authedUser] 
    return {
        currentUser,
        user,
        question
    }
}

export default connect(mapStateToProps)(Question)