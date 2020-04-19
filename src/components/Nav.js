import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from "react-redux";
import { setAuthedId } from '../actions/authedUser';
import {withRouter} from 'react-router-dom'
import NavBar from 'react-bootstrap/Navbar'
import Image from 'react-bootstrap/Image'

class Nav extends Component{

    handleClick = e => {
        e.preventDefault()
        const {dispatch} = this.props
        dispatch(setAuthedId(null))
        this.props.history.push('/')
    }

    render(){
    const {authedUser,users} = this.props
    return (
        <div className="w-75 nav-container">
                 <NavBar className="pb-0">
                <div className = 'url nav-active'>
                    <NavLink className="nav-inactive" to = '/' exact activeClassName = 'active'>
                        Home
                    </NavLink>
                </div>
                <div className = 'url'>
                    <NavLink className="nav-inactive" to = '/add' activeClassName = 'active'>
                        Add Question
                    </NavLink> 
                </div>
                <div className = 'url'>
                    <NavLink className="nav-inactive" to = '/leaderboard' activeClassName = 'active'>
                        LeaderBoard
                    </NavLink>
                </div>
                {(authedUser && (
                    <div className="d-inline-flex">
                        <div class="d-flex url">
                            <span class="align-self-center">{`Hello, ${users[authedUser].name}`}</span>
                            <Image src = {users[authedUser].avatarURL} className = 'image-thumbnail' roundedCircle/>
                        </div>

                        <div className='url'>
                            <span className='logout-link' onClick = {this.handleClick}>Logout</span>
                        </div>
                    </div>
                ))}

                
        </NavBar>
   

        </div>
    )
                }
}

function mapStateToProps({authedUser,users}){
    return{
        authedUser,
        users
    }
}

export default withRouter(connect(mapStateToProps)(Nav))

