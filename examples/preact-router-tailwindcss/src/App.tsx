import { useEffect, useState } from "preact/hooks";
import type { ComponentChildren } from "preact";

import { Link, useLocation } from "wouter-preact";

import { klassed } from "@klass/preact";

import Box from "./components/ui/Box";
import Button from "./components/ui/Button";

type PropsWithChildren<P = unknown> = P & {
  children?: ComponentChildren;
};

type Theme = "light" | "dark";

const ButtonLink = klassed(Link, Button.klass.options);

function App(props: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>("dark");

  function toggleTheme() {
    setTheme((theme) => (theme === "dark" ? "light" : "dark"));
  }

  useEffect(() => {
    document.documentElement.classList[theme === "dark" ? "add" : "remove"]("dark");
  }, [theme]);

  const [pathname] = useLocation();

  return (
    <>
      <header className="container mx-auto my-4 max-w-screen-xl">
        <div className="px-8 py-4 flex flex-col lg:flex-row justify-start items-center flex-wrap gap-4">
          <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold">Preact Router TailwindCSS</h1>

          <div className="flex-grow" />

          <div className="space-x-2">
            <Button as={Link} href="/" className={{ "opacity-50": pathname !== "/" }}>
              Home
            </Button>
            <Button as={Link} href="/about" className={{ "opacity-50": pathname !== "/about" }}>
              About
            </Button>
            <ButtonLink href="/contact" className={{ "opacity-50": pathname !== "/contact" }}>
              Contact
            </ButtonLink>
          </div>
          <div>
            <button
              type="button"
              className="px-3 py-1 outline-none bg-neutral-50 hover:bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-50 rounded-lg shadow-lg text-base font-medium"
              onClick={toggleTheme}
            >
              {theme === "dark" ? "light" : "dark"} mode
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto my-4 max-w-screen-xl space-y-4">
        <Box p="md">{props.children}</Box>
      </main>
    </>
  );
}

export default App;
