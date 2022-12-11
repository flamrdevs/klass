import { createEffect, createSignal } from "solid-js";
import type { Component } from "solid-js";

type Theme = "light" | "dark";

const App: Component = () => {
  const [theme, setTheme] = createSignal<Theme>("dark");

  function toggleTheme() {
    setTheme((theme) => (theme === "dark" ? "light" : "dark"));
  }

  createEffect(() => {
    document.documentElement.dataset.theme = theme();
  });

  return (
    <>
      <header class="container mx-auto my-4 max-w-screen-xl">
        <div class="px-8 py-4 flex justify-between items-center gap-4">
          <h1 class="text-2xl md:text-3xl xl:text-4xl font-bold">solid tailwindcss daisy ui + klass</h1>
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
    </>
  );
};

export default App;
