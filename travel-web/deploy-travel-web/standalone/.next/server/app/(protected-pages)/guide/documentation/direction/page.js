(()=>{var e={};e.id=1507,e.ids=[1507],e.modules={1708:e=>{"use strict";e.exports=require("node:process")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},11120:function(e,t,r){"use strict";var o=(this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}})(r(65840)),s=r(86908);function n(e,t){var r={};return e&&"string"==typeof e&&(0,o.default)(e,function(e,o){e&&o&&(r[(0,s.camelCase)(e,t)]=o)}),r}n.default=n,e.exports=n},12412:e=>{"use strict";e.exports=require("assert")},19121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},19888:(e,t,r)=>{Promise.resolve().then(r.bind(r,88797))},19933:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>i});var o=r(37413),s=r(67094),n=r(43927);let i=()=>(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)("p",{children:["To initialize the app direction, simply set"," ",(0,o.jsx)("code",{children:"direction"})," field as",(0,o.jsx)("code",{children:"'ltr'"})," or ",(0,o.jsx)("code",{children:"'rtl'"})," in"," ",(0,o.jsx)("code",{children:"src/configs/theme.config.ts"}),". For example:"]}),(0,o.jsx)(s.A,{language:"ts",children:`export const themeConfig = {
	...
	direction: 'rtl'
}`}),(0,o.jsxs)("div",{className:"mt-10",id:"hook",children:[(0,o.jsx)("h5",{children:"Hook"}),(0,o.jsx)("p",{className:"mt-1",children:"You can access or update the direction in a component via our prepared hook."}),(0,o.jsx)(n.default,{languages:["tsx","jsx"],tsMarkdown:`\`\`\`tsx
'use client'

import Button from '@/components/ui/Button'
import InputGroup from '@/components/ui/InputGroup'
import useTheme from '@/utils/hooks/useTheme'
import { THEME_ENUM } from '@/constants/theme.constant'
import type { Direction } from '@/@types/theme'

const dirList = [
    { value: THEME_ENUM.DIR_LTR, label: 'LTR' },
    { value: THEME_ENUM.DIR_RTL, label: 'RTL' },
]

const DirectionSwitcher = (props: {
    callBackClose?: () => void
}) => {

    const setDirection = useTheme((state) => state.setDirection)
    const direction = useTheme((state) => state.direction)

    const onDirChange = (val: Direction) => {
        setDirection(val)
    }

    return (
        <InputGroup size="sm">
            {dirList.map((dir) => (
                <Button
                    key={dir.value}
                    active={direction === dir.value}
                    onClick={() => onDirChange(dir.value)}
                >
                    {dir.label}
                </Button>
            ))}
        </InputGroup>
    )
}

export default DirectionSwitcher`,jsMarkdown:`\`\`\`jsx
'use client'

import Button from '@/components/ui/Button'
import InputGroup from '@/components/ui/InputGroup'
import useTheme from '@/utils/hooks/useTheme'
import { THEME_ENUM } from '@/constants/theme.constant'

const dirList = [
    { value: THEME_ENUM.DIR_LTR, label: 'LTR' },
    { value: THEME_ENUM.DIR_RTL, label: 'RTL' },
]

const DirectionSwitcher = (props) => {

    const setDirection = useTheme((state) => state.setDirection)
    const direction = useTheme((state) => state.direction)

    const onDirChange = (val) => {
        setDirection(val)
    }

    return (
        <InputGroup size="sm">
            {dirList.map((dir) => (
                <Button
                    key={dir.value}
                    active={direction === dir.value}
                    onClick={() => onDirChange(dir.value)}
                >
                    {dir.label}
                </Button>
            ))}
        </InputGroup>
    )
}

export default DirectionSwitcher`})]})]})},21820:e=>{"use strict";e.exports=require("os")},27910:e=>{"use strict";e.exports=require("stream")},28354:e=>{"use strict";e.exports=require("util")},29021:e=>{"use strict";e.exports=require("fs")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},32371:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>i.a,__next_app__:()=>p,pages:()=>l,routeModule:()=>d,tree:()=>c});var o=r(65239),s=r(48088),n=r(88170),i=r.n(n),a=r(30893),u={};for(let e in a)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(u[e]=()=>a[e]);r.d(t,u);let c={children:["",{children:["(protected-pages)",{children:["guide",{children:["documentation",{children:["direction",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,19933)),"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\(protected-pages)\\guide\\documentation\\direction\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,36647)),"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\(protected-pages)\\guide\\documentation\\layout.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,6779)),"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\(protected-pages)\\layout.tsx"],loading:[()=>Promise.resolve().then(r.bind(r,81954)),"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\(protected-pages)\\loading.tsx"],forbidden:[()=>Promise.resolve().then(r.t.bind(r,89999,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(r.t.bind(r,65284,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,18886))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,10305)),"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.bind(r,54413)),"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\not-found.tsx"],forbidden:[()=>Promise.resolve().then(r.t.bind(r,89999,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(r.t.bind(r,65284,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,18886))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]}.children,l=["C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\(protected-pages)\\guide\\documentation\\direction\\page.tsx"],p={require:r,loadChunk:()=>Promise.resolve()},d=new o.AppPageRouteModule({definition:{kind:s.RouteKind.APP_PAGE,page:"/(protected-pages)/guide/documentation/direction/page",pathname:"/guide/documentation/direction",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},33873:e=>{"use strict";e.exports=require("path")},43927:(e,t,r)=>{"use strict";r.d(t,{default:()=>o});let o=(0,r(12907).registerClientReference)(function(){throw Error("Attempted to call the default export of \"C:\\\\Users\\\\Computer\\\\Documents\\\\Data Ilah\\\\mykenary\\\\travel-web\\\\src\\\\components\\\\docs\\\\DemoCard\\\\CodeToggleTabs.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\components\\docs\\DemoCard\\CodeToggleTabs.tsx","default")},44517:e=>{var t=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,r=/\n/g,o=/^\s*/,s=/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,n=/^:\s*/,i=/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,a=/^[;\s]*/,u=/^\s+|\s+$/g;function c(e){return e?e.replace(u,""):""}e.exports=function(e,u){if("string"!=typeof e)throw TypeError("First argument must be a string");if(!e)return[];u=u||{};var l=1,p=1;function d(e){var t=e.match(r);t&&(l+=t.length);var o=e.lastIndexOf("\n");p=~o?e.length-o:p+e.length}function m(){var e={line:l,column:p};return function(t){return t.position=new h(e),x(o),t}}function h(e){this.start=e,this.end={line:l,column:p},this.source=u.source}h.prototype.content=e;var f=[];function v(t){var r=Error(u.source+":"+l+":"+p+": "+t);if(r.reason=t,r.filename=u.source,r.line=l,r.column=p,r.source=e,u.silent)f.push(r);else throw r}function x(t){var r=t.exec(e);if(r){var o=r[0];return d(o),e=e.slice(o.length),r}}function g(e){var t;for(e=e||[];t=y();)!1!==t&&e.push(t);return e}function y(){var t=m();if("/"==e.charAt(0)&&"*"==e.charAt(1)){for(var r=2;""!=e.charAt(r)&&("*"!=e.charAt(r)||"/"!=e.charAt(r+1));)++r;if(r+=2,""===e.charAt(r-1))return v("End of comment missing");var o=e.slice(2,r-2);return p+=2,d(o),e=e.slice(r),p+=2,t({type:"comment",comment:o})}}x(o);var b,C=[];for(g(C);b=function(){var e=m(),r=x(s);if(r){if(y(),!x(n))return v("property missing ':'");var o=x(i),u=e({type:"declaration",property:c(r[0].replace(t,"")),value:o?c(o[0].replace(t,"")):""});return x(a),u}}();)!1!==b&&(C.push(b),g(C));return C}},55511:e=>{"use strict";e.exports=require("crypto")},55591:e=>{"use strict";e.exports=require("https")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},65840:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var r=null;if(!e||"string"!=typeof e)return r;var o=(0,s.default)(e),n="function"==typeof t;return o.forEach(function(e){if("declaration"===e.type){var o=e.property,s=e.value;n?t(o,s,e):s&&((r=r||{})[o]=s)}}),r};var s=o(r(44517))},67094:(e,t,r)=>{"use strict";r.d(t,{A:()=>i});var o=r(37413),s=r(11013),n=r(43994);let i=e=>{let{children:t,...r}=e;return(0,o.jsx)(s.A,{style:n.A,...r,children:t})}},73136:e=>{"use strict";e.exports=require("node:url")},74075:e=>{"use strict";e.exports=require("zlib")},76760:e=>{"use strict";e.exports=require("node:path")},79551:e=>{"use strict";e.exports=require("url")},81630:e=>{"use strict";e.exports=require("http")},83997:e=>{"use strict";e.exports=require("tty")},85040:(e,t,r)=>{Promise.resolve().then(r.bind(r,43927))},86908:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.camelCase=void 0;var r=/^--[a-zA-Z0-9_-]+$/,o=/-([a-z])/g,s=/^[^-]+$/,n=/^-(webkit|moz|ms|o|khtml)-/,i=/^-(ms)-/,a=function(e,t){return t.toUpperCase()},u=function(e,t){return"".concat(t,"-")};t.camelCase=function(e,t){var c;return(void 0===t&&(t={}),!(c=e)||s.test(c)||r.test(c))?e:(e=e.toLowerCase(),(e=t.reactCompat?e.replace(i,u):e.replace(n,u)).replace(o,a))}},94735:e=>{"use strict";e.exports=require("events")}};var t=require("../../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[80,4813,3225,154,3383,474,6060,4075,4325,1335,8920,4127,6847,9718,5459,9314,5077,2707],()=>r(32371));module.exports=o})();