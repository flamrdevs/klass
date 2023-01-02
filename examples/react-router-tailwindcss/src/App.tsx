import { useEffect, useState } from "react";

import { Link, Outlet, useLocation } from "react-router-dom";

import { klassed } from "@klass/react";

import Box from "./components/ui/Box";
import Button from "./components/ui/Button";

type Theme = "light" | "dark";

const ButtonLink = klassed(Link, Button.klass.options);

function App() {
  const [theme, setTheme] = useState<Theme>("dark");

  function toggleTheme() {
    setTheme((theme) => (theme === "dark" ? "light" : "dark"));
  }

  useEffect(() => {
    document.documentElement.classList[theme === "dark" ? "add" : "remove"]("dark");
  }, [theme]);

  const location = useLocation();

  return (
    <>
      <header className="container mx-auto my-4 max-w-screen-xl">
        <div className="px-8 py-4 flex flex-col lg:flex-row justify-start items-center flex-wrap gap-4">
          <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold">React Router TailwindCSS</h1>

          <div className="flex-grow" />

          <div className="space-x-2">
            <Button as={Link} to="/" className={{ "opacity-50": location.pathname !== "/" }}>
              Home
            </Button>
            <Button as={Link} to="/about" className={{ "opacity-50": location.pathname !== "/about" }}>
              About
            </Button>
            <ButtonLink to="/contact" className={{ "opacity-50": location.pathname !== "/contact" }}>
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
        <Box p="md">
          <Outlet />
        </Box>
      </main>
    </>
  );
}

export default App;
