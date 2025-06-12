import{c as B,j as u,D as $,a as V,B as U,b as Y,d as _,e as G,G as R,f as W}from"./dialog.CPynrgQx.js";import{r as J}from"./index.D1DQtlMI.js";/**
 * @license lucide-react v0.477.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K=[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]],Q=B("BookOpen",K);/**
 * @license lucide-react v0.477.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X=[["path",{d:"M19 17V5a2 2 0 0 0-2-2H4",key:"zz82l3"}],["path",{d:"M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3",key:"1ph1d7"}]],Z=B("Scroll",X),k={name:"InvalidComponentArgs",title:"Invalid component arguments.",message:e=>`Invalid arguments passed to${e?` <${e}>`:""} component.`,hint:"Astro components cannot be rendered directly via function call, such as `Component()` or `{items.map(Component)}`."};function ee(e){return e.replace(/\r\n|\r(?!\n)|\n/g,`
`)}function ne(e,n){if(!n||n.line===void 0||n.column===void 0)return"";const r=ee(e).split(`
`).map(t=>t.replace(/\t/g,"  ")),i=[];for(let t=-2;t<=2;t++)r[n.line+t]&&i.push(n.line+t);let s=0;for(const t of i){let a=`> ${t}`;a.length>s&&(s=a.length)}let o="";for(const t of i){const a=t===n.line-1;o+=a?"> ":"  ",o+=`${t+1} | ${r[t]}
`,a&&(o+=`${Array.from({length:s}).join(" ")}  | ${Array.from({length:n.column}).join(" ")}^
`)}return o}class te extends Error{loc;title;hint;frame;type="AstroError";constructor(n,r){const{name:i,title:s,message:o,stack:t,location:a,hint:p,frame:l}=n;super(o,r),this.title=s,this.name=i,o&&(this.message=o),this.stack=t||this.stack,this.loc=a,this.hint=p,this.frame=l}setLocation(n){this.loc=n}setName(n){this.name=n}setMessage(n){this.message=n}setHint(n){this.hint=n}setFrame(n,r){this.frame=ne(n,r)}static is(n){return n.type==="AstroError"}}function re(e){return!(e.length!==3||!e[0]||typeof e[0]!="object")}function H(e,n,r){const i=n?.split("/").pop()?.replace(".astro","")??"",s=(...o)=>{if(!re(o))throw new te({...k,message:k.message(i)});return e(...o)};return Object.defineProperty(s,"name",{value:i,writable:!1}),s.isAstroComponentFactory=!0,s.moduleId=n,s.propagation=r,s}function se(e){return H(e.factory,e.moduleId,e.propagation)}function oe(e,n,r){return typeof e=="function"?H(e,n,r):se(e)}typeof process<"u"&&process.stdout&&process.stdout.isTTY;const{replace:ie}="",ae=/[&<>'"]/g,le={"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"},ce=e=>le[e],ue=e=>ie.call(e,ae,ce);function y(e){return!!e&&typeof e=="object"&&"then"in e&&typeof e.then=="function"}const pe=ue;class I extends String{get[Symbol.toStringTag](){return"HTMLString"}}const A=e=>e instanceof I?e:typeof e=="string"?new I(e):e;function he(e){return Object.prototype.toString.call(e)==="[object HTMLString]"}function fe(e){return A(e)}const me=Symbol.for("astro:render");function de(e){return Object.defineProperty(e,me,{value:!0})}const ge=()=>{};class ye{chunks=[];renderPromise;destination;flushed=!1;constructor(n,r){this.destination=n,this.renderPromise=r(this),y(this.renderPromise)&&Promise.resolve(this.renderPromise).catch(ge)}write(n){this.flushed?this.destination.write(n):this.chunks.push(n)}flush(){if(this.flushed)throw new Error("The render buffer has already been flushed.");this.flushed=!0;for(const n of this.chunks)this.destination.write(n);return this.renderPromise}}function P(e,n){return new ye(e,n)}typeof process<"u"&&Object.prototype.toString.call(process);function be(){return de({type:"maybe-head"})}const q=Symbol.for("astro.renderTemplateResult");class we{[q]=!0;htmlParts;expressions;error;constructor(n,r){this.htmlParts=n,this.error=void 0,this.expressions=r.map(i=>y(i)?Promise.resolve(i).catch(s=>{if(!this.error)throw this.error=s,s}):i)}render(n){const r=this.expressions.map(o=>P(n,t=>{if(o||o===0)return b(t,o)}));let i=0;const s=()=>{for(;i<this.htmlParts.length;){const o=this.htmlParts[i],t=r[i];if(i++,o&&n.write(A(o)),t){const a=t.flush();if(y(a))return a.then(s)}}};return s()}}function ve(e){return typeof e=="object"&&e!==null&&!!e[q]}function xe(e,...n){return new we(e,n)}const M=Symbol.for("astro:slot-string");class Ie extends I{instructions;[M];constructor(n,r){super(n),this.instructions=r,this[M]=!0}}new TextEncoder;new TextDecoder;function Ae(e){return!!e&&typeof e=="object"&&"render"in e&&typeof e.render=="function"}function b(e,n){if(y(n))return n.then(r=>b(e,r));if(n instanceof Ie){e.write(n);return}if(he(n)){e.write(n);return}if(Array.isArray(n))return Se(e,n);if(typeof n=="function")return b(e,n());if(!(!n&&n!==0)){if(typeof n=="string"){e.write(A(pe(n)));return}if(Ae(n)||ve(n)||ke(n))return n.render(e);if(ArrayBuffer.isView(n)){e.write(n);return}if(typeof n=="object"&&(Symbol.asyncIterator in n||Symbol.iterator in n))return Symbol.asyncIterator in n?Te(e,n):Ce(e,n);e.write(n)}}function Se(e,n){const i=n.map(o=>P(e,t=>b(t,o)))[Symbol.iterator](),s=()=>{for(;;){const{value:o,done:t}=i.next();if(t)break;const a=o.flush();if(y(a))return a.then(s)}};return s()}function Ce(e,n){const r=n[Symbol.iterator](),i=()=>{for(;;){const{value:s,done:o}=r.next();if(o)break;const t=b(e,s);if(y(t))return t.then(i)}};return i()}async function Te(e,n){for await(const r of n)await b(e,r)}const Re=Symbol.for("astro.componentInstance");function ke(e){return typeof e=="object"&&e!==null&&!!e[Re]}var j;(function(e){e[e.Include=0]="Include",e[e.None=1]="None"})(j||(j={}));var F;(function(e){e[e.Required=0]="Required",e[e.Ignore=1]="Ignore"})(F||(F={}));var E;(function(e){e[e.Include=0]="Include",e[e.None=1]="None"})(E||(E={}));var L;(function(e){e[e.Required=0]="Required",e[e.Ignore=1]="Ignore"})(L||(L={}));new TextEncoder;new TextDecoder;/*! https://mths.be/cssesc v3.0.0 by @mathias */var x,N;function Me(){if(N)return x;N=1;var e={},n=e.hasOwnProperty,r=function(p,l){if(!p)return l;var d={};for(var f in l)d[f]=n.call(p,f)?p[f]:l[f];return d},i=/[ -,\.\/:-@\[-\^`\{-~]/,s=/[ -,\.\/:-@\[\]\^`\{-~]/,o=/(^|\\+)?(\\[A-F0-9]{1,6})\x20(?![a-fA-F0-9\x20])/g,t=function a(p,l){l=r(l,a.options),l.quotes!="single"&&l.quotes!="double"&&(l.quotes="single");for(var d=l.quotes=="double"?'"':"'",f=l.isIdentifier,S=p.charAt(0),h="",w=0,C=p.length;w<C;){var c=p.charAt(w++),m=c.charCodeAt(),g=void 0;if(m<32||m>126){if(m>=55296&&m<=56319&&w<C){var T=p.charCodeAt(w++);(T&64512)==56320?m=((m&1023)<<10)+(T&1023)+65536:w--}g="\\"+m.toString(16).toUpperCase()+" "}else l.escapeEverything?i.test(c)?g="\\"+c:g="\\"+m.toString(16).toUpperCase()+" ":/[\t\n\f\r\x0B]/.test(c)?g="\\"+m.toString(16).toUpperCase()+" ":c=="\\"||!f&&(c=='"'&&d==c||c=="'"&&d==c)||f&&s.test(c)?g="\\"+c:g=c;h+=g}return f&&(/^-[-\d]/.test(h)?h="\\-"+h.slice(1):/\d/.test(S)&&(h="\\3"+S+" "+h.slice(1))),h=h.replace(o,function(O,v,z){return v&&v.length%2?O:(v||"")+z}),!f&&l.wrap?d+h+d:h};return t.options={escapeEverything:!1,isIdentifier:!1,quotes:"single",wrap:!1},t.version="3.0.0",x=t,x}Me();"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_".split("").reduce((e,n)=>(e[n.charCodeAt(0)]=n,e),[]);"-0123456789_".split("").reduce((e,n)=>(e[n.charCodeAt(0)]=n,e),[]);const je=()=>`<p>Expressions have Meaning.
The Meaning is Contextual.</p>
<p>Programs are Expressions,
Expressions are reducible.
In the crucible of the Interpreter,
the Meaning is deducible.</p>
<p>Syntax is superficial.
Pick one
that’s easy ‘n sensible.
While you’re at it,
it may, for good measure,
be extensible.</p>
<p>Values are what you have,
when Expressions are normalizable.
Identifiable and immutable.
Plain and irreducible,
Their existence, irrefutable.</p>
<p>Semantics is simplificational,
compositional and substitutional.
Depending on what you like,
axiomatic, operational or denotational.</p>
<p>Bindings are persistent,
and lexical.
Those recursive? Circular,
and paradoxical.</p>
<p>For, circularity and self-application,
you conclude, after  some meditation,
are at the heart of
Recursive Functions that are Nameless.
and except when baseless (or tasteless),
are begotten, you realise somewhat later
from  Y, the mysterious
Fixed Point combinator.</p>
<p>Referential transparency,
is not about efficiency.
Young Man!
‘Tis a Call to Reason!
Unlike Assignment,
which is forbidden,
and tantamount to treason!</p>
<p>Still, if Effects is what want you might,
Try this thing called Monadic.
I’m told they’re  tricky to get right,
it’s best when they are sporadic.</p>
<p>Functions are values,
applicable, and higher-order.
It’s what let’s you write
programs that are shorter.</p>
<p>Functions have Types.
Types are polymorphic.
And isomorphic,
to propositions,
that are logical.
Programs are like proofs,
of theorems  mathematical.</p>
<p>The moral of this allegory:
Lambda is a Category,
that is closed and Cartesian.
If you don’t believe me,
check with a logician,
or a type theoretician.</p>
<p>Iteration is Recursion.
Recursion in tail position.
Recursion is Iteration,
just pass the Continuation!</p>
<p>Be warned! In calling with
the current continuation,
exercise considerable caution,
lest there is confusion,
or a catastrophic situation!</p>
<p>An Object is a Closure.
(I learned this from a Hoosier.)
Formals, body and  bindings of
free variables that are mutable.
Methods are functions over Self,
in a position that’s suitable.</p>
<p>Data is algebraic, and inductive.
Processes, co-algebraic, and co-inductive.
Now, just in case,
you find  this
so charming and seductive,
there’s also reasoning
that’s abductive and deductive.</p>
<p>Logic is Magic.
Magic is Logic.
Ask Smullyan, who did both,
besides Puzzles and Music.</p>
<p>Application is Evaluation.
Abstraction is Implication.
Value the destination,
by most estimation.</p>
<p>Alpha is permutable.
Beta, Eta, the ritual.
Lambda, the Ultimate.
and Omega, the perpetual.</p>
<p>”You know its value,
but do you know its cost?”
Laments the Garbage Collector,
(the Solitary Sweeper?)
and borrows from Frost:
The lists are lovely, long and deep,
But I have promised to mark the Heap,
And bytes to go before I sweep.
And bytes to go before I sweep.</p>
<p>Ah, a whole class in verse!
Now, isn’t that perverse?
But,  what is a program,
if not a poem?
At least, this is what
I wish to show ‘em.</p>
<p>I could go on
and on,
waxing along,
right or wrong.
But now it’s time
to close this song.
A functional program
would never be so long.</p>`,Fe={},Ee="/home/gopal/RA/vxc.github.io-revamp/src/pages/fp-poem.md",Le="/fp-poem";function D(){return`   
   
Expressions have Meaning.
The Meaning is Contextual.

Programs are Expressions,
Expressions are reducible.
In the crucible of the Interpreter,
the Meaning is deducible. 

Syntax is superficial.
Pick one
that's easy 'n sensible.
While you're at it, 
it may, for good measure,
be extensible.

Values are what you have,
when Expressions are normalizable. 
Identifiable and immutable.
Plain and irreducible,
Their existence, irrefutable. 

Semantics is simplificational,
compositional and substitutional.
Depending on what you like,
axiomatic, operational or denotational.

Bindings are persistent, 
and lexical.
Those recursive? Circular,
and paradoxical.

For, circularity and self-application,
you conclude, after  some meditation, 
are at the heart of 
Recursive Functions that are Nameless.
and except when baseless (or tasteless),
are begotten, you realise somewhat later
from  Y, the mysterious
Fixed Point combinator.

Referential transparency,
is not about efficiency.
Young Man!
'Tis a Call to Reason!
Unlike Assignment, 
which is forbidden,
and tantamount to treason!

Still, if Effects is what want you might,
Try this thing called Monadic.
I'm told they're  tricky to get right, 
it's best when they are sporadic.

Functions are values,
applicable, and higher-order.
It's what let's you write
programs that are shorter. 

Functions have Types.
Types are polymorphic.
And isomorphic, 
to propositions,
that are logical.
Programs are like proofs, 
of theorems  mathematical.

The moral of this allegory:
Lambda is a Category,
that is closed and Cartesian.
If you don't believe me,
check with a logician,
or a type theoretician.


Iteration is Recursion. 
Recursion in tail position. 
Recursion is Iteration,
just pass the Continuation!

Be warned! In calling with
the current continuation, 
exercise considerable caution, 
lest there is confusion, 
or a catastrophic situation! 

An Object is a Closure.
(I learned this from a Hoosier.)
Formals, body and  bindings of
free variables that are mutable.
Methods are functions over Self,
in a position that's suitable. 

Data is algebraic, and inductive.
Processes, co-algebraic, and co-inductive.
Now, just in case, 
you find  this
so charming and seductive,
there's also reasoning
that's abductive and deductive.

Logic is Magic.
Magic is Logic. 
Ask Smullyan, who did both,
besides Puzzles and Music.


Application is Evaluation.
Abstraction is Implication.
Value the destination,
by most estimation. 

Alpha is permutable.
Beta, Eta, the ritual.
Lambda, the Ultimate.
and Omega, the perpetual.

''You know its value,
but do you know its cost?'' 
Laments the Garbage Collector, 
(the Solitary Sweeper?)
and borrows from Frost:
The lists are lovely, long and deep,
But I have promised to mark the Heap,
And bytes to go before I sweep.
And bytes to go before I sweep.


Ah, a whole class in verse!
Now, isn't that perverse?
But,  what is a program,
if not a poem?
At least, this is what
I wish to show 'em.


I could go on
and on,
waxing along,
right or wrong.
But now it's time
to close this song. 
A functional program 
would never be so long.`}oe((e,n,r)=>{const{layout:i,...s}=Fe;return s.file=Ee,s.url=Le,xe`<meta charset="utf-8">${be()}${fe(je())}`});D().split(`

`).map(e=>({quote:e.trim().replace(/\n/g,"<br />"),source:"Functional Programming for no Rhyme or Reason"}));function He(){J.useState(!1);const e=D();return u.jsxs($,{children:[u.jsx(V,{asChild:!0,children:u.jsxs(U,{variant:"default",children:[u.jsx(Q,{className:"w-4 h-4 mr-2"}),"Read full poem"]})}),u.jsxs(Y,{className:"sm:max-w-4xl max-h-screen",children:[u.jsxs(_,{children:[u.jsxs(G,{className:"flex items-center gap-2",children:[u.jsx(Z,{className:"w-5 h-5"})," ",R.poemName]}),u.jsxs(W,{children:[" ",R.poemDescription," "]})]}),u.jsx("div",{className:"max-h-96 overflow-y-auto pr-4",children:u.jsx("div",{className:"space-y-4",children:u.jsx("pre",{className:"whitespace-pre-wrap font-serif text-sm leading-relaxed text-gray-800 bg-gray-50 p-4 rounded-lg border",children:e})})})]})]})}export{He as PoemDialog};
