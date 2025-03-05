import { Switch, Route, useLocation, useParams } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Commercial from "@/pages/commercial";
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import Admin from "@/pages/admin";
import { useBusinessStore } from "./lib/businessStore";

// Component to track business site views
function ViewTracker() {
  const { site } = useParams();
  const { trackBusinessView } = useBusinessStore();
  
  useEffect(() => {
    // Only track for actual business sites, not for admin or other routes
    if (site) {
      console.log(`Tracking view for site: ${site}`);
      trackBusinessView(site).catch(err => {
        console.error(`Failed to track view for ${site}:`, err);
      });
    }
  }, [site, trackBusinessView]);
  
  return null; // This component doesn't render anything
}

// Add ViewTracker to site routes
function TrackedRoute(props: { component: React.ComponentType<any>, path: string }) {
  return (
    <Route
      path={props.path}
      component={(routeProps) => (
        <>
          <ViewTracker />
          <props.component {...routeProps} />
        </>
      )}
    />
  );
}

function Router() {
  const [location] = useLocation();
  console.log("Current location in Router:", location);

  return (
    <Switch>
      <Route path="/admin" component={Admin} />
      <TrackedRoute path="/:site/commercial" component={Commercial} />
      <Route path="/:site/login" component={Login} />
      <Route path="/:site/dashboard" component={Dashboard} />
      <TrackedRoute path="/:site" component={Home} />
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