import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const Parents = lazy(() => import("./pages/Parents"));
const Agents = lazy(() => import("./pages/Agents"));
const LocationNorfolk = lazy(() => import("./pages/LocationNorfolk"));
const LocationCanterbury = lazy(() => import("./pages/LocationCanterbury"));
const Apply = lazy(() => import("./pages/Apply"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center">
              Loading...
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Index />} />

            <Route path="/info/parents" element={<Parents />} />
            <Route path="/info/agents" element={<Agents />} />
            <Route
              path="/locations/canterbury"
              element={<LocationCanterbury />}
            />
            <Route path="/locations/norfolk" element={<LocationNorfolk />} />
            <Route path="/apply" element={<Apply />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
