(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[458],{8430:function(e,t,n){Promise.resolve().then(n.bind(n,1005))},1005:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return l}});var s=n(7437),r=n(2265),i=n(4568);let a={getReminders:async()=>await i.a.gw.reminders.get("/"),createReminder:async e=>await i.a.gw.reminders.post("/",e),cancelReminder:async e=>await i.a.gw.reminders.delete("/".concat(e))};var c=n(5698),o=n(5529);function l(){let[e,t]=(0,r.useState)([]),n=async()=>{let e=await a.getReminders();200===e.status&&t(e.data),console.log("response",e)};r.useEffect(()=>{n()},[]);let i=async n=>{n.jobId&&200===(await a.cancelReminder(n.jobId)).status&&t(e.filter(e=>e.jobId!=e.jobId))},l=e=>{let t=new Date(e).getTime()-new Date().getTime();return{total:t,days:Math.floor(t/864e5),hours:Math.floor(t/36e5%24),minutes:Math.floor(t/1e3/60%60),seconds:Math.floor(t/1e3%60)}};return(0,s.jsxs)("div",{className:"",children:[(0,s.jsxs)("div",{className:"grid grid-cols-8 pl-4 m-0.5 p-2",children:[(0,s.jsx)("div",{className:"col-span-2  text-sm",children:"Event ID"}),(0,s.jsx)("div",{className:"col-span-2 text-sm",children:"Event Title"}),(0,s.jsx)("div",{className:"col-span-1 text-sm",children:"Event Due Date"}),(0,s.jsx)("div",{className:"col-span-2 text-sm",children:"Reminder Time"})]}),e.map(e=>{let t=l(e.eventSchedule);t.total;let n=new Date(e.eventSchedule);return(0,s.jsxs)("div",{className:"grid grid-cols-8  bg-gray-500 w-full rounded-md p-2 pl-4 items-center m-0.5",children:[(0,s.jsx)("div",{className:"col-span-2 text-sm overflow-clip pr-12 overflow-ellipsis  text-white",children:e.eventId}),(0,s.jsx)("div",{className:"col-span-2 text-sm text-white",children:e.title}),(0,s.jsxs)("div",{className:"col-span-1 text-sm text-white",children:[n.toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}),(0,s.jsx)("br",{}),(0,s.jsx)("div",{className:"pl-5",children:n.toLocaleTimeString("en-US",{hour12:!1,hour:"numeric",minute:"numeric"})})]}),(0,s.jsxs)("div",{className:"col-span-2 text-sm text-white",children:["".concat(t.days,"d ").concat(t.hours,"h ").concat(t.minutes,"m"),(0,s.jsx)("br",{}),(0,s.jsx)("div",{className:"pl-5",children:new Date(e.reminderTime).toLocaleTimeString("en-US",{hour12:!1,hour:"numeric",minute:"numeric"})})]}),(0,s.jsx)(c.h,{SvgIcon:o.e,onClickCb:async()=>{i(e)}})]},e.jobId)})]})}},5698:function(e,t,n){"use strict";n.d(t,{h:function(){return r}});var s=n(7437);let r=e=>{let{onClickCb:t,SvgIcon:n}=e;return(0,s.jsxs)("button",{onClick:t,className:"font-bold py-2  rounded inline-flex items-center",children:[(0,s.jsx)(n,{}),(0,s.jsx)("span",{})]})}},5529:function(e,t,n){"use strict";n.d(t,{U:function(){return r},e:function(){return i}});var s=n(7437);let r=e=>{let{iconColor:t="text-blue-300",hoverColor:n="hover:text-teal-300"}=e;return(0,s.jsx)("svg",{className:"h-5 w-5 transform hover:scale-150 transition-transform duration-50 ".concat(t," ").concat(n," "),fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:(0,s.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"})})},i=e=>{let{iconColor:t="text-orange-300",hoverColor:n="text-red-300"}=e;return(0,s.jsxs)("svg",{className:"h-5 w-5 transform hover:scale-150 transition-transform duration-50 ".concat(t," ").concat(n," "),viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[" ",(0,s.jsx)("circle",{cx:"12",cy:"12",r:"10"})," ",(0,s.jsx)("line",{x1:"15",y1:"9",x2:"9",y2:"15"})," ",(0,s.jsx)("line",{x1:"9",y1:"9",x2:"15",y2:"15"})]})}},4568:function(e,t,n){"use strict";n.d(t,{a:function(){return s}});let s=new(n(5003))._Q}},function(e){e.O(0,[659,971,938,744],function(){return e(e.s=8430)}),_N_E=e.O()}]);