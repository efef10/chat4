import {Group} from './Group';
import {User} from './User';
import {appService} from "../models/AppStore";
import group from '../pic/group.png';

interface myGroupSpan extends HTMLSpanElement{
    path:string
}

function TreeChat(element:HTMLElement) {
    // e:React.KeyboardEvent<HTMLDivElement>
    function arrowsKeyboard(e:any):void{
        if (e.keyCode == 38 || e.keyCode == 40) {
            // up - down arrows
            let elements = element.querySelectorAll("li");
            let displayedElements =[];
            for(let i=0;i<elements.length; i++){
                if (elements[i].offsetParent !== null) {
                    displayedElements.push(elements[i]);
                }
            }
            let target = e.target as HTMLElement;
            let parent = target.parentElement;
            if(!!parent){
                let index = displayedElements.indexOf(parent as HTMLLIElement);
                index = e.keyCode===38 ? index-1 : index+1
                if(index>=0 && index<displayedElements.length){
                    let elem = displayedElements[index];
                    let span = elem.querySelector("span");
                    if(!!span){
                        span.focus();
                        if (span.classList.contains("group")) {
                            let target = span as myGroupSpan;
                            appService.selectGroup(target.path)
                            // this.props.groupSelected(target.path);//
                        }
                        else {
                            appService.userSelected(span.innerText)
                        }
                    }
                }
            }

        }

        else if (e.keyCode == 37 && (e.target as HTMLElement).classList.contains("group")) {
            // left arrow
            let parent = (e.target as HTMLElement).parentElement
            if(!!parent){
                let ul = parent.querySelector(":scope > ul");
                if(!!ul){
                    if(ul.classList.contains("hidden")){
                        let parent = ul.parentElement ? ul.parentElement.parentElement : null;
                        while(parent && parent.tagName!== "LI"){
                            parent = parent.parentElement;
                            if(!parent){
                                return;
                            }
                        }
                        let span = parent?parent.querySelector(":scope > span"):null;
                        span?(span as HTMLElement).focus():null;
                    }
                    else{
                        ul.classList.add("hidden");
                    }
                }
                else{
                    let parent = e.target.parentElement.parentElement.parentElement
                    parent.querySelector(":scope > span").focus();
                }
            }

        }
        else if (e.keyCode == 39 && (e.target as HTMLElement).classList.contains("group")) {
            // right arrow
            let parent = (e.target as HTMLElement).parentElement;
            if(!!parent){
                let ul = parent.querySelector(":scope > ul");
                if(!!ul){
                    ul.classList.remove("hidden");
                }
            }
        }
    }

    function showHideGroups(e:any):void{
        e.stopPropagation();
        if(e.target.classList.contains("group")) {
            let uls = e.target.parentElement.querySelectorAll(":scope > ul")
            for(let ul of uls){
                ul.classList.toggle("hidden");
            }
        }
    }

    function load(items:Group[]){
        element.addEventListener("keydown",arrowsKeyboard);
        element.addEventListener("dblclick",showHideGroups);
        element.addEventListener("click",(e:any)=> {
            e.stopPropagation();
            if(e.target.tagName !== "LI" && e.target.tagName !== "SPAN"){
                return;
            }
            e.target.focus();
            if (e.target.classList.contains("group")) {
                let target = e.target as myGroupSpan;
                appService.selectGroup(target.path)
                // this.props.groupSelected(target.path);//
            }
            else {
                appService.userSelected(e.target.innerText)
            }
        });



        items.forEach((item:any)=>{
            const li = document.createElement("li");
            let span = document.createElement("span");
            span.style.paddingLeft = "0";
            span.setAttribute("tabindex","0");
            if(item.type !== "group"){
                span.appendChild(document.createTextNode(item.name));
                let img = document.createElement("img");
                img.setAttribute("src","data:image/jpeg;base64,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");
                li.insertBefore(img, li.childNodes[0]);
            }

            li.appendChild(span);
            element.appendChild(li);
            if(item.type === "group"){
                // span.innerHTML = ('&#128193'+item.name);

                (span as myGroupSpan).path = (item as Group).showGroupPath();
                span.innerHTML = (item.name);
                span.classList.add("group");
                let img = document.createElement("img");
                img.setAttribute("src",group);
                span.insertBefore(img, span.childNodes[0]);
                if(item.children.length>0){
                    const hiddenUL = _createHiddenUl(item.children,1);
                    if(!!hiddenUL){
                        li.appendChild(hiddenUL);
                    }

                }
            }
        });
        // this.element.querySelector(":scope >li >span").focus()
    }

    function _createHiddenUl(items:any[],level:number){
        if(items.length>0){
            const ul = document.createElement("ul");
            ul.classList.add("hidden");
            items.forEach((item)=> {
                const li = document.createElement("li");
                const span = document.createElement("span");
                // span.innerHTML = (level+item.name)
                if(item.type !== "group"){
                    span.innerHTML = (item.name);
                    // span.innerHTML = (level+item.name);
                    let img = document.createElement("img");
                    img.setAttribute("src",require("../pic/"+(item as User).getProfileImg()));
                    span.insertBefore(img, span.childNodes[0]);
                }
                span.setAttribute("tabindex",level.toString());
                span.style.paddingLeft = (30*level).toString()+"px";
                li.appendChild(span);
                ul.appendChild(li);
                if (item.type === "group") {

                    let icon = document.createElement("i")
                    icon.classList.add("fas");
                    icon.classList.add("fa-address-book");
                    span.insertBefore(icon, span.childNodes[0]);

                    (span as myGroupSpan).path = (item as Group).showGroupPath();
                    span.innerHTML = (item.name);
                    // span.innerHTML = (level+'&#128193'+item.name);
                    span.classList.add("group");
                    let img = document.createElement("img");
                    img.setAttribute("src",group);
                    span.insertBefore(img, span.childNodes[0]);
                    const hiddenUL = _createHiddenUl(item.children,level+1);
                    if(!!hiddenUL){
                        li.appendChild(hiddenUL);
                    }
                }
            });
            return ul;
        }
        else {return ;}
    }

    function clear() {
        while(element.firstChild ){
            element.removeChild(element.firstChild );
        }
    }

    return {
        load,
        clear,
        element,
    };
}

export default TreeChat