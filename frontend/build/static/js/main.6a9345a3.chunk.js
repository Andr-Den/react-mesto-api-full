(this["webpackJsonpmesto-react"]=this["webpackJsonpmesto-react"]||[]).push([[0],{11:function(e,t,s){},13:function(e,t,s){"use strict";s.r(t);var a=s(1),n=s.n(a),c=s(4),i=s.n(c),o=(s(11),s(2)),r=s.p+"static/media/logo.03b78ada.svg",p=s(0);var u=function(){return Object(p.jsx)("header",{className:"header",children:Object(p.jsx)("img",{src:r,alt:"\u043b\u043e\u0433\u043e\u0442\u0438\u043f",className:"header__logo"})})};var l=function(){return Object(p.jsx)("footer",{className:"footer",children:Object(p.jsx)("p",{className:"footer__copyright",children:"\xa92021 Mesto Russia"})})},d=s(5),h=s(6),j=new(function(){function e(t){var s=t.baseUrl,a=t.headers;Object(d.a)(this,e),this._baseUrl=s,this._headers=a}return Object(h.a)(e,[{key:"_checkResponse",value:function(e){return e.ok?e.json():Promise.reject("\u041e\u0448\u0438\u0431\u043a\u0430: ".concat(e.status))}},{key:"getInitialCards",value:function(){return fetch(this._baseUrl+"/cards",{headers:this._headers}).then(this._checkResponse)}},{key:"fetchUserInfo",value:function(){return fetch(this._baseUrl+"/users/me",{method:"GET",headers:this._headers}).then(this._checkResponse)}},{key:"editUserInfo",value:function(e,t){return fetch(this._baseUrl+"/users/me",{method:"PATCH",headers:this._headers,body:JSON.stringify({name:e,about:t})}).then(this._checkResponse)}},{key:"editAvatar",value:function(e){return fetch(this._baseUrl+"/users/me/avatar",{method:"PATCH",headers:this._headers,body:JSON.stringify({avatar:e})}).then(this._checkResponse)}},{key:"createCard",value:function(e,t){return fetch(this._baseUrl+"/cards",{method:"POST",headers:this._headers,body:JSON.stringify({name:e,link:t})}).then(this._checkResponse)}},{key:"deleteCard",value:function(e){return fetch(this._baseUrl+"/cards/"+e,{method:"DELETE",headers:this._headers}).then(this._checkResponse)}},{key:"likeCard",value:function(e){return fetch(this._baseUrl+"/cards/likes/"+e,{method:"PUT",headers:this._headers}).then(this._checkResponse)}},{key:"dislikeCard",value:function(e){return fetch(this._baseUrl+"/cards/likes/"+e,{method:"DELETE",headers:this._headers}).then(this._checkResponse)}}]),e}())({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-29",headers:{authorization:"a9ff0c53-5bfa-4560-ac1a-cab5954bddf5","Content-Type":"application/json"}}),b=s.p+"static/media/cap.7b8dd559.svg",m=s.p+"static/media/basket.596a2577.svg";var _=function(e){var t=e.card,s=e.onClick;return Object(p.jsxs)("li",{className:"card",children:[Object(p.jsxs)("div",{className:"card__button",children:[Object(p.jsx)("img",{src:b,alt:""}),Object(p.jsx)("img",{src:m,alt:""})]}),Object(p.jsx)("img",{src:t.link,alt:t.name,className:"card__image",onClick:function(){s(t)}}),Object(p.jsxs)("div",{className:"card__description",children:[Object(p.jsx)("h2",{className:"card__text",children:t.name}),Object(p.jsxs)("div",{children:[Object(p.jsx)("button",{className:"card__like",type:"button"}),Object(p.jsx)("p",{className:"card__like-amount",children:t.likes.length})]})]})]})};var f=function(e){var t=e.onEditAvatar,s=e.onEditProfile,a=e.onAddPlace,c=e.onCardClick,i=n.a.useState(),r=Object(o.a)(i,2),u=r[0],l=r[1],d=n.a.useState(),h=Object(o.a)(d,2),b=h[0],m=h[1],f=n.a.useState(),O=Object(o.a)(f,2),x=O[0],v=O[1],k=n.a.useState([]),N=Object(o.a)(k,2),C=N[0],g=N[1];return n.a.useEffect((function(){j.fetchUserInfo().then((function(e){l(e.name),m(e.about),v(e.avatar)})).catch((function(e){console.log(e)}))}),[]),n.a.useEffect((function(){j.getInitialCards().then((function(e){g(e)})).catch((function(e){console.log(e)}))}),[]),Object(p.jsxs)("main",{className:"content",children:[Object(p.jsxs)("section",{className:"profile",children:[Object(p.jsxs)("div",{className:"profile__space",children:[Object(p.jsx)("div",{className:"profile__avatar",style:{backgroundImage:"url(".concat(x,")")},children:Object(p.jsx)("button",{className:"profile__overlay",onClick:t})}),Object(p.jsxs)("div",{className:"profile__info",children:[Object(p.jsx)("h1",{className:"profile__title",children:u}),Object(p.jsx)("button",{className:"profile__edit-button",type:"button",onClick:s}),Object(p.jsx)("p",{className:"profile__subtitle",children:b})]})]}),Object(p.jsx)("button",{className:"profile__add-button",type:"button",onClick:a})]}),Object(p.jsx)("section",{className:"elements",children:Object(p.jsx)("ul",{className:"elements__list",children:C.map((function(e){return Object(p.jsx)(_,{card:e,onClick:c},e._id)}))})})]})};var O=function(e){var t=e.name,s=e.title,a=e.isOpened,n=e.onClose,c=e.onPopupClick,i=e.children;return Object(p.jsx)("div",{className:"popup popup_type_".concat(t," ").concat(a?"popup_opened":""),onClick:c,children:Object(p.jsxs)("div",{className:"popup__container",children:[Object(p.jsx)("button",{className:"popup__icon popup__icon_".concat(t),type:"button",onClick:n}),Object(p.jsx)("form",{className:"popup__form popup__form_".concat(t),name:"edit_".concat(t,"_form"),noValidate:!0,children:Object(p.jsxs)("fieldset",{className:"popup__set",children:[Object(p.jsx)("h2",{className:"popup__title",children:s}),i]})})]})})};var x=function(e){var t=e.card,s=e.onClose,a=e.onPopupClick;return t?Object(p.jsx)("div",{className:"popup popup_type_open-cards ".concat(t?"popup_opened":""),onClick:a,children:Object(p.jsxs)("div",{className:"popup__figure",children:[Object(p.jsx)("button",{className:"popup__icon popup__icon_open-cards",type:"button",onClick:s}),Object(p.jsx)("img",{src:t.link,alt:t.name,className:"popup__image"}),Object(p.jsx)("div",{className:"popup__figcaption",children:t.name})]})}):null};var v=function(){var e=n.a.useState(!1),t=Object(o.a)(e,2),s=t[0],a=t[1],c=n.a.useState(!1),i=Object(o.a)(c,2),r=i[0],d=i[1],h=n.a.useState(!1),j=Object(o.a)(h,2),b=j[0],m=j[1],_=n.a.useState(),v=Object(o.a)(_,2),k=v[0],N=v[1];function C(){a(!1),m(!1),d(!1),N()}function g(e){e.target.classList.contains("popup")&&C()}return n.a.useEffect((function(){if(s||b||r||k){function e(e){"Escape"===e.key&&C()}return document.addEventListener("keydown",e),function(){document.removeEventListener("keydown",e)}}}),[s,b,r,k]),Object(p.jsxs)("div",{className:"page",children:[Object(p.jsx)(u,{}),Object(p.jsx)(f,{onEditAvatar:function(){b||m(!0)},onEditProfile:function(){s||a(!0)},onAddPlace:function(){r||d(!0)},onCardClick:function(e){N(e)}}),Object(p.jsx)(l,{}),Object(p.jsxs)(O,{title:"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u043f\u0440\u043e\u0444\u0438\u043b\u044c",name:"profile",isOpened:s,onClose:C,onPopupClick:g,children:[Object(p.jsx)("input",{type:"text",placeholder:"\u0412\u0430\u0448\u0435 \u0438\u043c\u044f",id:"input-name",className:"popup__input",name:"input-name",minLength:"2",maxLength:"40",required:!0}),Object(p.jsx)("span",{className:"popup__input-error input-name-error"}),Object(p.jsx)("input",{type:"text",placeholder:"\u0420\u043e\u0434 \u0437\u0430\u043d\u044f\u0442\u0438\u0439",id:"input-job",className:"popup__input",name:"input-job",minLength:"2",maxLength:"200",required:!0}),Object(p.jsx)("span",{className:"popup__input-error input-job-error"}),Object(p.jsx)("input",{type:"submit",className:"popup__submit-button",value:"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c",name:"submit_button",disabled:""})]}),Object(p.jsxs)(O,{title:"\u041d\u043e\u0432\u043e\u0435 \u043c\u0435\u0441\u0442\u043e",name:"add-card",isOpened:r,onClose:C,onPopupClick:g,children:[Object(p.jsx)("input",{type:"text",placeholder:"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435",id:"input-card-name",className:"popup__input",name:"input_card_name",minLength:"2",maxLength:"30",required:!0}),Object(p.jsx)("span",{className:"popup__input-error input-card-name-error"}),Object(p.jsx)("input",{type:"url",placeholder:"\u0421\u0441\u044b\u043b\u043a\u0430 \u043d\u0430 \u043a\u0430\u0440\u0442\u0438\u043d\u043a\u0443",id:"input-link",className:"popup__input",name:"input_link",required:!0}),Object(p.jsx)("span",{className:"popup__input-error input-link-error"}),Object(p.jsx)("input",{type:"submit",className:"popup__submit-button",value:"\u0421\u043e\u0437\u0434\u0430\u0442\u044c",name:"create_button"})]}),Object(p.jsx)(O,{title:"\u0412\u044b \u0443\u0432\u0435\u0440\u0435\u043d\u044b?",name:"confirm",onClose:C,onPopupClick:g,children:Object(p.jsx)("input",{type:"submit",className:"popup__submit-button",value:"\u0414\u0430",name:"submit_button"})}),Object(p.jsxs)(O,{title:"\u041e\u0431\u043d\u043e\u0432\u0438\u0442\u044c \u0430\u0432\u0430\u0442\u0430\u0440",name:"update-avatar",isOpened:b,onClose:C,onPopupClick:g,children:[Object(p.jsx)("input",{type:"url",placeholder:"\u0421\u0441\u044b\u043b\u043a\u0430 \u043d\u0430 \u043a\u0430\u0440\u0442\u0438\u043d\u043a\u0443",id:"input-avatar",className:"popup__input",name:"input-avatar",required:!0}),Object(p.jsx)("span",{className:"popup__input-error input-avatar-error"}),Object(p.jsx)("input",{type:"submit",className:"popup__submit-button",value:"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c",name:"update_button"})]}),Object(p.jsx)(x,{card:k,onClose:C,onPopupClick:g})]})},k=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,14)).then((function(t){var s=t.getCLS,a=t.getFID,n=t.getFCP,c=t.getLCP,i=t.getTTFB;s(e),a(e),n(e),c(e),i(e)}))};i.a.render(Object(p.jsx)(n.a.StrictMode,{children:Object(p.jsx)(v,{})}),document.getElementById("root")),k()}},[[13,1,2]]]);
//# sourceMappingURL=main.6a9345a3.chunk.js.map