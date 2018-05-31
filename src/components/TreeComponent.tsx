import * as React from 'react'
import {Group} from '../models/Group';
import {appService} from "../models/AppStore";
// import ChatTree from './../models/ChatTree'
import TreeChat from './../models/TreeChat'
import './TreeComponent.css';

interface ITree {
    load(items:Group[]):void
    clear():void
    element:HTMLElement
}

class TreeComponent extends React.Component{
    private element:any;
    private tree:ITree

    constructor(props:any){
        super(props);
    }

    public componentDidMount(){
        this.tree = TreeChat(this.element);
        this.tree.load(appService.groupsToDisplay());
    }

    public render(){
        return(
            <div>
            <ul className='tree' ref={elem=>this.element=elem}/>
            </div>
        );
    }
}

export default TreeComponent;