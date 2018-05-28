import * as React from 'react';
import {appService} from "../models/AppStore";
// import {appService} from "../models/AppStore";

interface IMessage{
    content:string
    date:Date
    userName:string
}

interface IHistoryProps{
    messages:IMessage[]
}

interface IHistoryState{
    messages:IMessage[]
}
class History extends React.Component<IHistoryProps,IHistoryState>{
    constructor(props:IHistoryProps){
        super(props);
        // this.state={messages:appService.getMessages()}
    }

    public generateHistory(){
        return this.props.messages.map((message,idx)=>{
            return (
                <div className='message' key={idx}>
                     {/*+ myMessage - color white fixme*/}
                    <span className='histMessage'>{message.content}<span className='time'>{`  `+message.date}</span></span>
                </div>
            )
        });

    }

    public chattingWith=()=>{
        let chatting:string = "you are now chatting ";
        let group = appService.getSelectedGroup();
        let chattedWithUser = appService.getChattedWithUser();
        if(!!group){
            return chatting+" in group "+group.getGroupName();
        }
        else if(chattedWithUser!==""){
            return chatting+" with "+ chattedWithUser;
        }
        else{
            return "";
        }
    }

    public render(){
        const list = this.generateHistory();
        const message = this.chattingWith();
        return(
            <div className='history'>
                <p>{message}</p>
                <div className='messages'>{list}</div>
            </div>
        );
    }
}

export default History;