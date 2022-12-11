import type { Component } from "solid-js";

import { Route, Routes } from "@solidjs/router";

import App from "./App";

const RootRoutes: Component = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route
          path="/"
          element={
            <div class="flex justify-center items-center aspect-video text-2xl md:text-3xl xl:text-4xl font-bold border-4 border-neutral-500/50 border-dashed rounded-3xl">
              Home Page
            </div>
          }
        />
        <Route
          path="/about"
          element={
            <div class="flex justify-center items-center aspect-video text-2xl md:text-3xl xl:text-4xl font-bold border-4 border-neutral-500/50 border-dashed rounded-3xl">
              About Page
            </div>
          }
        />
        <Route
          path="/contact"
          element={
            <div class="flex justify-center items-center aspect-video text-2xl md:text-3xl xl:text-4xl font-bold border-4 border-neutral-500/50 border-dashed rounded-3xl">
              Contact Page
            </div>
          }
        />
      </Route>
    </Routes>
  );
};

export default RootRoutes;
