import { Route, Switch } from "wouter-preact";

import App from "./App";

const Home = () => {
  return (
    <div class="flex justify-center items-center aspect-video text-2xl md:text-3xl xl:text-4xl font-bold border-4 border-neutral-500/50 border-dashed rounded-3xl">
      Home Page
    </div>
  );
};

const About = () => {
  return (
    <div class="flex justify-center items-center aspect-video text-2xl md:text-3xl xl:text-4xl font-bold border-4 border-neutral-500/50 border-dashed rounded-3xl">
      About Page
    </div>
  );
};

const Contact = () => {
  return (
    <div class="flex justify-center items-center aspect-video text-2xl md:text-3xl xl:text-4xl font-bold border-4 border-neutral-500/50 border-dashed rounded-3xl">
      Contact Page
    </div>
  );
};

const RootRoutes = () => {
  return (
    <App>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
      </Switch>
    </App>
  );
};

export default RootRoutes;
