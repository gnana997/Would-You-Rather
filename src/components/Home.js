import React, {Component} from 'react'
import {connect} from 'react-redux'
// import QuestionsPage from './QuestionsPage'
import Question from './Question'

class Home extends Component{
    state = {
        isAnswered: false 
    }

    handleChange = e => {
        if(e.target.value === 'true'){
            this.setState({
                isAnswered: true
            })
        }else{
            this.setState({
                isAnswered: false
            })
        }
        console.log(this.state)     
    }

    render(){
        const {answeredQuestions,questions} = this.props
        const unansweredQuestions = Object.keys(questions).filter((id) => {
            return (!answeredQuestions.includes(id) && id)
        })
        console.log(unansweredQuestions,answeredQuestions)
        return(
            <div className = 'mainHome'>
                <div className = 'tabs'>
                    <button className={`btn my-0 py-2 ${(!this.state.isAnswered && 'active-tab')} border-right btn-shadow`} value = 'false' onClick = {this.handleChange}>Unanswered Questions</button>
                    <button className={`btn my-0 py-2 ${(this.state.isAnswered && 'active-tab')} btn-shadow`} value = 'true' onClick = {this.handleChange}>Answered Questions</button>
                </div>
                <div className='questionsDiv p-2'>
                    { this.state.isAnswered ? answeredQuestions.map((id) => (
                            <Question key = {id} id = {id}/>
                    )) : unansweredQuestions.map((id) => (
                            <Question key = {id} id = {id} />
                    ))}
                </div>
            </div>
            
        )
    }

}

function mapStateToProps({authedUser,users,questions}){
    const user = users[authedUser]
    const answeredQuestions = user ? Object.keys(user['answers']): null
    return {
        authedUser,
        answeredQuestions,
        questions
    }
}

export default connect(mapStateToProps)(Home)