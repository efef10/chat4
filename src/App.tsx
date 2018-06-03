import * as React from 'react';
import {appService} from "../src/models/AppStore";
import DataFlow from './components/DataFlow';
import Popup from './components/PopUp';
import TreeComponent from './components/TreeComponent';
import './App.css';
import {Link,Switch,Route,Redirect} from 'react-router-dom';
// import addUser from './pic/addU.png'
// import FontAwesome from 'react-fontawesome'
// import * as FontAwesome from 'react-fontawesome'
const FontAwesome = require('react-fontawesome');


import '../node_modules/font-awesome/css/font-awesome.min.css';

interface IAppState{
    showPopup:boolean
}

class App extends React.Component<{},IAppState> {

    constructor(props:any){
        super(props);

        appService.subscribe(()=>{
            this.forceUpdate();
        })

        this.state = {
            showPopup: false,
        };
    }

    public togglePopup = ()=> {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    public logOut=()=>{
        appService.logOut();
    }

    public renderLogIn=(props:any)=>
        (appService.getLoggedUser()===""?<Popup {...props} />:<Redirect to={{pathname:"/"}}/>)

    public renderSignUp = (props:any)=>
        (<div>hi</div>)

  public render() {
    return (
      <div className="App">
          <div className='header'>
                  <div className='navElement'>Home</div>
                  {appService.getSelectedGroup()!==null?<FontAwesome name='user-plus' />:null}
                  {/*<div id='logOut' onClick={this.logOut}>Log Out</div>*/}
              {/*{appService.getLoggedUser()===""?<Link to="login"><div id='logIn' onClick={this.togglePopup}>Log In</div></Link>:<Link to="/"><div id='logIn' onClick={this.logOut}>Log Out</div></Link>}*/}

              <Link to={appService.getLoggedUser()===""?"login":"/"}><div id='logIn' onClick={appService.getLoggedUser()===""?this.togglePopup:this.logOut}>{appService.getLoggedUser()===""?"Log In":"Log Out"}</div></Link>
          </div>
          <Switch>
                  <Route path='/login' render={this.renderLogIn}/>
                  <Route path='/sign-up' render={this.renderSignUp}/>
          </Switch>
          <div className='main'>
              <div className='treeComponent'>
                  <TreeComponent/>
              </div>
              <div className='window'>
                  <DataFlow messages={appService.getMessages()}/>
              </div>
          </div>
      </div>
    );
  }
}

export default App;
