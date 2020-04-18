import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from "react-redux";
import Button from 'react-bootstrap/Button';
import { setAuthedId } from '../actions/authedUser';
import {withRouter} from 'react-router-dom'

class NavBar extends Component{

    handleClick = e => {
        e.preventDefault()
        const {dispatch} = this.props
        dispatch(setAuthedId(null))
        this.props.history.push('/')
    }

    render(){
    const {authedUser,users} = this.props
    return (
        <nav className='nav'>
                <div className = 'url'>
                    <NavLink to = '/' exact activeClassName = 'active'>
                        Home
                    </NavLink>
                </div>
                <div className = 'url'>
                    <NavLink to = '/add' activeClassName = 'active'>
                        Add Question
                    </NavLink> 
                </div>
                <div className = 'url'>
                    <NavLink to = '/leaderboard' activeClassName = 'active'>
                        LeaderBoard
                    </NavLink>
                </div>
                {(authedUser && (
                    <div>
                        <div>
                            <p>{`Hello, ${users[authedUser].name}`}</p>
                        </div>

                        <div>
                            <Button onClick = {this.handleClick}>Logout</Button>
                        </div>
                    </div>
                ))}

                
        </nav>
    )
                }
}

function mapStateToProps({authedUser,users}){
    return{
        authedUser,
        users
    }
}

export default withRouter(connect(mapStateToProps)(NavBar))

