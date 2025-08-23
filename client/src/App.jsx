import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./providers";
import Router from "./router/Router";
import { MovieProvider } from "./providers/MovieProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MovieProvider>
          <Router />
        </MovieProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
