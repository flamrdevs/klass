import { createEffect, createSignal } from "solid-js";
import type { Component, JSX } from "solid-js";

import Box from "./components/ui/Box";
import Button from "./components/ui/Button";

type PropsWithChildren<P = unknown> = P & { children?: JSX.Element };

function Section(props: PropsWithChildren<{ title: string }>) {
  return (
    <div class="px-8 py-4 bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-50 rounded-lg shadow-lg">
      <h2 class="text-md md:text-lg xl:text-xl font-bold">{props.title}</h2>

      <div class="p-2">{props.children}</div>
    </div>
  );
}

type Theme = "light" | "dark";

const App: Component = () => {
  const [theme, setTheme] = createSignal<Theme>("dark");

  function toggleTheme() {
    setTheme((theme) => (theme === "dark" ? "light" : "dark"));
  }

  createEffect(() => {
    document.documentElement.classList[theme() === "dark" ? "add" : "remove"]("dark");
  });

  return (
    <>
      <header class="container mx-auto my-4 max-w-screen-xl">
        <div class="px-8 py-4 flex justify-between items-center gap-4">
          <h1 class="text-2xl md:text-3xl xl:text-4xl font-bold">solid windicss</h1>
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
        <Section title="Box">
          <div class="space-y-2">
            <div class="space-x-2">
              <Box p="sm">Box</Box>
              <Box p="sm">Box</Box>
              <Box p="sm">Box</Box>
            </div>
          </div>
        </Section>

        <Section title="Button">
          <div class="space-y-2">
            <div class="space-x-2 space-y-2">
              <Button color="red">Red Button</Button>
              <Button color="green">Green Button</Button>
              <Button color="blue">Blue Button</Button>
            </div>
            <div class="space-x-2 space-y-2">
              <Button color="red" size="sm">
                Small Button
              </Button>
              <Button color="green" size="md">
                Medium Button
              </Button>
              <Button color="blue" size="lg">
                Large Button
              </Button>
            </div>
          </div>
        </Section>

        <Section title="Button Anchor">
          <div class="space-y-2">
            <div class="space-x-2 space-y-2">
              <Button as="a" href="/#" color="red">
                Red Button Anchor
              </Button>
              <Button as="a" href="/#" color="green">
                Green Button Anchor
              </Button>
              <Button as="a" href="/#" color="blue">
                Blue Button Anchor
              </Button>
            </div>
            <div class="space-x-2 space-y-2">
              <Button as="a" href="/#" color="red" size="sm">
                Small Button Anchor
              </Button>
              <Button as="a" href="/#" color="green" size="md">
                Medium Button Anchor
              </Button>
              <Button as="a" href="/#" color="blue" size="lg">
                Large Button Anchor
              </Button>
            </div>
          </div>
        </Section>
      </main>
    </>
  );
};

export default App;
