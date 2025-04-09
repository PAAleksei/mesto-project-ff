(()=>{"use strict";var e=document.querySelector("#card-template").content;function t(e,t){e.classList.add(t)}function n(e,t,n){e.addEventListener(t,n)}function r(e,t,n){e.removeEventListener(t,n)}function o(e){"Escape"===e.key&&u(document.querySelector(".popup_is-opened"))}function c(e){e.target.classList.contains(".popup__content")||u(e.target)}function i(e){t(e,"popup_is-opened"),n(document,"keydown",o),n(e,"click",c)}function u(e){e.classList.remove("popup_is-opened"),r(document,"keydown",o),r(e,"click",c)}function a(e){return/[^a-zа-яА-Я\sЁё\-]/gi.test(e.value)}function l(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.inputErrorText)}function p(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.textContent="",r.classList.remove(n.inputErrorText)}function s(e,t,n,r){!function(e,t,n){return t.some((function(t){return t.validity.valid?t!=e.querySelector(n.inputLink)&a(t)?a(t):void 0:!t.validity.valid}))}(e,t,r)?(n.disabled=!1,n.classList.remove(r.inactiveButtonClass)):(n.disabled=!0,n.classList.add(r.inactiveButtonClass))}function d(e,t){var n=Array.from(e.querySelectorAll(t.popUpInput)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(o){p(e,o,t),s(e,n,r,t)}))}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function _(e,t){return fetch("".concat(t.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:t.headers})}function y(e,t,n){return fetch("".concat(n.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:n.headers}).then((function(e){return v(e)})).then((function(e){t.textContent=e.likes.length})).catch((function(e){console.log(e)}))}function m(e,t,n){return fetch("".concat(n.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:n.headers}).then((function(e){return v(e)})).then((function(e){t.textContent=e.likes.length})).catch((function(e){console.log(e)}))}function v(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}var h=document.querySelector(".places__list"),b=document.querySelector(".profile__edit-button"),S=document.querySelector(".profile__add-button"),E=document.querySelectorAll(".popup"),q=document.querySelector(".popup_type_new-card"),k=document.querySelector(".popup_type_edit"),C=document.querySelector(".popup_type_image"),g=document.querySelector(".popup_type_edit-avatar"),L=k.querySelector(".popup__close"),T=g.querySelector(".popup__close"),x=q.querySelector(".popup__close"),U=C.querySelector(".popup__close"),A=C.querySelector(".popup__image"),I=C.querySelector(".popup__caption"),P=g.querySelector(".popup__form"),w=P.querySelector(".popup__input_type_url"),D=document.querySelector(".profile__image-edit-button"),N=q.querySelector(".popup__form"),j=N.querySelector(".popup__input_type_card-name"),O=N.querySelector(".popup__input_type_url"),B=k.querySelector(".popup__form"),J=B.querySelector(".popup__input_type_name"),M=B.querySelector(".popup__input_type_description"),z=document.querySelector(".profile__image"),F=document.querySelector(".profile__title"),G=document.querySelector(".profile__description"),H={popUpForms:document.querySelectorAll(".popup__form"),popUpInput:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button-inactive",inputErrorClass:"popup__input-error_active",inputErrorText:"popup__input-error-text_active",inputLink:".popup__input_type_url"},$={baseUrl:"https://nomoreparties.co/v1/wff-cohort-35",headers:{"Content-Type":"application/json",authorization:"ffa59dc2-b1fc-45dc-afaf-4be126fab1b8"},myId:"19ea88e928ed161791d3bc9f",cardsContainer:h,profileImage:z,profileTitle:F,profileDescription:G,formElementTypeEdit:B,formElementTypeNewCard:N,formElementTypeEditAvatar:P,popupTypeNewCard:q,popupTypeEdit:k,popupTypeEditAvatar:g,createCard:function(t,n,r,o,c){var i=e.querySelector(".card").cloneNode(!0),u=i.querySelector(".card__title"),a=i.querySelector(".card__image"),l=i.querySelector(".card__delete-button"),p=i.querySelector(".card__like-button");return u.textContent=t.name,a.src=t.link,a.alt="На картинке ".concat(t.name),t.likes.forEach((function(e){e._id==c.myId&&p.classList.add("card__like-button_is-active")})),l.addEventListener("click",(function(){return n(i)})),p.addEventListener("click",(function(){return r(p)})),a.addEventListener("click",(function(){return o(a,u)})),i},deleteCard:function(e){e.remove()},likeCard:function(e){e.classList.toggle("card__like-button_is-active")},openPopUpImage:function(e,t){A.src=e.src,A.alt="На картинке ".concat(t.textContent),I.textContent=t.textContent,i(C)},closePopUp:u};!function(e){Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{method:"GET",headers:e.headers}),fetch("".concat(e.baseUrl,"/cards"),{method:"GET",headers:e.headers})]).then((function(t){var n,r,o=(r=2,function(e){if(Array.isArray(e))return e}(n=t)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,i,u=[],a=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;a=!1}else for(;!(a=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);a=!0);}catch(e){l=!0,o=e}finally{try{if(!a&&null!=n.return&&(i=n.return(),Object(i)!==i))return}finally{if(l)throw o}}return u}}(n,r)||function(e,t){if(e){if("string"==typeof e)return f(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=o[0],i=o[1];v(c).then((function(t){e.profileImage.setAttribute("Style","background-image: url(".concat(t.avatar,")")),e.profileTitle.textContent=t.name,e.profileDescription.textContent=t.about})),v(i).then((function(t){t.forEach((function(t){var n=e.createCard(t,e.deleteCard,e.likeCard,e.openPopUpImage,e),r=n.querySelector(".card__like-button"),o=r.querySelector(".card__like-button-numbers-of-likes"),c=n.querySelector(".card__delete-button");o.textContent=t.likes.length,t.owner._id!==e.myId&&c.setAttribute("style","display: none"),c.addEventListener("click",(function(){return _(t._id,e)})),r.addEventListener("click",(function(){r.classList.contains("card__like-button_is-active")?y(t._id,o,e):m(t._id,o,e)})),e.cardsContainer.append(n)}))}))})).catch((function(e){return console.log("Ошибка.....: ".concat(e))}))}($),E.forEach((function(e){t(e,"popup_is-animated")})),b.addEventListener("click",(function(){i(k),J.value=F.textContent,M.value=G.textContent,d(B,H)})),D.addEventListener("click",(function(){i(g),d(P,H)})),T.addEventListener("click",(function(){u(g)})),S.addEventListener("click",(function(){i(q),d(N,H)})),L.addEventListener("click",(function(){u(k)})),x.addEventListener("click",(function(){u(q),d(N,H)})),U.addEventListener("click",(function(){return u(C)})),n(B,"submit",(function(e){e.preventDefault(),function(e,t,n){var r=n.formElementTypeEdit.querySelector(".popup__button");r.textContent="Сохранение...",fetch("".concat(n.baseUrl,"/users/me"),{method:"PATCH",headers:n.headers,body:JSON.stringify({name:e,about:t})}).then((function(e){return v(e)})).then((function(e){n.profileTitle.textContent=e.name,n.profileDescription.textContent=e.about,n.closePopUp(n.popupTypeEdit)})).catch((function(e){return console.log("Ошибка.....: ".concat(e))})).finally((function(){return r.textContent="Сохранить"}))}(J.value,M.value,$)})),n(N,"submit",(function(e){e.preventDefault(),function(e,t){var n=t.formElementTypeNewCard.querySelector(".popup__button");n.textContent="Сохранение...",fetch("".concat(t.baseUrl,"/cards"),{method:"POST",headers:t.headers,body:JSON.stringify({name:e.name,link:e.link})}).then((function(e){return v(e)})).then((function(e){var n=t.createCard(e,t.deleteCard,t.likeCard,t.openPopUpImage,t),r=n.querySelector(".card__like-button"),o=r.querySelector(".card__like-button-numbers-of-likes"),c=n.querySelector(".card__delete-button");o.textContent=e.likes.length,c.addEventListener("click",(function(){return _(e._id,t)})),r.addEventListener("click",(function(){r.classList.contains("card__like-button_is-active")?y(e._id,o,t):m(e._id,o,t)})),t.cardsContainer.prepend(n),t.closePopUp(t.popupTypeNewCard)})).catch((function(e){return console.log("Ошибка.....: ".concat(e))})).finally((function(){return n.textContent="Сохранить"}))}({name:j.value,link:O.value},$),N.reset()})),n(P,"submit",(function(e){e.preventDefault(),function(e,t){var n=t.formElementTypeEditAvatar.querySelector(".popup__button");n.textContent="Сохранение...",fetch("".concat(t.baseUrl,"/users/me/avatar"),{method:"PATCH",body:JSON.stringify({avatar:e}),headers:t.headers}).then((function(e){return v(e)})).then((function(){t.profileImage.setAttribute("Style","background-image: url(".concat(e,")")),t.closePopUp(t.popupTypeEditAvatar)})).catch((function(e){return console.log("Ошибка.....: ".concat(e))})).finally((function(){return n.textContent="Сохранить"}))}(w.value,$),P.reset()})),function(e){Array.from(e.popUpForms).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.popUpInput)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.valid?t!=e.querySelector(n.inputLink)&a(t)?l(e,t,t.dataset.errorMessage,n):p(e,t,n):l(e,t,t.validationMessage,n)}(e,o,t),s(e,n,r,t)}))}))}(t,e)}))}(H)})();