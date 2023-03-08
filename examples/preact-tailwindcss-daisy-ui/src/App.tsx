import { useEffect, useState } from "preact/hooks";
import type { ComponentChildren } from "preact";

import Box from "./components/ui/Box";
import Button from "./components/ui/Button";
import TextInput from "./components/ui/TextInput";
import Checkbox from "./components/ui/Checkbox";
import Toggle from "./components/ui/Toggle";

type PropsWithChildren<P = unknown> = P & {
  children?: ComponentChildren;
};

const Header = () => {
  type Theme = "light" | "dark";

  const title = "Preact TailwindCSS DaisyUI";

  const [theme, setTheme] = useState<Theme>("dark");

  function toggleTheme() {
    setTheme((theme) => (theme === "dark" ? "light" : "dark"));
  }

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
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
            {theme === "dark" ? "light" : "dark"} mode
          </button>
        </div>
      </div>
    </header>
  );
};

function Section(props: PropsWithChildren<{ title: string }>) {
  return (
    <div class="p-8 bg-base-100 text-base-content rounded-lg shadow-lg">
      <h2 class="text-xl md:text-2xl xl:text-3xl font-bold">{props.title}</h2>

      <div class="p-2">{props.children}</div>
    </div>
  );
}

Section.Group = (props: PropsWithChildren<{ title: string }>) => {
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

          <Button color="accent">Accent Button</Button>

          <Button color="info">Info Button</Button>

          <Button color="success">Success Button</Button>

          <Button color="warning">Warning Button</Button>

          <Button color="error">Error Button</Button>
        </Section.Group>

        <Section.Group title="Variant">
          <Button variant="default">Default Button</Button>

          <Button variant="outline">Outline Button</Button>

          <Button variant="ghost">Ghost Button</Button>
        </Section.Group>

        <Section.Group title="Disabled">
          <Button variant="default" disabled>
            Default Button
          </Button>

          <Button variant="outline" disabled>
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
        </Section.Group>

        <Section.Group title="Ratio">
          <Button ratio="square"></Button>

          <Button ratio="circle"></Button>
        </Section.Group>

        <Section.Group title="Block">
          <Button block>Block Button</Button>
        </Section.Group>

        <Section.Group title="Wide">
          <Button wide>Wide Button</Button>
        </Section.Group>

        <Section.Group title="Glass">
          <Button glass>Glass Button</Button>
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

      <Section title="TextInput">
        <Section.Group title="Default">
          <TextInput placeholder="Default TextInput" />
        </Section.Group>

        <Section.Group title="Color">
          <TextInput color="primary" placeholder="Primary TextInput" />

          <TextInput color="secondary" placeholder="Secondary TextInput" />

          <TextInput color="accent" placeholder="Accent TextInput" />

          <TextInput color="info" placeholder="Info TextInput" />

          <TextInput color="success" placeholder="Success TextInput" />

          <TextInput color="warning" placeholder="Warning TextInput" />

          <TextInput color="error" placeholder="Error TextInput" />
        </Section.Group>

        <Section.Group title="Variant">
          <TextInput variant="default" placeholder="Default TextInput" />

          <TextInput color="primary" variant="bordered" placeholder="Bordered TextInput" />

          <TextInput color="primary" variant="ghost" placeholder="Ghost TextInput" />
        </Section.Group>

        <Section.Group title="Disabled">
          <TextInput variant="default" disabled placeholder="Default TextInput" />

          <TextInput color="primary" variant="bordered" disabled placeholder="Bordered TextInput" />

          <TextInput color="primary" variant="ghost" disabled placeholder="Ghost TextInput" />
        </Section.Group>

        <Section.Group title="Size">
          <TextInput size="xs" placeholder="Extra Small TextInput" />

          <TextInput size="sm" placeholder="Small TextInput" />

          <TextInput size="md" placeholder="Medium TextInput" />

          <TextInput size="lg" placeholder="Large TextInput" />
        </Section.Group>
      </Section>

      <Section title="Checkbox">
        <Section.Group title="Default">
          <Checkbox />
        </Section.Group>

        <Section.Group title="Color">
          <Checkbox color="primary" />

          <Checkbox color="secondary" />

          <Checkbox color="accent" />

          <Checkbox color="info" />

          <Checkbox color="success" />

          <Checkbox color="warning" />

          <Checkbox color="error" />
        </Section.Group>

        <Section.Group title="Disabled">
          <Checkbox disabled />

          <Checkbox disabled defaultChecked />
        </Section.Group>

        <Section.Group title="Size">
          <Checkbox size="xs" />

          <Checkbox size="sm" />

          <Checkbox size="md" />

          <Checkbox size="lg" />
        </Section.Group>
      </Section>

      <Section title="Toggle">
        <Section.Group title="Default">
          <Toggle />
        </Section.Group>

        <Section.Group title="Color">
          <Toggle color="primary" />

          <Toggle color="secondary" />

          <Toggle color="accent" />

          <Toggle color="info" />

          <Toggle color="success" />

          <Toggle color="warning" />

          <Toggle color="error" />
        </Section.Group>

        <Section.Group title="Disabled">
          <Toggle disabled />

          <Toggle disabled defaultChecked />
        </Section.Group>

        <Section.Group title="Size">
          <Toggle size="xs" />

          <Toggle size="sm" />

          <Toggle size="md" />

          <Toggle size="lg" />
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
