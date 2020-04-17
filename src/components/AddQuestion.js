import React, {Component} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { connect} from 'react-redux'
import { withRouter } from 'react-router-dom'
import { handleAddQuestion } from '../actions/questions'

class AddQuestion extends Component{
    state = {
        optionOne : '',
        optionTwo : ''
    }

    handleChange = (e) => {
        e.preventDefault()
        const name = e.target.name
        const value = e.target.value
        if(name === 'optionOne'){
            this.setState({
                optionOne: value
            },console.log(this.state))
        }else{
            this.setState({
                    optionTwo: value
            },console.log(this.state))
        }
        
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {optionOne,optionTwo} = this.state
        const {dispatch} = this.props
        console.log(optionOne,optionTwo)
        dispatch(handleAddQuestion(optionOne,optionTwo))
        this.setState({
            optionOne: '',
            optionTwo: ''
        })
        this.props.history.push('/')
    }

    render(){
        const {optionOne,optionTwo} = this.state
        return(
            <Container className='ques-container'>
                <Row className = 'ques-author' noGutters>
                    <h3>Create New Question</h3>
                </Row>
                <Row noGutters className='ques-info'>
                    <Col xs={12}>
                        <Row noGutters>
                            <p className = 'ques-text'>Complete the question:</p>
                        </Row>
                        <Row noGutters>
                            <h3 className="h3">Would you rather..</h3>
                        </Row>
                        <Row noGutters>
                            <Form className = 'form' onSubmit={this.handleSubmit}>
                                <Form.Control className='mb-2' placeholder="Enter Option One text here" name = 'optionOne' value = {optionOne} onChange = {this.handleChange}/>
                                <Form.Control className = 'mb-2' placeholder="Enter Option Two text here" name = 'optionTwo' value = {optionTwo} onChange = {this.handleChange}/>
                                <Button className='add-ques-submit' variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Row>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default withRouter(connect()(AddQuestion));