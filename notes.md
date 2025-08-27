-------- 5.4 --------
React apps are entirely made out of components.
A component has its own data, logic, and appearance (how it works and looks)

-------- 5.5 --------
Nesting components means calling (including) them from the other components. But we never nest function declarations inside each other. We always declare all our components in the top level

-------- 5.6 --------
JSX:
Declarative syntax to describe what components look like and how they work
In practice it means that each component must return one block of JSX.
JSX is is an extension of JavaScript which allows us to combine parts of HTML, CSS and JavaScript all into one block of code.
Each JSX element is converted to a React.createElement function call by Babel. So we could use React without JSX, but that just looks ugly and it's hard to read.

JSX is declarative. It means that we basically describe what UI should look like, based on current data. In contrast, vanilla JS is imperative, and there we manually select DOM elements and traverse the DOM. And we mutate DOM step-by-step.
React is an abstraction away from DOM: we never touch the DOM. Instead, we think of the UI as a reflection of the current data.
Imperative: HOW to do things.
Declarative: WHAT we want.

-------- 5.9 --------
Separation of Concerns
Before the rise of SPAs (single-page applications) we basically had one technology per file. So that was the "Traditional" separation of concerns.
But then JS became more in charge of HTML. Logic and UI are tightly coupled, so why keep them separated? => React components + JSX
So content and logic are tightly coupled together and so it makes sense that they are co-located here. And co-located simply means that things that change together should be located as close as possible together. And in the case of React apps, that means that instead of one technology per file, we have one component per file.

-------- 5.10 --------
WRONG:

<footer class="footer">

RIGHT:

<footer className="footer">

-------- 5.12 --------
Props are used to pass data from parent components to child components (down the component tree).
With props, parent components control how child components look and work.
Anything can be passed as props: we can pass single values, arrays, objects, functions and even other React components.
Component's data consists of props and state. State is basically internal component data that can be updated by the component's logic (by the component itself). And props is data coming from the outside, it can only be updated by the parent component.
Props are immutable. They're read only.
If you need to mutate props, you actually need state.
That's because mutating props would affect parent, creating side effects.
And React is all about pure functions without side-effects.
In general in React a component should never mutate any data that we write outside of its function scope.
React uses one-way data flow. So data can flow from parents to children, but never the opposite way.

-------- 5.14 --------
JSX works essentially just like HTML. However, we can enter a JavaScript mode by using curly braces anywhere in the markup where a value like text or an attribute is expected.
We can place JS expressions inside {}. For example: reference variables, arrays, objects, [].map(), ternary operator.
Statements are not allowed (if / else, for, switch).
JSX produces a JS expression.
We can place other pieces of JSX inside {}.
We can write JSX anywhere inside a component (in if / else, assign to variables, pass it into functions).
JSX can only have one root element. If you need more, use <React.Fragment> (see below, in 5.21)
DIFFERENCES BETWEEN JSX AND SHTML

- className instead of HTML's class
- htmlFor instead of HTML's for
- Every tag needs to be closed. Examples: <img /> or <br />
- All event handlers and other properties need to be camelCased. Examples: onClick or onMouseOver
- Exception: aria-_ and data-_ are written with dashes like in HTML
- CSS inline styles are written like this: {{<style>}} (to reference a variable, and then an object)
- CSS property names are also camelCased
- Comments need to be in {} (because they are JS)

-------- 5.20 --------
function Order({ closeHour, openHour }) {
return (

<p>
We're open from {openHour}:00 to {closeHour}:00. Come visit us or order
online.
</p>
);
}

is basically a short version of

function Order(props) {
return (

<p>
We're open from {props.openHour}:00 to {props.closeHour}:00. Come visit us or order
online.
</p>
);
}
It uses destructuring.

-------- 5.21 --------
React Fragment is this element: <></> or, the longer version, that allows to include a key: <React.Fragment key="somKeyHere"></React.Fragment>. You can wrap several elements into it and then the function will return several html nodes as if they have no wrapper at all. So basically it enables us to return several elements from a component.

-------- 6.3 --------
onClick={() => alert("previous")}
Here inside of {} should be a function, not a function call. Otherwise it'll be called immediately as the page loads.
So, for example, it should be like this: onClick={handlePrevious} or this: onClick={() => alert("next")}
Neither this: onClick={handlePrevious()} nor this: onClick={alert("next")}

Event handler functions can be written inside of a function declaring the component, like this:
export default function App() {
function handlePrevious() {}

return (...);
}

-------- 6.4 --------
So state is basically data that a component can hold over time, and we use it for information that the component needs to remember throughout its lifecycle. Therefore, we can think of state as being the memory of a component.
Some examples: notification count, text content of an input field or the active tab in a tabbed component. It can also be a bit more complex data, for example, the content of a shopping cart.
"State variable" or a "piece of state" is a single variable in a component (component state).
And "state" is like the entire condition of the component at a certain point in time.
So, state === all pieces of state together.

Updating component state triggers React to re-render the component, so to create a new Component View.
Component View is basically just the component visually rendered on the screen.
State allows developers to:
Update the component's view by rerendering the component.
Persist local variables between multiple renders and rerenders.

-------- 6.5 --------
const [step, setStep] = useState(1);
useState returns an array with two things:
[0] step - is a variable
[1] setStep - function to update step
1 - default value that is assigned to [0] step

useState function is a hook. Hooks start with "use" keyword.
We can only call hooks like use state on the top level of the function.

We should really only update state using setter function. So not manually.

-------- 6.7 --------
A component is re-rendered when its state is updated.
We change state -> React re-renders component -> View will be replace with a new one.
So to update the view we need to update the state.
React is called this way because it reacts to state changes by re-rendering the UI.

-------- 6.10 --------
WRONG and won't work twice:
setStep(step + 1);
setStep(step + 1);

RIGHT, works as expected:
setStep((s) => s + 1);
setStep((s) => s + 1);

We need to do this when we update the state by using the current value of the state.

-------- 6.11 --------
Each component has and manages its own state, no matter how many times we render the same component. So, for example, if we have several <Item /><Item /><Item /> on the page, each of them will have its own state that won't affect the state of others. The entire UI is always a representation of all the current states in all components. A React application is fundamentally all about changing state over time and of course also correctly displaying that state at all times.

PRACTICAL GUIDELINES ABOUT STATE

Use a state variable for any data that the component should keep track of ("remember") over
time. This is data that will change at some point. In Vanilla JS, that's a let variable, or an [] or {}

Whenever you want something in the component to be dynamic, create a piece of state related
to that "thing", and update the state when the "thing" should change (aka "be dynamic")
Example: A modal window can be open or closed. So we create a state variable
isOpen that tracks whether the modal is open or not. On isOpen = true we
display the window, on isOpen = false we hide it.

If you want to change the way a component looks, or the data it displays, update its state.
This usually happens in an event handler function.

When building a component, imagine its view as a reflection of state changing over time

For data that should not trigger component re-renders, don't use state. Use a regular variable
instead. This is a common beginner mistake.

-------- 6.19 --------
State is internal data. So data that is owned by the component in which it is declared. State can be thought of as the components memory because it can hold data over time. State can be updated by the component itself. This will then cause the component to be rerendered by react.

Props is external data. So data that is owned by the parent component and you can think of props as function parameters, as a communication channel between parent and child components where parents can pass data into children. When the child component receives new updated props that will actually also cause the component to rerender.

So in conclusion, whenever a piece of state is passed as a prop, when that state updates, both components are re-rendered.

STATE PROPS

Internal data, owned by External data, owned by
component parent component

Component "memory" Similar to function  
 parameters

Can be updated by the Read-only
component itself

Updating state causes Receiving new props causes
component to re-render component to re-render.
Usually when the parent's
state has been updated

Used to make components Used by parent to configure
interactive child component ("settings")

-------- 7.3 --------
State management: Deciding when to create pieces of
state, what types of state are necessary, where to place
each piece of state, and how data flows through the app.

LOCAL STATE

- State needed only by one or few components
- State that is defined in a component and only
  that component and child components have
  access to it (by passing via props)

GLOBAL STATE

- State that many components might need
- Shared state that is accessible to every
  component in the entire application

-------- 7.5 --------
We can call the technique of passing down a setter function "child to parent communication" or also "inverse data flow". Inverse, because usually data only flows down. But here we have a trick that allows us to basically have the data flowing up as well.

-------- 8.6 --------
The basic attachment of input:
function Input() {
const [name, setName] = useState();

return (
<input
type="text"
value={name}
onChange={(e) => setName(e.target.value)}
/>
);
}

-------- 10.3 --------
A component that is too large does too many things and has too many responsibilities. It receives too many props (> 10). The're hard to reuse. The code is very complex.
Components that are too small create a confusing codebase with hundreds of mini-components. The codebase would be too abstracted.
The 4 criteria for splitting a UI into components:

1. Logical separation of content/layout
2. Reusability
3. Responsibilities / complexity
4. Personal coding style

When to create a new component?
Start with a big component and split it into smaller ones when it becomes necessary.
You might need a new component if:

- The component contains pieces of content or layout that don't belong together.
- It's possible to reuse part of the component
- You want / need to reuse part of a component
- The component is doing too many different things
- The component relies on too many props
- The component has too many pieces of state and/or effects?
- The code, including JSX, is too complex/confusing
- You prefer smaller functions / components

! Be aware that creating a new component creates a new abstraction. Abstractions have a cost, because more abstractions require more mental energy to switch back and forth between components. So try not to create new components too early.
! Name a component according to what it does or what it displays. Don't be afraid of using long component names
! Never declare a new component inside another component!
! Co-locate related components inside the same file. Don't separate components into different files too early
! It's completely normal that an app has components of many different sizes, including very small and huge ones

The smaller components are - the more reusable they are.

-------- 10.5 --------
Most of the components in React fall into one of three categories:

- Stateless / presentational components
  These don't have any state. They get some props and then simply present the data & other content. The're usually small and reusable.
- Stateful components
  They have state. Can be reusable.
- Structural components
  "Pages", "layouts" or "screens" of the app. They're the result of composition. They can be huge and non-reusable (but they don't have to).

-------- 10.7 --------

> > Using a component:

    function Modal() {
      return (
        <div className="modal">
          <Success />
        </div>
      )
    }

    function Success() {
      return <p>Well done !</p>;
    }

> > Component composition:

    function Modal({ children }) {
      return (
        <div className="modal">
          {children}
        </div>
      )
    }

    function Success() {
      return <p>Well done !< /p>;
    }

It is used like this:
<Modal>
<Success />
</Modal>

So component composition is combining different components using the children prop (or explicitly defined props)
With component composition, we can:

1. Create highly reusable and flexible components
2. Fix prop drilling (great for layouts)

-------- 10.10 --------
Implicitly passing in the component:
<Box>
<MovieList movies={movies} />
</Box>

function Box({ children }) {
return <div>{ children }</div>
}

OR

Explicitly passing in the component:

<Box element={<MovieList movies={movies} />} />
function Box({ element }) {
return <div>{ element }</div>
}

They both work the same, but with explicit passing you can give the element different names and place them in different places of your code.

-------- 10.14 --------
Every component is created by someone and consumed by someone.
In a way, we can think of components' props as public API of the component

Having too little props:

- Not flexible enough
- Might not be useful

Having too many props:

- Too hard to use
- Exposing too much complexity
- Hard-to-write code
- If you have to do this, provide good default values

We need to find the right balance between too little and too many props, that works for both the consumer and the creator.

-------- 11.03 --------
Component:

- Description of a piece of UI
- A component is a function that returns React elements (element tree), usually written as JSX
- "Blueprint" or "Template"

Component instance:

- Instances are created when we "use" components
- React internally calls the component as many times as needed
- Actual "physical" manifestation of a component
- Has its own state and props
- Has a lifecycle (can "be born", "live", and "die")
- Returns a React element

React element:

- JSX is converted to React.createElement() function calls
- A React element is the result of these function calls
- Basically a big immutable JS object that React keeps in memory
- Information necessary to create DOM elements
- Then it's inserted to DOM as a DOM Element (HTML)

DOM Element (HTML)

- Actual visual representation of the component instance in the browser

-------- 11.04 --------
Symbols (JS primitive) cannot be transmitted via JSON. So React uses them in React elements in order to protect us from getting a fake React element from a malware API.
In theory, we can call a component directly, like this:
SomeComponent()
instead of this:
<SomeComponent />
But then React won't see it as a component instance, but as a raw React element. The sate will go to the parent element, so basically it will not work as expected. So never do this.

-------- 11.05 --------
Component -> Component instance -> React Element -> DOM Element (HTML) -> User interface on the screen.

1️⃣ Render is triggered (by updating state somewhere)
⬇️
2️⃣ Render Phase (React calls component functions and figures out how DOM should be updated)
⬇️
3️⃣ Commit Phase (React actually writes to the DOM, updating, inserting, and deleting elements)
⬇️
4️⃣ Browser paint

In React, rendering is NOT updating the DOM or displaying elements on the screen. Rendering only happens internally inside React, it does not produce visual changes.
What we traditionally call rendering happens in two phases in React: render + commit phase.

1️⃣ Render is triggered
THE TWO SITUATIONS THAT TRIGGER RENDERS:

1. Initial render of the application
2. State is updated in one or more component instances (re-render)

- The render process is triggered for the entire application. But that doesn't meant that everything gets recreated in the DOM. It just means that the process of calling the component functions starts.
- In practice, it looks like React only re-renders the component where the state update happens, but that's not how it works behind the scenes
- Renders are not triggered immediately, but scheduled for when the JS engine has some "free time". There is also batching of multiple setState calls in event handlers

