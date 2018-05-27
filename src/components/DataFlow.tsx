import * as React from 'react';
import Send from './Send';
import History from './History';

interface IMessage{
    content:string
    date:Date
    userName:string
}

interface IDataFlowProps{
    messages:IMessage[];
    user:string
    addMessage(message:string,time:Date):void
}

interface IDataFlowState{
    messages:IMessage[]
}

class DataFlow extends React.Component<IDataFlowProps,IDataFlowState>{
    constructor(props:IDataFlowProps){
        super(props);
    }

    public addMessage =(message:string,time:Date)=>{
        this.props.addMessage(message,time);
    }

    public render(){
        return(
            <div className='dataFlow'>
                <History messages={this.props.messages}/>
                <Send addMessage={this.addMessage}/>
            </div>
        );
    }
}

export default DataFlow;