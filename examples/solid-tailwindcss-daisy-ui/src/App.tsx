import { createEffect, createSignal } from "solid-js";
import type { ParentProps } from "solid-js";

import Box from "./components/ui/Box";
import Button from "./components/ui/Button";
import TextInput from "./components/ui/TextInput";
import Checkbox from "./components/ui/Checkbox";
import Toggle from "./components/ui/Toggle";

const Header = () => {
  type Theme = "light" | "dark";

  const title = "Solid TailwindCSS DaisyUI";

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
            class="px-3 py-1 outline-none bg-base-100 hover:bg-base-200 text-base-content rounded-lg shadow-lg text-base font-medium"
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
    <div class="p-8 bg-base-100 text-base-content rounded-lg shadow-lg">
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
          <Box p="sm" class="border border-base-300">
            p=sm
          </Box>
          <Box px="md" class="border border-base-300">
            px=md
          </Box>
          <Box py="lg" class="border border-base-300">
            py=lg
          </Box>
        </Section.Group>

        <Section.Group title="Margin">
          <Box m="sm" class="border border-base-300">
            m=sm
          </Box>
          <Box mx="md" class="border border-base-300">
            mx=md
          </Box>
          <Box my="lg" class="border border-base-300">
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
            <Button color="accent">Accent Button</Button>
          </Box>
          <Box display="inline-block" m="xs">
            <Button color="info">Info Button</Button>
          </Box>
          <Box display="inline-block" m="xs">
            <Button color="success">Success Button</Button>
          </Box>
          <Box display="inline-block" m="xs">
            <Button color="warning">Warning Button</Button>
          </Box>
          <Box display="inline-block" m="xs">
            <Button color="error">Error Button</Button>
          </Box>
        </Section.Group>

        <Section.Group title="Variant">
          <Box display="inline-block" m="xs">
            <Button variant="default">Default Button</Button>
          </Box>
          <Box display="inline-block" m="xs">
            <Button variant="outline">Outline Button</Button>
          </Box>
          <Box display="inline-block" m="xs">
            <Button variant="ghost">Ghost Button</Button>
          </Box>
        </Section.Group>

        <Section.Group title="Disabled">
          <Box display="inline-block" m="xs">
            <Button variant="default" disabled>
              Default Button
            </Button>
          </Box>
          <Box display="inline-block" m="xs">
            <Button variant="outline" disabled>
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
        </Section.Group>

        <Section.Group title="Ratio">
          <Box display="inline-block" m="xs">
            <Button ratio="square"></Button>
          </Box>
          <Box display="inline-block" m="xs">
            <Button ratio="circle"></Button>
          </Box>
        </Section.Group>

        <Section.Group title="Block">
          <Box display="inline-block" m="xs">
            <Button block>Block Button</Button>
          </Box>
        </Section.Group>

        <Section.Group title="Wide">
          <Box display="inline-block" m="xs">
            <Button wide>Wide Button</Button>
          </Box>
        </Section.Group>

        <Section.Group title="Glass">
          <Box display="inline-block" m="xs">
            <Button glass>Glass Button</Button>
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

      <Section title="TextInput">
        <Section.Group title="Default">
          <Box display="inline-block" m="xs">
            <TextInput placeholder="Default TextInput" />
          </Box>
        </Section.Group>

        <Section.Group title="Color">
          <Box display="inline-block" m="xs">
            <TextInput color="primary" placeholder="Primary TextInput" />
          </Box>
          <Box display="inline-block" m="xs">
            <TextInput color="secondary" placeholder="Secondary TextInput" />
          </Box>
          <Box display="inline-block" m="xs">
            <TextInput color="accent" placeholder="Accent TextInput" />
          </Box>
          <Box display="inline-block" m="xs">
            <TextInput color="info" placeholder="Info TextInput" />
          </Box>
          <Box display="inline-block" m="xs">
            <TextInput color="success" placeholder="Success TextInput" />
          </Box>
          <Box display="inline-block" m="xs">
            <TextInput color="warning" placeholder="Warning TextInput" />
          </Box>
          <Box display="inline-block" m="xs">
            <TextInput color="error" placeholder="Error TextInput" />
          </Box>
        </Section.Group>

        <Section.Group title="Variant">
          <Box display="inline-block" m="xs">
            <TextInput variant="default" placeholder="Default TextInput" />
          </Box>
          <Box display="inline-block" m="xs">
            <TextInput color="primary" variant="bordered" placeholder="Bordered TextInput" />
          </Box>
          <Box display="inline-block" m="xs">
            <TextInput color="primary" variant="ghost" placeholder="Ghost TextInput" />
          </Box>
        </Section.Group>

        <Section.Group title="Disabled">
          <Box display="inline-block" m="xs">
            <TextInput variant="default" disabled placeholder="Default TextInput" />
          </Box>
          <Box display="inline-block" m="xs">
            <TextInput color="primary" variant="bordered" disabled placeholder="Bordered TextInput" />
          </Box>
          <Box display="inline-block" m="xs">
            <TextInput color="primary" variant="ghost" disabled placeholder="Ghost TextInput" />
          </Box>
        </Section.Group>

        <Section.Group title="Size">
          <Box display="inline-block" m="xs">
            <TextInput size="xs" placeholder="Extra Small TextInput" />
          </Box>
          <Box display="inline-block" m="xs">
            <TextInput size="sm" placeholder="Small TextInput" />
          </Box>
          <Box display="inline-block" m="xs">
            <TextInput size="md" placeholder="Medium TextInput" />
          </Box>
          <Box display="inline-block" m="xs">
            <TextInput size="lg" placeholder="Large TextInput" />
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
            <Checkbox color="primary" />
          </Box>
          <Box display="inline-block" m="xs">
            <Checkbox color="secondary" />
          </Box>
          <Box display="inline-block" m="xs">
            <Checkbox color="accent" />
          </Box>
          <Box display="inline-block" m="xs">
            <Checkbox color="info" />
          </Box>
          <Box display="inline-block" m="xs">
            <Checkbox color="success" />
          </Box>
          <Box display="inline-block" m="xs">
            <Checkbox color="warning" />
          </Box>
          <Box display="inline-block" m="xs">
            <Checkbox color="error" />
          </Box>
        </Section.Group>

        <Section.Group title="Disabled">
          <Box display="inline-block" m="xs">
            <Checkbox disabled />
          </Box>
          <Box display="inline-block" m="xs">
            <Checkbox disabled checked />
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
        </Section.Group>
      </Section>

      <Section title="Toggle">
        <Section.Group title="Default">
          <Box display="inline-block" m="xs">
            <Toggle />
          </Box>
        </Section.Group>

        <Section.Group title="Color">
          <Box display="inline-block" m="xs">
            <Toggle color="primary" />
          </Box>
          <Box display="inline-block" m="xs">
            <Toggle color="secondary" />
          </Box>
          <Box display="inline-block" m="xs">
            <Toggle color="accent" />
          </Box>
          <Box display="inline-block" m="xs">
            <Toggle color="info" />
          </Box>
          <Box display="inline-block" m="xs">
            <Toggle color="success" />
          </Box>
          <Box display="inline-block" m="xs">
            <Toggle color="warning" />
          </Box>
          <Box display="inline-block" m="xs">
            <Toggle color="error" />
          </Box>
        </Section.Group>

        <Section.Group title="Disabled">
          <Box display="inline-block" m="xs">
            <Toggle disabled />
          </Box>
          <Box display="inline-block" m="xs">
            <Toggle disabled checked />
          </Box>
        </Section.Group>

        <Section.Group title="Size">
          <Box display="inline-block" m="xs">
            <Toggle size="xs" />
          </Box>
          <Box display="inline-block" m="xs">
            <Toggle size="sm" />
          </Box>
          <Box display="inline-block" m="xs">
            <Toggle size="md" />
          </Box>
          <Box display="inline-block" m="xs">
            <Toggle size="lg" />
          </Box>
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
