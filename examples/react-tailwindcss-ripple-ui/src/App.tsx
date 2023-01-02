import { useEffect, useState } from "react";
import type { PropsWithChildren } from "react";

import Box from "./components/ui/Box";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import Checkbox from "./components/ui/Checkbox";
import Switch from "./components/ui/Switch";

const Header = () => {
  type Theme = "light" | "dark";

  const title = "React TailwindCSS RippleUI";

  const [theme, setTheme] = useState<Theme>("dark");

  function toggleTheme() {
    setTheme((theme) => (theme === "dark" ? "light" : "dark"));
  }

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <header className="container mx-auto mb-2 max-w-screen-lg">
      <div className="p-8 flex justify-between items-center gap-4">
        <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold">{title}</h1>
        <div>
          <button
            type="button"
            className="px-3 py-1 outline-none bg-gray-50 hover:bg-gray-100 text-gray-900 rounded-lg shadow-lg text-base font-medium"
            onClick={toggleTheme}
          >
            {theme === "dark" ? "light" : "dark"} mode
          </button>
        </div>
      </div>
    </header>
  );
};

function Section(props: PropsWithChildren<{ title: string }>) {
  return (
    <div className="p-8 bg-gray-50 text-gray-900 rounded-lg shadow-lg">
      <h2 className="text-xl md:text-2xl xl:text-3xl font-bold">{props.title}</h2>

      <div className="p-2">{props.children}</div>
    </div>
  );
}

Section.Group = (props: PropsWithChildren<{ title: string }>) => {
  return (
    <div className="space-y-2 p-4">
      <div className="text-md md:text-lg xl:text-xl font-medium">{props.title}</div>
      <div className="p-1">{props.children}</div>
    </div>
  );
};

