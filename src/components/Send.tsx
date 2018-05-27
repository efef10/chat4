import * as React from 'react';

interface ISendProps{
    addMessage(message:string,time:Date):void
}

interface ISendState{

}
class Send extends React.Component<ISendProps,ISendState>{
    private input:any
    constructor(props:ISendProps){
        super(props);
    }

    public addMessage =(e:any)=>{
        let d=new Date();
        // let date = d.getHours()+":"+d.getMinutes()
        this.props.addMessage(e.target.previousSibling.value,d);
        this.input.value="";
    }

    public render(){
        return(
            <div className='send'>
                <input ref={elem=>this.input = elem} id="message" type="text" placeholder='enter message'/>
                <button onClick={this.addMessage}>{'>'}</button>
            </div>
        );
    }
}

export default Send;