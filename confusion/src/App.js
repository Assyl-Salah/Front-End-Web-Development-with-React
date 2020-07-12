import React , {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Menu from './MenuComponent';
import { DISHES } from './shared/dishes'
import { Navbar, NavbarBrand } from 'reactstrap';
import Dishdetail from './DishdetailComponent ';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES
    };
  }
  render() {
    return (
      <div className="App">
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <Menu dishes={this.state.dishes} />
        {/* <Dishdetail></Dishdetail> */}
      </div>
    );
  }
}

export default App;
