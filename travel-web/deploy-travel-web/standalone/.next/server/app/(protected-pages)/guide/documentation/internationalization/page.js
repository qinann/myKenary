(()=>{var e={};e.id=3222,e.ids=[3222],e.modules={1708:e=>{"use strict";e.exports=require("node:process")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},11120:function(e,t,r){"use strict";var n=(this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}})(r(65840)),s=r(86908);function o(e,t){var r={};return e&&"string"==typeof e&&(0,n.default)(e,function(e,n){e&&n&&(r[(0,s.camelCase)(e,t)]=n)}),r}o.default=o,e.exports=o},12412:e=>{"use strict";e.exports=require("assert")},19121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},19888:(e,t,r)=>{Promise.resolve().then(r.bind(r,88797))},21820:e=>{"use strict";e.exports=require("os")},27910:e=>{"use strict";e.exports=require("stream")},28354:e=>{"use strict";e.exports=require("util")},29021:e=>{"use strict";e.exports=require("fs")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},33873:e=>{"use strict";e.exports=require("path")},34406:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>a});var n=r(37413),s=r(67094),o=r(43927);let a=()=>(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)("p",{children:["Our template uses"," ",(0,n.jsx)("a",{href:"https://next-intl.dev/",target:"_blank",children:(0,n.jsx)("code",{children:"next-intl"})})," ","to handle internationalization (i18n). By default, the starter does not include i18n setup, as not every project requires this feature. However, we offer two distinct setups to cater to both scenarios: Without i18n Routing (default) and With i18n Routing."]}),(0,n.jsxs)("p",{children:["We integrates i18n into the navigation module by default. If you need to having i18n in your app, you might need to toggle the"," ",(0,n.jsx)("code",{children:"activeNavTranslation"})," field in"," ",(0,n.jsx)("code",{children:"src/configs/app.config.ts"})," to ",(0,n.jsx)("code",{children:"true"}),"."]}),(0,n.jsx)(s.A,{language:"ts",children:`
// src/configs/app.config.ts
export const appConfig: AppConfig = {
    ...
    activeNavTranslation: true
}`}),(0,n.jsxs)("div",{className:"my-10",id:"without-i18n-routing",children:[(0,n.jsx)("h5",{children:"Without i18n Routing"}),(0,n.jsx)("p",{children:"This setup is designed for simplicity, allowing you to manage translations without involving URL structures, which we implemented in our demo."}),(0,n.jsxs)("ol",{children:[(0,n.jsxs)("li",{children:[(0,n.jsxs)("p",{children:["Add your translation files to the"," ",(0,n.jsx)("code",{children:"messages"})," folder in the root directory:"]}),(0,n.jsx)(s.A,{children:`messages/
├── en.json
├── es.json
└── fr.json
`}),(0,n.jsx)("p",{children:"This is a simplest example to add your translation key to a JSON files"}),(0,n.jsx)(s.A,{language:"json",children:`// messages/en.json
{
    "title": "Home",
}`}),(0,n.jsx)(s.A,{language:"json",children:`// messages/es.json
{
    "title": "Inicio",
}`})]}),(0,n.jsxs)("li",{children:[(0,n.jsxs)("p",{children:["Wrap the application with"," ",(0,n.jsx)("code",{children:"LocaleProvider"})," in"," ",(0,n.jsx)("code",{children:"src/app/layout.tsx"})," and inject necessary props"]}),(0,n.jsx)(o.default,{languages:["tsx","jsx"],tsMarkdown:`\`\`\`tsx
// src/app/layout.tsx
...
import LocaleProvider from "@/components/template/LocaleProvider";
import { getLocale, getMessages } from "next-intl/server";

export default async function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {

    const locale = await getLocale();

    const messages = await getMessages();

    ...                          

    return (
        <html suppressHydrationWarning>
            <body suppressHydrationWarning>
                <LocaleProvider locale={locale} messages={messages}>
                    <ThemeProvider locale={locale} theme={theme}>
                        ...other components
                        {children}
                    </ThemeProvider>
                </LocaleProvider>  
            </body>
        </html>
    );
}`,jsMarkdown:`\`\`\`jsx
// src/app/layout.jsx
...
import LocaleProvider from "@/components/template/LocaleProvider";
import { getLocale, getMessages } from "next-intl/server";

export default async function RootLayout({
    children,
}) {

    const locale = await getLocale();

    const messages = await getMessages();

    ...                          

    return (
        <html suppressHydrationWarning>
            <body suppressHydrationWarning>
                <LocaleProvider locale={locale} messages={messages}>
                    <ThemeProvider locale={locale} theme={theme}>
                        ...other components
                        {children}
                    </ThemeProvider>
                </LocaleProvider>  
            </body>
        </html>
    );
}`})]}),(0,n.jsxs)("li",{children:[(0,n.jsx)("p",{children:"Now you can use translations in your page components or anywhere else with useTranslation hook"}),(0,n.jsx)(s.A,{language:"tsx",children:`import {useTranslations} from 'next-intl';
 
export default function HomePage() {
    const t = useTranslations();
    return <h1>{t('title')}</h1>;
}`})]})]})]}),(0,n.jsxs)("div",{className:"my-10",id:"with-i18n-routing",children:[(0,n.jsx)("h5",{children:"With i18n Routing"}),(0,n.jsxs)("p",{children:["Next Intl provide i18n Routing setup, it use unique pathnames for every language that your app supports, this setup can be useful if you need a Prefix-based routing (e.g."," ",(0,n.jsx)("code",{children:"/en/about"}),") or Domain-based routing (e.g."," ",(0,n.jsx)("code",{children:"en.example.com"}),")"]}),(0,n.jsx)("p",{children:"Setting up i18n routing in a Next.js app requires more effort compared with the above one. This setup involves changes to the project structure and additional configurations."}),(0,n.jsxs)("p",{children:["If you're considering implementing i18n routing, refer to the official next-intl documentation for a comprehensive guide:"," ",(0,n.jsx)("a",{href:"https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing",target:"_blank",children:"App Router setup with i18n routing"})]})]}),(0,n.jsxs)("div",{className:"mt-10",id:"changingLanguage",children:[(0,n.jsx)("h5",{children:"Changing language"}),(0,n.jsxs)("p",{className:"mt-1",children:["If you need to switch languages dynamically(Without i18n Routing), you can use the ",(0,n.jsx)("code",{children:"i18n"})," object provided by the ",(0,n.jsx)("code",{children:"useTranslation"})," hook to change the current language."]}),(0,n.jsx)(o.default,{languages:["tsx","jsx"],tsMarkdown:`\`\`\`tsx
'use client'
                
import { setLocale } from '@/server/actions/locale'

const Component = () => {

    const handleUpdateLocale = async (locale: string) => {
        await setLocale(locale)
    }

    return (
        <button onClick={() => handleUpdateLocale('fr')}>Change language</button>
    )
}

export default Component`,jsMarkdown:`\`\`\`jsx
'use client'
                
import { setLocale } from '@/server/actions/locale'

const Component = () => {

    const handleUpdateLocale = async (locale) => {
        await setLocale(locale)
    }

    return (
        <button onClick={() => handleUpdateLocale('fr')}>Change language</button>
    )
}

export default Component`})]}),(0,n.jsxs)("div",{className:"mt-10",id:"settingDefaultLanguage",children:[(0,n.jsx)("h5",{children:"Setting the Default Language"}),(0,n.jsxs)("p",{className:"mt-1",children:["To set the default language, you might need to visit"," ",(0,n.jsx)("code",{children:"src/configs/app.config.ts"})," and change the"," ",(0,n.jsx)("code",{children:"locale"})," field value"]}),(0,n.jsx)(s.A,{language:"ts",children:`export const appConfig: AppConfig = {
    ...
    locale: 'fr'
}`}),(0,n.jsxs)("div",{className:"mt-10",id:"addNewLocale",children:[(0,n.jsx)("h5",{children:"Adding new locale"}),(0,n.jsxs)("p",{children:["To support a new language in your app, create a new JSON file for the locale inside the ",(0,n.jsx)("code",{children:"messages"})," ","folder. For example, to add French translations, create a file named ",(0,n.jsx)("code",{children:"messages/fr.json"}),":"]}),(0,n.jsx)(s.A,{language:"json",children:`// messages/fr.json
{
    "HomePage": {
        "title": "Bonjour le monde!",
        "about": "Aller \xe0 la page \xe0 propos"
    }
}`}),(0,n.jsxs)("p",{children:["Register the new locale value in"," ",(0,n.jsx)("code",{children:"src/i18n/dateLocales.ts"})]}),(0,n.jsx)(o.default,{languages:["tsx","jsx"],tsMarkdown:`\`\`\`tsx
export const dateLocales: {
    [key: string]: () => Promise<ILocale>
} = {
    ...
    fr: () => import('dayjs/locale/fr'),
}`,jsMarkdown:`\`\`\`jsx
export const dateLocales = {
    ...
    fr: () => import('dayjs/locale/fr'),
}`}),(0,n.jsx)("p",{children:"For i18n Routing, you might need to include the new locale value to routing configuration & middleware"})]})]})]})},43927:(e,t,r)=>{"use strict";r.d(t,{default:()=>n});let n=(0,r(12907).registerClientReference)(function(){throw Error("Attempted to call the default export of \"C:\\\\Users\\\\Computer\\\\Documents\\\\Data Ilah\\\\mykenary\\\\travel-web\\\\src\\\\components\\\\docs\\\\DemoCard\\\\CodeToggleTabs.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\components\\docs\\DemoCard\\CodeToggleTabs.tsx","default")},44517:e=>{var t=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,r=/\n/g,n=/^\s*/,s=/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,o=/^:\s*/,a=/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,i=/^[;\s]*/,l=/^\s+|\s+$/g;function c(e){return e?e.replace(l,""):""}e.exports=function(e,l){if("string"!=typeof e)throw TypeError("First argument must be a string");if(!e)return[];l=l||{};var u=1,d=1;function p(e){var t=e.match(r);t&&(u+=t.length);var n=e.lastIndexOf("\n");d=~n?e.length-n:d+e.length}function h(){var e={line:u,column:d};return function(t){return t.position=new m(e),x(n),t}}function m(e){this.start=e,this.end={line:u,column:d},this.source=l.source}m.prototype.content=e;var g=[];function f(t){var r=Error(l.source+":"+u+":"+d+": "+t);if(r.reason=t,r.filename=l.source,r.line=u,r.column=d,r.source=e,l.silent)g.push(r);else throw r}function x(t){var r=t.exec(e);if(r){var n=r[0];return p(n),e=e.slice(n.length),r}}function v(e){var t;for(e=e||[];t=y();)!1!==t&&e.push(t);return e}function y(){var t=h();if("/"==e.charAt(0)&&"*"==e.charAt(1)){for(var r=2;""!=e.charAt(r)&&("*"!=e.charAt(r)||"/"!=e.charAt(r+1));)++r;if(r+=2,""===e.charAt(r-1))return f("End of comment missing");var n=e.slice(2,r-2);return d+=2,p(n),e=e.slice(r),d+=2,t({type:"comment",comment:n})}}x(n);var j,b=[];for(v(b);j=function(){var e=h(),r=x(s);if(r){if(y(),!x(o))return f("property missing ':'");var n=x(a),l=e({type:"declaration",property:c(r[0].replace(t,"")),value:n?c(n[0].replace(t,"")):""});return x(i),l}}();)!1!==j&&(b.push(j),v(b));return b}},55511:e=>{"use strict";e.exports=require("crypto")},55591:e=>{"use strict";e.exports=require("https")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},65840:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var r=null;if(!e||"string"!=typeof e)return r;var n=(0,s.default)(e),o="function"==typeof t;return n.forEach(function(e){if("declaration"===e.type){var n=e.property,s=e.value;o?t(n,s,e):s&&((r=r||{})[n]=s)}}),r};var s=n(r(44517))},67094:(e,t,r)=>{"use strict";r.d(t,{A:()=>a});var n=r(37413),s=r(11013),o=r(43994);let a=e=>{let{children:t,...r}=e;return(0,n.jsx)(s.A,{style:o.A,...r,children:t})}},73136:e=>{"use strict";e.exports=require("node:url")},74075:e=>{"use strict";e.exports=require("zlib")},74181:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>a.a,__next_app__:()=>d,pages:()=>u,routeModule:()=>p,tree:()=>c});var n=r(65239),s=r(48088),o=r(88170),a=r.n(o),i=r(30893),l={};for(let e in i)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>i[e]);r.d(t,l);let c={children:["",{children:["(protected-pages)",{children:["guide",{children:["documentation",{children:["internationalization",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,34406)),"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\(protected-pages)\\guide\\documentation\\internationalization\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,36647)),"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\(protected-pages)\\guide\\documentation\\layout.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,6779)),"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\(protected-pages)\\layout.tsx"],loading:[()=>Promise.resolve().then(r.bind(r,81954)),"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\(protected-pages)\\loading.tsx"],forbidden:[()=>Promise.resolve().then(r.t.bind(r,89999,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(r.t.bind(r,65284,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,18886))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,10305)),"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.bind(r,54413)),"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\not-found.tsx"],forbidden:[()=>Promise.resolve().then(r.t.bind(r,89999,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(r.t.bind(r,65284,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,18886))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]}.children,u=["C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\(protected-pages)\\guide\\documentation\\internationalization\\page.tsx"],d={require:r,loadChunk:()=>Promise.resolve()},p=new n.AppPageRouteModule({definition:{kind:s.RouteKind.APP_PAGE,page:"/(protected-pages)/guide/documentation/internationalization/page",pathname:"/guide/documentation/internationalization",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},76760:e=>{"use strict";e.exports=require("node:path")},79551:e=>{"use strict";e.exports=require("url")},81630:e=>{"use strict";e.exports=require("http")},83997:e=>{"use strict";e.exports=require("tty")},85040:(e,t,r)=>{Promise.resolve().then(r.bind(r,43927))},86908:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.camelCase=void 0;var r=/^--[a-zA-Z0-9_-]+$/,n=/-([a-z])/g,s=/^[^-]+$/,o=/^-(webkit|moz|ms|o|khtml)-/,a=/^-(ms)-/,i=function(e,t){return t.toUpperCase()},l=function(e,t){return"".concat(t,"-")};t.camelCase=function(e,t){var c;return(void 0===t&&(t={}),!(c=e)||s.test(c)||r.test(c))?e:(e=e.toLowerCase(),(e=t.reactCompat?e.replace(a,l):e.replace(o,l)).replace(n,i))}},94735:e=>{"use strict";e.exports=require("events")}};var t=require("../../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),n=t.X(0,[80,4813,3225,154,3383,474,6060,4075,4325,1335,8920,4127,6847,9718,5459,9314,5077,2707],()=>r(74181));module.exports=n})();