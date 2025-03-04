import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Commercial from "@/pages/commercial";

function Router() {
  return (
    <Switch>
      <Route path="/:site" component={Home} />
      <Route path="/:site/" component={Home} />
      <Route path="/:site/commercial" component={Commercial} />
      <Route path="/" component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;