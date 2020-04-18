import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAnswerQuestion } from "../actions/questions";
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Form from 'react-bootstrap/Form'

class QuestionsPage extends Component {
  state = {
    answer: "",
    isAnswered: false,
  };

  handleClick = (e) => {
    const answer = e.target.value;
    this.setState({
      answer,
    },console.log(this.state));
  };

  handleSubmit = (e, id, answer) => {
    e.preventDefault();
    console.log(id);
    const { dispatch } = this.props;
    if(answer !== ''){
      dispatch(handleAnswerQuestion(id, answer));
      this.setState({
          isAnswered: true
      })
    }
  };

  componentDidMount() {
    const { users, id, authedUser} = this.props;
    const user = users[authedUser];
    console.log(user);
    let ans;
    if (Object.keys(user["answers"]).includes(id)) {
      ans = user["answers"][id];
      console.log(ans);
      this.setState(
        {
          answer: ans,
          isAnswered: true,
        }
      )
    }
  }

  render() {
    const {questions, id, users } = this.props;
    const question = questions[id];
    const currentUser = users[questions[id]["author"]];
    const total = question['optionOne']['votes'].length + question['optionTwo']['votes'].length
    
    const optOnePoll = (question['optionOne']['votes'].length)/total
    const optTwoPoll = (question['optionTwo']['votes'].length)/total
    const { avatarURL } = currentUser;
    return (
        <Container className='ques-container'>
          <Row className = 'ques-author' noGutters>
            <h3>{`${currentUser["name"]} asks:`}</h3>
          </Row>
          <Row noGutters className='ques-info'>
            <Col xs= {4} className = 'col-image'>
              <Image className= 'image' width={171} height={180} src={avatarURL} roundedCircle/>
            </Col>
            
            {this.state.isAnswered ? (
              <Col xs= {8}>
                <Row noGutters>
                  <h3 className="h3">Results: </h3>
                </Row>
                <Row noGutters className = 'px-3 mb-2'>
                  <Col className={`px-3 position-col ${(this.state.answer === 'optionOne' && 'selected-answer')}`}>
                  {(this.state.answer === 'optionOne' && (
                    <div className = 'position-answer'>
                      Your Vote
                    </div>
                  ))}
                    <Row noGutters>
                      <Col>
                        <p className='ques'>{`Would you rather ${question["optionOne"]["text"]}?`}</p>
                      </Col> 
                    </Row>
                    <Row noGutters>
                      <Col>
                      <ProgressBar className = {(this.state.answer !== 'optionOne' && 'not-poll')} now={optOnePoll*100} label={`${Math.round(optOnePoll*100)}%`} />
                      </Col>
                    </Row>
                    <Row noGutters >
                      <Col>
                      <p className="total">{`${question['optionOne']['votes'].length} out of ${total}`}</p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row noGutters className = 'px-3 mb-2'>
                  <Col className={`px-3 position-col ${(this.state.answer === 'optionTwo' && 'selected-answer')}`}>
                  {(this.state.answer === 'optionTwo' && (
                    <div className = 'position-answer'>
                      Your Vote
                    </div>
                  ))}
                    <Row noGutters>
                      <Col>
                      <p className='ques'>{`Would you rather ${question["optionTwo"]["text"]}?`}</p>
                      </Col>
                    </Row>
                    <Row noGutters>
                      <Col>
                      <ProgressBar className = {(this.state.answer !== 'optionTwo' && 'not-poll')} now={optTwoPoll*100} label={`${Math.round(optTwoPoll*100)}%`} />
                      </Col>
                    </Row>
                    <Row noGutters >
                      <Col>
                      <p className="total">{`${question['optionTwo']['votes'].length} out of ${total}`}</p>
                      </Col>
                      
                    </Row>
                  </Col>
                </Row>
              </Col>
            ):(
              <Col xs= {8}>
                <Row noGutters>
                  <h3 className="h3">Would You Rather... </h3>
                </Row>
                <Row noGutters>
                  <Form className = 'form' onSubmit = {(e) => this.handleSubmit(e, id, this.state.answer)}>
                    <Form.Check name = 'answer' type = 'radio'  label = {question["optionOne"]["text"]} value = 'optionOne' onClick = {this.handleClick}/>
                    <Form.Check name = 'answer' type = 'radio'  label = {question["optionTwo"]["text"]} value = 'optionTwo' onClick = {this.handleClick}/>
                    <Button variant="primary" type="submit" >
                      Submit
                    </Button>
                  </Form>
                </Row>

              </Col>
            )}
          </Row>
        </Container>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, props) {
  const { id } = props.match.params;

  return {
    authedUser,
    users,
    questions,
    id,
  };
}

export default connect(mapStateToProps)(QuestionsPage);
