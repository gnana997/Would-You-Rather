import React, {Component} from 'react'
import { Link } from "react-router-dom";

class HomeQuestion extends Component{
    render(){
        return (
            <div className= 'question-comp'>
                        <div className= 'question-text'>
                            <h4>
                                Would you rather  
                            </h4>
                            <p>{`...${this.props.answer}`}</p>
                        </div>
                        <Link className = 'view-poll' to = {`/question/${this.props.id}`}>View Poll</Link>
            </div>
        )
    }
}

export default HomeQuestion