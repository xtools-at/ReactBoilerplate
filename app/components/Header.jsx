import React from 'react';
import * as Redux from 'react-redux';
import firebase from 'app/firebase/';
import sideNav from 'materialize-css/dist/js/materialize.min'
//import {hashHistory} from 'react-router';

import * as actions from 'actions';

export var Header = React.createClass({
	componentDidMount() {
    	$(".button-collapse").sideNav();
	},
	onLogout(ev){
		ev.preventDefault();
		$(".button-collapse").sideNav('hide');
	    var {dispatch} = this.props;
	    dispatch(actions.startLogout());
  	},
    render() {
    	var user = firebase.auth().currentUser;

    	function renderLinks(self){
			if (user) {
			 return(
			      <ul className="right hide-on-med-and-down">
					<li><a href="#/add">Add Event</a></li>
			        <li><a href="#/" onClick={self.onLogout}>Logout</a></li>
			        <li><a href="https://github.com/xtools-at/nd802-1-MeetUp" target="_blank">Fork on Github</a></li>
			      </ul>
			 );
			} else {
				return(
			      <ul className="right hide-on-med-and-down">
					<li><a href="#/login">Login</a></li>
			        <li><a href="https://github.com/xtools-at/nd802-1-MeetUp" target="_blank">Fork on Github</a></li>
			      </ul>
			    );
			}
    	}

    	function renderMobileNav(self){
			if (user){
				return (
					<ul id="mobile-nav" className="side-nav">
					    <li><div className="userView">
					      <img className="background" src="http://materializecss.com/images/office.jpg" />
					      <img className="circle" src="http://materializecss.com/images/yuna.jpg" />
					      <span className="white-text name">{user.displayName}</span>
					      <span className="white-text email">{user.email}</span>
					    </div></li>
					    <li><a className="waves-effect" href="#/add" onClick={()=> {$(".button-collapse").sideNav('hide')}}><i className="material-icons">add</i>Add Event</a></li>
					    <li><a className="waves-effect" href="#/" onClick={self.onLogout}><i className="material-icons">close</i>Logout</a></li>
					    <li><div className="divider"></div></li>
					    <li><a className="waves-effect" href="https://github.com/xtools-at/nd802-1-MeetUp" target="_blank"><i className="material-icons">code</i>Fork on Github</a></li>
				    </ul>
				);
			} else {
				return(
					<ul id="mobile-nav" className="side-nav">
					    <li><div className="userView teal">
					      <a href="#/login"><span className="white-text name">Not logged in</span></a>
					    </div></li>
					    <li><a className="waves-effect" href="#/login" onClick={()=> {$(".button-collapse").sideNav('hide')}}><i className="material-icons">account_circle</i>Login</a></li>
			        	<li><div className="divider"></div></li>
					    <li><a className="waves-effect" href="https://github.com/xtools-at/nd802-1-MeetUp" target="_blank"><i className="material-icons">code</i>Fork on Github</a></li>
				    </ul>
				);
			}
    	}

        return (
            <header>
           	 <nav>
			    <div className="nav-wrapper">
			      <a href="#/" className="brand-logo"><i className="material-icons">event_note</i>MeetUp</a>
			      <a data-activates="mobile-nav" className="button-collapse"><i className="material-icons">menu</i></a>
				  {renderLinks(this)}
				  {renderMobileNav(this)}
			    </div>
			  </nav>
            </header>
        );
    }
});

export default Redux.connect(
    (state) => {
    return state;
  }
)(Header);