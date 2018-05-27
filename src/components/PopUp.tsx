import * as React from 'react'

interface IPopUpProps{
    text:string
    closePopup():void
    logUser(userName:string):void
}




class Popup extends React.Component<IPopUpProps,{}> {

    private userName:any

    public logUser=()=>{
        this.props.logUser(this.userName.value);
        this.props.closePopup();
    }

    public render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <button onClick={this.props.closePopup}>X</button>
                    <h1>{this.props.text}</h1>
                    <div>
                        {/*<label htmlFor="userName">User Name:</label>*/}
                        <input ref={elem=>this.userName =elem} id="userName" type="text" placeholder='User name'/>
                    </div>
                    <div>
                        {/*<label htmlFor="password">Password:</label>*/}
                        <input id="password" type="password" placeholder='Password'/>
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