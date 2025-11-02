(()=>{var e={};e.id=5096,e.ids=[5096],e.modules={1708:e=>{"use strict";e.exports=require("node:process")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},4750:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>n});var a=t(37413),s=t(67094),i=t(43927);let n=()=>(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)("p",{children:["We manage the theme color scheme using CSS variables, making it easy to customize and extend the theme. You can modify the theme colors by editing the CSS variables in the file located at:",(0,a.jsx)("code",{children:"assets/styles/tailwind/index.css"})]}),(0,a.jsx)("p",{children:"Here is the default setup for the light and dark modes:"}),(0,a.jsx)(s.A,{language:"css",children:`:root {
    --neutral: #ffffff;
    --primary: #2a85ff;
    --primary-deep: #0069f6;
    --primary-mild: #4996ff;
    --primary-subtle: #2a85ff1a;
    --error: #ff6a55;
    --error-subtle: #ff6a551a;
    --success: #10b981;
    --success-subtle: #05eb7624;
    --info: #2a85ff;
    --info-subtle: #2a85ff1a;
    --warning: #f59e0b;
    --warning-subtle: #ffd40045;
    --gray-50: #fafafa;
    --gray-100: #f5f5f5;
    --gray-200: #e5e5e5;
    --gray-300: #d4d4d4;
    --gray-400: #a3a3a3;
    --gray-500: #737373;
    --gray-600: #525252;
    --gray-700: #404040;
    --gray-800: #262626;
    --gray-900: #171717;
    --gray-950: #0a0a0a;
}

.dark {
    --neutral: #ffffff;
    --primary: #2a85ff;
    --primary-deep: #0069f6;
    --primary-mild: #4996ff;
    --primary-subtle: #2a85ff1a;
    --error: #ff6a55;
    --error-subtle: #ff6a551a; 
    --success: #10b981;
    --success-subtle: #05eb7624;
    --info: #2a85ff;
    --info-subtle: #2a85ff1a;
    --warning: #f59e0b;
    --warning-subtle: #ffd40045;
    --gray-50: #fafafa;
    --gray-100: #f5f5f5;
    --gray-200: #e5e5e5;
    --gray-300: #d4d4d4;
    --gray-400: #a3a3a3;
    --gray-500: #737373;
    --gray-600: #525252;
    --gray-700: #404040;
    --gray-800: #262626;
    --gray-900: #171717;
    --gray-950: #0a0a0a;
}`}),(0,a.jsxs)("div",{className:"mt-10",id:"dynamic-theme",children:[(0,a.jsx)("h5",{children:"Setting Up a Dynamic Theme"}),(0,a.jsxs)("p",{className:"mt-1",children:["If you want to enable dynamic theme switching in your application, you'll need to take a few extra steps. First, configure your theme schema in the"," ",(0,a.jsx)("code",{children:"configs/theme.config.ts"})," file:"]}),(0,a.jsx)(i.default,{languages:["ts","js"],tsMarkdown:`\`\`\`ts
export type Variables = 
  | "primary"
  | "primaryDeep"
  | "primaryMild"
  | "primarySubtle"
  | "neutral";

export type ThemeVariables = Record<
  "light" | "dark", 
  Record<Variables, string>
>

/** Default theme schema should corresponding to the CSS variables */
const defaultTheme: ThemeVariables = {
    light: {
        primary: "#2a85ff",
        primaryDeep: "#0069f6",
        primaryMild: "#4996ff",
        primarySubtle: "#2a85ff1a",
        neutral: "#ffffff",
    },
    dark: {
        primary: "#2a85ff",
        primaryDeep: "#0069f6",
        primaryMild: "#4996ff",
        primarySubtle: "#2a85ff1a",
        neutral: "#ffffff",
    },
}

/** Example of a custom green theme schema */
const greenTheme: ThemeVariables = {
    light: {
        primary: "#0CAF60",
        primaryDeep: "#088d50",
        primaryMild: "#34c779",
        primarySubtle: "#0CAF601a",
        neutral: "#ffffff",
    },
    dark: {
        primary: "#0CAF60",
        primaryDeep: "#088d50",
        primaryMild: "#34c779",
        primarySubtle: "#0CAF601a",
        neutral: "#ffffff",
    },
}

const presetThemeSchemaConfig: Record<string, ThemeVariables> = {
    default: defaultTheme,
    green: greenTheme,
}

export default presetThemeSchemaConfig`,jsMarkdown:`\`\`\`js
/** Default theme schema should corresponding to the CSS variables */
const defaultTheme = {
    light: {
        primary: "#2a85ff",
        primaryDeep: "#0069f6",
        primaryMild: "#4996ff",
        primarySubtle: "#2a85ff1a",
        neutral: "#ffffff",
    },
    dark: {
        primary: "#2a85ff",
        primaryDeep: "#0069f6",
        primaryMild: "#4996ff",
        primarySubtle: "#2a85ff1a",
        neutral: "#ffffff",
    },
}

/** Example of a custom green theme schema */
const greenTheme = {
    light: {
        primary: "#0CAF60",
        primaryDeep: "#088d50",
        primaryMild: "#34c779",
        primarySubtle: "#0CAF601a",
        neutral: "#ffffff",
    },
    dark: {
        primary: "#0CAF60",
        primaryDeep: "#088d50",
        primaryMild: "#34c779",
        primarySubtle: "#0CAF601a",
        neutral: "#ffffff",
    },
}

const presetThemeSchemaConfig = {
    default: defaultTheme,
    green: greenTheme,
}

export default presetThemeSchemaConfig`})]}),(0,a.jsxs)("p",{children:["Now that your theme schemas are set up, you can use the"," ",(0,a.jsx)("code",{children:"useTheme"})," hook to switch between different theme colors. Here's an example of how you might implement a theme switcher:"]}),(0,a.jsx)(s.A,{language:"tsx",children:`import classNames from '@/utils/classNames'
import { TbCheck } from 'react-icons/tb'
import presetThemeSchemaConfig from '@/configs/preset-theme-schema.config'
import useTheme from '@/utils/hooks/useTheme'

const ThemeSwitcher = () => {
    const schema = useTheme((state) => state.themeSchema)
    const setSchema = useTheme((state) => state.setSchema)
    const mode = useTheme((state) => state.mode)

    return (
        <div className="inline-flex items-center gap-2">
            {Object.entries(presetThemeSchemaConfig).map(([key, value]) => (
                <button
                    key={key}
                    className={classNames(
                        'h-8 w-8 rounded-full flex items-center justify-center border-2 border-white',
                        schema === key && 'ring-2 ring-primary',
                    )}
                    style={{ backgroundColor: value[mode].primary || '' }}
                    onClick={() => setSchema(key)}
                >
                    {schema === key ? (
                        <TbCheck className="text-neutral text-lg" />
                    ) : (
                        <></>
                    )}
                </button>
            ))}
        </div>
    )
}

export default ThemeSwitcher`}),(0,a.jsx)("p",{children:"This guide should help you effectively manage and switch themes within your application. You can extend the theme schemas as needed to fit your design requirements."})]})},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},11120:function(e,r,t){"use strict";var a=(this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}})(t(65840)),s=t(86908);function i(e,r){var t={};return e&&"string"==typeof e&&(0,a.default)(e,function(e,a){e&&a&&(t[(0,s.camelCase)(e,r)]=a)}),t}i.default=i,e.exports=i},12412:e=>{"use strict";e.exports=require("assert")},19121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},19888:(e,r,t)=>{Promise.resolve().then(t.bind(t,88797))},21820:e=>{"use strict";e.exports=require("os")},27910:e=>{"use strict";e.exports=require("stream")},28354:e=>{"use strict";e.exports=require("util")},29021:e=>{"use strict";e.exports=require("fs")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},33873:e=>{"use strict";e.exports=require("path")},43927:(e,r,t)=>{"use strict";t.d(r,{default:()=>a});let a=(0,t(12907).registerClientReference)(function(){throw Error("Attempted to call the default export of \"C:\\\\Users\\\\Computer\\\\Documents\\\\Data Ilah\\\\mykenary\\\\travel-web\\\\src\\\\components\\\\docs\\\\DemoCard\\\\CodeToggleTabs.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\components\\docs\\DemoCard\\CodeToggleTabs.tsx","default")},44517:e=>{var r=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,t=/\n/g,a=/^\s*/,s=/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,i=/^:\s*/,n=/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,o=/^[;\s]*/,u=/^\s+|\s+$/g;function l(e){return e?e.replace(u,""):""}e.exports=function(e,u){if("string"!=typeof e)throw TypeError("First argument must be a string");if(!e)return[];u=u||{};var c=1,f=1;function m(e){var r=e.match(t);r&&(c+=r.length);var a=e.lastIndexOf("\n");f=~a?e.length-a:f+e.length}function p(){var e={line:c,column:f};return function(r){return r.position=new d(e),g(a),r}}function d(e){this.start=e,this.end={line:c,column:f},this.source=u.source}d.prototype.content=e;var h=[];function y(r){var t=Error(u.source+":"+c+":"+f+": "+r);if(t.reason=r,t.filename=u.source,t.line=c,t.column=f,t.source=e,u.silent)h.push(t);else throw t}function g(r){var t=r.exec(e);if(t){var a=t[0];return m(a),e=e.slice(a.length),t}}function b(e){var r;for(e=e||[];r=x();)!1!==r&&e.push(r);return e}function x(){var r=p();if("/"==e.charAt(0)&&"*"==e.charAt(1)){for(var t=2;""!=e.charAt(t)&&("*"!=e.charAt(t)||"/"!=e.charAt(t+1));)++t;if(t+=2,""===e.charAt(t-1))return y("End of comment missing");var a=e.slice(2,t-2);return f+=2,m(a),e=e.slice(t),f+=2,r({type:"comment",comment:a})}}g(a);var v,C=[];for(b(C);v=function(){var e=p(),t=g(s);if(t){if(x(),!g(i))return y("property missing ':'");var a=g(n),u=e({type:"declaration",property:l(t[0].replace(r,"")),value:a?l(a[0].replace(r,"")):""});return g(o),u}}();)!1!==v&&(C.push(v),b(C));return C}},55511:e=>{"use strict";e.exports=require("crypto")},55591:e=>{"use strict";e.exports=require("https")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},65840:function(e,r,t){"use strict";var a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(r,"__esModule",{value:!0}),r.default=function(e,r){var t=null;if(!e||"string"!=typeof e)return t;var a=(0,s.default)(e),i="function"==typeof r;return a.forEach(function(e){if("declaration"===e.type){var a=e.property,s=e.value;i?r(a,s,e):s&&((t=t||{})[a]=s)}}),t};var s=a(t(44517))},67094:(e,r,t)=>{"use strict";t.d(r,{A:()=>n});var a=t(37413),s=t(11013),i=t(43994);let n=e=>{let{children:r,...t}=e;return(0,a.jsx)(s.A,{style:i.A,...t,children:r})}},67859:(e,r,t)=>{"use strict";t.r(r),t.d(r,{GlobalError:()=>n.a,__next_app__:()=>f,pages:()=>c,routeModule:()=>m,tree:()=>l});var a=t(65239),s=t(48088),i=t(88170),n=t.n(i),o=t(30893),u={};for(let e in o)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(u[e]=()=>o[e]);t.d(r,u);let l={children:["",{children:["(protected-pages)",{children:["guide",{children:["documentation",{children:["theming",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,4750)),"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\(protected-pages)\\guide\\documentation\\theming\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(t.bind(t,36647)),"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\(protected-pages)\\guide\\documentation\\layout.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(t.bind(t,6779)),"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\(protected-pages)\\layout.tsx"],loading:[()=>Promise.resolve().then(t.bind(t,81954)),"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\(protected-pages)\\loading.tsx"],forbidden:[()=>Promise.resolve().then(t.t.bind(t,89999,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(t.t.bind(t,65284,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(t.bind(t,18886))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(t.bind(t,10305)),"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(t.bind(t,54413)),"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\not-found.tsx"],forbidden:[()=>Promise.resolve().then(t.t.bind(t,89999,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(t.t.bind(t,65284,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(t.bind(t,18886))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]}.children,c=["C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\(protected-pages)\\guide\\documentation\\theming\\page.tsx"],f={require:t,loadChunk:()=>Promise.resolve()},m=new a.AppPageRouteModule({definition:{kind:s.RouteKind.APP_PAGE,page:"/(protected-pages)/guide/documentation/theming/page",pathname:"/guide/documentation/theming",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},73136:e=>{"use strict";e.exports=require("node:url")},74075:e=>{"use strict";e.exports=require("zlib")},76760:e=>{"use strict";e.exports=require("node:path")},79551:e=>{"use strict";e.exports=require("url")},81630:e=>{"use strict";e.exports=require("http")},83997:e=>{"use strict";e.exports=require("tty")},85040:(e,r,t)=>{Promise.resolve().then(t.bind(t,43927))},86908:(e,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.camelCase=void 0;var t=/^--[a-zA-Z0-9_-]+$/,a=/-([a-z])/g,s=/^[^-]+$/,i=/^-(webkit|moz|ms|o|khtml)-/,n=/^-(ms)-/,o=function(e,r){return r.toUpperCase()},u=function(e,r){return"".concat(r,"-")};r.camelCase=function(e,r){var l;return(void 0===r&&(r={}),!(l=e)||s.test(l)||t.test(l))?e:(e=e.toLowerCase(),(e=r.reactCompat?e.replace(n,u):e.replace(i,u)).replace(a,o))}},94735:e=>{"use strict";e.exports=require("events")}};var r=require("../../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),a=r.X(0,[80,4813,3225,154,3383,474,6060,4075,4325,1335,8920,4127,6847,9718,5459,9314,5077,2707],()=>t(67859));module.exports=a})();