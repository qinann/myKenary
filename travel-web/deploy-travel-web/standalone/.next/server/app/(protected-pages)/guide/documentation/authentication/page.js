(()=>{var e={};e.id=2070,e.ids=[2070],e.modules={1708:e=>{"use strict";e.exports=require("node:process")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},11120:function(e,t,r){"use strict";var s=(this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}})(r(65840)),i=r(86908);function n(e,t){var r={};return e&&"string"==typeof e&&(0,s.default)(e,function(e,s){e&&s&&(r[(0,i.camelCase)(e,t)]=s)}),r}n.default=n,e.exports=n},12412:e=>{"use strict";e.exports=require("assert")},19121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},21820:e=>{"use strict";e.exports=require("os")},27910:e=>{"use strict";e.exports=require("stream")},28354:e=>{"use strict";e.exports=require("util")},29021:e=>{"use strict";e.exports=require("fs")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},33873:e=>{"use strict";e.exports=require("path")},44517:e=>{var t=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,r=/\n/g,s=/^\s*/,i=/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,n=/^:\s*/,o=/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,a=/^[;\s]*/,l=/^\s+|\s+$/g;function u(e){return e?e.replace(l,""):""}e.exports=function(e,l){if("string"!=typeof e)throw TypeError("First argument must be a string");if(!e)return[];l=l||{};var d=1,c=1;function h(e){var t=e.match(r);t&&(d+=t.length);var s=e.lastIndexOf("\n");c=~s?e.length-s:c+e.length}function p(){var e={line:d,column:c};return function(t){return t.position=new m(e),v(s),t}}function m(e){this.start=e,this.end={line:d,column:c},this.source=l.source}m.prototype.content=e;var x=[];function f(t){var r=Error(l.source+":"+d+":"+c+": "+t);if(r.reason=t,r.filename=l.source,r.line=d,r.column=c,r.source=e,l.silent)x.push(r);else throw r}function v(t){var r=t.exec(e);if(r){var s=r[0];return h(s),e=e.slice(s.length),r}}function g(e){var t;for(e=e||[];t=j();)!1!==t&&e.push(t);return e}function j(){var t=p();if("/"==e.charAt(0)&&"*"==e.charAt(1)){for(var r=2;""!=e.charAt(r)&&("*"!=e.charAt(r)||"/"!=e.charAt(r+1));)++r;if(r+=2,""===e.charAt(r-1))return f("End of comment missing");var s=e.slice(2,r-2);return c+=2,h(s),e=e.slice(r),c+=2,t({type:"comment",comment:s})}}v(s);var y,b=[];for(g(b);y=function(){var e=p(),r=v(i);if(r){if(j(),!v(n))return f("property missing ':'");var s=v(o),l=e({type:"declaration",property:u(r[0].replace(t,"")),value:s?u(s[0].replace(t,"")):""});return v(a),l}}();)!1!==y&&(b.push(y),g(b));return b}},55511:e=>{"use strict";e.exports=require("crypto")},55591:e=>{"use strict";e.exports=require("https")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},63446:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});let s=(0,r(12907).registerClientReference)(function(){throw Error("Attempted to call the default export of \"C:\\\\Users\\\\Computer\\\\Documents\\\\Data Ilah\\\\mykenary\\\\travel-web\\\\src\\\\app\\\\(protected-pages)\\\\guide\\\\documentation\\\\authentication\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\(protected-pages)\\guide\\documentation\\authentication\\page.tsx","default")},64805:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>o.a,__next_app__:()=>c,pages:()=>d,routeModule:()=>h,tree:()=>u});var s=r(65239),i=r(48088),n=r(88170),o=r.n(n),a=r(30893),l={};for(let e in a)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>a[e]);r.d(t,l);let u={children:["",{children:["(protected-pages)",{children:["guide",{children:["documentation",{children:["authentication",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,63446)),"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\(protected-pages)\\guide\\documentation\\authentication\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,36647)),"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\(protected-pages)\\guide\\documentation\\layout.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,6779)),"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\(protected-pages)\\layout.tsx"],loading:[()=>Promise.resolve().then(r.bind(r,81954)),"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\(protected-pages)\\loading.tsx"],forbidden:[()=>Promise.resolve().then(r.t.bind(r,89999,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(r.t.bind(r,65284,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,18886))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,10305)),"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.bind(r,54413)),"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\not-found.tsx"],forbidden:[()=>Promise.resolve().then(r.t.bind(r,89999,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(r.t.bind(r,65284,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,18886))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]}.children,d=["C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\(protected-pages)\\guide\\documentation\\authentication\\page.tsx"],c={require:r,loadChunk:()=>Promise.resolve()},h=new s.AppPageRouteModule({definition:{kind:i.RouteKind.APP_PAGE,page:"/(protected-pages)/guide/documentation/authentication/page",pathname:"/guide/documentation/authentication",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:u}})},65840:function(e,t,r){"use strict";var s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var r=null;if(!e||"string"!=typeof e)return r;var s=(0,i.default)(e),n="function"==typeof t;return s.forEach(function(e){if("declaration"===e.type){var s=e.property,i=e.value;n?t(s,i,e):i&&((r=r||{})[s]=i)}}),r};var i=s(r(44517))},73136:e=>{"use strict";e.exports=require("node:url")},74075:e=>{"use strict";e.exports=require("zlib")},76760:e=>{"use strict";e.exports=require("node:path")},79551:e=>{"use strict";e.exports=require("url")},81630:e=>{"use strict";e.exports=require("http")},82084:(e,t,r)=>{Promise.resolve().then(r.bind(r,63446))},83997:e=>{"use strict";e.exports=require("tty")},86908:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.camelCase=void 0;var r=/^--[a-zA-Z0-9_-]+$/,s=/-([a-z])/g,i=/^[^-]+$/,n=/^-(webkit|moz|ms|o|khtml)-/,o=/^-(ms)-/,a=function(e,t){return t.toUpperCase()},l=function(e,t){return"".concat(t,"-")};t.camelCase=function(e,t){var u;return(void 0===t&&(t={}),!(u=e)||i.test(u)||r.test(u))?e:(e=e.toLowerCase(),(e=t.reactCompat?e.replace(o,l):e.replace(n,l)).replace(s,a))}},89816:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o});var s=r(60687),i=r(55840),n=r(88797);let o=()=>(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("p",{children:"Ecme uses NextAuth.js as the authentication solution, offering a robust and flexible way to handle user authentication, it supports custom authentication flows and provides a wide range of authentication providers, including Google, GitHub, and more."}),(0,s.jsxs)("div",{className:"mt-10",id:"configuration",children:[(0,s.jsxs)("p",{children:["NextAuth relies on environment variables for secure configuration. By default, our template includes the following variables in the ",(0,s.jsx)("code",{children:".env"})," file:"]}),(0,s.jsx)(i.A,{children:`# Authentication Secret
AUTH_SECRET=your-secret-key

# Base URL for NextAuth callbacks
NEXTAUTH_URL=http://localhost:3007

# OAuth Provider (Google)
GOOGLE_AUTH_CLIENT_ID=your-google-client-id
GOOGLE_AUTH_CLIENT_SECRET=GOCSPX-your-google-secret

# OAuth Provider (Github)
GITHUB_AUTH_CLIENT_ID=your-github-client-id
GITHUB_AUTH_CLIENT_SECRET=your-github-secret`}),(0,s.jsxs)("ul",{children:[(0,s.jsxs)("li",{children:[(0,s.jsx)("strong",{children:(0,s.jsx)("code",{children:"AUTH_SECRET"})}),": A random string used to encrypt session tokens."]}),(0,s.jsxs)("li",{children:[(0,s.jsx)("strong",{children:(0,s.jsx)("code",{children:"NEXTAUTH_URL"})}),": The base URL for your application, used in redirect callbacks. Update this in production to match your deployed domain."]}),(0,s.jsxs)("li",{children:[(0,s.jsxs)("strong",{children:[(0,s.jsx)("code",{children:"GOOGLE_CLIENT_ID"}),",",(0,s.jsx)("code",{children:"GOOGLE_CLIENT_SECRET"}),","," ",(0,s.jsx)("code",{children:"GITHUB_CLIENT_ID"}),",",(0,s.jsx)("code",{children:"GITHUB_CLIENT_SECRET"})]}),", : Credentials for integrating with OAuth."]})]}),(0,s.jsxs)("p",{children:["In our template, the NextAuth configuration is centralized in the ",(0,s.jsx)("code",{children:"auth.config.ts"})," file located in"," ",(0,s.jsx)("code",{children:"src/configs/"}),"This file defines the authentication providers and callback handlers to extend session attributes."]})]}),(0,s.jsxs)("div",{className:"mt-10",id:"credentials",children:[(0,s.jsx)("h5",{children:"Credentials Provider"}),(0,s.jsxs)("p",{children:["The ",(0,s.jsx)("code",{children:"Credentials"})," provider allows custom authentication logic via the authorize method, when the user signs in, the credentials are validated using a backend action ",(0,s.jsx)("code",{children:"validateCredential"}),". If validation passes, the user object is returned; otherwise, null is returned. You can impletment your own user validate logic in"," ",(0,s.jsx)("code",{children:"validateCredential"})," method, it can be an api call or a database query."]}),(0,s.jsx)(n.default,{languages:["jsx","jsx"],tsMarkdown:`\`\`\`tsx
import type { NextAuthConfig } from "next-auth";
import validateCredential from "../server/actions/user/validateCredential";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import type { SignInCredential } from "@/@types/auth";

export default {
    providers: [
        ..., // other providers, e.g., Github, Google
        Credentials({
            async authorize(credentials) {
                /** validate credentials from backend here */
                const user = await validateCredential(credentials as SignInCredential)
                if(!user) {
                    return null
                }

                return {
                    id: user.id,
                    name: user.userName,
                    email: user.email,
                    image: user.avatar,
                };
            },
        }),
    ],
    callbacks: {
        async session(payload) {
            
            /** apply extra user attributes here, for example, we add 'authority' & 'id' in this section */
            return {
                ...payload.session,
                user: {
                  ...payload.session.user,
                  id: payload.token.sub,
                  authority: ['admin', 'user']
                },
            }
        }
    },
} satisfies NextAuthConfig;`,jsMarkdown:`\`\`\`jsx
import type { NextAuthConfig } from "next-auth";
import validateCredential from "../server/actions/user/validateCredential";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export default {
    providers: [
        ..., // other providers, e.g., Github, Google
        Credentials({
            async authorize(credentials) {
                /** validate credentials from backend here */
                const user = await validateCredential(credentials)
                if(!user) {
                    return null
                }

                return {
                    id: user.id,
                    name: user.userName,
                    email: user.email,
                    image: user.avatar,
                };
            },
        }),
    ],
    callbacks: {
        async session(payload) {
            
            /** apply extra user attributes here, for example, we add 'authority' & 'id' in this section */
            return {
                ...payload.session,
                user: {
                  ...payload.session.user,
                  id: payload.token.sub,
                  authority: ['admin', 'user']
                },
            }
        }
    },
} satisfies NextAuthConfig;`})]}),(0,s.jsxs)("div",{className:"mt-10",id:"oauth",children:[(0,s.jsx)("h5",{children:"OAuth Integration"}),(0,s.jsxs)("p",{children:["NextAuth supports a wide range of OAuth providers, you can check out this"," ",(0,s.jsx)("a",{href:"https://authjs.dev/getting-started/authentication/oauth",target:"_blank",children:"link"})," ","for more built in providers NextAuth supports. Below is an example of integrating Google as an OAuth provider."]}),(0,s.jsx)(i.A,{language:"ts",children:`export default {
    providers: [
        Google({
            clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
            clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
        }),
    ]
}`})]}),(0,s.jsxs)("div",{className:"mt-10",id:"session",children:[(0,s.jsx)("h5",{children:"Accessing Sessions on Client and Server"}),(0,s.jsx)("p",{children:"Authentication often requires session management both on the client and server. Our template provides utilities for handling sessions seamlessly in both environments"}),(0,s.jsxs)("ul",{children:[(0,s.jsxs)("li",{children:[(0,s.jsx)("strong",{children:"Client Side:"}),(0,s.jsx)("br",{}),(0,s.jsxs)("p",{children:["While NextAuth provides the ",(0,s.jsx)("code",{children:"useSession"})," ","hook, it has known re-render issues. To address this, we includes a custom session hook called"," ",(0,s.jsx)("code",{children:"useCurrentSession"}),". It provides a same but lesser defects way to manage the session state on the client."]}),(0,s.jsx)(i.A,{language:"jsx",children:`import useCurrentSession from '@/utils/hooks/useCurrentSession';

const Component = () => { 
    const { session } = useCurrentSession();

    return (
        <div>
            {session ? (
                <>
                    <h1>Welcome, {session.user.name}!</h1>
                    <p>Email: {session.user.email}</p>
                </>
            ) : (
                <p>You are not logged in.</p>
            )}
        </div>
    );
};

export default Component`})]}),(0,s.jsxs)("li",{children:[(0,s.jsx)("strong",{children:"Server Side:"}),(0,s.jsx)("br",{}),(0,s.jsxs)("p",{children:["For server-side operations, you can use the"," ",(0,s.jsx)("code",{children:"auth()"})," function to securely retrieve session details. This is particularly useful when you are restricting user access to some routes or pre fetching user data before rendering the page"]}),(0,s.jsx)(i.A,{language:"tsx",children:`import { auth } from "@/auth";

export default async function Page() { 
    const session = await auth();

    if (!session) {
        // Redirect or show an error for unauthenticated users
        return <p>You must be logged in to view this page.</p>;
    }

    return (
        <div>
            <h1>Welcome, {session.user.name}!</h1>
            <p>Your email: {session.user.email}</p>
        </div>
    );
}`})]})]})]}),(0,s.jsxs)("div",{className:"mt-10",id:"removing",children:[(0,s.jsx)("h5",{children:"Removing auth"}),(0,s.jsx)("p",{children:"If you choose not to use NextAuth, follow these steps to remove it:"}),(0,s.jsxs)("ol",{children:[(0,s.jsxs)("li",{children:[(0,s.jsx)("strong",{children:"Uninstall NextAuth:"}),(0,s.jsx)("br",{}),(0,s.jsx)(i.A,{language:"ts",children:"npm uninstall next-auth"})]}),(0,s.jsxs)("li",{children:[(0,s.jsx)("strong",{children:"Remove next auth related files:"}),(0,s.jsx)("br",{}),(0,s.jsxs)("ul",{children:[(0,s.jsxs)("li",{children:["Remove the"," ",(0,s.jsx)("code",{children:"src/configs/auth.config.ts"}),"."]}),(0,s.jsxs)("li",{children:["Delete dynamic API routes at"," ",(0,s.jsx)("code",{children:"pages/api/auth/[...nextauth]"}),"."]}),(0,s.jsxs)("li",{children:["Reset or delete",(0,s.jsx)("i",{children:"(if you do not need routing protection)"})," ",(0,s.jsx)("code",{children:"middleware.ts"}),"."]}),(0,s.jsxs)("li",{children:["Remove all ",(0,s.jsx)("code",{children:"auth()"})," &"," ",(0,s.jsx)("code",{children:"useCurrentSession()"})," implementations from following components:",(0,s.jsxs)("ul",{children:[(0,s.jsx)("li",{children:(0,s.jsx)("code",{children:"app/layout.tsx"})}),(0,s.jsx)("li",{children:(0,s.jsx)("code",{children:"components/template/HorizontalNav.tsx"})}),(0,s.jsx)("li",{children:(0,s.jsx)("code",{children:"components/template/MobileNav.tsx"})}),(0,s.jsx)("li",{children:(0,s.jsx)("code",{children:"components/template/SideNav.tsx"})}),(0,s.jsx)("li",{children:(0,s.jsx)("code",{children:"components/template/UserProfileDropdown.tsx"})}),(0,s.jsx)("li",{children:(0,s.jsx)("code",{children:"components/template/StackeSideNav.tsx"})})]})]})]})]})]}),(0,s.jsx)("p",{children:"By following these steps, you can successfully remove NextAuth from the template and replace it with your preferred authentication method."})]}),(0,s.jsxs)("div",{className:"mt-10",id:"officialDocumentation",children:[(0,s.jsx)("h5",{children:"Official Documentation"}),(0,s.jsxs)("p",{children:["For further details on using NextAuth, visit the"," ",(0,s.jsx)("a",{href:"https://authjs.dev/getting-started/installation?framework=Next.js",target:"_blank",children:"NextAuth.js Documentation"}),"."]})]})]})},94735:e=>{"use strict";e.exports=require("events")},95588:(e,t,r)=>{Promise.resolve().then(r.bind(r,89816))}};var t=require("../../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[80,4813,3225,154,3383,474,6060,4075,4325,1335,8920,4127,6847,5459,9314,5077,2707],()=>r(64805));module.exports=s})();