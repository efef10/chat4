import * as React from 'react'
import {Link} from 'react-router-dom';
import {appService} from "../models/AppStore";




class Popup extends React.Component{

    private userName:any
    private password:any

    public logUser=()=>{
        if(appService.auth(this.userName.value,this.password.value)){
            appService.logUser(this.userName.value);
        }
        else{
            alert("user name or password is not correct");
        }
    }

    public render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <Link to="/"><button>X</button></Link>
                    <h1>Log In</h1>
                    <div>
                        <input ref={elem=>this.userName =elem} id="userName" type="text" placeholder='User name'/>
                    </div>
                    <div>
                        <input id="password" type="password" placeholder='Password' ref={elem=>this.password = elem}/>
                    </div>
                    <div>
                        <input type="submit" value="Log In" onClick={this.logUser}/>
                    </div>
                    <a href='#'>forgot password?</a>
                </div>
            </div>
        );
    }
}

export default Popup;