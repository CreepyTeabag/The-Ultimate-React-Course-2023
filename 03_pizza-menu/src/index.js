import React from "react";
import ReactDOM from "react-dom/client"; // Needed for React 18

function App() {
   return <h1>Hello, React!</h1>
}

// React v18
const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />);
root.render(
   <React.StrictMode>
      <App />
   </React.StrictMode>
); // This enables strict mode

// React before 18
// React.render(<App />);