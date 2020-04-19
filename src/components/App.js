import React, { Component, Fragment } from 'react';
import {BrowserRouter as Router , Route} from 'react-router-dom'
import '../App.css';
import { handleInitialData } from '../actions/shared';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import {setAuthedId} from '../actions/authedUser'
import LoadingBar from 'react-redux-loading'
import Home from './Home';
import QuestionsPage from './QuestionsPage'
import AddQuestion from './AddQuestion';
import LeaderBoard from './LeaderBoard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Nav from './Nav';
import Col from 'react-bootstrap/Col'

class App extends Component {
  state = {
    authedUser: 'sarahedo'
  }

  handleChange = e => {
    e.preventDefault()
    let username = e.target.value
    this.setState({
      authedUser: username
    },console.log(this.state))
    
  }

  handleSubmit = e => {
    e.preventDefault()
    const {dispatch,users} = this.props
    let authedUser = Object.keys(users)[0]
    if(this.state.authedUser === ''){
      dispatch(setAuthedId(authedUser))
    }else{
      dispatch(setAuthedId(this.state.authedUser))
    }
    this.setState({
      authedUser: ''
    })
    this.props.history.push('/')
  }

  componentDidMount(){
    const {dispatch} = this.props
    dispatch(handleInitialData())
  }
  render(){
    const {users} = this.props
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="App">

            <Nav />
            <hr class="bg-success rule mt-0"></hr>
            {this.props.loading === true ? (
              <Container className='w-50'>
                <Row noGutters>
                  <Col>
                  <p>Welcome to the Would You Rather App</p>
                  </Col>
                </Row>
                <Row noGutters>
                  <Col>
                    <Image className = 'mb-3' width = {460} height= {300} src = 'https://i.ytimg.com/vi/GpOS0l-yoS8/maxresdefault.jpg'/>
                  </Col>
                </Row>
                <Row noGutters>
                  <Col>
                  <select className = 'form-control mb-3'
                    defaultValue = {Object.keys(users)[0]}
                    onChange = {this.handleChange}>
                    {Object.keys(users).map((username) => (
                      <option key = {username} value = {username}>{users[username].name}</option>
                    ))}
                  </select>
                  <Button type = 'submit' variant = 'primary' onClick = {this.handleSubmit}>
                    Sign In
                  </Button>
                  </Col>
                </Row>
              </Container>
            ) 
                : (<div className = "App-home">
                    <Route path = '/' exact component={Home} />
                    <Route path = '/question/:id' component = {QuestionsPage} />
                    <Route path = '/add' component = {AddQuestion} />
                    <Route path = '/leaderboard' component = {LeaderBoard}/>
                  </div>)}
          </div>
        </Fragment>
      </Router>
      
    )
  }
  
}

function mapStateToProps({authedUser,users,questions}){
  return {
    loading: authedUser === null,
    users,
    questions
  }
}

export default withRouter(connect(mapStateToProps)(App));
