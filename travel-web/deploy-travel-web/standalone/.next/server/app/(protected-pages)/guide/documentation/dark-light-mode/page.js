(()=>{var e={};e.id=7453,e.ids=[7453],e.modules={1708:e=>{"use strict";e.exports=require("node:process")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},3423:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>a.a,__next_app__:()=>l,pages:()=>d,routeModule:()=>p,tree:()=>c});var s=r(65239),o=r(48088),n=r(88170),a=r.n(n),i=r(30893),u={};for(let e in i)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(u[e]=()=>i[e]);r.d(t,u);let c={children:["",{children:["(protected-pages)",{children:["guide",{children:["documentation",{children:["dark-light-mode",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,56467)),"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\(protected-pages)\\guide\\documentation\\dark-light-mode\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,36647)),"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\(protected-pages)\\guide\\documentation\\layout.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,6779)),"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\(protected-pages)\\layout.tsx"],loading:[()=>Promise.resolve().then(r.bind(r,81954)),"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\(protected-pages)\\loading.tsx"],forbidden:[()=>Promise.resolve().then(r.t.bind(r,89999,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(r.t.bind(r,65284,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,18886))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,10305)),"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.bind(r,54413)),"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\not-found.tsx"],forbidden:[()=>Promise.resolve().then(r.t.bind(r,89999,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(r.t.bind(r,65284,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,18886))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]}.children,d=["C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\(protected-pages)\\guide\\documentation\\dark-light-mode\\page.tsx"],l={require:r,loadChunk:()=>Promise.resolve()},p=new s.AppPageRouteModule({definition:{kind:o.RouteKind.APP_PAGE,page:"/(protected-pages)/guide/documentation/dark-light-mode/page",pathname:"/guide/documentation/dark-light-mode",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},11120:function(e,t,r){"use strict";var s=(this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}})(r(65840)),o=r(86908);function n(e,t){var r={};return e&&"string"==typeof e&&(0,s.default)(e,function(e,s){e&&s&&(r[(0,o.camelCase)(e,t)]=s)}),r}n.default=n,e.exports=n},12412:e=>{"use strict";e.exports=require("assert")},19121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},19888:(e,t,r)=>{Promise.resolve().then(r.bind(r,88797))},21820:e=>{"use strict";e.exports=require("os")},27910:e=>{"use strict";e.exports=require("stream")},28354:e=>{"use strict";e.exports=require("util")},29021:e=>{"use strict";e.exports=require("fs")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},33873:e=>{"use strict";e.exports=require("path")},43927:(e,t,r)=>{"use strict";r.d(t,{default:()=>s});let s=(0,r(12907).registerClientReference)(function(){throw Error("Attempted to call the default export of \"C:\\\\Users\\\\Computer\\\\Documents\\\\Data Ilah\\\\mykenary\\\\travel-web\\\\src\\\\components\\\\docs\\\\DemoCard\\\\CodeToggleTabs.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\components\\docs\\DemoCard\\CodeToggleTabs.tsx","default")},44517:e=>{var t=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,r=/\n/g,s=/^\s*/,o=/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,n=/^:\s*/,a=/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,i=/^[;\s]*/,u=/^\s+|\s+$/g;function c(e){return e?e.replace(u,""):""}e.exports=function(e,u){if("string"!=typeof e)throw TypeError("First argument must be a string");if(!e)return[];u=u||{};var d=1,l=1;function p(e){var t=e.match(r);t&&(d+=t.length);var s=e.lastIndexOf("\n");l=~s?e.length-s:l+e.length}function m(){var e={line:d,column:l};return function(t){return t.position=new h(e),x(s),t}}function h(e){this.start=e,this.end={line:d,column:l},this.source=u.source}h.prototype.content=e;var f=[];function v(t){var r=Error(u.source+":"+d+":"+l+": "+t);if(r.reason=t,r.filename=u.source,r.line=d,r.column=l,r.source=e,u.silent)f.push(r);else throw r}function x(t){var r=t.exec(e);if(r){var s=r[0];return p(s),e=e.slice(s.length),r}}function g(e){var t;for(e=e||[];t=y();)!1!==t&&e.push(t);return e}function y(){var t=m();if("/"==e.charAt(0)&&"*"==e.charAt(1)){for(var r=2;""!=e.charAt(r)&&("*"!=e.charAt(r)||"/"!=e.charAt(r+1));)++r;if(r+=2,""===e.charAt(r-1))return v("End of comment missing");var s=e.slice(2,r-2);return l+=2,p(s),e=e.slice(r),l+=2,t({type:"comment",comment:s})}}x(s);var k,C=[];for(g(C);k=function(){var e=m(),r=x(o);if(r){if(y(),!x(n))return v("property missing ':'");var s=x(a),u=e({type:"declaration",property:c(r[0].replace(t,"")),value:s?c(s[0].replace(t,"")):""});return x(i),u}}();)!1!==k&&(C.push(k),g(C));return C}},55511:e=>{"use strict";e.exports=require("crypto")},55591:e=>{"use strict";e.exports=require("https")},56467:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>a});var s=r(37413),o=r(67094),n=r(43927);let a=()=>(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("p",{children:["To initialize dark or light mode to the app, simply set"," ",(0,s.jsx)("code",{children:"mode"})," field as",(0,s.jsx)("code",{children:"'light'"})," or ",(0,s.jsx)("code",{children:"'dark'"})," ","in ",(0,s.jsx)("code",{children:"src/configs/theme.config.ts"}),". For example:"]}),(0,s.jsx)(o.A,{language:"ts",children:`export const themeConfig = {
    ...
    mode: 'dark'
}`}),(0,s.jsxs)("div",{className:"mt-10",id:"hook",children:[(0,s.jsx)("h5",{children:"Hook"}),(0,s.jsx)("p",{className:"mt-1",children:"You can access or update the mode in a component via our prepared hook."}),(0,s.jsx)(n.default,{languages:["tsx","jsx"],tsMarkdown:`\`\`\`tsx
'use client'

import useTheme from '@/utils/hooks/useTheme'
import Switcher from '@/components/ui/Switcher'

const ModeSwitcher = () => {

    const mode = useTheme((state) => state.mode)
    const setMode = useTheme((state) => state.setMode)

    const onSwitchChange = (checked: boolean) => {
        setMode(checked ? 'dark' : 'light')
    }
    
    return (
        <div>
            <Switcher
                defaultChecked={mode === 'dark'}
                onChange={onSwitchChange}
            />
        </div>
    )
}

export default ModeSwitcher`,jsMarkdown:`\`\`\`jsx
'use client'

import useTheme from '@/utils/hooks/useTheme'
import Switcher from '@/components/ui/Switcher'

const ModeSwitcher = () => {

    const mode = useTheme((state) => state.mode)
    const setMode = useTheme((state) => state.setMode)

    const onSwitchChange = (checked) => {
        setMode(checked ? 'dark' : 'light')
    }
    
    return (
        <div>
            <Switcher
                defaultChecked={mode === 'dark'}
                onChange={onSwitchChange}
            />
        </div>
    )
}

export default ModeSwitcher`})]})]})},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},65840:function(e,t,r){"use strict";var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var r=null;if(!e||"string"!=typeof e)return r;var s=(0,o.default)(e),n="function"==typeof t;return s.forEach(function(e){if("declaration"===e.type){var s=e.property,o=e.value;n?t(s,o,e):o&&((r=r||{})[s]=o)}}),r};var o=s(r(44517))},67094:(e,t,r)=>{"use strict";r.d(t,{A:()=>a});var s=r(37413),o=r(11013),n=r(43994);let a=e=>{let{children:t,...r}=e;return(0,s.jsx)(o.A,{style:n.A,...r,children:t})}},73136:e=>{"use strict";e.exports=require("node:url")},74075:e=>{"use strict";e.exports=require("zlib")},76760:e=>{"use strict";e.exports=require("node:path")},79551:e=>{"use strict";e.exports=require("url")},81630:e=>{"use strict";e.exports=require("http")},83997:e=>{"use strict";e.exports=require("tty")},85040:(e,t,r)=>{Promise.resolve().then(r.bind(r,43927))},86908:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.camelCase=void 0;var r=/^--[a-zA-Z0-9_-]+$/,s=/-([a-z])/g,o=/^[^-]+$/,n=/^-(webkit|moz|ms|o|khtml)-/,a=/^-(ms)-/,i=function(e,t){return t.toUpperCase()},u=function(e,t){return"".concat(t,"-")};t.camelCase=function(e,t){var c;return(void 0===t&&(t={}),!(c=e)||o.test(c)||r.test(c))?e:(e=e.toLowerCase(),(e=t.reactCompat?e.replace(a,u):e.replace(n,u)).replace(s,i))}},94735:e=>{"use strict";e.exports=require("events")}};var t=require("../../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[80,4813,3225,154,3383,474,6060,4075,4325,1335,8920,4127,6847,9718,5459,9314,5077,2707],()=>r(3423));module.exports=s})();