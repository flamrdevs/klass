import { useEffect, useState } from "react";
import type { PropsWithChildren } from "react";

import Box from "./components/ui/Box";
import Button from "./components/ui/Button";
import Checkbox from "./components/ui/Checkbox";
import Link from "./components/ui/Link";
import Radio from "./components/ui/Radio";
import Range from "./components/ui/Range";
import TextInput from "./components/ui/TextInput";
import Toggle from "./components/ui/Toggle";

function Section(props: PropsWithChildren<{ title: string }>) {
  return (
    <div className="px-8 py-4 bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-50 rounded-lg shadow-lg">
      <h2 className="text-md md:text-lg xl:text-xl font-bold">{props.title}</h2>

      <div className="p-2">{props.children}</div>
    </div>
  );
}

type Theme = "light" | "dark";

function App() {
  const [theme, setTheme] = useState<Theme>("dark");

  function toggleTheme() {
    setTheme((theme) => (theme === "dark" ? "light" : "dark"));
  }

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <>
      <header className="container mx-auto my-4 max-w-screen-xl">
        <div className="px-8 py-4 flex justify-between items-center gap-4">
          <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold">react tailwindcss daisy ui + klass</h1>
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
        <Section title="Box">
          <div className="space-y-2">
            <div className="space-x-2">
              <Box p="sm">Box</Box>
              <Box p="sm">Box</Box>
              <Box p="sm">Box</Box>
            </div>
          </div>
        </Section>

        <Section title="Button">
          <div className="space-y-2">
            <div className="space-x-2 space-y-2">
              <Button color="primary">Primary Button</Button>
              <Button color="secondary">Secondary Button</Button>
              <Button color="accent">Accent Button</Button>
              <Button color="info">Info Button</Button>
              <Button color="success">Success Button</Button>
              <Button color="warning">Warning Button</Button>
              <Button color="error">Error Button</Button>
            </div>
            <div className="space-x-2 space-y-2">
              <Button size="xs">Extra Small Button</Button>
              <Button size="sm">Small Button</Button>
              <Button size="md">Medium Button</Button>
              <Button size="lg">Large Button</Button>
            </div>
          </div>
        </Section>

        <Section title="Checkbox">
          <div className="space-y-2">
            <div className="space-x-2 space-y-2">
              <Checkbox color="primary" defaultChecked />
              <Checkbox color="secondary" defaultChecked />
              <Checkbox color="accent" defaultChecked />
              <Checkbox color="info" defaultChecked />
              <Checkbox color="success" defaultChecked />
              <Checkbox color="warning" defaultChecked />
              <Checkbox color="error" defaultChecked />
            </div>
            <div className="space-x-2 space-y-2">
              <Checkbox size="xs" defaultChecked />
              <Checkbox size="sm" defaultChecked />
              <Checkbox size="md" defaultChecked />
              <Checkbox size="lg" defaultChecked />
            </div>
          </div>
        </Section>

        <Section title="Link">
          <div className="space-y-2">
            <div className="space-x-2 space-y-2">
              <Link color="primary">Primary Link</Link>
              <Link color="secondary">Secondary Link</Link>
              <Link color="accent">Accent Link</Link>
              <Link color="info">Info Link</Link>
              <Link color="success">Success Link</Link>
              <Link color="warning">Warning Link</Link>
              <Link color="error">Error Link</Link>
            </div>
          </div>
        </Section>

        <Section title="Radio">
          <div className="space-y-2">
            <div className="space-x-2 space-y-2">
              <Radio color="primary" name="radio-color" defaultChecked />
              <Radio color="secondary" name="radio-color" />
              <Radio color="accent" name="radio-color" />
              <Radio color="info" name="radio-color" />
              <Radio color="success" name="radio-color" />
              <Radio color="warning" name="radio-color" />
              <Radio color="error" name="radio-color" />
            </div>
            <div className="space-x-2 space-y-2">
              <Radio size="xs" name="radio-size" defaultChecked />
              <Radio size="sm" name="radio-size" />
              <Radio size="md" name="radio-size" />
              <Radio size="lg" name="radio-size" />
            </div>
          </div>
        </Section>

        <Section title="Range">
          <div className="space-y-2">
            <div className="space-x-2 space-y-2">
              <Range color="primary" min={0} max={100} defaultValue={40} className="max-w-xs" />
              <Range color="secondary" min={0} max={100} defaultValue={40} className="max-w-xs" />
              <Range color="accent" min={0} max={100} defaultValue={40} className="max-w-xs" />
              <Range color="info" min={0} max={100} defaultValue={40} className="max-w-xs" />
              <Range color="success" min={0} max={100} defaultValue={40} className="max-w-xs" />
              <Range color="warning" min={0} max={100} defaultValue={40} className="max-w-xs" />
              <Range color="error" min={0} max={100} defaultValue={40} className="max-w-xs" />
            </div>
            <div className="space-x-2 space-y-2">
              <Range size="xs" min={0} max={100} defaultValue={40} className="max-w-xs" />
              <Range size="sm" min={0} max={100} defaultValue={40} className="max-w-xs" />
              <Range size="md" min={0} max={100} defaultValue={40} className="max-w-xs" />
              <Range size="lg" min={0} max={100} defaultValue={40} className="max-w-xs" />
            </div>
          </div>
        </Section>

        <Section title="TextInput">
          <div className="space-y-2">
            <div className="space-x-2 space-y-2">
              <TextInput color="primary" placeholder="..." />
              <TextInput color="secondary" placeholder="..." />
              <TextInput color="accent" placeholder="..." />
              <TextInput color="info" placeholder="..." />
              <TextInput color="success" placeholder="..." />
              <TextInput color="warning" placeholder="..." />
              <TextInput color="error" placeholder="..." />
            </div>
            <div className="space-x-2 space-y-2">
              <TextInput size="xs" placeholder="..." />
              <TextInput size="sm" placeholder="..." />
              <TextInput size="md" placeholder="..." />
              <TextInput size="lg" placeholder="..." />
            </div>
          </div>
        </Section>

        <Section title="Toggle">
          <div className="space-y-2">
            <div className="space-x-2 space-y-2">
              <Toggle color="primary" defaultChecked />
              <Toggle color="secondary" defaultChecked />
              <Toggle color="accent" defaultChecked />
              <Toggle color="info" defaultChecked />
              <Toggle color="success" defaultChecked />
              <Toggle color="warning" defaultChecked />
              <Toggle color="error" defaultChecked />
            </div>
            <div className="space-x-2 space-y-2">
              <Toggle size="xs" defaultChecked />
              <Toggle size="sm" defaultChecked />
              <Toggle size="md" defaultChecked />
              <Toggle size="lg" defaultChecked />
            </div>
          </div>
        </Section>
      </main>
    </>
  );
}

export default App;
