import React, { Component } from 'react';
import './App.css';
import MainRoute from './routers/mainRouter';
import Header from './Header/index';
import Footer from './Footer/index';
import { withRouter } from 'react-router';


class App extends Component {

    componentDidMount(){
        document.title="Week 9"
    }
	render() {
		const isUser = this.props.location.pathname !== "/admin"
      return (
        <div className='app' style={{backgroundColor:'#ff0'}}>
					{isUser && <Header/>}
          <div className="router"><MainRoute/></div>
					{isUser && <Footer/>}
        </div>
      )
	}
}

// use withRouter HOC in order to inject match, history and location in the component props.
export default withRouter(App);
