import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAnswerQuestion } from "../actions/questions";

class QuestionsPage extends Component {
  state = {
    answer: "",
    isAnswered: false,
  };

  handleClick = (e) => {
    const answer = e.target.value;
    this.setState({
      answer,
    });
  };

  handleSubmit = (e, id, answer) => {
    e.preventDefault();
    console.log(id);
    const { dispatch } = this.props;
    dispatch(handleAnswerQuestion(id, answer));
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
          ...this.state,
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
    const total = Object.keys(users).length
    
    const optOnePoll = (question['optionOne']['votes'].length)/total
    console.log(question['optionOne']['votes'].length/total)
    const optTwoPoll = (question['optionTwo']['votes'].length)/total
    const { avatarURL } = currentUser;
    return (
      <div>
        <div className="question">
          <div className="author-name">
            <h3>{`${currentUser["name"]} asks:`}</h3>
          </div>
          <div className="question-info">
            <div className="vl">
              <img
                src={avatarURL}
                alt={`Avatar of ${currentUser["name"]}`}
                className="avatar"
              />
            </div>
            <div className="question-comp">
              {this.state.isAnswered ? (
                <div>
                    <h2>
                        Results:
                    </h2>
                    <div className = {`optionComp ${(this.state.answer === 'optionOne' && 'response')}`}>
                        <p>
                            {`Would you rather ${question["optionOne"]["text"]}`}
                        </p>
                        <div className = 'ProgressBar' >
                            <div className= 'Filler' style = {{width: `${optOnePoll*100}%`}}>
                            {Math.round(optOnePoll*100) > 0 && Math.round(optOnePoll*100)}
                            </div>
                        </div>
                    </div>
                    <div className = {`optionComp ${(this.state.answer === 'optionTwo' && 'response')}`}>
                        <p>
                            {`Woud you rather ${question["optionTwo"]["text"]}`}
                        </p>
                        <div className = 'ProgressBar'>
                            <div className= 'Filler' style = {{width: `${optTwoPoll*100}%`}}>
                            {Math.round(optTwoPoll*100) > 0 && Math.round(optTwoPoll*100)}
                            </div>
                        </div>

                    </div>
                </div>
              ) : (
                <div className="question-text">
                  <h4>Would you rather</h4>
                  <form
                    onSubmit={(e) =>
                      this.handleSubmit(e, id, this.state.answer)
                    }
                  >
                    <input
                      type="radio"
                      value="optionOne"
                      name="answers"
                      onClick={this.handleClick}
                    />{" "}
                    {question["optionOne"]["text"]}
                    <input
                      type="radio"
                      value="optionTwo"
                      name="answers"
                      onClick={this.handleClick}
                    />{" "}
                    {question["optionTwo"]["text"]}
                    <button type="submit">Submit</button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
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
