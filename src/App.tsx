import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/layout/navbar";
import { BrowserRouter } from "react-router-dom";
import { FavoritesProvider } from "./hooks/saveMovie";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import Footer from "./components/layout/footer";
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <FavoritesProvider>
          <Navbar />
          <main className="  py-0 bg--(bg) min-h-screen">
            <AppRoutes />
          </main>
        </FavoritesProvider>
        {/* <Footer /> */}
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
