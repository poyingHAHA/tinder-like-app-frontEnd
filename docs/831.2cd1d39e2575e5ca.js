"use strict";(self.webpackChunktinder_like_app=self.webpackChunktinder_like_app||[]).push([[831],{2831:(P,l,r)=>{r.r(l),r.d(l,{TinderPageModule:()=>T});var c=r(9808),f=r(3125),d=r(4354),t=(r(5386),r(7587)),p=r(7579);let h=(()=>{class e{constructor(){this.swipeSubject=new p.x,this.clickSubject=new p.x}setSwipeEvent(i){this.swipeSubject.next(i)}setClickEvent(i){this.clickSubject.next(i)}getSwipeObs(){return this.swipeSubject.asObservable()}getClickObs(){return this.clickSubject.asObservable()}}return e.\u0275fac=function(i){return new(i||e)},e.\u0275prov=t.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var n=r(1777);const g=[(0,n.oB)({transform:"translate3d(0, 0, 0)"}),(0,n.oB)({visibility:"hidden",transform:"translate3d(100%, 0, 0)"})],m=[(0,n.oB)({transform:" rotateZ(2deg)",offset:.2}),(0,n.oB)({transform:" rotateZ(4deg)",offset:.4}),(0,n.oB)({transform:" rotateZ(7deg)",offset:.6}),(0,n.oB)({transform:" rotateZ(10deg)",offset:.8}),(0,n.oB)({transform:" rotateZ(15deg)",offset:1})],u=[(0,n.oB)({transform:" rotateZ(20deg)",opacity:.2,offset:.2}),(0,n.oB)({transform:" rotateZ(25deg)",opacity:.1,offset:.4}),(0,n.oB)({transform:" rotateZ(30deg)",opacity:0,offset:1})],k=function(e,o,i){return{"swipe-out-right":e,"swipe-out-left":o,reset:i}};function y(e,o){if(1&e){const i=t.EpF();t.TgZ(0,"div",1),t.NdJ("@cardAnimator.done",function(){return t.CHM(i),t.oxw().resetAnimationState()})("pan",function(a){return t.CHM(i),t.oxw().handleDrag(a)}),t.qZA()}if(2&e){const i=t.oxw();t.Udp("left",i.x,"px")("top",i.y,"px")("transform","rotateZ("+i.rotateDeg+"deg)")("opacity",i.opacityPercent),t.Q6J("ngClass",t.kEZ(10,k,i.isOutRight,i.isOutLeft,i.isReset))("@cardAnimator",i.animationState)}}let x=(()=>{class e{constructor(i){this.tinderLayoutService=i,this.swipeEvent=new t.vpe,this.isDragging=!1,this.isOutRight=!1,this.isOutLeft=!1,this.isDelete=!1,this.isReset=!1,this.rotateDeg=0,this.opacityPercent=1}ngOnInit(){this.x=0,this.y=80,this.lastX=this.x,this.lastY=this.y,this.clickSubs$=this.tinderLayoutService.getClickObs().subscribe(i=>{i.cardInfo==this.cardInfo.name&&("like"==i.type?this.isOutLeft=!0:"dislike"==i.type&&(this.isOutRight=!0))})}startAnimation(i){console.log(i),this.animationState||(this.animationState=i)}resetAnimationState(){this.animationState=""}handleDrag(i){this.isDragging||(this.lastX=this.x,this.lastY=this.y,this.isDragging=!0),this.x=this.lastX+i.deltaX,this.y=this.lastY+i.deltaY,this.resetRotateAndOpacity(),i.isFinal&&(this.isDragging=!1,this.x>0&&this.x>=150||this.x<0&&this.x<=-160?(this.x>0?(this.isOutRight=!0,this.tinderLayoutService.setSwipeEvent({type:"dislike",cardInfo:this.cardInfo.name})):(this.isOutLeft=!0,this.tinderLayoutService.setSwipeEvent({type:"like",cardInfo:this.cardInfo.name})),this.sleep(800).then(()=>this.isDelete=!0)):(this.isReset=!0,this.sleep(400).then(()=>{this.isReset=!1,this.x=0,this.y=80,this.resetRotateAndOpacity()})))}resetRotateAndOpacity(){this.rotateDeg=Math.floor(2/27*this.x*100)/100,this.opacityPercent=Math.floor(100*(1-Math.abs(.05*this.rotateDeg)))/100}sleep(i){return new Promise(s=>{setTimeout(s,i)})}ngOnDestroy(){}}return e.\u0275fac=function(i){return new(i||e)(t.Y36(h))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-tinder-card"]],inputs:{cardInfo:"cardInfo"},outputs:{swipeEvent:"swiped"},decls:1,vars:1,consts:[["class","mycard",3,"left","top","transform","opacity","ngClass","pan",4,"ngIf"],[1,"mycard",3,"ngClass","pan"]],template:function(i,s){1&i&&t.YNc(0,y,1,14,"div",0),2&i&&t.Q6J("ngIf",!s.isDelete)},directives:[c.O5,c.mk],styles:[".mycard[_ngcontent-%COMP%]{background-color:#fff;width:100%;height:63vmax;border-radius:20px;position:absolute;background-image:url(purse.52911ac834b86cb0.png);background-repeat:no-repeat;background-size:cover;background-position:center;box-shadow:2px 2px 5px 2px #4b8ebc}.swipe-out-right[_ngcontent-%COMP%]{transition:all 1s;left:500px!important;transform:rotate(30deg)!important;opacity:0!important}.swipe-out-left[_ngcontent-%COMP%]{transition:all 1s;left:-500px!important;transform:rotate(-30deg)!important;opacity:0!important}.reset[_ngcontent-%COMP%]{transition:all .5s;left:0!important;top:80px!important;opacity:1!important;transform:rotate(0)!important}"],data:{animation:[(0,n.X$)("cardAnimator",[(0,n.eR)("* => slideOutLeft",(0,n.jt)(1e3,(0,n.F4)(g))),(0,n.eR)("* => rotateZoomOutLeft",(0,n.jt)(1e3,(0,n.F4)(m))),(0,n.eR)("* => rotateZoomOutRight",(0,n.jt)(1e3,(0,n.F4)(u)))])]}}),e})();function v(e,o){if(1&e&&(t.TgZ(0,"div",18),t._uU(1),t.qZA()),2&e){const i=o.$implicit;t.xp6(1),t.hij(" ",i.name," ")}}function _(e,o){if(1&e){const i=t.EpF();t.TgZ(0,"div",11),t.TgZ(1,"div",12),t.TgZ(2,"div",13),t.TgZ(3,"div",14),t.NdJ("click",function(){return t.CHM(i),t.oxw().changeHistoryMode("like")}),t._UZ(4,"i",8),t.qZA(),t.TgZ(5,"div",15),t.NdJ("click",function(){return t.CHM(i),t.oxw().changeHistoryMode("dislike")}),t._UZ(6,"i",10),t.qZA(),t.qZA(),t.TgZ(7,"div",16),t.YNc(8,v,2,1,"div",17),t.qZA(),t.qZA(),t.qZA()}if(2&e){const i=t.oxw();t.xp6(3),t.Q6J("ngClass",i.likeHis?"like-active":""),t.xp6(2),t.Q6J("ngClass",i.dislikeHis?"dislike-active":""),t.xp6(3),t.Q6J("ngForOf",i.hisList)}}function b(e,o){if(1&e&&(t.TgZ(0,"div"),t._UZ(1,"app-tinder-card",19),t.qZA()),2&e){const i=o.$implicit;t.xp6(1),t.s9C("id","card"+i.name),t.Q6J("cardInfo",i)}}const C=[{path:"",component:(()=>{class e{constructor(i){this.tinderLayoutService=i,this.test=[{name:"1"},{name:"2"},{name:"3"},{name:"4"},{name:"5"}],this.likes=[],this.dislikes=[],this.top=this.test.length-1,this.hisList=[],this.likeHis=!0,this.dislikeHis=!1,this.isHistoryOpen=!1}ngOnInit(){this.swipeSubs$=this.tinderLayoutService.getSwipeObs().subscribe(i=>{let s=this.test[this.top];s&&"like"==i.type?(this.likes.push(s),this.top=this.top<1?0:this.top-1):s&&"dislike"==i.type&&(this.dislikes.push(s),this.top=this.top<1?0:this.top-1)})}clickLike(){this.likes.push(this.test[this.top]),this.tinderLayoutService.setClickEvent({type:"like",cardInfo:this.test[this.top].name}),this.top=this.top<1?0:this.top-1}clickDislike(){this.dislikes.push(this.test[this.top]),this.tinderLayoutService.setClickEvent({type:"dislike",cardInfo:this.test[this.top].name}),this.top=this.top<1?0:this.top-1}showHistory(){this.isHistoryOpen=!this.isHistoryOpen,this.hisList=this.likes}changeHistoryMode(i){switch(i){case"like":this.likeHis=!0,this.dislikeHis=!1,this.hisList=this.likes;break;case"dislike":this.dislikeHis=!0,this.likeHis=!1,this.hisList=this.dislikes}}ngOnDestroy(){var i;null===(i=this.swipeSubs$)||void 0===i||i.unsubscribe()}}return e.\u0275fac=function(i){return new(i||e)(t.Y36(h))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-tinder-page"]],decls:11,vars:2,consts:[[1,"my-container","container-fluid"],[1,"content"],[1,"history-btn",3,"click"],[1,"fa-solid","fa-clock-rotate-left"],["class","history",4,"ngIf"],[4,"ngFor","ngForOf"],[1,"option-group"],[1,"option","like",3,"click"],[1,"fa-solid","fa-heart"],[1,"option","dislike",3,"click"],[1,"fa-solid","fa-xmark"],[1,"history"],[1,"his-block"],[1,"his-header"],[1,"his-option","his-like",3,"ngClass","click"],[1,"his-option","his-dislike",3,"ngClass","click"],[1,"his-content"],["class","his-item",4,"ngFor","ngForOf"],[1,"his-item"],[3,"id","cardInfo"]],template:function(i,s){1&i&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t.TgZ(2,"div",2),t.NdJ("click",function(){return s.showHistory()}),t._UZ(3,"i",3),t.qZA(),t.YNc(4,_,9,3,"div",4),t.YNc(5,b,2,2,"div",5),t.TgZ(6,"div",6),t.TgZ(7,"div",7),t.NdJ("click",function(){return s.clickLike()}),t._UZ(8,"i",8),t.qZA(),t.TgZ(9,"div",9),t.NdJ("click",function(){return s.clickDislike()}),t._UZ(10,"i",10),t.qZA(),t.qZA(),t.qZA(),t.qZA()),2&i&&(t.xp6(4),t.Q6J("ngIf",s.isHistoryOpen),t.xp6(1),t.Q6J("ngForOf",s.test))},directives:[c.O5,c.mk,c.sg,x],styles:[".my-container[_ngcontent-%COMP%]{height:100%;overflow:hidden}.header[_ngcontent-%COMP%]{display:flex;align-items:center;height:10%;justify-content:flex-end}.logo[_ngcontent-%COMP%]{float:left;color:#fff;font-size:2em;margin-right:auto}.content[_ngcontent-%COMP%]{position:absolute;top:0;left:50%;transform:translate(-50%);bottom:8vh;width:90%}.coin[_ngcontent-%COMP%]{background-image:url(coin.ff741a4d9db1e85c.png);background-repeat:no-repeat;background-size:contain;width:1.8em;height:1.8em;margin:0 10px}.option-group[_ngcontent-%COMP%]{position:absolute;display:flex;align-items:center;left:50%;bottom:20px;transform:translate(-50%)}.option[_ngcontent-%COMP%]{font-size:3rem;border-radius:50%;width:10vmax;height:10vmax;padding:10px;background-color:#96d6ff;border:4px solid #24a3fa;display:flex;align-items:center;justify-content:center;margin:0 5vmax}.like[_ngcontent-%COMP%]{color:#e5bb27;font-size:2.5rem}.dislike[_ngcontent-%COMP%]{color:#33b9cf}.swipe-out-right[_ngcontent-%COMP%]{transition:all 1s;left:500px!important;transform:rotate(30deg)!important;opacity:0!important}.swipe-out-left[_ngcontent-%COMP%]{transition:all 1s;left:-500px!important;transform:rotate(-30deg)!important;opacity:0!important}.history-btn[_ngcontent-%COMP%]{color:#fff;font-size:2rem;position:absolute;right:0;top:10px;z-index:6}.history[_ngcontent-%COMP%]{position:absolute;background-color:#63bbf6;top:15px;right:-10px;bottom:-5px;left:-10px;display:flex;align-items:center;justify-content:center;z-index:5}.his-block[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;background-color:#fff;width:95%;height:85%;border-radius:50px}.his-header[_ngcontent-%COMP%]{display:flex;height:13%;width:100%;font-size:2rem;border-bottom:1px solid #f2f2f2}.his-option[_ngcontent-%COMP%]{flex:1;display:flex;align-items:flex-end;justify-content:center;padding-bottom:10px}.his-like[_ngcontent-%COMP%]{color:#e5bb27}.like-active[_ngcontent-%COMP%]{border-bottom:1px solid #e5bb27}.his-dislike[_ngcontent-%COMP%]{color:#33b9cf}.dislike-active[_ngcontent-%COMP%]{border-bottom:2px solid #33b9cf}.his-content[_ngcontent-%COMP%]{flex:1;width:100%}"]}),e})()}];let O=(()=>{class e{}return e.\u0275fac=function(i){return new(i||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[[d.Bz.forChild(C)],d.Bz]}),e})(),T=(()=>{class e{}return e.\u0275fac=function(i){return new(i||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[[c.ez,O,f.PV]]}),e})()}}]);