-------- 11.06 --------
2️⃣ Render Phase (done by React)
Component instances that triggered re-render
At the beginning of the render phase, React will go through the entire component tree, take all the component instances that triggered a re-render and actually render them, i.e call the corresponding component functions that we've written in our code.
⬇️
React Elements
This creates updated React elements which all together make up the so-called "new virtual DOM". It contains the old elements, the updated element and the updated children of the updated element.
⬇️
New Virtual DOM
⬇️
Reconciliation + Diffing with the current so-called Fiber tree as it exists before the state update.
⬇️
Updated Fiber tree
⬇️
List of DOM updates
⬇️
...

The Virtual DOM:
It is a tree of all React elements created from all instances in the component tree. It's cheap and fast to create multiple trees. Basically it's just an object with information about what to create. 1) Initial render
Component tree -> React element tree 2) Re-renders
Rendering a component will cause all of its child components to be rendered as well (no matter if props changed or not). It is necessary because React doesn't know whether children will be affected.

React reconciler is called "Fiber".

What is reconciliation and why do we need it?
We need it because:

- Updating the entire DOM is inefficient and wasteful:
  1. Writing to the DOM is (relatively) slow.
  2. Usually only a small part of the DOM needs to be updated.
- React reuses as much of the existing DOM as possible
  It uses Reconciliation: Deciding which DOM elements actually need to be inserted, deleted, or updated, in order to reflect the latest state changes.

Reconciliation is processed by a reconciler, and we can say that the reconciler really is the engine of React, the heart of React.

The reconciler: Fiber.
The Fiber takes the whole React element tree (virtual DOM) and based on it builds a fiber tree.
Fiber tree is an internal tree that has a "fiber" for each component instance and DOM element.
Fibers are NOT re-created on every render. Fiber tree is never destroyed. Instead, it's a mutable data structure. It is created during the initial render and then it mutates over and over again.
So fibers ("units of work") keep track of things like current component state, props, side effects, used hooks, etc. It also contains queue of work to do.
Fiber tree doesn't have the usual parent-children structure. It has a structure of a linked list, where each first child has a link to its parent and all the other children that have a link to their previous sibling.
Fiber tree contains both React components and DOM elements, so it is a complete representation of the entire DOM structure.
Work can be done asynchronously, so rendering process can be split into chinks, tasks can be prioritized, and work can be paused, reused, or thrown away. - It enables concurrent features like Suspense or transitions. - Long renders won't block JS engine.
Reconciliation in action.
Whenever reconciliation needs to happen, fiber walks through the entire tree step by step and analyzes what needs to change between the current fiber tree and the updated fiber tree based on the virtual DOM.
This process of comparing elements step by step based on their position in the tree is called Diffing.
Some elements will be updated, some will be deleted and some will stay the same. All these mutations will then be placed into a list called "the list of effects", which will be used in the next phase.

-------- 11.07 --------
3️⃣ Commit Phase (done by ReactDOM)
...
⬇️
List of DOM updates
⬇️
Updated DOM
⬇️
...

- React writes to the DOM: insertions, deletions, and updates (list of DOM updates are "flushed" to the DOM).
- Committing is synchronous: DOM is updated in one go, it can't be interrupted. This is necessary so that the DOM never shows partial results, ensuring a consistent UI (in sync with state at all times)
- After the commit phase completes, the workInProgress fiber tree becomes the current tree for the next render cycle.

4️⃣ Browser paint (done by the browser)
...
⬇️
Updated UI on the screen

