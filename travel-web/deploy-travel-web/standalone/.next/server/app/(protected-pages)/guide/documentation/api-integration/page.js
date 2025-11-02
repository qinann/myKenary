(()=>{var e={};e.id=9065,e.ids=[9065],e.modules={1708:e=>{"use strict";e.exports=require("node:process")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},11120:function(e,t,r){"use strict";var s=(this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}})(r(65840)),a=r(86908);function n(e,t){var r={};return e&&"string"==typeof e&&(0,s.default)(e,function(e,s){e&&s&&(r[(0,a.camelCase)(e,t)]=s)}),r}n.default=n,e.exports=n},12412:e=>{"use strict";e.exports=require("assert")},14995:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});let s=(0,r(12907).registerClientReference)(function(){throw Error("Attempted to call the default export of \"C:\\\\Users\\\\Computer\\\\Documents\\\\Data Ilah\\\\mykenary\\\\travel-web\\\\src\\\\app\\\\(protected-pages)\\\\guide\\\\documentation\\\\api-integration\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\(protected-pages)\\guide\\documentation\\api-integration\\page.tsx","default")},19121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},21820:e=>{"use strict";e.exports=require("os")},27910:e=>{"use strict";e.exports=require("stream")},28354:e=>{"use strict";e.exports=require("util")},29021:e=>{"use strict";e.exports=require("fs")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},33873:e=>{"use strict";e.exports=require("path")},44517:e=>{var t=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,r=/\n/g,s=/^\s*/,a=/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,n=/^:\s*/,o=/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,i=/^[;\s]*/,c=/^\s+|\s+$/g;function l(e){return e?e.replace(c,""):""}e.exports=function(e,c){if("string"!=typeof e)throw TypeError("First argument must be a string");if(!e)return[];c=c||{};var d=1,u=1;function p(e){var t=e.match(r);t&&(d+=t.length);var s=e.lastIndexOf("\n");u=~s?e.length-s:u+e.length}function h(){var e={line:d,column:u};return function(t){return t.position=new m(e),y(s),t}}function m(e){this.start=e,this.end={line:d,column:u},this.source=c.source}m.prototype.content=e;var x=[];function f(t){var r=Error(c.source+":"+d+":"+u+": "+t);if(r.reason=t,r.filename=c.source,r.line=d,r.column=u,r.source=e,c.silent)x.push(r);else throw r}function y(t){var r=t.exec(e);if(r){var s=r[0];return p(s),e=e.slice(s.length),r}}function g(e){var t;for(e=e||[];t=v();)!1!==t&&e.push(t);return e}function v(){var t=h();if("/"==e.charAt(0)&&"*"==e.charAt(1)){for(var r=2;""!=e.charAt(r)&&("*"!=e.charAt(r)||"/"!=e.charAt(r+1));)++r;if(r+=2,""===e.charAt(r-1))return f("End of comment missing");var s=e.slice(2,r-2);return u+=2,p(s),e=e.slice(r),u+=2,t({type:"comment",comment:s})}}y(s);var j,b=[];for(g(b);j=function(){var e=h(),r=y(a);if(r){if(v(),!y(n))return f("property missing ':'");var s=y(o),c=e({type:"declaration",property:l(r[0].replace(t,"")),value:s?l(s[0].replace(t,"")):""});return y(i),c}}();)!1!==j&&(b.push(j),g(b));return b}},55511:e=>{"use strict";e.exports=require("crypto")},55591:e=>{"use strict";e.exports=require("https")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},65840:function(e,t,r){"use strict";var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var r=null;if(!e||"string"!=typeof e)return r;var s=(0,a.default)(e),n="function"==typeof t;return s.forEach(function(e){if("declaration"===e.type){var s=e.property,a=e.value;n?t(s,a,e):a&&((r=r||{})[s]=a)}}),r};var a=s(r(44517))},73136:e=>{"use strict";e.exports=require("node:url")},73951:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>o.a,__next_app__:()=>u,pages:()=>d,routeModule:()=>p,tree:()=>l});var s=r(65239),a=r(48088),n=r(88170),o=r.n(n),i=r(30893),c={};for(let e in i)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(c[e]=()=>i[e]);r.d(t,c);let l={children:["",{children:["(protected-pages)",{children:["guide",{children:["documentation",{children:["api-integration",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,14995)),"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\(protected-pages)\\guide\\documentation\\api-integration\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,36647)),"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\(protected-pages)\\guide\\documentation\\layout.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,6779)),"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\(protected-pages)\\layout.tsx"],loading:[()=>Promise.resolve().then(r.bind(r,81954)),"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\(protected-pages)\\loading.tsx"],forbidden:[()=>Promise.resolve().then(r.t.bind(r,89999,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(r.t.bind(r,65284,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,18886))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,10305)),"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.bind(r,54413)),"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\not-found.tsx"],forbidden:[()=>Promise.resolve().then(r.t.bind(r,89999,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(r.t.bind(r,65284,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,18886))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]}.children,d=["C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\(protected-pages)\\guide\\documentation\\api-integration\\page.tsx"],u={require:r,loadChunk:()=>Promise.resolve()},p=new s.AppPageRouteModule({definition:{kind:a.RouteKind.APP_PAGE,page:"/(protected-pages)/guide/documentation/api-integration/page",pathname:"/guide/documentation/api-integration",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},74075:e=>{"use strict";e.exports=require("zlib")},76760:e=>{"use strict";e.exports=require("node:path")},79551:e=>{"use strict";e.exports=require("url")},79925:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>n});var s=r(60687),a=r(88797);let n=()=>(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("p",{children:"Next.js provides a built-in API routing system, enabling you to define backend functionality directly within your application. This system allows you to handle requests, process data, and communicate with external services seamlessly, all while colocating your API logic with your Next.js project structure."}),(0,s.jsx)("p",{children:"In this section, we'll explore how APIs work in Next.js, provide examples of creating API routes, and demonstrate how it work with Ecme."}),(0,s.jsxs)("div",{className:"mt-10",id:"howApiRoutesWork",children:[(0,s.jsx)("h5",{children:"How API Routes Work"}),(0,s.jsxs)("ol",{children:[(0,s.jsx)("li",{children:(0,s.jsxs)("p",{children:[(0,s.jsx)("strong",{children:"File-based API Routes:"}),(0,s.jsx)("br",{}),"API routes are created inside the"," ",(0,s.jsx)("code",{children:"/app/api"})," directory. Each file within this directory defines an endpoint. The file name (or folder structure) corresponds to the endpoint's path."]})}),(0,s.jsx)("li",{children:(0,s.jsxs)("p",{children:[(0,s.jsx)("strong",{children:"Request and Response Objects:"}),(0,s.jsx)("br",{}),"API routes handle requests and responses using Node.js-style",(0,s.jsx)("code",{children:"req"})," and ",(0,s.jsx)("code",{children:"res"})," objects. This makes it easy to process incoming data and send responses."]})}),(0,s.jsx)("li",{children:(0,s.jsxs)("p",{children:[(0,s.jsx)("strong",{children:"Server-side Execution:"}),(0,s.jsx)("br",{}),"API routes always run on the server, ensuring secure handling of sensitive operations such as database queries or authentication logic."]})})]}),(0,s.jsxs)("p",{children:["For more comprehensive details, refer to the official"," ",(0,s.jsx)("a",{href:"https://nextjs.org/docs/app/building-your-application/routing",target:"_blank",children:"Next.js documentation on API Routes"}),"."]})]}),(0,s.jsxs)("div",{className:"mt-10",id:"creatingApiRoutes",children:[(0,s.jsx)("h5",{children:"Creating API Routes"}),(0,s.jsx)("p",{children:"Here's an example of creating a simple API route"}),(0,s.jsx)("ol",{children:(0,s.jsxs)("li",{children:[(0,s.jsx)("strong",{children:"Create the API Route:"}),(0,s.jsx)("br",{}),"Create a file named ",(0,s.jsx)("code",{children:"hello.ts"})," in the"," ",(0,s.jsx)("code",{children:"src/app/api/hello/route.ts"})," directory:",(0,s.jsx)(a.default,{languages:["jsx","jsx"],tsMarkdown:`\`\`\`tsx
import { NextResponse } from 'next/server';

const mockMethodThatSavesToDatabase = async (data) => {
    // Simulate saving to a database
    console.log('Data saved to database:', data);
};

export async function POST(request: Request) {
    try {
        // Fetch data from an external API
        const externalApiResponse = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        const externalData = await externalApiResponse.json();

        // Save the fetched data to the database
        await mockMethodThatSavesToDatabase(externalData);

        return NextResponse.json({ message: 'Data saved successfully', data: externalData });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save data', details: error.message }, { status: 500 });
    }
}`,jsMarkdown:`\`\`\`jsx
import { NextResponse } from 'next/server';

const mockMethodThatSavesToDatabase = async (data) => {
    // Simulate saving to a database
    console.log('Data saved to database:', data);
};

export async function POST(request) {
    try {
        // Fetch data from an external API
        const externalApiResponse = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        const externalData = await externalApiResponse.json();

        // Save the fetched data to the database
        await mockMethodThatSavesToDatabase(externalData);

        return NextResponse.json({ message: 'Data saved successfully', data: externalData });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save data', details: error.message }, { status: 500 });
    }
}`})]})})]}),(0,s.jsxs)("div",{className:"mt-10",id:"callingApiRoutes",children:[(0,s.jsx)("h5",{children:"Calling an API Route from the Client Side"}),(0,s.jsxs)("p",{children:["To simplify client-side API calls, our template includes a utility ",(0,s.jsx)("code",{children:"ApiService"})," under the"," ",(0,s.jsx)("code",{children:"services"})," directory. This utility: Accepts an Axios request configuration andautomatically handles responses and errors, returning only the relevant data or error details. Here's how it works:"]}),(0,s.jsxs)("ol",{children:[(0,s.jsx)("li",{children:(0,s.jsxs)("p",{children:["Start by creating a new service file specific to your feature or module. For instance, if you're working on user management, create a file named"," ",(0,s.jsx)("code",{children:"UserManagementService.ts"})," in the"," ",(0,s.jsx)("code",{children:"services"})," directory."]})}),(0,s.jsxs)("li",{children:[(0,s.jsxs)("p",{children:["Inside the service file, declare an asynchronous function to handle the API request. This function should utilize ",(0,s.jsx)("code",{children:"ApiService.fetchData"}),", accepting two generic types:"," ",(0,s.jsx)("strong",{children:"Response"})," and"," ",(0,s.jsx)("strong",{children:"Request"}),", along with the Axios configuration. Here's an example:"]}),(0,s.jsx)(a.default,{languages:["tsx","jsx"],tsMarkdown:`\`\`\`tsx
type MyApiResponse = {
    someResponseData: string
    someResponseData2: boolean
}

type MyApiRequest = {
    someRequestData: string
}

export async function myApi (data) {
    return ApiService.fetchData<MyApiResponse,MyApiRequest>({
        url: '/my-api-url',
        method: 'post',
        data
    })
}
...`,jsMarkdown:`\`\`\`jsx
export async function myApi (data) {
    return ApiService.fetchData({
        url: '/my-api-url',
        method: 'post',
        data
    })
}
...`}),(0,s.jsx)("p",{children:"or forwarding the type to generic from comsumer level:"}),(0,s.jsx)(a.default,{languages:["tsx","jsx"],tsMarkdown:`\`\`\`tsx
import ApiService from "./ApiService"

export async function myApi<TResponse, TRequest>(data) {
    return ApiService.fetchData<TResponse, TRequest>({
        url: '/my-api-url',
        method: 'post',
        data
    })
}
...`,jsMarkdown:`\`\`\`jsx
import ApiService from "./ApiService"

export async function myApi(data) {
    return ApiService.fetchData({
        url: '/my-api-url',
        method: 'post',
        data
    })
}
...`})]}),(0,s.jsxs)("li",{children:[(0,s.jsx)("p",{children:"And now you can hook up this API in your component"}),(0,s.jsx)(a.default,{languages:["tsx","jsx"],tsMarkdown:`\`\`\`tsx
type MyApiResponse = {
    someResponseData: string
    someResponseData2: boolean
}

type MyApiRequest = {
    someRequestData: string
}

import { myApi } from './MyService.ts'

const MyComponent = props => {

    const fetchData = async () => {
        const reqeustParam = { key: 'value'}
        try {
            const resp = await myApi<MyApiResponse, MyApiRequest>(reqeustParam)
            if (resp.data) {
                ...do something
            }
        } catch (errors) {
            ...handle errors
        }
    }
    
    // You can
    useEffect(() => {
        fetchData()
    }, [])

    return (
    ...
)`,jsMarkdown:`\`\`\`jsx
import { myApi } from './MyService.ts'

const MyComponent = props => {

    const fetchData = async () => {
        const reqeustParam = { key: 'value'}
        try {
            const resp = await myApi(reqeustParam)
            if (resp.data) {
                ...do something
            }
        } catch (errors) {
            ...handle errors
        }
    }
    
    // You can
    useEffect(() => {
        fetchData()
    }, [])

    return (
    ...
)`}),(0,s.jsxs)("p",{children:[(0,s.jsx)("strong",{children:"Note"}),": You can also use data-fetching libraries like"," ",(0,s.jsx)("a",{href:"https://swr.vercel.app/",target:"_blank",rel:"noreferrer",children:"SWR"})," ","or"," ",(0,s.jsx)("a",{href:"https://tanstack.com/query/latest",target:"_blank",rel:"noreferrer",children:"TanStack Query"})," ","for a more declarative approach to data fetching. The choice depends on your specific needs."]}),(0,s.jsxs)("p",{children:["With ",(0,s.jsx)("code",{children:"ApiService"}),", handling client-side API calls becomes standardized and easier to maintain. Combined with Next.js API routes, you can seamlessly manage server-side logic and interact with your backend."]})]})]})]})]})},81630:e=>{"use strict";e.exports=require("http")},83997:e=>{"use strict";e.exports=require("tty")},86908:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.camelCase=void 0;var r=/^--[a-zA-Z0-9_-]+$/,s=/-([a-z])/g,a=/^[^-]+$/,n=/^-(webkit|moz|ms|o|khtml)-/,o=/^-(ms)-/,i=function(e,t){return t.toUpperCase()},c=function(e,t){return"".concat(t,"-")};t.camelCase=function(e,t){var l;return(void 0===t&&(t={}),!(l=e)||a.test(l)||r.test(l))?e:(e=e.toLowerCase(),(e=t.reactCompat?e.replace(o,c):e.replace(n,c)).replace(s,i))}},86927:(e,t,r)=>{Promise.resolve().then(r.bind(r,14995))},94735:e=>{"use strict";e.exports=require("events")},95175:(e,t,r)=>{Promise.resolve().then(r.bind(r,79925))}};var t=require("../../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[80,4813,3225,154,3383,474,6060,4075,4325,1335,8920,4127,6847,5459,9314,5077,2707],()=>r(73951));module.exports=s})();