import { createEffect, createSignal } from "solid-js";
import type { ParentProps } from "solid-js";

import Box from "./components/ui/Box";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import Checkbox from "./components/ui/Checkbox";
import Switch from "./components/ui/Switch";

const Header = () => {
  type Theme = "light" | "dark";

  const title = "Solid TailwindCSS RippleUI";

  const [theme, setTheme] = createSignal<Theme>("dark");

  function toggleTheme() {
    setTheme((theme) => (theme === "dark" ? "light" : "dark"));
  }

  createEffect(() => {
    document.documentElement.dataset.theme = theme();
  }, [theme]);

  return (
    <header class="container mx-auto mb-2 max-w-screen-lg">
      <div class="p-8 flex justify-between items-center gap-4">
        <h1 class="text-2xl md:text-3xl xl:text-4xl font-bold">{title}</h1>
        <div>
          <button
            type="button"
            class="px-3 py-1 outline-none bg-gray-50 hover:bg-gray-100 text-gray-900 rounded-lg shadow-lg text-base font-medium"
            onClick={toggleTheme}
          >
            {theme() === "dark" ? "light" : "dark"} mode
          </button>
        </div>
      </div>
    </header>
  );
};

function Section(props: ParentProps<{ title: string }>) {
  return (
    <div class="p-8 bg-gray-50 text-gray-900 rounded-lg shadow-lg">
      <h2 class="text-xl md:text-2xl xl:text-3xl font-bold">{props.title}</h2>

      <div class="p-2">{props.children}</div>
    </div>
  );
}

Section.Group = (props: ParentProps<{ title: string }>) => {
  return (
    <div class="space-y-2 p-4">
      <div class="text-md md:text-lg xl:text-xl font-medium">{props.title}</div>
      <div class="p-1">{props.children}</div>
    </div>
  );
};

