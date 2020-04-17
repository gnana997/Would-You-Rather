import React, { Component, Fragment } from 'react';
import {BrowserRouter as Router , Route} from 'react-router-dom'
import '../App.css';
import { handleInitialData } from '../actions/shared';
import {connect} from 'react-redux'
import LoadingBar from 'react-redux-loading'
import Home from './Home';
import Nav from './Nav'
import QuestionsPage from './QuestionsPage'
import AddQuestion from './AddQuestion';
import LeaderBoard from './LeaderBoard';

class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }
  render(){
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="App">
            <Nav />
            {this.props.loading === true ? null 
                : <div className = "App-home">
                    <Route path = '/' exact component={Home} />
                    <Route path = '/question/:id' component = {QuestionsPage} />
                    <Route path = '/add' component = {AddQuestion} />
                    <Route path = '/leaderboard' component = {LeaderBoard}/>
                  </div>}
          </div>
        </Fragment>
      </Router>
      
    )
  }
  
}

function mapStateToProps({authedUser}){
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App);
