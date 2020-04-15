import React, {Component} from 'react'
import {connect} from 'react-redux'
import {handleAnswerQuestion} from '../actions/questions'

class QuestionsPage extends Component{

    state = {
        answer: ''
    }

    handleClick = (e) => {
        const answer = e.target.value
        this.setState({
            answer
        })
    }

    handleSubmit = (e,id,answer) => {
        e.preventDefault()
        console.log(id)
        const {dispatch} = this.props
        dispatch(handleAnswerQuestion(id,answer))
    }

    render(){
        const {currentUser,question,id} = this.props
        const {avatarURL} = currentUser
        return (
            <div >
                <div className = 'question'>
                <div className = 'author-name'>
                    <h3>
                        {`${currentUser['name']} asks:`}
                    </h3>
                </div>
                <div className = 'question-info'>
                    <div className = 'vl'>
                        <img src = {avatarURL} alt = {`Avatar of ${currentUser['name']}`} className = 'avatar' />
                    </div>
                    <div className= 'question-comp'>
                        <div className= 'question-text'>
                            <h4>
                                Would you rather  
                            </h4>
                            <form onSubmit = {(e) => this.handleSubmit(e,id,this.state.answer)}>
                                    <input type = 'radio' value = 'optionOne' name = 'answers' onClick = {this.handleClick}/> {question['optionOne']['text']}
                                    <input type = 'radio' value = 'optionTwo' name = 'answers' onClick = {this.handleClick}/> {question['optionTwo']['text']}
                                    <button type = 'submit'>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}
 
function mapStateToProps({authedUser,users,questions},props){
    const {id} = props.match.params
    const user = users[authedUser]
    const question = questions[id]
    const currentUser = users[questions[id]['author']]
    return {
        authedUser,
        currentUser,
        user,
        question,
        id
    }
}

export default connect(mapStateToProps)(QuestionsPage)