const Main = () => {
  return (
    <main className="container mx-auto my-2 p-4 max-w-screen-lg space-y-4">
      <Section title="Box">
        <Section.Group title="Padding">
          <Box p="sm" className="border border-gray-600">
            p=sm
          </Box>
          <Box px="md" className="border border-gray-600">
            px=md
          </Box>
          <Box py="lg" className="border border-gray-600">
            py=lg
          </Box>
        </Section.Group>

        <Section.Group title="Margin">
          <Box m="sm" className="border border-gray-600">
            m=sm
          </Box>
          <Box mx="md" className="border border-gray-600">
            mx=md
          </Box>
          <Box my="lg" className="border border-gray-600">
            my=lg
          </Box>
        </Section.Group>
      </Section>

      <Section title="Button">
        <Section.Group title="Default">
          <Box display="inline-block" m="xs">
            <Button>Default Button</Button>
          </Box>
        </Section.Group>

        <Section.Group title="Color">
          <Box display="inline-block" m="xs">
            <Button color="primary">Primary Button</Button>
          </Box>
          <Box display="inline-block" m="xs">
            <Button color="secondary">Secondary Button</Button>
          </Box>
          <Box display="inline-block" m="xs">
            <Button color="success">Success Button</Button>
          </Box>
          <Box display="inline-block" m="xs">
            <Button color="error">Error Button</Button>
          </Box>
          <Box display="inline-block" m="xs">
            <Button color="warning">Warning Button</Button>
          </Box>
        </Section.Group>

        <Section.Group title="Variant">
          <Box display="inline-block" m="xs">
            <Button color="primary" variant="default">
              Default Button
            </Button>
          </Box>
          <Box display="inline-block" m="xs">
            <Button color="primary" variant="outline">
              Outline Button
            </Button>
          </Box>
          <Box display="inline-block" m="xs">
            <Button variant="ghost">Ghost Button</Button>
          </Box>
        </Section.Group>

        <Section.Group title="Disabled">
          <Box display="inline-block" m="xs">
            <Button color="primary" variant="default" disabled>
              Default Button
            </Button>
          </Box>
          <Box display="inline-block" m="xs">
            <Button color="primary" variant="outline" disabled>
              Outline Button
            </Button>
          </Box>
          <Box display="inline-block" m="xs">
            <Button variant="ghost" disabled>
              Ghost Button
            </Button>
          </Box>
        </Section.Group>

        <Section.Group title="Size">
          <Box display="inline-block" m="xs">
            <Button size="xs">Extra Small Button</Button>
          </Box>
          <Box display="inline-block" m="xs">
            <Button size="sm">Small Button</Button>
          </Box>
          <Box display="inline-block" m="xs">
            <Button size="md">Medium Button</Button>
          </Box>
          <Box display="inline-block" m="xs">
            <Button size="lg">Large Button</Button>
          </Box>
          <Box display="inline-block" m="xs">
            <Button size="xl">Extra Large Button</Button>
          </Box>
        </Section.Group>

        <Section.Group title="Rounded">
          <Box display="inline-block" m="xs">
            <Button rounded>Rounded Button</Button>
          </Box>
        </Section.Group>

        <Section.Group title="Block">
          <Box display="inline-block" m="xs">
            <Button block>Block Button</Button>
          </Box>
        </Section.Group>

        <Section.Group title="Loading">
          <Box display="inline-block" m="xs">
            <Button loading>Loading Button</Button>
          </Box>
        </Section.Group>

        <Section.Group title="No Animation">
          <Box display="inline-block" m="xs">
            <Button noAnimation>No Animation Button</Button>
          </Box>
        </Section.Group>

        <Section.Group title="Button Anchor">
          <Box display="inline-block" m="xs">
            <Button as="a" href="/#">
              Button Anchor
            </Button>
          </Box>
        </Section.Group>
      </Section>

      <Section title="Input">
        <Section.Group title="Default">
          <Box display="inline-block" m="xs">
            <Input placeholder="Default Input" />
          </Box>
        </Section.Group>

        <Section.Group title="Color">
          <Box display="inline-block" m="xs">
            <Input color="primary" placeholder="Primary Input" />
          </Box>
          <Box display="inline-block" m="xs">
            <Input color="secondary" placeholder="Secondary Input" />
          </Box>
          <Box display="inline-block" m="xs">
            <Input color="success" placeholder="Success Input" />
          </Box>
          <Box display="inline-block" m="xs">
            <Input color="error" placeholder="Error Input" />
          </Box>
          <Box display="inline-block" m="xs">
            <Input color="warning" placeholder="Warning Input" />
          </Box>
        </Section.Group>

        <Section.Group title="Variant">
          <Box display="inline-block" m="xs">
            <Input variant="default" placeholder="Default Input" />
          </Box>
          <Box display="inline-block" m="xs">
            <Input variant="ghost" placeholder="Ghost Input" />
          </Box>
        </Section.Group>

        <Section.Group title="Disabled">
          <Box display="inline-block" m="xs">
            <Input variant="default" disabled placeholder="Default Input" />
          </Box>
          <Box display="inline-block" m="xs">
            <Input variant="ghost" disabled placeholder="Ghost Input" />
          </Box>
        </Section.Group>

        <Section.Group title="Size">
          <Box display="inline-block" m="xs">
            <Input size="xs" placeholder="Extra Small Input" />
          </Box>
          <Box display="inline-block" m="xs">
            <Input size="sm" placeholder="Small Input" />
          </Box>
          <Box display="inline-block" m="xs">
            <Input size="md" placeholder="Medium Input" />
          </Box>
          <Box display="inline-block" m="xs">
            <Input size="lg" placeholder="Large Input" />
          </Box>
          <Box display="inline-block" m="xs">
            <Input size="xl" placeholder="Extra Large Input" />
          </Box>
        </Section.Group>
      </Section>

      <Section title="Checkbox">
        <Section.Group title="Default">
          <Box display="inline-block" m="xs">
            <Checkbox />
          </Box>
        </Section.Group>

        <Section.Group title="Color">
          <Box display="inline-block" m="xs">
            <Checkbox color="primary" variant="default" />
          </Box>
          <Box display="inline-block" m="xs">
            <Checkbox color="secondary" variant="default" />
          </Box>
          <Box display="inline-block" m="xs">
            <Checkbox color="success" variant="default" />
          </Box>
          <Box display="inline-block" m="xs">
            <Checkbox color="error" variant="default" />
          </Box>
          <Box display="inline-block" m="xs">
            <Checkbox color="warning" variant="default" />
          </Box>
        </Section.Group>

        <Section.Group title="Variant">
          <Box display="inline-block" m="xs">
            <Checkbox variant="default" />
          </Box>
          <Box display="inline-block" m="xs">
            <Checkbox color="primary" variant="bordered" />
          </Box>
        </Section.Group>

        <Section.Group title="Disabled">
          <Box display="inline-block" m="xs">
            <Checkbox variant="default" disabled />
          </Box>
          <Box display="inline-block" m="xs">
            <Checkbox variant="default" disabled defaultChecked />
          </Box>
          <Box display="inline-block" m="xs">
            <Checkbox color="primary" variant="bordered" disabled />
          </Box>
          <Box display="inline-block" m="xs">
            <Checkbox color="primary" variant="bordered" disabled defaultChecked />
          </Box>
        </Section.Group>

        <Section.Group title="Size">
          <Box display="inline-block" m="xs">
            <Checkbox size="xs" />
          </Box>
          <Box display="inline-block" m="xs">
            <Checkbox size="sm" />
          </Box>
          <Box display="inline-block" m="xs">
            <Checkbox size="md" />
          </Box>
          <Box display="inline-block" m="xs">
            <Checkbox size="lg" />
          </Box>
          <Box display="inline-block" m="xs">
            <Checkbox size="xl" />
          </Box>
        </Section.Group>
      </Section>

      <Section title="Switch">
        <Section.Group title="Default">
          <Box display="inline-block" m="xs">
            <Switch />
          </Box>
        </Section.Group>

        <Section.Group title="Color">
          <Box display="inline-block" m="xs">
            <Switch color="primary" variant="bordered" />
          </Box>
          <Box display="inline-block" m="xs">
            <Switch color="secondary" variant="bordered" />
          </Box>
          <Box display="inline-block" m="xs">
            <Switch color="success" variant="bordered" />
          </Box>
          <Box display="inline-block" m="xs">
            <Switch color="error" variant="bordered" />
          </Box>
          <Box display="inline-block" m="xs">
            <Switch color="warning" variant="bordered" />
          </Box>
        </Section.Group>

        <Section.Group title="Variant">
          <Box display="inline-block" m="xs">
            <Switch variant="default" />
          </Box>
          <Box display="inline-block" m="xs">
            <Switch color="primary" variant="bordered" />
          </Box>
          <Box display="inline-block" m="xs">
            <Switch color="primary" variant="ghost" />
          </Box>
        </Section.Group>

        <Section.Group title="Disabled">
          <Box display="inline-block" m="xs">
            <Switch variant="default" disabled />
          </Box>
          <Box display="inline-block" m="xs">
            <Switch variant="default" disabled defaultChecked />
          </Box>
          <Box display="inline-block" m="xs">
            <Switch color="primary" variant="bordered" disabled />
          </Box>
          <Box display="inline-block" m="xs">
            <Switch color="primary" variant="bordered" disabled defaultChecked />
          </Box>
          <Box display="inline-block" m="xs">
            <Switch color="primary" variant="ghost" disabled />
          </Box>
          <Box display="inline-block" m="xs">
            <Switch color="primary" variant="ghost" disabled defaultChecked />
          </Box>
        </Section.Group>

        <Section.Group title="Size">
          <Box display="inline-block" m="xs">
            <Switch size="xs" />
          </Box>
          <Box display="inline-block" m="xs">
            <Switch size="sm" />
          </Box>
          <Box display="inline-block" m="xs">
            <Switch size="md" />
          </Box>
          <Box display="inline-block" m="xs">
            <Switch size="lg" />
          </Box>
          <Box display="inline-block" m="xs">
            <Switch size="xl" />
          </Box>
        </Section.Group>
      </Section>
    </main>
  );
};

const Footer = () => {
  return (
    <footer className="container mx-auto mt-2 max-w-screen-lg">
      <div className="p-8 flex justify-center items-center">
        <a href="https://github.com/flamrdevs/klass" className="outline-none select-none">
          klass
        </a>
      </div>
    </footer>
  );
};

function App() {
  return (
    <>
      <Header />

      <Main />

      <Footer />
    </>
  );
}

export default App;
