(()=>{var e={};e.id=1594,e.ids=[1594],e.modules={1708:e=>{"use strict";e.exports=require("node:process")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},5660:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>n});var o=r(60687),s=r(55840),a=r(88797);let n=()=>(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)("p",{children:["Our template's folder structure closely follows the official"," ",(0,o.jsx)("a",{href:"https://nextjs.org/docs/app/getting-started/project-structure",target:"_blank",children:"Next.js app router structure"})," ","conventions. In this section you will find the basic folder structure and everything you need to get the template up and running. Both the demo and starter versions have the same structure, except that the starter version will have fewer files & folders than the demo version as they are not required in the starter."]}),(0,o.jsx)("p",{children:"Below is a schematic diagram of directory structure:"}),(0,o.jsx)(a.default,{tsCallback:()=>(0,o.jsx)(s.A,{children:`
├── messages                      # Locale messages
|   ├── en.json                   # locale JSON file
|   └── ...                       # Other locale JSON files
├── public                        # Static resource
|   ├── img                       # Images
|   ├── data                      # Static data
|   └── ...                       # Other static files
├── src
│   ├── @types                    # Type files that share across the temeplate
│   │   └── ...                   
│   ├── app                       # Main application directory for Next.js App Router
│   │   ├── (auth-pages)          # Group routes for auth pages
│   │   ├── └── ...               # Auth pages
│   │   ├── └── layout.tsx        # Base layout for auth pages
│   │   ├── (protected-pages)     # Group routes for pages theat require authentication
│   │   ├── ├── ...               # Protected pages
│   │   ├── └── layout.tsx        # Root layout for protected pages
│   │   ├── (public-pages)        # Group routes for public pages
│   │   ├── └── ...               # Public pages
│   │   ├── api                   # API endpoint
│   │   |   └── ...               # API route & files
│   │   favicon.ico               # Favicon
│   │   layout.tsx                # Root layout
│   │   not-found.tsx             # Empty page for 404
│   │   page.tsx                  # Entry page
|   ├── assets                    # App static resource
│   │   ├── maps                  # Map meta data 
│   │   ├── markdown              # Markdown files
│   │   ├── styles                # Global CSS files
│   │   └── svg	                  # SVG files
│   ├── components                # General components
│   │   ├── auth                  # Auth related components
│   │   ├── docs                  # Documentations related components
│   │   ├── layouts               # Layout components
│   │   ├── shared                # Upper level components built on top of ui components
│   │   ├── template              # Template components, such as Header, Footer, Nav, etc...
│   │   ├── ui                    # Bottom level components, such as Button, Dropdown, etc...
│   │   └── view                  # Sharable High level components that used for pages 
│   ├── configs                   # Configuration files        
│   │   └── ...          
│   ├── constants                 # Constant files
│   │   └── ...      
│   ├── i18n                      # Localization setup
│   │   └── ...                   
│   ├── mock                      # Mock data for fake API Calls
│   │   └── data                  # Mock data
│   │   |   └── ...               # Mock data TS files
│   ├── server                    # Server side files
│   │   └── actions               # Server action files
│   │   |   └── ...      				
│   ├── services                  # Service files for managing client API integrations
│   │   ├── ApiService.ts         # Api request & response handler
│   │   ├── axios                 # Axios configs & interceptors
|   |   |   └── ...
│   │   └── ...                   # Other service files
│   ├── utils                     # All reusable function & hooks
│   │   ├── hooks                 # Hooks
│   │   |   └── ...      					
│   │   └── ...                   # Reusable functions 
│   |   auth.ts                   # Next auth setup entry file
│   └── middleware.ts             # Nextjs middleware
├── .env                          # File to stores environment configuration and secrets
├── .eslintignore                 # Ignore file for eslint  
├── .gitignore                    # Ignore file for git
├── .prettierignore               # Ignore file for prettier
├── .prettierrc                   # Prettier config
├── next-env.d.ts                 # Nextjs environment declaration
├── next.config.mjs               # Nextjs configuration file
├── package.json                  
├── package.lock.json            
├── postcss.config.mjs            # PostCss configuration file
├── README.md 
├── tailwind.config.ts            # TailwindCSS configuration file
└── tsconfig.json                 # Project Typescript configuration file
`}),jsCallback:()=>(0,o.jsx)(s.A,{children:`
├── messages                      # Locale messages
|   ├── en.json                   # locale JSON file
|   └── ...                       # Other locale JSON files
├── public                        # Static resource
|   ├── img                       # Images
|   ├── data                      # Static data
|   └── ...                       # Other static files
├── src
│   ├── app                       # Main application directory for Next.js App Router
│   │   ├── (auth-pages)          # Group routes for auth pages
│   │   ├── └── ...               # Auth pages
│   │   ├── └── layout.jsx        # Base layout for auth pages
│   │   ├── (protected-pages)     # Group routes for pages theat require authentication
│   │   ├── ├── ...               # Protected pages
│   │   ├── └── layout.jsx        # Root layout for protected pages
│   │   ├── (public-pages)        # Group routes for public pages
│   │   ├── └── ...               # Public pages
│   │   ├── api                   # API endpoint
│   │   |   └── ...               # API route & files
│   │   favicon.ico               # Favicon
│   │   layout.jsx                # Root layout
│   │   not-found.jsx             # Empty page for 404
│   │   page.jsx                  # Entry page
|   ├── assets                    # App static resource
│   │   ├── maps                  # Map meta data 
│   │   ├── markdown              # Markdown files
│   │   ├── styles                # Global CSS files
│   │   └── svg	                  # SVG files
│   ├── components                # General components
│   │   ├── auth                  # Auth related components
│   │   ├── docs                  # Documentations related components
│   │   ├── layouts               # Layout components
│   │   ├── shared                # Upper level components built on top of ui components
│   │   ├── template              # Template components, such as Header, Footer, Nav, etc...
│   │   ├── ui                    # Bottom level components, such as Button, Dropdown, etc...
│   │   └── view                  # Sharable High level components that used for pages 
│   ├── configs                   # Configuration files        
│   │   └── ...          
│   ├── constants                 # Constant files
│   │   └── ...      
│   ├── i18n                      # Localization setup
│   │   └── ...                   
│   ├── mock                      # Mock data for fake API Calls
│   │   └── data                  # Mock data
│   │   |   └── ...               # Mock data TS files
│   ├── server                    # Server side files
│   │   └── actions               # Server action files
│   │   |   └── ...      				
│   ├── services                  # Service files for managing client API integrations
│   │   ├── ApiService.js         # Api request & response handler
│   │   ├── axios                 # Axios configs & interceptors
|   |   |   └── ...
│   │   └── ...                   # Other service files
│   ├── utils                     # All reusable function & hooks
│   │   ├── hooks                 # Hooks
│   │   |   └── ...      					
│   │   └── ...                   # Reusable functions 
│   |   auth.js                   # Next auth setup entry file
│   └── middleware.js             # Nextjs middleware
├── .env                          # File to stores environment configuration and secrets
├── .eslintignore                 # Ignore file for eslint  
├── .gitignore                    # Ignore file for git
├── .prettierignore               # Ignore file for prettier
├── .prettierrc                   # Prettier config
├── next-env.d.js                 # Nextjs environment declaration
├── next.config.mjs               # Nextjs configuration file
├── package.json                  
├── package.lock.json            
├── postcss.config.mjs            # PostCss configuration file
├── README.md 
├── tailwind.config.js            # TailwindCSS configuration file
└── jsconfig.json                 # Project JavaScript configuration file
`})}),(0,o.jsx)("p",{children:"This folder structure provides a clear organization of resources, components, configuration, and assets, making it easier to manage and scale your project. Each folder and file is purposefully placed to ensure a clean and maintainable codebase."})]})},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},11120:function(e,t,r){"use strict";var o=(this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}})(r(65840)),s=r(86908);function a(e,t){var r={};return e&&"string"==typeof e&&(0,o.default)(e,function(e,o){e&&o&&(r[(0,s.camelCase)(e,t)]=o)}),r}a.default=a,e.exports=a},12412:e=>{"use strict";e.exports=require("assert")},14878:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o});let o=(0,r(12907).registerClientReference)(function(){throw Error("Attempted to call the default export of \"C:\\\\Users\\\\Computer\\\\Documents\\\\Data Ilah\\\\mykenary\\\\travel-web\\\\src\\\\app\\\\(protected-pages)\\\\guide\\\\documentation\\\\folder-structure\\\\page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\(protected-pages)\\guide\\documentation\\folder-structure\\page.tsx","default")},19121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},21820:e=>{"use strict";e.exports=require("os")},27910:e=>{"use strict";e.exports=require("stream")},28354:e=>{"use strict";e.exports=require("util")},29021:e=>{"use strict";e.exports=require("fs")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},32576:(e,t,r)=>{Promise.resolve().then(r.bind(r,14878))},33873:e=>{"use strict";e.exports=require("path")},44517:e=>{var t=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,r=/\n/g,o=/^\s*/,s=/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,a=/^:\s*/,n=/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,i=/^[;\s]*/,c=/^\s+|\s+$/g;function u(e){return e?e.replace(c,""):""}e.exports=function(e,c){if("string"!=typeof e)throw TypeError("First argument must be a string");if(!e)return[];c=c||{};var l=1,p=1;function d(e){var t=e.match(r);t&&(l+=t.length);var o=e.lastIndexOf("\n");p=~o?e.length-o:p+e.length}function f(){var e={line:l,column:p};return function(t){return t.position=new m(e),v(o),t}}function m(e){this.start=e,this.end={line:l,column:p},this.source=c.source}m.prototype.content=e;var g=[];function h(t){var r=Error(c.source+":"+l+":"+p+": "+t);if(r.reason=t,r.filename=c.source,r.line=l,r.column=p,r.source=e,c.silent)g.push(r);else throw r}function v(t){var r=t.exec(e);if(r){var o=r[0];return d(o),e=e.slice(o.length),r}}function x(e){var t;for(e=e||[];t=y();)!1!==t&&e.push(t);return e}function y(){var t=f();if("/"==e.charAt(0)&&"*"==e.charAt(1)){for(var r=2;""!=e.charAt(r)&&("*"!=e.charAt(r)||"/"!=e.charAt(r+1));)++r;if(r+=2,""===e.charAt(r-1))return h("End of comment missing");var o=e.slice(2,r-2);return p+=2,d(o),e=e.slice(r),p+=2,t({type:"comment",comment:o})}}v(o);var b,j=[];for(x(j);b=function(){var e=f(),r=v(s);if(r){if(y(),!v(a))return h("property missing ':'");var o=v(n),c=e({type:"declaration",property:u(r[0].replace(t,"")),value:o?u(o[0].replace(t,"")):""});return v(i),c}}();)!1!==b&&(j.push(b),x(j));return j}},45417:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>n.a,__next_app__:()=>p,pages:()=>l,routeModule:()=>d,tree:()=>u});var o=r(65239),s=r(48088),a=r(88170),n=r.n(a),i=r(30893),c={};for(let e in i)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(c[e]=()=>i[e]);r.d(t,c);let u={children:["",{children:["(protected-pages)",{children:["guide",{children:["documentation",{children:["folder-structure",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,14878)),"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\(protected-pages)\\guide\\documentation\\folder-structure\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,36647)),"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\(protected-pages)\\guide\\documentation\\layout.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,6779)),"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\(protected-pages)\\layout.tsx"],loading:[()=>Promise.resolve().then(r.bind(r,81954)),"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\(protected-pages)\\loading.tsx"],forbidden:[()=>Promise.resolve().then(r.t.bind(r,89999,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(r.t.bind(r,65284,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,18886))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,10305)),"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.bind(r,54413)),"C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\not-found.tsx"],forbidden:[()=>Promise.resolve().then(r.t.bind(r,89999,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(r.t.bind(r,65284,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,18886))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]}.children,l=["C:\\Users\\Computer\\Documents\\Data Ilah\\mykenary\\travel-web\\src\\app\\(protected-pages)\\guide\\documentation\\folder-structure\\page.tsx"],p={require:r,loadChunk:()=>Promise.resolve()},d=new o.AppPageRouteModule({definition:{kind:s.RouteKind.APP_PAGE,page:"/(protected-pages)/guide/documentation/folder-structure/page",pathname:"/guide/documentation/folder-structure",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:u}})},55511:e=>{"use strict";e.exports=require("crypto")},55591:e=>{"use strict";e.exports=require("https")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},65840:function(e,t,r){"use strict";var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var r=null;if(!e||"string"!=typeof e)return r;var o=(0,s.default)(e),a="function"==typeof t;return o.forEach(function(e){if("declaration"===e.type){var o=e.property,s=e.value;a?t(o,s,e):s&&((r=r||{})[o]=s)}}),r};var s=o(r(44517))},73136:e=>{"use strict";e.exports=require("node:url")},74075:e=>{"use strict";e.exports=require("zlib")},76760:e=>{"use strict";e.exports=require("node:path")},79551:e=>{"use strict";e.exports=require("url")},81630:e=>{"use strict";e.exports=require("http")},83997:e=>{"use strict";e.exports=require("tty")},86908:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.camelCase=void 0;var r=/^--[a-zA-Z0-9_-]+$/,o=/-([a-z])/g,s=/^[^-]+$/,a=/^-(webkit|moz|ms|o|khtml)-/,n=/^-(ms)-/,i=function(e,t){return t.toUpperCase()},c=function(e,t){return"".concat(t,"-")};t.camelCase=function(e,t){var u;return(void 0===t&&(t={}),!(u=e)||s.test(u)||r.test(u))?e:(e=e.toLowerCase(),(e=t.reactCompat?e.replace(n,c):e.replace(a,c)).replace(o,i))}},94735:e=>{"use strict";e.exports=require("events")},96128:(e,t,r)=>{Promise.resolve().then(r.bind(r,5660))}};var t=require("../../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[80,4813,3225,154,3383,474,6060,4075,4325,1335,8920,4127,6847,5459,9314,5077,2707],()=>r(45417));module.exports=o})();