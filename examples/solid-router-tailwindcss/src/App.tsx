import { createEffect, createSignal } from "solid-js";
import type { Component, JSX } from "solid-js";

import { Link, Outlet, useLocation } from "@solidjs/router";

import Box from "./components/ui/Box";
import Button from "./components/ui/Button";

type Theme = "light" | "dark";

const App: Component = () => {
  const [theme, setTheme] = createSignal<Theme>("dark");

  function toggleTheme() {
    setTheme((theme) => (theme === "dark" ? "light" : "dark"));
  }

  createEffect(() => {
    document.documentElement.classList[theme() === "dark" ? "add" : "remove"]("dark");
  });

  const location = useLocation();

  return (
    <>
      <header class="container mx-auto my-4 max-w-screen-xl">
        <div class="px-8 py-4 flex justify-start items-center gap-4">
          <h1 class="text-2xl md:text-3xl xl:text-4xl font-bold">solid router tailwindcss + klass</h1>

          <div class="flex-grow" />

          <div class="space-x-2">
            <Button as={Link} href="/" class={{ "opacity-50": location.pathname !== "/" }}>
              Home
            </Button>
            <Button as={Link} href="/about" class={{ "opacity-50": location.pathname !== "/about" }}>
              About
            </Button>
            <Button as={Link} href="/contact" class={{ "opacity-50": location.pathname !== "/contact" }}>
              Contact
            </Button>
          </div>
          <div>
            <button
              type="button"
              class="px-3 py-1 outline-none bg-neutral-50 hover:bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-50 rounded-lg shadow-lg text-base font-medium"
              onClick={toggleTheme}
            >
              {theme() === "dark" ? "light" : "dark"} mode
            </button>
          </div>
        </div>
      </header>

      <main class="container mx-auto my-4 max-w-screen-xl space-y-4">
        <Box p="md">
          <Outlet />
        </Box>
      </main>
    </>
  );
};

export default App;
