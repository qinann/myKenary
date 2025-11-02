(()=>{var e={};e.id=1093,e.ids=[1093],e.modules={1708:e=>{"use strict";e.exports=require("node:process")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},4536:(e,t,r)=>{let{createProxy:n}=r(39844);e.exports=n("C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\node_modules\\next\\dist\\client\\app-dir\\link.js")},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},11120:function(e,t,r){"use strict";var n=(this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}})(r(65840)),s=r(86908);function o(e,t){var r={};return e&&"string"==typeof e&&(0,n.default)(e,function(e,n){e&&n&&(r[(0,s.camelCase)(e,t)]=n)}),r}o.default=o,e.exports=o},12412:e=>{"use strict";e.exports=require("assert")},19121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},21820:e=>{"use strict";e.exports=require("os")},24431:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>u});var n=r(37413),s=r(67094),o=r(43927),a=r(4536),i=r.n(a);let u=()=>(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)("p",{children:["As mentioned in the"," ",(0,n.jsx)(i(),{href:"/docs/documentation/installation",children:"Installation"})," ","section, we've provided a starter version with the essential core components and basic functionality setup. We highly recommend that developers use this version as the foundation for building their apps."]}),(0,n.jsxs)("p",{children:["When you open the starter pack in your local environment, you'll be directed to the login page. You can sign in using the credentials ",(0,n.jsx)("i",{children:"user: admin | password: 123Qwe"}),"."]}),(0,n.jsxs)("div",{className:"mt-10",id:"defaultConfig",children:[(0,n.jsx)("h5",{children:"Default Configurations"}),(0,n.jsx)("p",{children:"Below are some of the default configurations for the starter version. You can modify these settings to suit your needs."}),(0,n.jsxs)("p",{className:"mb-2",children:[(0,n.jsx)("strong",{children:"AppConfig"})," -"," ",(0,n.jsx)(i(),{href:"/guide/documentation/app",children:"Documentation"})]}),(0,n.jsx)(o.default,{languages:["jsx","jsx"],tsMarkdown:`\`\`\`tsx
const appConfig: AppConfig = {
    apiPrefix: '/api',
    authenticatedEntryPath: '/home',
    unAuthenticatedEntryPath: '/sign-in',
    locale: 'en',
    activeNavTranslation: false
}`,jsMarkdown:`\`\`\`jsx
const appConfig = {
    apiPrefix: '/api',
    authenticatedEntryPath: '/home',
    unAuthenticatedEntryPath: '/sign-in',
    locale: 'en',
    activeNavTranslation: false
}`}),(0,n.jsxs)("p",{className:"mb-2",children:[(0,n.jsx)("strong",{children:"ThemeConfig"})," -"," ",(0,n.jsx)(i(),{href:"/guide/documentation/overall-theme-config",children:"Documentation"})]}),(0,n.jsx)(o.default,{languages:["jsx","jsx"],tsMarkdown:`\`\`\`tsx
export const themeConfig: ThemeConfig = {
    schema: 'default',
    direction: THEME_ENUM.DIR_LTR,
    mode: THEME_ENUM.MODE_LIGHT,
    panelExpand: false,
    controlSize: 'md',
    layout: {
        type: THEME_ENUM.LAYOUT_COLLAPSIBLE_SIDE,
        sideNavCollapse: false,
    },
}`,jsMarkdown:`\`\`\`jsx
export const themeConfig = {
    schema: 'default',
    direction: THEME_ENUM.DIR_LTR,
    mode: THEME_ENUM.MODE_LIGHT,
    panelExpand: false,
    controlSize: 'md',
    layout: {
        type: THEME_ENUM.LAYOUT_COLLAPSIBLE_SIDE,
        sideNavCollapse: false,
    },
}`}),(0,n.jsxs)("p",{className:"mb-2",children:[(0,n.jsx)("strong",{children:"RoutesConfig"})," -"," ",(0,n.jsx)(i(),{href:"/guide/documentation/routing",children:"Documentation"})]}),(0,n.jsx)(s.A,{language:"js",children:`const publicRoutes = [
    '/home': {
        key: 'home',
        authority: [],
    }
]

export const protectedRoutes = {
    '/articles': {
        key: 'articles',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
    },
    '/articles/[slug]': {
        key: 'articles.articleDetails',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
        dynamicRoute: true
    },
}
`}),(0,n.jsxs)("p",{className:"mb-2",children:[(0,n.jsx)("strong",{children:"NavConfig"})," -"," ",(0,n.jsx)(i(),{href:"/guide/documentation/routing",children:"Documentation"})]}),(0,n.jsx)(s.A,{language:"js",children:`const navigationConfig = [
    {
        key: 'home',
        path: '/home',
        title: 'Home',
        translateKey: 'nav.home',
        icon: 'home',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: []
    }
]
`})]})]})},27910:e=>{"use strict";e.exports=require("stream")},28354:e=>{"use strict";e.exports=require("util")},29021:e=>{"use strict";e.exports=require("fs")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},33873:e=>{"use strict";e.exports=require("path")},43927:(e,t,r)=>{"use strict";r.d(t,{default:()=>n});let n=(0,r(12907).registerClientReference)(function(){throw Error("Attempted to call the default export of \"C:\\\\Users\\\\Computer\\\\Documents\\\\Data Ilah\\\\mykenary\\\\travel-web\\\\src\\\\components\\\\docs\\\\DemoCard\\\\CodeToggleTabs.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\components\\docs\\DemoCard\\CodeToggleTabs.tsx","default")},44517:e=>{var t=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,r=/\n/g,n=/^\s*/,s=/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,o=/^:\s*/,a=/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,i=/^[;\s]*/,u=/^\s+|\s+$/g;function c(e){return e?e.replace(u,""):""}e.exports=function(e,u){if("string"!=typeof e)throw TypeError("First argument must be a string");if(!e)return[];u=u||{};var l=1,d=1;function p(e){var t=e.match(r);t&&(l+=t.length);var n=e.lastIndexOf("\n");d=~n?e.length-n:d+e.length}function m(){var e={line:l,column:d};return function(t){return t.position=new h(e),x(n),t}}function h(e){this.start=e,this.end={line:l,column:d},this.source=u.source}h.prototype.content=e;var f=[];function g(t){var r=Error(u.source+":"+l+":"+d+": "+t);if(r.reason=t,r.filename=u.source,r.line=l,r.column=d,r.source=e,u.silent)f.push(r);else throw r}function x(t){var r=t.exec(e);if(r){var n=r[0];return p(n),e=e.slice(n.length),r}}function v(e){var t;for(e=e||[];t=y();)!1!==t&&e.push(t);return e}function y(){var t=m();if("/"==e.charAt(0)&&"*"==e.charAt(1)){for(var r=2;""!=e.charAt(r)&&("*"!=e.charAt(r)||"/"!=e.charAt(r+1));)++r;if(r+=2,""===e.charAt(r-1))return g("End of comment missing");var n=e.slice(2,r-2);return d+=2,p(n),e=e.slice(r),d+=2,t({type:"comment",comment:n})}}x(n);var C,b=[];for(v(b);C=function(){var e=m(),r=x(s);if(r){if(y(),!x(o))return g("property missing ':'");var n=x(a),u=e({type:"declaration",property:c(r[0].replace(t,"")),value:n?c(n[0].replace(t,"")):""});return x(i),u}}();)!1!==C&&(b.push(C),v(b));return b}},54813:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,4536,23)),Promise.resolve().then(r.bind(r,43927))},55511:e=>{"use strict";e.exports=require("crypto")},55591:e=>{"use strict";e.exports=require("https")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},65840:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var r=null;if(!e||"string"!=typeof e)return r;var n=(0,s.default)(e),o="function"==typeof t;return n.forEach(function(e){if("declaration"===e.type){var n=e.property,s=e.value;o?t(n,s,e):s&&((r=r||{})[n]=s)}}),r};var s=n(r(44517))},67094:(e,t,r)=>{"use strict";r.d(t,{A:()=>a});var n=r(37413),s=r(11013),o=r(43994);let a=e=>{let{children:t,...r}=e;return(0,n.jsx)(s.A,{style:o.A,...r,children:t})}},73136:e=>{"use strict";e.exports=require("node:url")},74075:e=>{"use strict";e.exports=require("zlib")},76760:e=>{"use strict";e.exports=require("node:path")},79551:e=>{"use strict";e.exports=require("url")},79599:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>a.a,__next_app__:()=>d,pages:()=>l,routeModule:()=>p,tree:()=>c});var n=r(65239),s=r(48088),o=r(88170),a=r.n(o),i=r(30893),u={};for(let e in i)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(u[e]=()=>i[e]);r.d(t,u);let c={children:["",{children:["(protected-pages)",{children:["guide",{children:["documentation",{children:["starter",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,24431)),"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\(protected-pages)\\guide\\documentation\\starter\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,36647)),"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\(protected-pages)\\guide\\documentation\\layout.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,6779)),"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\(protected-pages)\\layout.tsx"],loading:[()=>Promise.resolve().then(r.bind(r,81954)),"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\(protected-pages)\\loading.tsx"],forbidden:[()=>Promise.resolve().then(r.t.bind(r,89999,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(r.t.bind(r,65284,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,18886))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,10305)),"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.bind(r,54413)),"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\not-found.tsx"],forbidden:[()=>Promise.resolve().then(r.t.bind(r,89999,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(r.t.bind(r,65284,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,18886))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]}.children,l=["C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\(protected-pages)\\guide\\documentation\\starter\\page.tsx"],d={require:r,loadChunk:()=>Promise.resolve()},p=new n.AppPageRouteModule({definition:{kind:s.RouteKind.APP_PAGE,page:"/(protected-pages)/guide/documentation/starter/page",pathname:"/guide/documentation/starter",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},81630:e=>{"use strict";e.exports=require("http")},83997:e=>{"use strict";e.exports=require("tty")},86908:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.camelCase=void 0;var r=/^--[a-zA-Z0-9_-]+$/,n=/-([a-z])/g,s=/^[^-]+$/,o=/^-(webkit|moz|ms|o|khtml)-/,a=/^-(ms)-/,i=function(e,t){return t.toUpperCase()},u=function(e,t){return"".concat(t,"-")};t.camelCase=function(e,t){var c;return(void 0===t&&(t={}),!(c=e)||s.test(c)||r.test(c))?e:(e=e.toLowerCase(),(e=t.reactCompat?e.replace(a,u):e.replace(o,u)).replace(n,i))}},94735:e=>{"use strict";e.exports=require("events")},95754:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,85814,23)),Promise.resolve().then(r.bind(r,88797))}};var t=require("../../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),n=t.X(0,[80,4813,3225,154,3383,474,6060,4075,4325,1335,8920,4127,6847,9718,5459,9314,5077,2707],()=>r(79599));module.exports=n})();