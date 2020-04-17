import React, {Component} from 'react'
import {connect} from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

class LeaderBoard extends Component{
    render(){
        const {userToScore,users} = this.props
        return(
            <div>
                {userToScore.map((user) => (
                    <Container className = 'ques-container'>
                        <Row noGutters>
                            <Col xs={4} className = 'leaderboard-col-4'>
                                <Image className='leaderboard-image' width={171} height={180} src={users[user.id].avatarURL} roundedCircle/>
                            </Col>
                            <Col xs={6}>
                                <Row noGutters>
                                    <h3>
                                        {users[user.id].name}
                                    </h3>
                                </Row>
                                <Row noGutters>
                                    <Col xs = {8}>
                                        <p>Answered Questions:</p>
                                    </Col>
                                    <Col xs = {4}>
                                        <p>{Object.keys(users[user.id].answers).length}</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs= {8}>
                                        <p> Created Questions: </p>
                                    </Col>
                                    <Col xs={4}>
                                        <p>{users[user.id].questions.length}</p>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs = {2}>
                                <Row noGutters>
                                    <p>Score:</p>
                                </Row>
                                <Row noGutters>
                                    <p>{ user.score}</p>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                ))}
            </div>
            
        )
    }
}

function mapStateToProps({users}){
    let userToScore = []
    let score = 0
    Object.keys(users).forEach((user) => {
        score = users[user].questions.length + Object.keys(users[user].answers).length
        userToScore.push({
            id: user,
            score: score
        })
    })
    return {
        users,
        userToScore
    }
}

export default connect(mapStateToProps)(LeaderBoard)