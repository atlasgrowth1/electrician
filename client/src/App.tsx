import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Commercial from "@/pages/commercial";
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import Admin from "@/pages/admin";

function Router() {
  return (
    <Switch>
      <Route path="/:site/commercial" component={Commercial} />
      <Route path="/:site/login" component={Login} />
      <Route path="/:site/dashboard" component={Dashboard} />
      <Route path="/admin" component={Admin} />
      <Route path="/:site" component={Home} />
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