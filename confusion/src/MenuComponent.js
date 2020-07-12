import React , {Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
  CardTitle } from 'reactstrap';
import Dishdetail from './DishdetailComponent ';
class Menu extends Component{
        constructor(props){
          super(props);
         this.state={
                     selecteddish:null
         }
       this.ondishselect=this.ondishselect.bind(this);
      }
  
      ondishselect(dish){
       this.setState({selecteddish:dish});
      }
      //  console.log("Menu component constructor is invoked")
  
// componentDidMount(){
//   console.log("Menu component componentDidMount is invoked")
// }
   
render()
{
    const menu = this.props.dishes.map((dish) =>
    {
        return (
            <div  className="col-12 col-md-5 m-1">
              <Card key={dish.id}
                onClick={() => this.ondishselect(dish)}>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay>
              </Card>
            </div>
          );
      });

      return (
          <div className="container">
              <div className="row">
                  {menu}
              </div>
              <Dishdetail dish ={this.state.selecteddish} />
          </div>

    );
}


    
}

export default Menu;