const Main = () => {
  return (
    <main class="container mx-auto my-2 p-4 max-w-screen-lg space-y-4">
      <Section title="Box">
        <Section.Group title="Padding">
          <Box p={{ base: "sm", md: "md" }} class="border border-base-300">
            p=(base=sm,md=md)
          </Box>
          <Box px={{ base: "md", md: "lg" }} class="border border-base-300">
            px=(base=md,md=lg)
          </Box>
          <Box py={{ base: "lg", md: "xl" }} class="border border-base-300">
            py=(base=lg,md=xl)
          </Box>
        </Section.Group>

        <Section.Group title="Margin">
          <Box m={{ base: "sm", md: "md" }} class="border border-base-300">
            m=(base=sm,md=md)
          </Box>
          <Box mx={{ base: "md", md: "lg" }} class="border border-base-300">
            mx=(base=md,md=lg)
          </Box>
          <Box my={{ base: "lg", md: "xl" }} class="border border-base-300">
            my=(base=lg,md=xl)
          </Box>
        </Section.Group>
      </Section>

      <Section title="Button">
        <Section.Group title="Default">
          <Button>Default Button</Button>
        </Section.Group>

        <Section.Group title="Color">
          <Button color="primary">Primary Button</Button>

          <Button color="secondary">Secondary Button</Button>

          <Button color="success">Success Button</Button>

          <Button color="error">Error Button</Button>

          <Button color="warning">Warning Button</Button>
        </Section.Group>

        <Section.Group title="Variant">
          <Button color="primary" variant="default">
            Default Button
          </Button>

          <Button color="primary" variant="outline">
            Outline Button
          </Button>

          <Button variant="ghost">Ghost Button</Button>
        </Section.Group>

        <Section.Group title="Disabled">
          <Button color="primary" variant="default" disabled>
            Default Button
          </Button>

          <Button color="primary" variant="outline" disabled>
            Outline Button
          </Button>

          <Button variant="ghost" disabled>
            Ghost Button
          </Button>
        </Section.Group>

        <Section.Group title="Size">
          <Button size="xs">Extra Small Button</Button>

          <Button size="sm">Small Button</Button>

          <Button size="md">Medium Button</Button>

          <Button size="lg">Large Button</Button>

          <Button size="xl">Extra Large Button</Button>
        </Section.Group>

        <Section.Group title="Rounded">
          <Button rounded>Rounded Button</Button>
        </Section.Group>

        <Section.Group title="Block">
          <Button block>Block Button</Button>
        </Section.Group>

        <Section.Group title="Loading">
          <Button loading>Loading Button</Button>
        </Section.Group>

        <Section.Group title="No Animation">
          <Button noAnimation>No Animation Button</Button>
        </Section.Group>

        <Section.Group title="Button Anchor">
          <Button as="a" href="/#">
            Button Anchor
          </Button>
        </Section.Group>
      </Section>

      <Section title="Input">
        <Section.Group title="Default">
          <Input placeholder="Default Input" />
        </Section.Group>

        <Section.Group title="Color">
          <Input color="primary" placeholder="Primary Input" />

          <Input color="secondary" placeholder="Secondary Input" />

          <Input color="success" placeholder="Success Input" />

          <Input color="error" placeholder="Error Input" />

          <Input color="warning" placeholder="Warning Input" />
        </Section.Group>

        <Section.Group title="Variant">
          <Input variant="default" placeholder="Default Input" />

          <Input variant="ghost" placeholder="Ghost Input" />
        </Section.Group>

        <Section.Group title="Disabled">
          <Input variant="default" disabled placeholder="Default Input" />

          <Input variant="ghost" disabled placeholder="Ghost Input" />
        </Section.Group>

        <Section.Group title="Size">
          <Input size="xs" placeholder="Extra Small Input" />

          <Input size="sm" placeholder="Small Input" />

          <Input size="md" placeholder="Medium Input" />

          <Input size="lg" placeholder="Large Input" />

          <Input size="xl" placeholder="Extra Large Input" />
        </Section.Group>
      </Section>

      <Section title="Checkbox">
        <Section.Group title="Default">
          <Checkbox />
        </Section.Group>

        <Section.Group title="Color">
          <Checkbox color="primary" variant="default" />

          <Checkbox color="secondary" variant="default" />

          <Checkbox color="success" variant="default" />

          <Checkbox color="error" variant="default" />

          <Checkbox color="warning" variant="default" />
        </Section.Group>

        <Section.Group title="Variant">
          <Checkbox variant="default" />

          <Checkbox color="primary" variant="bordered" />
        </Section.Group>

        <Section.Group title="Disabled">
          <Checkbox variant="default" disabled />

          <Checkbox variant="default" disabled checked />

          <Checkbox color="primary" variant="bordered" disabled />

          <Checkbox color="primary" variant="bordered" disabled checked />
        </Section.Group>

        <Section.Group title="Size">
          <Checkbox size="xs" />

          <Checkbox size="sm" />

          <Checkbox size="md" />

          <Checkbox size="lg" />

          <Checkbox size="xl" />
        </Section.Group>
      </Section>

      <Section title="Switch">
        <Section.Group title="Default">
          <Switch />
        </Section.Group>

        <Section.Group title="Color">
          <Switch color="primary" variant="bordered" />

          <Switch color="secondary" variant="bordered" />

          <Switch color="success" variant="bordered" />

          <Switch color="error" variant="bordered" />

          <Switch color="warning" variant="bordered" />
        </Section.Group>

        <Section.Group title="Variant">
          <Switch variant="default" />

          <Switch color="primary" variant="bordered" />

          <Switch color="primary" variant="ghost" />
        </Section.Group>

        <Section.Group title="Disabled">
          <Switch variant="default" disabled />

          <Switch variant="default" disabled checked />

          <Switch color="primary" variant="bordered" disabled />

          <Switch color="primary" variant="bordered" disabled checked />

          <Switch color="primary" variant="ghost" disabled />

          <Switch color="primary" variant="ghost" disabled checked />
        </Section.Group>

        <Section.Group title="Size">
          <Switch size="xs" />

          <Switch size="sm" />

          <Switch size="md" />

          <Switch size="lg" />

          <Switch size="xl" />
        </Section.Group>
      </Section>
    </main>
  );
};

const Footer = () => {
  return (
    <footer class="container mx-auto mt-2 max-w-screen-lg">
      <div class="p-8 flex justify-center items-center">
        <a href="https://github.com/flamrdevs/klass" class="outline-none select-none">
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
