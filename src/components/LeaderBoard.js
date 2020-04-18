import React, {Component} from 'react'
import {connect} from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

class LeaderBoard extends Component{
    render(){
        const {userToScore,users} = this.props
        userToScore.sort((a,b) => b.score - a.score)
        console.log(userToScore)
        return(
            <div>
                {userToScore.map((user) => (
                    <Container key = {user.id} className = 'cont'>
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
                                <Row noGutters>
                                    <Col xs= {8}>
                                        <p> Created Questions: </p>
                                    </Col>
                                    <Col xs={4}>
                                        <p>{users[user.id].questions.length}</p>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs = {2}>
                                <div className="m-2 row-score">
                                <Row noGutters>
                                    <Col className="score-class">
                                        <p>Score:</p>
                                    </Col> 
                                </Row>
                                <Row noGutters>
                                    <Col>
                                        <div className="py-4">
                <span className="bg-success border px-2 rounded-circle">{user.score}</span>
                                        </div>
                                    </Col>
                                </Row>
                                </div>
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