React doesn't touch the DOM. React only renders. It doesn't know where the render result will go.
React can be used on different platforms ("hosts"). For example, we can build native mobile applications for iOS and Android using React Native. Or we can build videos with React using a package called Remotion. Or we can create all sorts of things like Word or PDF documents, Figma designs, and many more using different so-called renderers. (Terrible name, because renderers don't render, they commit the result of render phase).
That's why it's better to call virtual DOM a React Element tree.
And that's why in index.js we import both React and ReactDom

-------- 11.08 --------
How diffing works:
Diffing uses 2 fundamental assumptions (rules):

1. Two elements of different types will produce different trees.
2. Elements with a stable key prop stay the same across renders.
   Diffing is comparing elements step by step between rwo renders bsed on their position in the tree.

Two situations:

1. Same position, DIFFERENT element (DOM element / React element)

   - React assumes entire sub-tree is no longer valid
   - Old components are destroyed and removed from DOM including state.
   - Tree might be rebuilt if children stayed the same (state is reset)

2. Same position, SAME element

   - Element will be kept (as well as child elements), including state.
   - New props / attributes are passed if they changed between renders
   - Sometimes this is not what we want. Then we can use the key prop.

-------- 11.10 --------
Key prop:

- Special prop that we use to tell the diffing algorithm that an element is unique
- Allows React to distinguish between multiple instances of the same component type
- When a key stays the same across renders, the element will be kept in the DOM (even if the position in the tree changes)
  1. Using keys in lists
- When a key changes between renders, the element will be destroyed and a new one will be created (even if the position in the tree is the same as before) 2. Using keys to reset state

1. Using keys in lists [stable key]

- If they don't have a key, the same elements if they are moved to a different position, will be removed and recreated in the DOM (bad for performance)
- If they do have keys, the keys will stay the same, so even if they're in a different position React will keep them in the DOM

2. Key prop to reset state [changing key]

- We can pass in a different key to force React to recognize an element as a different one. This will reset the state. So when we need to reset state, we need to make sure that we give the element a key and that the key changes across renders.

-------- 11.13 --------
The two types of logic in React components.

1. Render logic

- Code that lives at the top level of the component function
- Participates in describing how the component view looks like
- Executed every time the component renders.

2. Event handler functions

- Executed as a consequence of the event that the handler is listening for.
- Code that actually does things: update state, perform an HTTP request, read an input field, navigate to another page, etc.

Functional programming principles:

- Side effect: dependency on or modification of any data outside the function scope. "Interaction with the outside world". Examples: mutating external variables, HTTP requests, writing to DOM.
  Side effects are not bad! A program can only be useful if it has some interaction with the outside world
- Pure function: a function that has no side effects.
  Does not change any variables outside its scope. Given the same input, a pure function always returns the same output

Rules for render logic:

- Components must be pure when it comes to render logic: given the same props(input), a component instance should always return the same JSX (output)
- Render logic must produce no side effects: no interaction with the "outside world" is allowed. So, in render logic:
  - Do NOT perform network requests (API calls)
  - Do NOT start timers
  - Do NOT directly use the DOM API
  - Do NOT mutate objects of variables outside of the function scope (This is why we can't mutate props!)
  - Do NOT update state (or refs): this will create an infinite loop!
  - Side effects are allowed (and encouraged) in event handler functions! There is also a special hook to register side effects (useEffect)

-------- 11.14 --------
How state updates ar batched:
There is batching of multiple setState calls in event handlers.
If an event handler causes several state updates, they will get batched into just one state update for the entire event handler. So updating multiple pieces of state won't immediately cause a rerender for each update. Only after the state updates are batched then React will trigger one single render and commit. Therefore there are no wasted renders, which is better for performance. But this can also have surprising results.
Updating state is asynchronous.
So within an event handler even if we change state, it is still "stale" until the component rerenders, so if we try to access it - we'll get the old state.

- Updated state variables are not immediately available after setState call, but only after the re-render
- This also applies when only one state variable is updated
- If we need to update state based on previous update, we use setState with callback (setAnswer (answer=> ... ))

We can opt out of automatic batching by wrapping a state update in ReactDOM.flushSync() (but you'll never need this)

-------- 11.15 --------
If we try to update the state, but it doesn't change (we set it to what it is) then React won't re-render the component.
Whenever we update state based on the current state, we should always use a callback function.
For example:
// Will only add 1, not 3
setLikes(likes + 1);
setLikes(likes + 1);
setLikes(likes + 1);

    // Will add 3
    setLikes((likes) => likes + 1);
    setLikes((likes) => likes + 1);
    setLikes((likes) => likes + 1);

-------- 11.16 --------
Event propagation and delegation:

1. Capturing phase ( travels from the Document DOM element down to the target element )
2. Target element
3. Bubbling phase ( travels up to the Document DOM element from the target element )

- By default, event handlers listen to events on the target and during the bubbling phase.
- We can prevent bubbling with e.stopPropagation()

Event delegation:

- Handling events for multiple elements centrally in one single parent element
- Better for performance and memory, as it needs only one handler function

1. Add handler to parent
2. Check for target element (e.target)
3. If target is one of the needed elements,handle the event

How React handles events:
React registers all event handlers on the root DOM container (usually div#root, but can be any DOM element). This is where all events are handled.
So this:
<button
className="btn"
onClick={() =setLoading(true)}
/>
Will result in this:
document
.querySelector('#root')
.addEventListener(
'click',
() => setLoading(true)
);
So behind the scenes, React performs event delegation for all events in our applications.

Synthetic events:

- Wrapper around the DOM's native event object.
- It has same interface as native event objects, like stopPropagation() and preventDefault().
- Fixes browser inconsistencies, so that events work in the exact same way in all browsers
- Most synthetic events bubble (including focus, blur, and change), except for scroll

Event handlers in React VS JavaScript:

- Attributes for event handlers are named using camelCase (onClick instead of onclick or click)
- Default behavior can NOT be prevented by returning false (only by using preventDefault())
- Attach "Capture" if you need to handle during capture phase (example: onClickCapture)

-------- 11.17 --------
An analogy:
Framework "All-in-one kit" (Angular / Vue / Svelte)

- Ease of mind: All ingredients are included

* No choice: You're stuck with the kit's ingredients

- Ease of mind: Everything you need to build a complete application is included in the framework ("batteries included")

* No choice: You're stuck with the framework's tools and conventions (which is not always bad!)

Library "Separate ingredients" (React):

- Freedom: You can choose the best ingredients

* Decision fatigue: You need to research and buy all ingredients separately

- Freedom: You can (or need to) choose multiple 3rd-party libraries to build a complete application

* Decision fatigue: You need to research, download, learn, and stay up-to-date with multiple external libraries

React has a huge 3rd-party library ecosystem:
1 Routing (for SPAs)
2 HTTP requests
3 Remote state management
4 Global state management
5 Styling
6 Form management
7 Animations/transitions
8 UI components

Opinionated frameworks built on top of React like Next.js, Remix, Gatsby include a lot of the important stuff out of the box.

React frameworks offer many other features: server-side rendering (SSR), static site generation (SSG), better developer experience (DX), etc. Many of these frameworks are full-stack.

-------- 11.18 --------
Practical summary:
A component (function Question()) is like a blueprint for a piece of UI that will eventually exist on the screen. When we "use" a component, React creates a component instance (<Question />), which is like an actual physical manifestation of a component, containing props, state, and more. A component instance, when rendered, will return a React element.

"Rendering" only means calling component functions and calculating what DOM elements need to be inserted, deleted, or updated. It has nothing to do with writing to the DOM. Therefore, each time a component instance is rendered and re-rendered, the function is called again.

Only the initial app render and state updates can cause a render, which happens for the entire application, not just one single component.

When a component instance gets re-rendered, all its children will get re-rendered as well. This doesn't mean that all children will get updated in the DOM, thanks to reconciliation, which checks which elements have actually changed between two renders. But all this re-rendering can still have an impact on performance.

Diffing is how React decides which DOM elements need to be added or modified. If, between renders, a certain React element stays at the same position in the element tree, the corresponding DOM element and component state will stay the same. If the element changed to a different position, or if it's a different element type, the DOM element and state will be destroyed.

Giving elements a key prop allows React to distinguish between multiple component instances. When a key stays the same across renders, the element is kept in the DOM. This is why we need to use keys in lists. When we change the key between renders, the DOM element will be destroyed and rebuilt. We use this as a trick to reset state.

Never declare a new component inside another component! Doing so will re-create the nested component every time the parent component re-renders. React will always see the nested component as new, and therefore reset its state each time the parent state is updated.

The logic that produces JSX output for a component instance ("render logic") is not allowed to produce any side effects: no API calls, no timers, no object or variable mutations, no state updates. Side effects are allowed in event handlers and useEffect.

The DOM is updated in the commit phase, but not by React, but by a "renderer" called ReactDOM. That's why we always need to include both libraries in a React web app project. We can use other renderers to use React on different platforms, for example to build mobile or native apps.

Multiple state updates inside an event handler function are batched, so they happen all at once, causing only one re-render. This means we can not access a state variable immediately after updating it: state updates are asynchronous. Since React 18, batching also happens in timeouts, promises, and native event handlers.

When using events in event handlers, we get access to a synthetic event object, not the browser's native object, so that events work the same way across all browsers. The difference is that most synthetic events bubble, including focus, blur, and change, which do not bubble as native browser events. Only the scroll event does not bubble.

React is a library, not a framework. This means that you can assemble your application using your favorite third-party libraries. The downside is that you need to find and learn all these additional libraries.

-------- 12.02 --------
Component (instance) lifecycle

🐣 Mount / initial render (component is born)

- Component instance is rendered for the first time
- Fresh state and props are created
  🐔 Re-render (optional) happens when:
- State changes
- Props change
- Parent re-renders
- Context changes
  💀 Unmount (component dies)
- Component instance is destroyed and removed
- State and props are destroyed

We can define code to run at these specific points in time.

-------- 12.04 --------
useEffect(() => {}, []) will run after the element mounts.
useEffect will execute after render, so after the component has been painted.

-------- 12.05 --------
A side effect is basically any "interaction between a React component and the world outside the component". We can also think of a side as "code that actually does something". Examples: Data fetching, setting up subscriptions, setting up timers, manually accessing the DOM, etc.

We need side effects all the time. They make our applications do something. But we don't use them in render logic!
Side effects can be made in:
Event handlers
They are triggered by events: onClick, onSubmit, etc.
Effects (useEffect)
They are triggered by rendering. Effects allow us to write code that will run at different moments: mount, re-render, or unmount.

When to use event handles and effects?
Event handlers:

- Executed when the corresponding event happens.
- Used to react to an event
- Preferred way of creating side effects!
  Effects (useEffect):
- Executed after the component mounts (initial render), and after subsequent re-renders (according to dependency array)
- Used to keep a component synchronized with some external system (i.e API movie data)
  Effects have three parts:
- effect
- dependency array
- cleanup function - it will be called before the component rerenders or unmounts.

-------- 12.06 --------
In React's strict mode in development the effects will be called twice, not once.

-------- 12.09 --------
What's the useEffect dependency array?

- By default, effects run after every render. We can prevent that by passing a dependency array
- Without the dependency array, React doesn't know when to run the effect
- Each time one of the dependencies changes, the effect will be executed again
- Every state variable and prop used inside the effect MUST be included in the dependency array (Otherwise, we get a "stale closure")

The mechanics of effects:

- useEffect is like an event listener that is listening for one dependency to change. Whenever a dependency changes, it will execute the effect again.
- Effects react to updates to state and props used inside the effect (the dependencies). So effects are "reactive" (like state updates re-rendering the UI)

useEffect is a synchronization mechanism.

Synchronization and lifecycle:
Dependency ( state or props changes)
⬇️ ⬇️
Effect is Component is
executed again re-rendered
Effects and component lifecycle are deeply connected.

We can use the dependency array to run effects when the component renders or re-renders.

useEffect(fn, [x , y, z])
🔁 Effect synchronizes with x, y, and z
🐣 Runs on mount and re-renders triggered by updating x, y, or z

useEffect(fn, [])
🔁 Effect synchronizes with NO state/props
🐣 Runs only on mount (initial render)

useEffect(fn)
🔁 Effect synchronizes with everything
🐣 Runs on every render (usually bad!)

When are effects executed?
Mount (initial render)
Commit
Browser paint
Effect ✨ (If an effect sets state, an additional render will be required)

Title (or any dependency) changes
Re-render
Commit
Layout effect (Another type of effect that is very rarely necessary (useLayoutEffect))
Browser paint
Cleanup🧹
Effect ✨

Unmount
Cleanup🧹

-------- 12.10 --------
useEffect(function () {
console.log("After the initial render");
}, []);

useEffect(function () {
console.log("After every render");
});

console.log("During render");

useEffect(
function () {
console.log("After every state update");
},
[query]
);

-------- 12.15 --------
useEffect cleanup function:

- Function that we can return from an effect (optional)
- Runs on two different occasions:
  1. Before the effect is executed again
  2. After a component has unmounted
- Necessary whenever the side effect keeps happening after the component has been re-rendered or unmounted.
- Each effect should do only one thing! Use one useEffect hook for each side effect. This makes effects easier to clean up/

Component renders -> Execute effect if dependency array includes updated data.
Component unmounts -> Execute cleanup function.

Examples (effect -> potential cleanup):
HTTP request -> Cancel request
API subscription -> Cancel subscription
Start timer -> Stop timer
Add event listener -> Remove listener

-------- 12.16 --------
When the cleanup function runs after the component has been unmounted and destroyed, it still remembers all the necessary values because of closure. So it remembers all the values that existed when the function was created (and that was before the component was destroyed).

-------- 12.17 --------
Race condition happens when we make a lot of API calls and they end up "racing" each other, anf we don't know which one will arrive first.
If we do HTTP requests, we always need to use cleanup functions to cancel previous request when we make a new one. This will help us avoid race condition and will improve network speed.

-------- 13.02 --------
React hooks:

- Special built-in functions that allow us to "hook" into React internals:
  - Creating and accessing state from Fiber tree
  - Registering side effects in Fiber tree
  - Manual DOM selections
  - Many more ...
- Always start with "use" (useState, useEffect, etc.)
- Enable easy reusing of non-visual logic: we can compose multiple hooks into our own custom hooks
- Give function components the ability to own state and run side effects at different lifecycle points (before v16.8 only available in class components)

Rules of hooks (they are automatically enforced by React's ESlint rules):

1. Only call hooks at the top level

- Do NOT call hooks inside conditionals, loops, nested functions, or after an early return
- This is necessary to ensure that hooks are always called in the same order (hooks rely on this)

2. Only call hooks from react functions

- Only call hooks inside a function component or a custom hook.

-------- 13.04 --------
The initial state like this one
const [isTop, setIsTop] = useState(imdbRating > 8);
only matter when the component initially renders and won't change during re-renders.

We can change that by using the useEffect hook and call setIsTop(imdbRating > 8) each time imdbRating is changed. But that doesn't make much sense, because we can then simply use derived state like this:
const isTop = imdbRating > 8;

-------- 13.05 --------
We should pass a function into the useState hook, and not call it.
So we should do this:
const [watched, setWatched] = useState(function () {
const storedValue = localStorage.getItem("watched");
return JSON.parse(storedValue);
});
not this:
const [watched, setWatched] = useState(localStorage.getItem("watched"));
Because if we call the function, React will call it each time that the component is rendered, whereas if we pass the function in, React will only call once, when the component first mounts.

-------- 13.06 --------
Creating state:

- Simple
  const [count, setCount] = useState(23);
- Based on function (lazy evaluation)
  const [count, setCount] = useState(
  () => localStorage.getItem("count")
  );
  ❗Functions must be pure and accept no arguments. Called only on initial render.
  Updating state:
- Simple
  setCount(1000);
- Based on current state
  setCount((c) => c + 1);
  ❗Function must be pure ant return next state.
  ❗Make sure to NOT mutate objects or arrays, but to replace them.

-------- 13.08 --------
What are refs?
const myRef = useRef(23);
We can write to and read from the ref using .current:
myRef.current = 1000;

- "Box" (object) with a mutable .current property that is persisted across renders ("normal" variables are always reset).
- Two big use cases:
  1. Creating a variable that stays the same between renders (e.g. previous state, setTimeout idm etc.)
  2. Selecting and storing DOM elements
- Refs are for data that id NOT rendered: usually only appear in event handlers or effects, not in JSX (otherwise use state)
- Do NOT read or write ,current in render logic (like state)

State VS Refs

- Updating Refs won't cause a re-render. So we use state when we want to store data that should rerender the component and Refs for data that should only be remembered by the component over time but never rerender it.
- Refs are mutable, state isn't.
  Refs update synchronously and the new value can be used immediately after it was updated.

-------- 13.09 --------
Binding ref to a DOM element happens in three steps:
function Search({ query, setQuery }) {
const inputEl = useRef(null); 1️⃣ Create Ref hook

    useEffect(function () {
      inputEl.current.focus();    3️⃣ Do something with the DOM element in useEffect hook.
    }, []);

    return (
      <input
        ref={inputEl}   2️⃣ Bind Ref to an actual DOM element
      />
    );

}

-------- 13.11 --------
In React we can reuse UI with components. We can also reuse logic. If the logic doesn't have any hooks, we can use a regular function. But if it does contain hooks then we need to create a custom hook.

Custom hooks:

- Allow us to reuse non-visual logic in multiple components
- One custom hook should have one purpose, to make it reusable and portable (even across multiple projects).
- Rules of hooks apply to custom hooks too
- Can receive and return any relevant data (usually [] or {})
- Need to use one ore more hooks
- Function name needs to start with use

-------- 13.12 --------
There are two strategies to decide if we want to create a new custom hook:

- We want to reuse some part of out non-visual logic.
- We want to extract a huge part of our component out into some custom hook.

-------- 16.03 --------
Usually we use useReducer instead of useState when we have some complex state to manage.
Usually as an action we pass into dispatch() an object like this:
{
type: "typeName",
payload: someValue (optional)
}
The huge advantage of using useReducer is that we have all the possible state updates that can happen in our application in one central place. It makes it really easy to understand the entire application.

-------- 16.04 --------
STATE MANAGEMENT WITH useState IS NOT ENOUGH IN CERTAIN SITUATIONS:

1. When components have a lot of state variables and state updates, spread across many event handlers all over the component
2. When multiple state updates need to happen at the same time (as a reaction to the same event, like "starting a game")
3. When updating one piece of state depends on one or multiple other pieces of state
   In ALL THESE SITUATIONS, useReducer CAN BE OF GREAT HELP

State with useReducer:

- An alternative way of setting state, ideal for complex state and related pieces of state.
- Stores related pieces of state in a state object.
- useReducer needs reducer: function containing all logic to update state. Decouples state logic from component. (Like setState() with superpowers)
- reducer: pure function (no side effects!) that takes current state and action, and returns the next state.
- action: object that describes how to update state.
- dispatch: function to trigger state updates, by "sending" actions from event handlers to the reducer (instead of setState).

useReducer:
dispatch -> reducer -> next state -> re-render

useState:
setState -> next (updated state) -> re-render

-------- 16.16 --------
useState:

- Ideal for single, independent pieces of state (numbers, strings, single arrays, etc.)
- Logic to update state is placed directly in event handlers or effects, spread all over one or multiple components.
- State is updated by calling setState (setter returned form useState)
- Imperative state updates
- Easy to understand and to use

useReducer:

- Ideal for multiple related pieces of state and complex state (e.g. object with many values and nested objects or arrays)
- Logic to update state lives in one central place, decoupled from components: the reducer
- State is updated by dispatching an action to a reducer
- Declarative state updates: complex state transitions are mapped to actions dispatch({ type: 'startGame' });
- More difficult to understand and implement

-------- 17.02 --------
Setting up project with Vite:

In terminal go to the folder where we'll create the project.

> npm create vite@latest
> project-name
> React
> JavaScript

In VScode go to the project folder

> cd project-name
> npm install

In App.jsx delete everything and create new react functional component

Delete App.css and index.css files.

Delete "import ... css" line from main.jsx

Run

> npm run dev

In a new terminal install eslint dependencies:

> npm install eslint vite-plugin-eslint eslint-config-react-app --save-dev

In project folder create file .eslintrc.json and write there:
{
"extends": "react-app"
}

In vite.config.js add:
import eslint from "vite-plugin-eslint";
and change
plugins: [react()],
to
plugins: [react(), eslint()],

Save. Project is ready!

-------- 17.03 --------
Routing (client-side routing):

- With routing, we math different URLs to different UI views (React components): routes.
- this enables users to navigate between different applications screens, using the browser URL.
- Keeps the UI in sync with the current browser URL.
- Allows us to build Single-page Applications.

Single-page application:

- Application that is executed entirely on the client (browsers)
- Routes: different URLs correspond to different views (components)
- JavaScript (React) is used to update the page (DOM)
- The page is never reloaded
- Feels like a native app
- Additional data might be loaded from a web API.

User clicks router link -> URL is changed -> DOM is updated: React component corresponding to the new URL is rendered.

-------- 17.05 --------

<Link to="/">Home</Link> 
<NavLink to="/">Home</NavLink> will have class="active" on it if we go to /

-------- 17.07 --------
With CSS modules we can safely use class names and there wont' be any problems if other element in other components has a class with the same name. CSS modules will create a unique class name (like "\_nav_afufn_1").
If wanted to create a global class name that won't be changed - we can use
:global(.test) {
background-color: red;
}
and then the element will simply be className="test" -> class="test"

-------- 17.10 --------
To create nested routes, we simply place Route elements within each other, like this:
<Router path="parent" element={<ParentComponent/>}> // /parent
<Router path="child" element={<ChildComponent/>} /> // /parent/child
</Router>

In ParentComponent we create a structure like this:
<ParentComponent>
<Outlet/>
</ParentComponent>
or even like this:
<ParentComponent>
<OtherComponent>
<Outlet/>
</OtherComponent>
</ParentComponent>

And it will create this structure of elements:
<ParentComponent>
<ChildComponent/>
</ParentComponent>

(or this:)
<ParentComponent>
<OtherComponent>
<ChildComponent/>
</OtherComponent>
</ParentComponent>

-------- 17.13 --------

- The URL is an excellent place to store UI state and an alternative to useState in some situations. Examples: open/closed panels, currently selected list item, list sorting order, applied list filters.
  1. Easy way to store state in a global place, accessible to all components in the app.
  2. Good way to "pass" data from one page into the next page.
  3. Makes it possible to bookmark and share the page with the exact UI state it had at the time.

React Router tools: path, params, query string.

-------- 17.14 --------
To create a path with some info in the param and a route to it, we can do it like this:
App.jsx
<Route path="cities/:id" element={<City />} />

CityList.jsx

<Link to={`${id}`}>
Link text
</Link>

The <Link> will make <City /> element appear and the URl will look like this: site.com/cites/12345

:id is the name of the parameter. So we can access it using useParams().

-------- 17.15 --------
We can also add query string to the URL simply like this:

  <Link to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
We can then access them like this:
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

-------- 17.16 --------
We can implement programmatic navigation like this (the imperative way):
const navigate = useNavigate();

  <div onClick={() => {navigate("form");}}>anything here</div>
This can be useful when we we want to navigate somewhere without clicking a link.
To navigate back we can simply do it like this:
  <Button 
      onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
      >
    Go back
  </Button>
Where -1 is the number of steps we want to go back.

-------- 17.17 --------
We can also implement programmatic navigation in a declarative way with <Navigate/> component.
It is an old way, but it can be useful in nested routing. For example, instead of
<Route
index
element={<CityList cities={cities} isLoading={isLoading} />}
/>
<Route
path="cities"
element={<CityList cities={cities} isLoading={isLoading} />}
/>

We can do this:
<Route index element={<Navigate replace to="cities" />} /> // this will redirect to "cities" right away and we won't have duplicate pages /app and /app/cities
<Route
path="cities"
element={<CityList cities={cities} isLoading={isLoading} />}
/>

"replace" will replace the current element in the history stack and we will be able to go back in the browser if we need to.

-------- 18.01 --------
Context API is a solution to prop drilling.
Of course, sometimes we can do that with better component composition, but that isn't always possible.
Context API:

- System to pass data throughout the app without manually passing props down the tree.
- Allows us to "broadcast" global state to the entire app.
  1. Provider: gives all child components access to value.
  2. value: data that we want to make available (usually state and functions)
  3. Consumers: all components that read the provided context value (Consumers are the components that subscribe to the context)

When the context value updates, all consumers will re-render.

-------- 18.04 --------
// 1. Create a new context
const PostContext = createContext();

// 2. Provide value to the child components
const searchedPosts = "smth";
const handleAddPost = "smth2";

return
<PostContext.Provider
value={{
      posts: searchedPosts,
      onAddPost: handleAddPost,
    }}

>

    <div>
      Our app here
      <Header />
    </div>

</PostContext.Provider>

// 3. Consuming context value
function Header() {
const { onClearPosts } = useContext(PostContext);

    return (
      <header onClick={onClearPosts}>Clear posts</header>
    );

}

The full version:
// ThingContext.jsx
const { createContext, useContext } = require("react");

const ThingContext = createContext();

function ThingProvider({ children }) {
const test = "test text";
return (
<ThingContext.Provider value={{ test: test }}>
{children}
</ThingContext.Provider>
);
}

function useThing() {
const context = useContext(ThingContext);
if (context === undefined)
throw new Error("ThingContext was used outside of ThingProvider");
return context;
}

export { ThingProvider, useThing };

// index.js
import { SkillsProvider } from "./context/SkillsContext";
...
<SkillsProvider>
<App />
</SkillsProvider>

// Any component
import { useSkills } from "../context/SkillsContext";
const { test } = useSkills();

-------- 18.07 --------
State management is like giving each piece of state the right home.
Types of state:

1. State accessibility

   - Local state
     > Needed only by one or few components
     > Only accessible in component and child components
     > If the component was rendered twice, should a state update in on eof them reflect in the other one? NO
   - Global state
     > Might be needed by many components
     > Accessible to every component in the application
     > If the component was rendered twice, should a state update in on eof them reflect in the other one? YES

2. State domain

   - Remote state
     > All application data loaded from a remote server (API)
     > Usually asynchronous
     > Needs re-fetching + updating
   - UI state
     > Everything else!
     > Theme, list filters, form data, etc.

Where to place state?

- Local component (useState, useReducer, useRef) Local state
- Parent component (useState, useReducer, useRef) Lifting up state
- Context (Context API + useState, useReducer) Global state (preferably UI state)
- 3rd-party library (Redux, React Query, SWR, Zustand, etc.) Global state (remote or UI)
- URL (React Router) Global state, passing between pages
- Browser (Local Storage, session storage, etc.) Storing data in user's browser

How to manage different types of state in practice? (see the slide)
LOCAL STATE && UI STATE

- useState
- useReducer
- useRef
  LOCAL STATE && REMOTE STATE
- fetch + useEffect + useState / useReducer
  GLOBAL STATE && UI STATE
- Context API + useState / useReducer
- Redux, Zustand, Recoil, etc.
- React Router
  GLOBAL STATE && REMOTE STATE
- Context API + useState / useReducer
- Redux, Zustand, Recoil, etc.
- React Query
- SWR
- RTK Query

-------- 18.19 --------
In a frontend application user authentication usually works in three steps:

1. Get the user's email and password from the login form and check with the API endpoint if everything's correctly
2. If the credentials are correct, we redirect the user to the main application and save the user object in our state.
3. Protect the application from the unauthorized users.

-------- 19.02 --------
Performance optimization tools:

1. Prevent wasted renders

- memo
- useMemo
- useCallback
- Passing elements as children or regular prop

2. Improve app speed / responsiveness

- useMemo
- useCallback
- useTransition

3. Reduce bundle size

- Using fewer 3d-party packages
- Code splitting and lazy loading

When does a component instance re-render?

1. State changes
2. Context changes
3. Parent re-renders (creates the false impression that changing props re-renders a component. This is NOT true.)

A render does NOT mean that the DOM actually gets updated, it just means the component function gets called. But this can be an expensive operation.

Wasted render: a render that didn't produce any change in the DOM. It only becomes a problem when it happens too frequently or when the component is very slow.

-------- 19.04 --------
There's a way to avoid re-rendering a heavy component when we don't need it.
For example, here:
const [count, setCount] = useState(0);
return (

<div>
<h1>Slow counter?!?</h1>
<button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
<SlowComponent />
</div>
);

The <SlowComponent /> will re-render each time the user clicks on the button, because the click will cause state update => the whole component will re-render => th child component will re-render too.

But we can do this:
function Counter({ children }) {
const [count, setCount] = useState(0);
return (

<div>
<h1>Slow counter?!?</h1>
<button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
{children}
</div>
);
}

export default function Test() {
return (

<div>
<Counter>
<SlowComponent />
</Counter>
</div>
);
}
This way we pass in the <SlowComponent /> as {children} props. And <SlowComponent /> will be rendered at first, but it won't be affected by <Counter> re-renders. React will understand that nothing could have changed inside the <SlowComponent /> and it won't re-render it. It'll just stay the same and the whole component will work much faster.
Basically the {children} are created before the receiving component was created and rendered.

-------- 19.05 --------
Memoization: Optimization technique that executes a pure function once, and saves the result in memory. If we try to execute the function again with the same arguments as before, the previously saved result will be returned, without executing the function again.
We can:

- Memoize components with memo
- Memoize objects with useMemo
- Memoize functions with useCallback
  Memoization will prevent wasted renders and improve app speed and responsiveness.

- The memo function is used to create a memoized component that will not re-render when its parent re-renders, as long as the props stay the same between render.
- It only affects props. A memoized component will still re-render when its own state changes or when a context that it's subscribed to changes.
- Using the memo function only makes sense when the component is heavy (slow rendering), re-renders often, and does so with the same props.

-------- 19.06 --------
Memoizing a component is very easy: we just pass it as an argument into memo() function and store in a variable, like this:
const Archive = memo(function Archive({ show }) {
const [showArchive, setShowArchive] = useState(show);

return (

<aside>
something
</aside>
);
});

-------- 19.07 --------
An issue with memo:
in React, everything is re-created on every render (including objects and functions). So the new object does not equal to the previous object. So if objects or functions are passed as props, the child component will always see them as new props on each re-render. If props are different between re-renders, memo will not work. To solve this, we can memoize objects and functions, to make them stable (preserve) between re-renders (memoized{} === memoized{})
For that we can use two hooks: useMemo and useCallback.

- They are used to memoize values (useMemo) and functions (useCallback) between renders.
- Values passed into useMemo and useCallback will be stored in memory ("cached") and returned in subsequent re-renders, as long as dependencies ("inputs") stay the same.
- useMemo and useCallback have a dependency array (like useEffect): whenever one dependency changes, the value will be re-created.
  Three big use cases:
- Memoizing props to prevent wasted renders (together with memo)
- Memoizing values to avoid expensive re-calculations on every render.
- Memoizing values that are used in dependency array of another hook (for example, to avoid infinite useEffect loops).

-------- 19.09 --------
Setter functions always have a stable identity. So it's safe to pass them as props into memoized components without memoizing setter functions. They're kind of memized by default. So we don't even eed to include them in the dependency array of useMemo and useCallback.

-------- 19.10 --------
We only need to optimize the context when:

1. The state in the context needs to change all the time
   && 2. The context has many consumers
   && 3. The app is low and laggy

What we can do:

- pass components as {children}
- if there is a provider inside the app, we can memoize its values so that if app re-renders, the context still stays the same and doesn't rerender the consumers.
- split up the context into several contexts so that a change of one of the context values doesn't cause re-render of all the other consumers that don't really need this particular value.
- split the bundle

-------- 19.12 --------
The bundle and code splitting
When a user initially tries to access a website, they get the bundle. Bundle is a JS file containing the entire application code. It is produced by a tool like Webpack or Vite. Downloading the bundle will load the entire app at once, turning it into a SPA.
Bundle size: Amount of JS users have to download to start using the app. One of the most important things to be optimized, so that the bundle takes less time to download.
Code splitting: Splitting bundle into multiple parts that can be downloaded over time ("lazy loading").

We can do that this way:
const Homepage = lazy(() => import("./pages/Homepage")); // lazy loading components when we need them

<Suspense fallback={<SpinnerFullPage />}>
<Routes>
<Route index element={<Homepage />} />
</Routes>
</Suspense>

-------- 19.13 --------

- Don't optimize prematurely!
- Don't optimize anything if there is nothing to optimize ...
- Don't wrap all components in memo ()
- Don't wrap all values in useMemo ()
- Don't wrap all functions in useCallback()
- Don't optimize context if it's not slow and doesn't have many consumers

- Find performance bottlenecks using the Profiler and visual inspection (laggy UI)
- Fix those real performance issues
- Memoize expensive re-renders
- Memoize expensive calculations
- Optimize context if it has many consumers and changes often
- Memoize context value + child components
- Implement code splitting + lazy loading for SPA routes

-------- 19.14 --------
UseEffect dependency array rules

- Every state variable, prop, and context value used inside the effect MUST be included in the dependency array
- All "reactive values" must be included! That means any function or variable that reference any other reactive value (state, prop, or context value)
- Dependencies choose themselves: NEVER ignore the exhaustive-deps ESlint rule!
- Do NOT use objects or arrays as dependencies (objects are recreated on each render, and React sees new objects as different, {} !== {})

How to remove unnecessary dependencies:

- Remove function dependencies
  - Move function into the effect
  - If you need the function in multiple places, memoize it (useCallback)
  - If the function doesn't reference any reactive values, move it out of the component
- Remove object dependencies
  - Instead of including the entire object, include only the properties you need (primitive values)
  - If that doesn't work, use the same strategies as for functions (moving or memoizing object)
- Other strategies
  - If you have multiple related reactive values as dependencies, try using a reducer (useReducer)
  - You don't need to include setState (from useState) and dispatch (from useReducer) in the dependencies, as React guarantees them to be stable across renders.

When NOT to use an effect

- Effects should be used as a last resort, when no other solution makes sense. React calls them an "escape hatch" to step outside of React

Three cases where effects are overused:

1. Responding to a user event. An event handler function should be used instead.
2. Fetching data on component mount. This is fine in small apps, but in real-world app, a library like React Query should be used.
3. Synchronizing state changes with one another (setting state based on another state variable). Try to use derived state and event handlers

-------- 19.18 --------
In JS closure is the fact that a function captures all the variables from its lexical scope (from the place it was defined) at the time that the function was created.
useEffects are built on closures. So basically when an effect uses some state, but doesn't have anything in the dependency array, it will use the initial (stale) state = value from the closure even when something changes.
If we don't add all of the dependencies, but do add some, then on each effect run the values from dependency array will update, but values not listed in the dependency array will be stale.

-------- 20.02 --------
Redux:

- 3rd-party library to manage global state
- Standalone library, but easy to integrate with React apps using react-redux library
- All global state is stored in one globally accessible store, which is easy to update using "actions" (like useReducer)
- It's conceptually similar to using the Context API + useReducer
- Two "versions": (1) Classic Redux, (2) Modern Redux Toolkit

Global store is updated => All consuming components re-render

Historically, Redux was used in most React apps for all global state. Today, that has changed, because there are many alternatives. Many apps don't need Redux anymore, unless they need a lot of global UI state.

Redux can still be useful if there is lots of global local (not remote) state that updates frequently.

The mechanism of the useReducer hook:
action {type: 'deposit', payload: 50}

Event handler in component -> dispatch -> reducer -> next state -> re-render

The mechanism of the Redux:
Event handler in component -> Action creator function -> dispatch -> store (several reducers + current state) -> next state -> re-render

Store is where all global state lives (a centralized container). It's the single source of truth of global state in the app.
Each reducer inside the store is a pure function that calculates the next state (state transition) based on the action and the current state. Usually one reducer per app feature (e.g. shopping cart + user data + theme).
We have several reducers because we should create one reducer per application feature / per data domain.
Action creator function is used to automate writing action. Helpful to keep all possible actions in one central place (This is a convention, not a must)

The goal of Redux is to make the state update logic separate from the rest of the application.

-------- 20.03 --------
In the past, in Redux action types were usually written like this: "SET_BALANCE", "DEPOSIT_ACCOUNT".
Now it is advised to write them in this form: "stateDomain/eventName", i.e. "account/deposit", "account/requestLoan".
For the default case it is advised not to throw error, but to simply return state.

-------- 20.04 --------
Installing Redux: npm i redux
Installing Redux: npm i react-redux

-------- 20.06 --------
If we create several reducers, we need to pass them into the store like this:
const rootReducer = combineReducers({
account: accountReducer,
customer: customerReducer,
});

const store = createStore(rootReducer);

To access store state we do this:
store.getState()

-------- 20.07 --------
Usually we split our Redux reducers into different files and different folders. Each file for a specific purpose is called "slice"
The file structure is like this:
-src
--features
---accounts
-----accountSlice
-----accountComponent
---customers
-----customerSlice
-----customerComponent

In a slice file we place reducer, action creators and initial state.
In store.js we import and combine all the reducers and export the store.

-------- 20.08 --------
To connect Redux and React, we install this package:
npm i react-redux
Then we import our store into index.js
import { Provider } from "react-redux";
import store from "./store";
And wrap our App into the provider:
<Provider store={store}>
<App />
</Provider>

So basically it works a lot like context.

To access store from a component, we do this:
const customer = useSelector((store) => store.customer);
This will return object with customer's state

-------- 20.09 --------
To dispatch actions from a component we import the dispatch function using useDispatch:
import { useDispatch } from "react-redux";
const dispatch = useDispatch();

And we use one of the action creators:
import { createCustomer } from "./customerSlice";
dispatch(createCustomer(fullName, nationalId));

-------- 20.11 --------
Where to make an asynchronous API call (or any other async operation) in Redux?
Component -> dispatch -> middleware -> store
Not the component, because it can make asynchronous operations and then dispatch, but fetching data in components is not ideal.
Not the store, because it cannot do asynchronous operations. Reducers need to be pure functions.

Middleware is a function that sits between dispatching the action and the store. Allows us to run code after dispatching, but before reaching the reducer in the store. It is perfect for asynchronous code. Can do API calls, timers, logging, etc. This is the place for side effects.

-------- 20.12 --------
To use middleware (Thunks in out case), we need to:

1. Install the middleware package
   npm install redux-thunk
2. Apply the middleware to our store
   in store.js:
   import { thunk } from "redux-thunk";
   const store = createStore(rootReducer, applyMiddleware(thunk));
3. Use the middleware in our action creator functions.
   Simply return a function from action creator that dispatches the object.

If action creator function return a function instead of an object, the React will know that it this function is the thunk. It will then execute the function and not immediately dispatch an action to the store.

-------- 20.13 --------
Installing Redux DevTools:

1. Install Google Chrome Extension.
2. Install the package
   npm i redux-devtools-extension

-------- 20.14 --------
Redux Toolkit:

- The modern and preferred way of writing Redux code
- An opinionated approach, forcing us to use Redux best practices.
- 100% compatible with "classic" Redux, allowing us to use them together.
- Allows us to write a lot less code to achieve the same result (less "boilerplate")
- Gives us 3 big things (but there are many more...):
  1. We can write code that "mutates" state inside reducers (will be converted to immutable logic behind the scenes by "Immer" library)
  2. Action creators are automatically created.
  3. Automatically setup of Thunk middleware and DevTools.

-------- 20.15 --------
Installing Redux Toolkit:
npm i @reduxjs/toolkit

Redux Toolkit will automatically:

- combine the reducers
- add the Thunk middleware
- setup DevTools

-------- 20.18 --------
If one of dispatch functions needs two arguments within the action.payload, we need to prepare them by sort of extracting them from the action.payload beforehand.

Like this:

const accountSlice = createSlice({
name: "account",
initialState: initialState,
reducers: {
// needs only one argument, the action.payload
withdraw(state, action) {
state.balance -= action.payload;
},

    // needs several arguments within action.payload
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },

      reducer(state, action) {
        if (state.loan > 0) return;

        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },

},
});

-------- 20.19 --------
When to use Context API + useReducer:

- for global state management in SMALL apps
- when you just need to share a value that doesn't change often (color scheme, preferred language, authenticated user, etc.)
- when you need to solve a simple prop drilling problem
- when you need to manage state in a local sub-tree of the app (for example in the compound component pattern)
  When to use Redux:
- for global state management in LARGE apps
- when you have lots of global UI state that needs to be updtes frequently (because Redux is optimized for this) (shopping cart, current tabs, complex filters or search, etc.)
- When you have complex state with nested objects and arrays (because you can mutate state with Redux Toolkit)

-------- 22.03 --------

1. Gather application requirements and features
2. Divide the application into pages

- Think about the overall and page-level UI
- Break the desired UI into components
- Design and build a static version (no state yet)

3. Divide the application into feature categories

- Think about state management + data flow

4. Decide on what libraries to use (technology decisions)

-------- 22.06 --------
In the new React Router we can declare the route in an imperative way, like this:
const router = createBrowserRouter([
{
element: <AppLayout />,
children: [
{
path: "/",
element: <Home />,
},
{
path: "/menu",
element: <Menu />,
},
],
},
]);

In this case the topmost element does not need a path, because it will be a layout route, a parent route of all other routes.

-------- 22.07 --------
Somewhere in our code we create a function that fetches some data from an API. We then provide that loader function to one of our routes and that route will then fetch that data as soon as the application goes to that route. And then it will provide the info to the component.

So we fetch the data using React Router in three steps:

1. Create a loader
2. Provide the loader
3. Provide the data to the page

We create a loader like this (usually in the same file as the component that's going to need it)
export async function loader() {
const menu = await getMenu(); // some async function with fetch request
return menu;
}

And in App.jsx we provide the loader to the page like this:
{
path: "/menu",
element: <Menu />,
loader: menuLoader,
},

And then we provide data to the component like this:
function Menu() {
const menu = useLoaderData();
console.log(menu);

    return <h1>Menu</h1>;

}

-------- 22.09 --------
To catch any errors in any of the pages, we can specify the element to be shown when an error occurs. We can do this both on the layout element and on any of the routes:

const router = createBrowserRouter([
{
element: <AppLayout />,
errorElement: <Error />,
children: [
{
path: "/menu",
element: <Menu />,
loader: menuLoader,
errorElement: <Error />,
},
]
}
])
And in that Error component we can access the info about the error like this:
const error = useRouteError();

-------- 22.10 --------
When we create a loader within the component, we get access to parameters in the URL.
So if declared our route like this:
{
path: "/order/:orderId",
element: <Order />,
},
Then we'll get access to the orderId like this:
export async function loader({ params }) {
const orderId = params.orderId;
}

-------- 22.11 --------
We can get the data from the form when we submit it like this:
// App.jsx
import CreateOrder, {
action as createOrderAction,
} from "./features/order/CreateOrder";
{
path: "/order/new",
element: <CreateOrder />,
action: createOrderAction,
},
// CreateOrder.jsx
export async function action({ request }) {
const formData = await request.formData();
const data = Object.fromEntries(formData);
console.log(data);

      return null;
    }

-------- 23.02 --------
Utility-first CSS approach (atomic CSS): writing tiny classes with one single purpose, and then combining them to build entire layouts.

-------- 23.03 --------
Setting up Tailwind CSS:
Follow instructions on Tailwind website.
Install Tailwind CSS VScode extension.
Install Tailwind CSS Prettier plugin (npm install -D prettier prettier-plugin-tailwindcss)

-------- 23.07 --------
In tailwind the breakpoints are fixed, but it's better to customize them to fit the needs of the particular application.

-------- 23.12 --------
We can reuse tailwind classes like this:
index.css
@layer components {
.input {
@apply w-full rounded-full border border-stone-200 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-400 md:px-6 md:py-3;
}
}
And using .input just like a regular class. But this should be an exception. So usually we should just reuse the React component and leave Tailwind classes as they are.
We can add Tailwind classes to these reusable classes like this:
<input
        className="input mb-8 w-72"
      />

-------- 23.14 --------
We can also reuse Tailwind variables in our own classes like this:
.loader {
background: no-repeat linear-gradient(theme(colors.stone.800) 0 0) 0% 50%,
}

-------- 23.15 --------
We can override any TailWind configuration. We can do it in tailwind.config.file by adding something like this:
theme: {
fontFamily: {
pizza: "Roboto Mono, monospace",
},
}

Which will override the default fontFamily. We can check what the default is on Tailwind GitHub https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js
We can then use it with "font-pizza" class. Or we can just override sans fontFamily and our default font everywhere will be "Roboto Mono, monospace"

We can also add our own custom values by adding them into "extend":
extend: {
colors: {
pizza: "#123456",
},
fontSize: {
huge: ["80rem", { lineHeight: "1" }],
},
},
And then we can use them like regular Tailwind classes: text-huge or bg-pizza

-------- 23.16 --------
Helpful TailWind classes:
space creates spaces between child elements without using flex or grid
divide: line between child elements

-------- 24.03 --------
If we have an input which value we want to use in redux, we should connect the two directly. We should store input value in the state and only put the value into redux store after submitting the form.

-------- 24.06 --------
If we need to calculate something from the state, the best practice is to create a function for that in the slice, import it when need and use it inside useSelector like this:
cartSlice.js
export const getTotalCartQuantity = (state) =>
state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);
someComponent.jsx
const totalCartQuantity = useSelector(getTotalCartQuantity);

-------- 24.10 --------
If we really need to use our store outside of any component, we can do so like this:
import store from "../../store";
function someFunction () {
store.dispatch(clearCart());
}
But it should be avoided if possible, because it causes problems with performance.

-------- 24.13 --------
We can access info from another page using fetcher like this:
const fetcher = useFetcher();

useEffect(
function () {
if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
},
[fetcher],
);

-------- 24.14 --------
We can use fetcher.Form to send data to the backend and then update th page contents according to the new changes.

-------- 25.02 --------
Client-side rendering (CSR) or server-side rendering (SSR)?
CSR with plain React VS SSR with framework (Next.js or Remix)

CSR with plain React

- Used to build Single-Page Applications (SPAs)
- All HTML is rendered on the client
- All JavaScript needs to be downloaded before apps start running: bad for performance
- One perfect use case: apps that are used "internally" as tools inside companies, that are entirely hidden behind a login

SSR with framework (Next.js or Remix)

- Used to build Multi-Page Applications (MPAs)
- Some HTML is rendered in the server
- More performant, as less JavaScript needs to be downloaded
- The React team is moving more and more in this direction

-------- 25.04 --------
Using styled components:
npm i styled-components

import styled from "styled-components";

const H1 = styled.h1`// First letter should be uppercase because it's a React component 
    font-size: 30px;
    font-weight: 600;
 `;

  <H1>The Wild Oasis</H1>

If we want to style the <App> itself, we replace its inner <div> with <StyledApp> and give the styles that we need with const StyledApp = styled.div``;

-------- 25.05 --------
We can add global styles by creating a GlobalStyles component in a separate .js file and importing and using it as a sibling component to App contents, like this:
function App() {
return (
<>
<GlobalStyles />
<StyledApp>
// our app here
</StyledApp>
</>
);
}

-------- 25.06 --------
Styles in styled components are actually template literals, so we can conditionally set them with ${}. We can also use variables in them. Like this:
const test = css`  text-align: center;`;

const Heading = styled.h1`  font-size: ${true ? '20px' : '10px'};
  font-weight: 600;
  background-color: yellow;
  ${test}`;

We can create a different HTML tag by passing an "as" prop into the component, like this:
<Heading as="h3">Form</Heading> // will render <h3></h3>

-------- 25.07 --------
We can define default props in styled components like this:
Row.defaultProps = {
type: "vertical",
};

We can also create multiple variation / options for our components. See 17_the-wild-oasis/src/ui/Button.jsx for an example

-------- 25.10 --------
We can also style predefined components by passing them into styled function like this:
const StyledNavLink = styled(NavLink)`  /* some styles */`;
For icons in React we can use react-icons, which allow us to import certain icons as components and easily style them.

-------- 26.02 --------

- Service that allows developers to easily create a back-end with a Postgres database
- Automatically creates a database and API so we can easily request and receive data from the server
- No back-end development needed
- Perfect to get up and running quickly!
- Not just an API: Supabase also comes with easy-to-use user authentication and file storage

-------- 26.06 --------
When we create a database, we need to take into account the number of entities that are involved. We need to make sure that we place a foreign key in a table that can only reference exactly one other row from another table.

-------- 27.02 --------
What is React Query?

- Powerful library for managing remote (server) state
- Many features that allow us to write a lot less code, while also making the UX a lot better:
  - Data is stored in a cache
  - Automatic loading and error states
  - Automatic re-fetching to keep state synched
  - Pre-fetching
  - Easy remote state mutation (updating)
  - Offline support
- Needed because remote state is fundamentally different from regular (UI) state
  Installing:
  npm i @tanstack/react-query
  npm i @tanstack/react-query-devtools

-------- 27.05 --------
Using React Query in a project:
App.jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
defaultOptions: {
queries: {
// staleTime: 60 \* 1000, // in milliseconds
staleTime: 0,
},
},
});

  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    // the app here
  </QueryClientProvider>

Getting the remote state:
const {
isLoading,
data: cabins,
error,
} = useQuery({
queryKey: ["cabin"],
queryFn: getCabins, // some async function that accesses the server or DB
});

Mutating the remote state:

const queryClient = useQueryClient();

const { isLoading: isDeleting, mutate } = useMutation({
mutationFn: deleteCabin,
onSuccess: () => {
queryClient.invalidateQueries({ // this will mark the old data invalid and force refetching of the new data
queryKey: ["cabins"], // the data to be invalidated and refetched
});
},
onError: (err) => alert(err.message),
});

    return (
      <button onClick={() => mutate(cabinId)}>Delete</button>
    );

-------- 27.06 --------
A handy library for notifications:
npm i react-hot-toast

-------- 27.07 --------
A useful library for handling forms:
npm i react-hook-form
Using it:
import { useForm } from "react-hook-form";
const { register, handleSubmit, reset, getValues } = useForm();
function onSubmit(data) {
console.log(data);
}

  <Form onSubmit={handleSubmit(onSubmit)}>
    <Input type="text" id="name" {...register("name")} />
  </Form>

-------- 28.01 --------
How to reuse code in React?
UI:

- components and props
- children prop
  Stateful logic:
- custom hooks
  UI + stateful logic:
  - render props pattern (for complete control over what the component renders, by passing in a function that tells the component what to render)
  - compound component pattern (for very self-contained components that need / want to manage their own state. Compound components are like fancy super components)

-------- 28.04 --------
The render prop pattern is all about passing in a prop 'render' that is a function that component uses to know what it should render and how to do it.
We can use when we can't simply pass the children prop because we need to specify exactly how the render that component.

-------- 28.05 --------
Higher order components

-------- 28.06 --------
Compound Component Pattern
Parent component + child elements that only make sense when used with the parent.
Creating the compound component pattern:
import { useState, createContext, useContext } from "react";

// 1. Create a context
const CounterContext = createContext();

// 2. Create a parent component
function Counter({ children }) {
const [count, setCount] = useState(0);
const increase = () => setCount((c) => c + 1);
const decrease = () => setCount((c) => c - 1);

return (
<CounterContext.Provider value={{ count, increase, decrease }}>
<span>{children}</span>
</CounterContext.Provider>
);
}

// 3. Create child components to help implementing the common task
function Count() {
const { count } = useContext(CounterContext);
return <span>{count}</span>;
}

function Label({ children }) {
return <span>{children}</span>;
}

function Increase({ icon }) {
const { increase } = useContext(CounterContext);
return <button onClick={increase}>{icon}</button>;
}

function Decrease({ icon }) {
const { decrease } = useContext(CounterContext);
return <button onClick={decrease}>{icon}</button>;
}

// 4. Add child components as properties to the parent component
Counter.Count = Count;
Counter.Label = Label;
Counter.Increase = Increase;
Counter.Decrease = Decrease;
export default Counter;

And then we get a super flexible component that we can use whichever way we want:
<Counter>
<Counter.Label>My super flexible counter</Counter.Label>
<Counter.Decrease icon="-" />
<Counter.Increase icon="+" />
<Counter.Count />
</Counter>

  <div>
    <Counter>
      <Counter.Label>My super flexible counter</Counter.Label>
      <br />
      <Counter.Increase icon="⬆️" />
      <div>
        <Counter.Count />
      </div>
      <Counter.Decrease icon="⬇️" />
    </Counter>
  </div>

-------- 28.07 --------
React Portal allows us to render an element outside of the parent component's DOM structure while still keeping the element in the original position of the component tree.
Creating a portal is as simple as this:
function Modal({ onClose, children }) {
return createPortal(

<div>Any JSX here</div>,
document.body // DOM node inside of which the element will be rendered
);
}

-------- 29.03 --------
We can only take the props that we need and put the rest of them into props that we can then pass down further like this:
<Select options={options} type="white" test="test" />

function Select({ options, value, ...props }) {
return (
<StyledSelect value={value} {...props}>
anything here
</StyledSelect>
);
}

-------- 29.06 --------
We can pass in different parameters for filtering into supabase like this:
.from("bookings")
.select(
"id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)"
)
.eq("status", "unconfirmed") // equal to
.gte("totalPrice", 2000) // greater or equal to
.lte("totalPrice", 5000) // less or equal to

In React Query we can react changes in different things. For example, here
// Filter
const filterValue = searchParams.get("status");
const filter =
!filterValue || filterValue === "all"
? null
: { field: "status", value: filterValue };

const {
isLoading,
data: bookings,
error,
} = useQuery({
queryKey: ["bookings", filter], // \* here
queryFn: () => getBookings({ filter, sortBy }),
});

- here: this array works like a dependency array in useEffect. So if filter changes, React Query will refetch the data.

-------- 29.07 --------
We can sort the data from supabase with .order method like this:
supabase
.from("bookings")
.order("name", {
ascending: true
});

-------- 29.09 --------
We can take only a part of the data from supabase using this:
query = query.range(from, to);

-------- 29.12 --------
mutationFn return some data. And this data is accessible in
onSuccess:(data) => {
console.log(data);
}

-------- 29.13 --------
mutationFn can only receive one argument. If we need to pass in more than that, we pass in an object.

-------- 29.21 --------
We can send a confirmation letter from supabase to the newly registered user. We can also specify the site url in URL Configuration so that the user gets redirected there after confirmation.

-------- 29.32 --------
For all the bugs that can happen during rendering, we can use react-error-boundary package. This package will allow us to show a meaningful message to the user instead of blank screen. And provide the user with a function that can reset the site (or go back, for example).

## 32 - Overview of Next.js With the App Router

### 003 An Overview of Server-Side Rendering (SSR)

Client-side rendering (CSR) VS Server-side rendering (SSR)

---

CSR:

- HTML is rendered on the client (the user's computer) using JavaScript
- SPAs: Perfect for building highly interactive web apps
- Apps that don't need SEO:
  - Apps that are used "internally" as tools inside companies
  - Apps that are entirely hidden behind a login

Cons:

- Slower initial page loads:
  - Bigger JavaScript bundle needs to be downloaded before app starts running
  - Data is fetched after components mount (this creates request waterfall)
- SEO can be problematic

Pros:

- Highly interactive: All the code and content has already been loaded (except data)

---

SSR:

- HTML is rendered on the server (the developer's computer)
- Content-driven websites or apps where SEO is essential: E-commerce, blogs, news, marketing websites, etc.

Cons:

- Less interactive: Pages might be downloaded on demand and require full page reloads

Pros:

- Faster initial page loads:
  - Less JavaScript needs to be downloaded and executed
  - Data is fetched before HTML is rendered
- SEO-friendly: content is easier for search engines to index

Two types of SSR:

1. Static: HTML generated at build time (often called Static Site Generation, or SSG). (Static files exist on the server and do not change)
2. Dynamic: HTML generated each time server receives new request (some call only this SSR). Basically it'll generate new pages for each user, which is great when the underlying data changes often.

Largest content paint (LCP) - the point at which the website shows all the relevant content to the user.
First content paint (FCP) - the moment at which at least something has been painted onto the screen.

In SSR it's the server who initiates the data fetching, before the page or app is even rendered. The rendering itself happens on the server, too.

### 005 The Missing Piece Hydration

**Hydration** adds back the interactivity and event handlers that were lost when HTML was server-side rendered.
With hydration React builds the component tree on the client and compares it with the actual SSRd DOM: They must be the same so React can adopt it. React does not recreate the DOM tree - it just continues and finishes the process of server-side rendering.
If the DOM tree is not what Next.js thinks it should be - then a hydration error happens. Common hydration error causes: incorrect HTML element nesting, different data used for rendering, using browser-APIs, side effects, etc.

### 007 What is Next.js

Next.js:

- Meta-framework built on top of React.
- Opinionated way of building React apps: set of conventions and best practices regarding routing, data fetching, etc.
- Allows us to build complex full-stack web-apps and sites.
- Allows us to use cutting-edge React features that need to be integrated into a framework: Suspense, Server Components, Server Actions, steaming, etc.

The Next.js key ingredients:

- SSR (dynamic and static)
  - Dynamic or static can be selected for each route
- File-based routing conventions
  - Folders as routes
  - Special files for pages, layouts, loaders, etc.
- Data fetching and mutation on the server
  - Fetching data directly in Server Components
  - Mutations in Server Actions
- Optimizations
  - Images
  - Fonts
  - SEO
  - Preloading

Two flavours of Next.js: "App" and "Pages" router.
**App router:**

- Introduced in Next.js 13.4 (2023)
- Recommended for new projects
- Implements React's full-stack architecture: Server Components, Server Actions, Streaming, etc.

Pros:

- Easy fetching with fetch() right in components
- Extremely easy to create layouts, loaders, etc.
- More advanced routing (parallel routing, etc.)
- Better DX (Developer Experience) and UX

Cons:

- Caching is very aggressive and confusing
- Steep learning curve (but it's React)

**Pages router:**

- The first Next.js router since v1 (2016)
- Still supported and updated in the future

Pros:

- Overall more simple and easy to learn

Cons:

- Simple things like layouts are confusing to implement
- Data fetching using Next.js-specific APIs such as getStaticProps and getServerSideProps

### 008 Setting Up a Next.js Project

To create a new Next.js prject, we need to run `npx create-next-app@latest project-name` (yes for everything except src/ directory)

Next.js implements a server with node.js.

### 010 Defining Routes and Pages

To create aa route in Next.js, we need to crete a folder with route name and in there add a page.js, which will be the page displayed at that route.
The component in page.js can have any name, but usually everyone calls it Page.
To create a nested route like cabins/test, we need to create subfolder test in folder cabins.

To work around the problem with multiple files having the same name. you can enable 'Custom labels' setting in VScode and create an item like this:

item: **/app/**/page.js
value: PAGE ${dirname}

### 011 Navigating Between Pages

Regular anchor links <a href=''></a> do work in Next.js, but they cause a full page reload.

Next.js applies a few optimization techniques:

- it will prefetch all the routes that are linked on a certain page (in production only)
- each page is downloaded separately as a separate chunk
- each visited page is cached in the browser

### 012 Creating a Layout

All Next.js apps need to have one global layout that is called the root layout. This root layout wraps all the pages in the application and it needs to have <html> and <body> tags.
RootLayout always accepts a `children` prop, which is the currently open page. We can render that page (or even some other inner layout) inside of root layout.
In RootLayout we can also set metadata (page title, for example), declaring it outside of the component:

```
export const metadata = {
  title: "The Wild Oasis",
};
```

RootLayout is a server component.

### 013 What are React Server Components (RSC – Part 1)

**100% Client-side app:**
We can imagine the UI as being a function of state changing over time.
`UI = f(state)`
As we keep updating the state, the app simply keeps rerendering and showing different parts of the UI and layout.

Pros:

- interactive
- components

Cons:

- requires lots of JS
- client-server data waterfalls

**100% server-side app:**
`UI = f(data)`
Cons:

- NO components

Pros:

- Easy and fast to fetch all data
- Close to the data source
- Needs to ship 0 kb of JS

To take the best from both worlds, React Server Components (RSC) are created.
UI = f(data, state)

**React Server Components (RSC)**

- A new full-stack architecture for React apps
- Introduces the server as an integral part of React component trees: server components
- We write frontend code next to backend code in a natural way that "feels" like regular React
- RSC is NOT active by default in new React apps (e.g. Vite apps): it needs to be implemented by a framework like Next.js ("app router")
- whenever possible, data should be fetched right on the server

!! Important distinction: !!
**RSC** is the name of the new paradigm.
**Server component** is the name of the components file.

Server components:

- are only rendered on the server, never on the client.
- UI = f(data)
- have no interactivity, no state => they don't make it into the bundle
- we can build backend with React
- default in apps that use the RSC architecture (like Next.js)
- cannot be stateful or use any hooks
- can use props, but they must be serializable when passed to **client** components. No functions or classes.
- data fetching is preferred. Use async / await in component
- can import both client and server components
- rerender on URL change (navigation)

Client components:

- "regular" components with interactivity
- created with "use client" directive at the top of the module
- tend to appear at the end of component tree, so as the last children.
- child components of client components don't need specifying the "use client". They're client components by default, because they're inside the so-called Server-client boundary (split-point between server and client side).
- can lift state up
- can use props
- data fetching is possible, but preferably with library
- can only import client components (can't go back in the client-server boundary)
- can render client components and server components passed as props
- rerender on state change

A graph displaying the new mental model of how RSC works is at 013, 25:20

**RSC architecture: pros and cons**
Pros:

- We can compose entire full-stack apps with React components alone (+ server actions)
- One single codebase for front and back-end
- Server components have more direct and secure access to the data source (no API, no exposing API keys, etc.)
- Eliminate client-server waterfalls by fetching all the data needed for a page at once before sending it to the client (not each component)
- "Disappearing code": server components ship no JS, so they can import huge libraries "for free"

Cons:

- Makes React more complex
- More things to learn and understand
- Things like Context API don't work in server components
- More decisions to make: "Should this be a client or a server component?", "Should I fetch this data on the server or the client?", etc.
- Sometimes you still need to build an API (for example if you also have a mobile app)
- Can only be used within a framework

### 014 Fetching Data in a Page

We can fetch data directly in server component by making this component an async function. Interestingly, the logs to the console will appear in the vscode console instead of browser console, because these logs happen on the server.

### 015 Adding Interactivity With Client Components

On the initial render ALL of the components are rendered on the server and then sent as HTML to the client.

### 016 Displaying a Loading Indicator

We can create a loading indicator for all of the pages in our app (even deeply nested ones, like cabins/test/23). For that we just need to create a file `loading.js` in the `app` folder. This Loading component will be shown instead of the pages that are loading, while the outer layout components that do not load data will be shown instantly.
However, if the page has multiple components inside of it and only one of them is loading data - none of them will be shown, because the whole page is replaced with a loader. To tweak this and only replace certain elements we'll need Suspense.
All of this is done with something called streaming

### 017 How RSC Works Behind the Scenes (RSC – Part 2)

**Traditional React:**
Components -> Tree of component instances (Component tree) -> Render React element tree ("Virtual DOM") -> Commit to DOM DOM Elements (HTML)

**RSC:**
Component tree -> (render SCs) ->
Server Components are rendered into React elements containing info about how the DOM will look like. All the other code from SC disappears. It happens because data needs to be serializable so that it can be sent to the client later.
Meanwhile in this components tree something like placeholder for client components is created. Like a hole, where each client component will eventually be rendered. Each of these "placeholders" contains serialized props passed from SC to CC and a URL to the script with component code. All of this is quite complex, so it is powered by the framework's bundler.
This mix of executed and unexecuted component instances is called **RSC payload**. It's basically a virtual DOM of all rendered SC + subtrees of unrendered CC. -> send to client & render CCs ->
Complete Virtual DOM

Why RSC Payload? Why not render SCs as HTML?

- React describes the Ul as data, not as finished HTML
- When a SC is re-rendered: React is able to merge ("reconcile") the current tree on the client with a new tree coming from the server
- As a result, Ul state can be preserved when a SC re-renders, instead of completely re-generating the page as HTML

### 018 RSC vs. SSR How are They Related (RSC – Part 3)

SSR: "Just take this component tree, render it as HTML, and send that HTML to the browser. Also send the React code to make HTML interactive"

RSC vs SSR:

- RSC is NOT the same as SSR: they are separate technologies
- RSC does NOT replace SSR
- They usually work together: frameworks can combine them
- Both client and server components are initially rendered on the server when SSR is used
- In the RSC model, "server" just means "the developer's computer"
- Result: RSC does NOT require a running web server! Components could run only once at built time (static site generation)

The big confusion is to think that server in RSC and server in SSR is the same thing. They can be the same, but they don't have to be.
In RSC, React server and React client are simply two different environments, two different parts of the RSC protocol.
The React server doesn't even need to be an actual web server. It can just be any other computer.
And React client doesn't have to be a browser - it can be something that consumes the rendered React app as HTML.
SSR happens only on initial render. On re-renders, client components only render on the actual client.

## 33 - Starting to Build the Wild Oasis Website

### 003 Project Organization

If we want to create a folder, but avoid creating a route, we can add underscore `_` before the folder name. I.e. `_components`

Next.js automatically supports import aliases, so we can specify paths like `@/app/_components/smth`

### 004 Styling With Tailwind CSS

TailwindCSS and CSS modules are automatically supported in Next.js, so they can be used easily.

### 005 Adding Page Metadata and Favicon

We can export the main metadata from the root layout and then also export metadata from each page. The page metadata will override the main metadata.

To create a changing title for all the pages, we can specify this in the layout:

```
title: {
  template: "%s | The Wild Oasis",
  default: "Welcome | The Wild Oasis",
},
```

The title specified in a specific page will be inserted instead of `s%`. If title is not specified - the default will be used.

To add metatags to the page, we can just write them in the metadata object:
`description: 'info about the website'`.

To add a favicon to the website, we can just add a file called `icon` to the `app` folder. It can have any file extension. Next.js will use it automatically.

### 006 Loading and Optimizing Fonts

Next.js downloades and stores other fonts on our server for better performance and optimization. To add a font, we need to do this:

```
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap", // will show text in default font initially, and then swap it with our font
});
...
<body className={`${josefin.className}`}>
```

### 008 Optimizing Images With Next.js Image Component

For image optimization, Next.js provides an Image component. It does three important things:

1. Automatically serves correctly sized images in modern formats (like webp). And it will do it on demand.
2. It prevents layout shifts beacuse it forces us to specify the exact width and height
3. Automatically lazy loads images only when they actually enter the viewport

Serving the correctly sized image works if we specify the source like this:
`<Image src="/logo.png" height="60" width="60" alt="" />`

But we can also import the image beforehand and omit the width ang height. (It's called a statically imported image). But then the resizing won't happen:

```
import logo from "@/public/logo.png";
<Image src={logo}/>
```

Statically imported images allow Next.js to analyze the image beforehand. They accept other properties, like `quality={10}`. That'll change the image quality, making its size smaller.

### 009 Building the Home Page

If we need a responsive image and don't want to specify the exact size, we use a statically imported image and add a `fill` attribute to it. That'll set width and height to 100% and position: absolute, so if need to change that - wa can use CSS (i.e set `object-fit: cover`).
We can also add `placeholder="blur"` and while the image is loading - we will see a blurred version of it.
If Image uses `fill` one of its parent elements needs to have a `position: relative`.

### 012 Adding a Nested Layout

To add a layout that applies to a route and its subroutes, we need to create a layout.js. The route page and its subroute pages will be placed inside of this layout.

## 34 - Data Fetching, Caching, and Rendering

### 002 Setting Up Supabase

Next.js has a built-in support for environment variables. To use them, we need to create .env.local at the root, set up our variables `SOMETHING='smth'` and then use them like this: `process.env.SOMETHING`. By default, these variables do not leak to the browser. If we need to make them public - we need to name these variables starting with `NEXT_PUBLIC_SOMETHING`

### 003 Fetching and Displaying Cabin List

If url to the image source is not on our server- we'll get an error. We need to add the url of that server to next.config.mjs [see documentation](https://nextjs.org/docs/messages/next-image-unconfigured-host)

### 004 Streaming Route Segments With loading.js File

To create a global loader, we add it to app/
If we need a spinner for a specific route - wa add loading.js to the folder with that route.
Adding loading.js activates streaming, so the page won't work if user disables javascript in the browser.

### 005 What is React Suspense

Suspense:

- Built-in React component that we can use to catch/isolate components (or entire subtrees) that are not ready to be rendered ("suspending")
- We can think of it like a catch block in a try / catch statement. It catches the element that are suspending
- What causes a component to be suspending?
  1. Fetching data (with a supported library)
  2. Loading code (with React's lazy loading)
- Native way to support asynchronous operations in a declarative way (no more isLoading states and render logic)

During render process, whenever React finds a component or a sub-tree that is currently suspending, it will:

- move back up to the closest Suspense parent ('boundary')
- discard already rendered children
- display fallback component / JSX

After the async work is done (the suspended component is ready) it renders subtree under Suspense boundary.

Components do NOT automatically suspend just because an async operation is happening inside them. Integrating async operations with Suspense is hard, so we use libraries (React Query, Next.js, etc.)
Behind the scenes, in the fiber tree, Suspense component wraps the suspended component into an Activity component. The Activity component either shows the suspended component, or a fallback. So it doesn't really destroy the suspended element - it just hides it. So its state is preserved during the suspending and unsuspending phases.
Usually if the suspended component suspends again - the fallback will be shown again. But it will NOT be shown again if the Suspense trigger is wrapped in a transition (startTransition). In Next.js, that's the case with page navigations. We can reset the Suspense boundary with a unique key prop.
Behind the scenes a component marks itself as suspending simply by throwing a Promise and thereby notifying the closest Suspense boundary.

### 006 Streaming UI With Suspense Cabin List

In Next.js we should get used to always have the data fetching as close as possible to the place that actually needs that data, because by doing so, we can then implement a more granular data fetching strategy.
To use Suspense, we just need to move the data fetching logic and the markup that we want to replace with fallback into a separate component, wrap that component into Suspense, and pass the fallback jsx as a prop: `<Suspense fallback={<Spinner />}></Suspense>`

### 007 Dynamic Route Segments Building the Cabin Page

To create a dynamic route segment (i.e. cabins/91, cabins/92, cabins/:cabinId), we just need to create a subfolder in cabins/ with a name in square brackets: `[cabinId]`
To get access to this cabinId, in [cabinId]/page.js we need to get params from props. These props will contain the data from the URL: `{ cabinId: '91' }`

### 008 Generating Dynamic Metadata

We can also generate metadata dynamically based on params and even fetch the data asynchronously. For example:

```
export async function generateMetadata({ params }) {
  const { name } = await getCabin(params.cabinId);

  return {
    title: `Cabin ${name}`,
  };
}
```

Using `generateMetadata()` function is a convention, so it really need to be called that. And it must return the object with the shape of metadata.

### 009 Error Handling Setting Up Error Boundaries

To handle any errors that might occur in our app, we can use another convention. In app/error.js we can define a component that'll be shown to the user instead of a broken page. Important:

1. The error.js component needs to be a client component ("use client")
2. In the props, it gets error and reset. error.message contains info about what happened. reset sort of reloads the component.

Also, just like with layout and loading components, we can have multiple error components nested inside different routes.

The error boundary can only catch rendering errors, so it won't catch errors that might happen in callback functions. It also can't catch errors that might happen in the root layout. To catch those, we would need to create a global-error (see documentation for more info).

### 010 Error Handling Not Found Errors

If a page is not found (the URL doesn't exist), Next.js will automatically show 404 error. We can replace it with our custom error component by creating not-found.js in the route folder that we want.
If we want to trigger this 404 error manually to show our error component, we can do this:

```
import { notFound } from "next/navigation";
notFound(); // trigger this if we want to show the error component
```

### 011 Different Types of SSR Static vs. Dynamic Rendering

- Next.js is a React framework, so rendering is done by React, following the rules we learned earlier
- Remember: Both Server and Client components are rendered on the server on the initial render
- In Next.js, the server-side rendering work is split by routes (Next.js splits the rendering work by route)
- Each route can be either static (also called pre-rendered) or dynamic
- There is also Partial Pre-Rendering (PPR) which mixes dynamic and static rendering in the same route

**Static vs Dynamic rendering**
Static rendering:

- HTML is generated at build time (whenever we run the build command), or periodically in the background by re-fetching data (ISR). So it's the developer who triggers the rendering
- One sort of static rendering is ISR (incremental static regeneration) which simply means that a route can be re-rendered periodically in the background
- Static rendering is useful when data doesn't change often and is not personalized to user
- Default rendering strategy in Next.js (even when a page or component fetches data)
- When deployed to Vercel, each static route is automatically hosted on a CDN (content delivery network)
- If all routes of an app are static, the entire app can be exported as a static website (SSG - static site generation)

Dynamic rendering:

- HTML is generated at request time (for each new request reaches the server), so it's the user who triggers the rendering
- Makes sense if:
  1. The data changes frequently and is personalized to the user (e.g. cart)
  2. Rendering a route requires information that depends on request (e.g. search params)
- A route automatically switches to dynamic rendering in certain conditions
- When deployed to Vercel, each dynamic route becomes a serverless function

**When Next.js switches to dynamic rendering**

- Usually, developers don't directly choose whether a route should be static or dynamic. Next.js will automatically switch to dynamic rendering in the following scenarios:
  1. The route has a dynamic segment (page uses params)
  2. searchParams are used in the page component (/product?quantity=23)
  3. headers() or cookies () are used in any of the route's server components
  4. An uncached data request is made in any of the route's server components
- This is necessary because any of these values can not be known by Next.js at built time
- We can also force Next.js to render a route dynamically by influencing caching:
  - `export const dynamic = 'force-dynamic' ;` from page.js
  - `export const revalidate = 0;` from page.js
  - `{ cache: 'no-store' }` added to a `fetch` request in any of the route's server components
  - `noStore()` in any of the route's server components

Some important terminology:

- Content Delivery Network (CDN): A network of servers located around the globe that cache and deliver a website's static content (HTML, CSS, JS, images) from as close as possible to each user.
- Serverless computing: With the serverless computing model, we can run application code, usually back-end code, without managing the server ourselves. Instead, we can just run single functions on a cloud provider: serverless functions. The server is initialized and active only for the duration the serverless function is running, unlike a traditional Node.js app where the server is constantly running. Remember: each dynamic route becomes a serverless function.
- The "edge": "As close as possible to the user". A CDN is part of an "edge" network, but there is also serverless "edge" computing. This is serverless computing that does not happen on a central server, but on a network that's distributed around the globe, as close as possible to the user (like a CDN but for running code). Important: we can select certain routes to run on the edge when deployed to Vercel.
- Incremental Static Regeneration (ISR): A Next.js feature that allows developers to update the content of a static page, in the background, even after the website has already been built and deployed. This happens by re-fetching the data of a component or entire route after a certain interval

### 012 Analyzing Rendering in Our App

If we run `npm run build`, Next.js will print in the console which routes will be static and which ones will be dynamic.

### 013 Making Dynamic Pages Static With generateStaticParams

If in our app we have dynamic routes, but there's a finite number of them, we can make Next.js render them statically. For that, we need to let it know about all of the possible routes. For example:

```
export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));

  return ids;
}
```

This'll create an array that looks like this:

```
[
  { cabinId: '91' },
  { cabinId: '92' },
  { cabinId: '93' },
  { cabinId: '94' },
]
```

So it needs to have a shape of an array og objects with key-value pairs like `[routeName]: value`. From this Next.js will know about all the possible pages and will be able to statically generate them.

### 014 Static Site Generation (SSG)

If all our site is static, we can deploy it as SSG. For that:

- add `output: "export"` to next.config.mjs
- run `npm run build`
- Next.js will create a folder called `out` with our site

If some of the routes are not static, Next.js will throw an error.

This `out` folder can then be deployed on any server (or run by Live server). However, if we run Live server, we can see that optimized images aren't there. That's because to optimize images, Next.js uses Vercel API dynamically on the server. Which we now no longer have, so we cannot use this service. To fix that, we can:

1. Not optimize images at all
2. Create our own custom loader that will then use a different service (like `Cloudinary`) and it'll make out website work again.

### 015 Partial Pre-Rendering

- Idea/problem: Most pages don't need to be 100% static or 100% dynamic
- Solution: Partial Pre-Rendering: a new rendering strategy that combines static
  and dynamic rendering in the same route
  1. A static (pre-rendered) shell is served immediately from a CDN, leaving holes for dynamic content
  2. The slower dynamic content is streamed in as it's rendered on the server
- Result: We get even faster pages that can mostly be delivered from the edge (CDN) even when there are small dynamic parts.

As of Next.js 14 and 15, PPR is highly experimental and should not be used in production!

- PPR needs to be turned on in config file
- By default, as much as possible of any route will be statically rendered, creating a static shell
- Dynamic parts (components) should be placed inside Suspense boundaries
- There are no new APIs to learn
- These boundaries tell Next.js that anything within the boundary is dynamic
- The boundary prevents the dynamic part (e.g. reading a header or making a non-cached fetch request) from spreading onto the entire route.
- We provide a static fallback to be shown while the dynamic part is rendering
- Dynamic components or sub-trees are inserted into the static shell as they become available

### 016 How Next.js Caches Data

- Caching: Storing fetched or computed data in a temporary location for future access, instead of having to re-fetch or re-compute the data every time it's needed
- Next.js caches very aggressively: everything that is possible to cache, is cached
- Next.js provides APIs for cache revalidation: removing data from the cache and updating it with fresh data (re-fetched or re-computed)
- Makes Next.js apps more performant and saves costs (computing and data access)
- Caching always ON by default: strange and unexpected behavior in some situations (stale data, for example). Some caches can't be turned off
- Very confusing: Many different Next.js APIs affect and control caching

The caching mechanisms:
(All of this is the behavior in production mode. Caching doesn't work in development)

REQUEST MEMOIZATION
**Where?** Server
**What data?** Data fetched with similar GET requests (same url and options in fetch function)
**How long?** One page request (one render, one user)
**Enables:** No need to fetch at the top of tree: the same fetch in multiple components only makes one request (Only in components (not route handlers or server actions))
**How to revalidate?** N.A.
**How to opt out?** AbortController

DATA CACHE
**Where?** Server
**What data?** Data fetched in a route or a single fetch request
**How long?** Indefinitely, even across de-deploys (can revalidate or opt out)
**Enables:** Data for static pages + ISR when revalidated
**How to revalidate?**

(Any of these force page to become dynamic, which also opts out of the Full Route cache)

- Time-based (automatic) for all data on page: `export const revalidate = <time>;` (page.js)
- Time-based (automatic) for one data request: `fetch('...', {next: {revalidate: <time>}})`
- On-demand (manual): `revalidatePath` or `revalidateTag`
- Will automatically revalidate full route cache

**How to opt out?**

- Entire page: `export const revalidate = 0;` (page.js)
- Entire page: `export const dynamic = "force-dynamic";` (page.js)
- Individual request: `fetch('...', {cache: "no-store"})`
- Individual server component: `noStore()` (`connection` in Next.js 15)

FULL ROUTE CACHE
**Where?** Server
**What data?** Entire static pages (HTML and RSC payload)
**How long?** Until the "Data cache" is invalidated (or app is re-deployed)
**Enables:** Static pages
**How to revalidate?** Will revalidate automatically when data cache is revalidated.
**How to opt out?** See data cache.

ROUTER CACHE
**Where?** Client
**What data?** Pre-fetched and visited pages: static and dynamic
**How long?** 30 sec dynamic / 5 min static (throughout one user session)
**Enables:** SPA-like navigation (instant navigation and no full reloads)
**How to revalidate?**

- By revalidating the data cache with `revalidatePath` or `revalidateTag` in server action
- Forcing a reload with `router.refresh`
- Setting or deleting a cookie in a server action `cookies.set` / `cookies.delete` in SA

**How to opt out?** Not possible (Can be very problematic)

### 017 Experimenting With Caching and ISR

To simulate production environment, we can run `npm run build && npm run start` or create our own commend in package.json `"prod": "next build && next start",`

By default, if we have a statically generated page, the data that was fetched at the point of building, will be set in stone (cached in Data cache and full route cache). Even if the data on the server changes, we don't see it no matter how many times we reload the page. It will stay the same for all the users until we revalidate the data.

To make a page dynamic, we set `export const revalidate = 0;` The value that we assign to `revalidate` must be a value, it can't be computed! The value always needs to be in seconds.
With `export const revalidate = 0;` the page will be regenerated for each request (on each page reload)

Incremental static regeneration (ISR) will regenerate a static page and fetch fresh data for it from time to time. It's kind of middle ground between fully static and dynamic.

The first user who comes to the page after the time has passed is the one who will regenerate it for the next one. So it's only the subsequent user will get that new result.

To opt out of caching for a particular component, we need to use `noStore()` function (`connection` in Next.js 15). But in practice that'll opt out the entire route from caching. So right now there's no difference between this option and `export const revalidate = 0;`. But in the future, when the PPR starts working, it'll work great with all of the components wrapped in <Suspense>.

## 35 - Client and Server Interactions

### 002 Blurring the Boundary Between Server and Client (RSC – Part 4)

Traditional server-client communication:

- Very clear server-client boundary
- Communication happens via an API
- Once JSON arrives from the back-end,the front-end takes over

Next.js with RSC + server actions:

- No clear separation between front-end and back-end anymore
- "Knitting": pieces of server and client code interweave (composability)
- Allow us to build true full-stack applications in just one codebase
- No need for an intermediary API in many times

Client-server boundaries are NOT established in the component tree, but in dependency tree. So it relies on where the components are imported.
So Client components cannot import server components. Only other client components (can't go back in client-server boundary).
But client components can render server component passed as props.

Server components, on the other hand, can import and render both client and server components.

A component can be both server and client instance. So if it's used by server component and doesn't have "use client" directive, it's a server component instance. If it does have "use client" directive or is imported by such a component - it'll be a client component instance. = A component inside the client-server boundary creates a client component instance.

### 004 Highlighting Current Side Navigation Link

We can play around with Suspense boundary in React DevTools (setting it to Suspended: true, for example).

To work with the url, we can use Next.js's custom hook.

```
import { usePathname } from "next/navigation";
...
const pathname = usePathname();
```

The component we use it in must be a client component.

### 005 Sharing State Between Client and Server The URL

A great way to share data between the client and the server is to add to the url. If we have search params in the url (`?capacity=small`) - we can read it in the server component of the page. Page.js gets access to it via prop `searchParams`. Other server components don't have access to it.
If the page uses `searchParams` - it can no longer be statically rendered and becomes dynamic.

To change the search params in the URL, we need to do this:

```
import { usePathname, useRouter, useSearchParams } from "next/navigation"; // everything needs to come from next/navigation!!

...

const searchParams = useSearchParams();
const router = useRouter();
const pathname = usePathname();

function handleFilter(filter) {
  const params = new URLSearchParams(searchParams);  // get access to the URL params
  params.set("capacity", filter); // change URL params
  router.replace(`${pathname}?${params.toString()}`, { scroll: false }); // navigate to the new URL & scroll to the top or not
}
```

Navigation in Next.js is always wrapped in a React transition. And in a transition, the suspense will not hide the content that has already been rendered earlier.
So when we use Next.js navigation, our components might seem stuck until the new data arrives. Next.js won't hide the previously rendered content and we won't see a spinner fallback.
To actually show the fallback, be just need to pass a new, unique key to the Suspense that wraps our loading content.

If `searchParams` change - then the page component will rerender.

### 006 Advanced Server Components in Client Components

We can render server components inside client components if we pass them in as props. That way, the server can build the component and pass the full version of it into the client component.

### 008 Using the Context API for State Management

If want to use Context API in out app, we need to create a context provider component and pass other components (including server ones) as children.

### 009 Creating an API Endpoint With Route Handlers

To create an API endpoint, we need to create a folder and put a `route.js` file into it. This folder cannot contain `page.js`!
In `route.js` we can create functions with "HTTP verbs" names like GET, POST, etc. These functions can return JSON that will be returned when we try to access the folder that contains this `route.js`.
In GET function we get access to `request` and `params` in the arguments and we can do what we need with them. For example, if are at a dynamic route, we can use the route id by getting it from `params`

## 36 - Authentication With NextAuth (Auth.js)

### 002 Setting Up NextAuth

To add authentication to a Next.js app, we can use NextAuth (= Auth.js) library. It helps to easily set up everything, if we have some external auth service (like Google or VK)

When creating routes, we can create a "catch all segment", which is a folder called `[...<whatever>]`. I.e. if we have `api/auth/[...<whatever>]/route.js` - all of the routes `api/auth/<anything here>` will lead to `route.js`

### 003 Getting the User Session

If we use `auth` from `NextAuth`, the entire route will become dynamic, because `auth` uses headers and cookies. So if use it in the layout - then the entire site will become dynamic.

**Authentication**: getting the right information about the current user and making sure that the user is who they claim to be.
**Authorization**: only allowing access to certain area of our website or app to users that are logged in and have the privilege to visit that part.

### 004 What is Middleware in Next.js

Middleware is a program that sits between two things. In Next.js middleware is a function that sits between the incoming request and the response. So it allows us to run some code based on the incoming request but before the response is completed.
Middleware details:

- By default, middleware runs before every route in a project, but we can specify whish paths using a matcher (so it runs after the request, but before the route the user is visiting is rendered and sent back)
- Analogy: chunk of code that's in every page.js component
- Only one middleware function: needs to be exported from middleware.js (or .ts) in the project root folder.
- Middleware needs to produce a response: 1 or 2
  1. It redirects or rewrites to a route (= runs before the routes are rendered)
  2. It sends response directly (usually JSON)

Use cases:

- Read and set cookies and headers
- Authentication and authorization
- Server-side analytics
- Redirect based on geolocation
- A/B testing

### 005 Protecting Routes With NextAuth Middleware

To create middleware, we need to create a file `middleware.js` in the root folder (not in the `app` folder). From there, we need to export a function called `middleware`.

To redirect from middleware, we do this: `return NextResponse.redirect(new URL("/new", request.url));`
To redirect only from specific routes, we do this:

```
export const config = {
  matcher: ["/exception1", "/exception2"],
};
```

If we want to run middleware based on authorization, we need to set `middleware = auth` and in `authConfig` add this:

```
callbacks: {
  authorized({ auth, request }) {
    return !!auth?.user;
  },
},
```

Then it'll automatically redirect us to the signin page.

### 006 Building a Custom Sign In Page

If we want to do something interactive on the server, we need to use server actions. This is done by submitting a form.

## 37 - Mutations With Server Actions + Modern React Hooks

### 002 What are Server Actions

We use Next.js to create interactive full-stack applications based on RSC architecture. I consists of two parts:

1. Data fetching (Server components)
2. Mutations (Server actions)

Server actions:

- The missing piece in the RSC architecture that enables interactive full-stack applications
- Async functions that run exclusively on the server, allowing us to perform data mutations
- Created with the "use server" directive at the top of the function or an entire module
- Behind the scenes: Next.js creates API endpoint (with URL) for each server action. Whenever a server action is called, a POST request is made to its URL (the function itself never reaches client) => We don't have to manually create APIs ro route handlers to mutate data.
- Unlike server components, Server actions need a running web server because they do not run on build time!

Server actions can be defined at the top of:

1. An async function in a server component. Can be used in component or passed to a client component (unlike functions)
2. Standalone file: exported functions become server actions that can be imported into any component [recommended]

"use server" directive is only for server actions, not for server components!

Server actions can be called from:

1. `action` attribute in a `<form>` element (in server and client components)
2. Event handlers (only client components)
3. `useEffect` (only client components)

In server actions, we can:

- Perform data mutations (create, update, delete)
- Update the UI with new data: Revalidate cache with `revalidatePath` and `revalidateTag`
- Work with cookies
- Many more...

### 003 Updating the Profile Using a Server Action

Whenever we're working with server actions, we need to remember that we're doing backend development. So we always need to make sure of 2 things:

1. The user who is invoking the server action actually has the authorization of doing the action that the server action is supposed to do.
2. We always need to treat all the inputs as unsafe.

Quite often in server actions we don't need to write out try/catch blocks. We just throw an error, and this error will be caught by the closest error boundary (`error.js`)

### 004 Manual Cache Revalidation

If we change the data with server actions, it is still cached. So if we submit the form, go to another route, and then come back - we might see stale data from before, if 30 seconds haven't passed yet or if we haven't hard-reloaded the page.
To fix that, we manually revalidate path by calling `revalidatePath("/our/path");` inside our server action. That's something that we usually need to do whenever the that data that was updated should be visible on the screen.

### 005 Displaying a Loading Indicator The useFormStatus Hook

We cannot use `useFormStatus` hook directly in the component that returns the form.
We need to use in a component that is inside that form:

```
function Submit() {
  const status = useFormStatus();
  return <button disabled={status.pending}>Submit</button>
}

export default function App() {
  return (
    <form action={action}>
      <Submit />
    </form>
  );
}
```

### 007 Deleting a Reservation

If we want to call server action from a client component, we need to wrap it in a function that has `"use server"` inside of it.

```
function deleteReservation() {
  "use server";
  //code
}
```

### 007 Deleting a Reservation

We always need to remember that when we're working with server actions and want to see the result of our changes, we need to revalidate the cache.

Also, when working with our database, we need to protect our requests, since their cURL can be just copied from devTools and used in a terminal. So we need to double-check that the user really has the right to do whatever they're doing.

### 008 Another Loading Indicator The useTransition Hook

The `useTransition` hook allows us to mark a state as a so-called transition. When a state is marked as a transition, that state update will happen without blocking the UI. This means that UI will stay responsive during the re-render + we'll get an indication that a state transition is happening.
In Next.js we can use `useTransition` to mark a server action as a transition too, which will allow us to get that indication that something is happening in the background.
It can be used like this:

```
function DeleteReservation({ bookingId }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(() => deleteReservation(bookingId));
  }

  return (
    <button onClick={handleDelete}>
      {!isPending ? (
        <span>Delete</span>
      ) : (
        <span>
          <SpinnerMini />
        </span>
      )}
    </button>
  );
}
```

### 010 Removing Reservations Immediately The useOptimistic Hook

Optimistic UI is a trick and a technique that we can use in order to improve the perceived performance of a user interface. It's called optimistic because we assume that a certain asynchronous operation will be successful before it has even finished (while it's still working in the background). Basically we show the expected result of how UI will look like if everything goes well. If for some reason it doesn't - the UI is set back to what is was.

```
function ReservationList({ bookings }) {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings, // current state which is rendered if no async operation is happening
    (curBookings, bookingId) => { // argument: 1. current state, 2. new info necessary to compute the optimistic state (it's passed into optimisticDelete)
      return curBookings.filter((booking) => booking.id !== bookingId);
    } // state update function which determines the next optimistic state
  );

  async function handleDelete(bookingId) {
    optimisticDelete(bookingId);
    await deleteReservation(bookingId);
  }

  return (
    <ul>
      {optimisticBookings.map((booking) => ( // optimisticBookings are bookings from useOptimistic in the beginning. While there's an async function - they're changed by optimisticDelete
        <ReservationCard
          onDelete={handleDelete}
          booking={booking}
          key={booking.id}
        />
      ))}
    </ul>
  );
}
```

optimisticDelete in this example is similar to dispatch function that triggers a reducer function, which takes the current state and computes the next state

useOptimistic is a hook, so it can only be used in client components.

### 012 Creating a New Reservation

When we call `revalidatePath` does not only clear the browser cache (=router cache), but also the data cache and full route cache in static sites / static pages.
