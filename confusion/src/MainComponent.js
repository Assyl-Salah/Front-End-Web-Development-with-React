import React , {Component} from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent ';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import Aboutus from './AboutComponent';
import {Switch , Route , Redirect ,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchleaders , postFeedback } from './redux/ActionCreators';
import {actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}
const mapDispatchToProps = dispatch => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
  fetchleaders: () => {dispatch(fetchleaders())},
  postFeedback:(firstname, lastname, telnum, email, agree, contactType,   message) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType,   message))

});
class Main extends Component {
  constructor(props) {
    super(props);
    
  }

  //fetch data 
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchleaders();
  }
  render() {
    const HomePage = () => {
      return(
        <Home 
              dish={this.props.dishes.dishes.filter(dish => dish.featured)[0]}
              dishesLoading={this.props.dishes.isLoading}
              dishErrMess={this.props.dishes.errMess}
              promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
              promoLoading={this.props.promotions.isLoading}
              promoErrMess={this.props.promotions.errMess}
              leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
              leadersLoading={this.props.leaders.isLoading}
              leadersErrMess={this.props.leaders.errMess}
          />
      );
    }

    const DishWithId = ({match}) => {
      return(
        <Dishdetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
        isLoading={this.props.dishes.isLoading}
        errMess={this.props.dishes.errMess}
        comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
        commentsErrMess={this.props.comments.errMess}
        postComment={this.props.postComment}
      />
      );
    };

    return (
      <div>
        <Header/>
           <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch location={this.props.location}>
           <Route path="/home" component={HomePage}/>
           <Route exact path="/menu" component={()=> <Menu dishes={this.props.dishes} />}/>
           <Route exact path="/contactus" component={()=> <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}/> }/>
           <Route path='/menu/:dishId' component={DishWithId} />
           <Route path="/aboutus" component={()=> <Aboutus leaders={this.props.leaders} />}/>
           <Redirect to="/home" />
       </Switch>
       </CSSTransition>
          </TransitionGroup>
        <Footer/>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
