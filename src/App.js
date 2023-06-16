import React from "react";
import { SesionProvider } from "./Context/SesionContext";
import SesionRouter from "./Router/SesionRouter";

function App() {
  return (
    <SesionProvider>
      <SesionRouter />
    </SesionProvider>
  );
}

export default App;
