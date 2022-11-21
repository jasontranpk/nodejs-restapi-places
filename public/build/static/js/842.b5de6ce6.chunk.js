"use strict";(self.webpackChunkproject_reactjs_places=self.webpackChunkproject_reactjs_places||[]).push([[842],{1099:function(e,t,n){n.r(t);var r=n(8214),a=n(5861),i=n(885),l=n(4880),s=n(2791),u=n(2810),o=n(3999),c=n(7212),d=n(291),p=n(5094),f=n(9508),v=n(9895),h=n(5434),m=n(3108),x=(n(8055),n(184));t.default=function(){var e=(0,f.x)(),t=e.isLoading,n=e.error,y=e.sendRequest,g=e.clearError,j=(0,s.useContext)(m.V),Z=(0,l.k6)(),b=(0,p.Z)({title:{value:"",isValid:!1},description:{value:"",isValid:!1},address:{value:"",isValid:!1},image:{value:null,isValid:!1}}),V=(0,i.Z)(b,2),T=V[0],I=V[1],C=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(t){var n;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),console.log(T.inputs),(n=new FormData).append("title",T.inputs.title.value),n.append("description",T.inputs.description.value),n.append("address",T.inputs.address.value),n.append("image",T.inputs.image.value),e.prev=7,e.next=10,y("https://nodejs-sharing-places.herokuapp.com/api/places","POST",n,{Authorization:"Bearer "+j.token});case 10:Z.push("/"),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(7),console.log(e.t0);case 16:case"end":return e.stop()}}),e,null,[[7,13]])})));return function(t){return e.apply(this,arguments)}}();return(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(h.Z,{error:n,onClear:g}),(0,x.jsxs)("form",{className:"place-form",onSubmit:C,children:[(0,x.jsx)(u.Z,{id:"title",element:"input",type:"text",label:"Title*",onInput:I,validators:[(0,d.hg)()],errorText:"Please enter a valid title"}),(0,x.jsx)(c.Z,{id:"image",center:!0,onInput:I}),(0,x.jsx)(u.Z,{id:"address",element:"input",type:"text",label:"Address*",onInput:I,validators:[(0,d.hg)()],errorText:"Please enter a valid address"}),(0,x.jsx)(u.Z,{id:"description",element:"textarea",label:"Description*",onInput:I,validators:[(0,d.CP)(5)],errorText:"Please enter a valid description (at least 5 characters)"}),(0,x.jsx)(o.Z,{type:"submit",disabled:!T.isValid,children:"ADD PLACE"}),(0,x.jsx)("div",{className:"center",children:t&&(0,x.jsx)(v.Z,{asOverlay:!0})})]})]})}},7212:function(e,t,n){n.d(t,{Z:function(){return s}});var r=n(885),a=n(2791),i=n(3999),l=n(184),s=function(e){var t=(0,a.useState)(),n=(0,r.Z)(t,2),s=n[0],u=n[1],o=(0,a.useState)(),c=(0,r.Z)(o,2),d=c[0],p=c[1],f=(0,a.useState)(),v=(0,r.Z)(f,2),h=v[0],m=v[1],x=(0,a.useRef)();(0,a.useEffect)((function(){if(s){var e=new FileReader;e.onload=function(){p(e.result)},e.readAsDataURL(s)}}),[s]);return(0,l.jsxs)("div",{className:"form-control",children:[(0,l.jsx)("input",{ref:x,id:e.id,type:"file",style:{display:"none"},accept:".jpg,.png,.jpeg,.gif,.webp",onChange:function(t){var n,r=h;t.target.files&&1===t.target.files.length?(n=t.target.files[0],u(n),m(!0),r=!0):(m(!1),r=!1),console.log("".concat(e.id," - ").concat(n," - ").concat(r)),e.onInput(e.id,n,r)}}),(0,l.jsxs)("div",{className:"image-upload ".concat(e.center&&"center"),children:[(0,l.jsxs)("div",{className:"image-upload__preview",children:[d&&(0,l.jsx)("img",{src:d,alt:"Preview"}),!d&&(0,l.jsx)("p",{children:"Please pick an image"})]}),(0,l.jsx)(i.Z,{type:"button",onClick:function(){x.current.click()},children:"Pick Image"})]}),!h&&(0,l.jsx)("p",{children:e.errorText})]})}},2810:function(e,t,n){n.d(t,{Z:function(){return o}});var r=n(885),a=n(1413),i=n(2791),l=n(291),s=n(184),u=function(e,t){switch(t.type){case"CHANGE":return(0,a.Z)((0,a.Z)({},e),{},{value:t.val,isValid:(0,l.Gu)(t.val,t.validators)});case"TOUCH":return(0,a.Z)((0,a.Z)({},e),{},{isTouched:!0});default:return e}},o=function(e){var t=(0,i.useReducer)(u,{value:e.initialValue||"",isValid:e.initialIsValid||!1,isTouched:!1}),n=(0,r.Z)(t,2),a=n[0],l=n[1],o=e.id,c=e.onInput,d=a.value,p=a.isValid;(0,i.useEffect)((function(){c(o,d,p)}),[o,d,p,c]);var f=function(t){l({type:"CHANGE",val:t.target.value,validators:e.validators})},v=function(){l({type:"TOUCH"})},h="input"===e.element?(0,s.jsx)("input",{id:e.id,type:e.type,placeholder:e.placeholder,onChange:f,onBlur:v,value:a.value}):(0,s.jsx)("textarea",{id:e.id,rows:e.rows||3,onChange:f,value:a.value,onBlur:v});return(0,s.jsxs)("div",{className:"form-control ".concat(!a.isValid&&a.isTouched&&"form-control--invalid"),children:[(0,s.jsx)("label",{htmlFor:e.id,children:e.label}),h,!a.isValid&&a.isTouched&&(0,s.jsx)("p",{children:e.errorText})]})}},5094:function(e,t,n){var r=n(885),a=n(4942),i=n(1413),l=n(2791),s=function(e,t){switch(t.type){case"INPUT_CHANGE":var n=!0;for(var r in e.inputs)e.inputs[r]&&(n=r===t.inputId?n&&t.isValid:n&&e.inputs[r].isValid);return(0,i.Z)((0,i.Z)({},e),{},{inputs:(0,i.Z)((0,i.Z)({},e.inputs),{},(0,a.Z)({},t.inputId,{value:t.value,isValid:t.isValid})),isValid:n});case"SET_DATA":return{inputs:t.inputs,isValid:t.formIsValid};default:return e}};t.Z=function(e,t){var n=(0,l.useReducer)(s,{inputs:e,isValid:t}),a=(0,r.Z)(n,2),i=a[0],u=a[1];return[i,(0,l.useCallback)((function(e,t,n){u({type:"INPUT_CHANGE",value:t,inputId:e,isValid:n})}),[]),(0,l.useCallback)((function(e,t){u({type:"SET_DATA",inputs:e,formIsValid:t})}),[])]}},291:function(e,t,n){n.d(t,{Ox:function(){return c},CP:function(){return o},hg:function(){return u},Gu:function(){return d}});var r=n(8192);var a="REQUIRE",i="MINLENGTH",l="MAXLENGTH",s="EMAIL",u=function(){return{type:a}},o=function(e){return{type:i,val:e}},c=function(){return{type:s}},d=function(e,t){var n,u=!0,o=function(e,t){var n="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=(0,r.Z)(e))||t&&e&&"number"===typeof e.length){n&&(e=n);var a=0,i=function(){};return{s:i,n:function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var l,s=!0,u=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return s=e.done,e},e:function(e){u=!0,l=e},f:function(){try{s||null==n.return||n.return()}finally{if(u)throw l}}}}(t);try{for(o.s();!(n=o.n()).done;){var c=n.value;c.type===a&&(u=u&&e.trim().length>0),c.type===i&&(u=u&&e.trim().length>=c.val),c.type===l&&(u=u&&e.trim().length<=c.val),"MIN"===c.type&&(u=u&&+e>=c.val),"MAX"===c.type&&(u=u&&+e<=c.val),c.type===s&&(u=u&&/^\S+@\S+\.\S+$/.test(e))}}catch(d){o.e(d)}finally{o.f()}return u}},8055:function(){}}]);
//# sourceMappingURL=842.b5de6ce6.chunk.js.map