import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class Question extends Component{

    render(){
        const {question, user, currentUser} = this.props
        
        if(question === null){
            return(
                <div>This Question doesn't exist...</div>
            )
        }
        const {id} = question
        
        const {avatarURL} = user
        console.log(avatarURL)
        const answer = currentUser['answers'][id] ? currentUser['answers'][id] : 'optionOne'
        console.log(answer)
        return (
            <Container>
                <Row className = 'ques-author'>
                    <h3>{`${user["name"]} asks:`}</h3>
                </Row>
                <Row noGutters className='ques-info'>
                    <Col xs= {4}>
                        <Image className = 'image' width={171} height={180} src={avatarURL} roundedCircle/>
                    </Col>
                    <Col xs= {8}>
                        <Row noGutters>
                            <h3 className="h3">Would You Rather... </h3>
                        </Row>
                        <Row noGutters>
                            <p className = 'ques-text'>{`...${question[answer]['text']}`}</p>
                        </Row>
                        <Row noGutters>
                            <Link to={`/question/${id}`} className = 'a'>
                                <Button className = 'btn-custom' variant= 'primary'>
                                    View Poll
                                </Button>
                            </Link>
                        </Row>
                    </Col>
                </Row>
            </Container>
            // <div className = 'question'>
            //     <div className = 'author-name'>
            //         <h3>
            //             {`${currentUser['name']} asks:`}
            //         </h3>
            //     </div>
            //     <div className = 'question-info'>
            //         <div className = 'vl'>
            //             <img src = {avatarURL} alt = {`Avatar of ${author}`} className = 'avatar' />
            //         </div>
            //         <div className= 'question-comp'>
            //             <div className= 'question-text'>
            //                 <h4>
            //                     Would you rather  
            //                 </h4>
            //                 <p>{`...${this.props.answer}`}</p>
            //             </div>
            //             <Link className = 'view-poll' to = {`/question/${this.props.id}`}>View Poll</Link>
            //         </div>
            //     </div>
            // </div>
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