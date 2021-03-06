import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardText, CardTitle , BreadcrumbItem , Breadcrumb,Button, Modal, ModalHeader, ModalBody,  Row, Col, Label,NavItem,Nav} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
 import {Link} from 'react-router-dom';
 import {Loading} from './LoadingComponent';
 import { baseUrl } from './shared/baseUrl';
 import { FadeTransform, Fade, Stagger } from 'react-animation-components';

 const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
function RenderComments({comments , postComment , dishId}) {
    if (comments == null) {
        return (<div></div>)
    }
    const comment = comments.map(comment => {
        return (
            <Fade in >
            <li key={comment.id}>
               
                    <p>{comment.comment}</p>
                    <p>-- {comment.author},
                    {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit'
                        }).format(new Date(comment.date))}
                    </p>
            </li>
            </Fade>
           
        )
    })
    return (
        <div className='col-12 col-md-5 m-1'>
            <h4> Comments </h4>
            <ul className='list-unstyled'>
                <Stagger in >
                {comment}
                <CommentForm dishId={dishId} postComment={postComment}/>
                </Stagger>
            </ul>

        </div>
    )
}
 function RenderDish({dish}) {
    if (dish != null) {
        return (
            <div className='col-12 col-md-5 m-1'>
                <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <CardImg width="100%"  src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
                </FadeTransform>
            </div>
        )
    }
    else {
        return (<div></div>)
    }
}

const DishDetail = (props) => {
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
      else  if (props.dish != null) {
        return (
            <div className="container">
            <div className="row">
                <Breadcrumb>
                    {/* <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem> */}
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
               
                    <RenderDish dish={props.dish} />
               
                    <RenderComments comments={props.comments}
                  postComment={props.postComment}
                    dishId={props.dish.id}
                    />
                   
            </div>
            </div>
        );
    }
}
class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isModalOpen : false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
      }

      toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }
      handleSubmit(values){
          this.toggleModal();
        
          this.props.postComment(this.props.dishId , values.rating, values.yourname , values.messages)
          
       }    
    render(){
        return(
            <React.Fragment>
                       <Nav className="ml-auto" navbar>
                        <NavItem>
                        <Button outline onClick={this.toggleModal}><span className="fa fa-edit fa-lg"></span>Submit Comment</Button>
                        </NavItem>
                        </Nav>
                        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                            <ModalHeader >Submit Comment</ModalHeader>
                            <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="rating" md={2}>Rating</Label>
                                    <Col md={10}>
                                    <Control.select model=".rating" name="rating"
                                            className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>

                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="yourname" md={2}>Your Name</Label>
                                    <Col md={10}>
                                        <Control.text model=".yourname" id="yourname" name="yourname"
                                            placeholder="Your name"
                                            className="form-control"
                                        validators={{
                                                required, minLength: minLength(2), maxLength: maxLength(15)
                                            }}
                                            />
                                        <Errors
                                            className="text-danger"
                                            model=".yourname"
                                            show="touched"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                        /> 
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="message" md={2}>Comments</Label>
                                    <Col md={10}>
                                        <Control.textarea model=".message" id="message" name="message"
                                            rows="6"
                                            className="form-control" />
                                    </Col>
                                </Row>  
                                <Row className="form-group">
                                    <Col md={{size:10, offset: 2}}>
                                        <Button type="submit"  value="submit" color="primary">
                                    Submit
                                        </Button>
                                    </Col>
                                </Row>
                                    </LocalForm>
                            </ModalBody>
        </Modal>    
        </React.Fragment>
        );
        } 

}
export default DishDetail;