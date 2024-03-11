import { describe, it } from "vitest";

import { render } from "@testing-library/vue";

import * as tests from "./../../tests";

import { shared } from "./../../core/test/~";

import * as poly from "./../src";
import * as mono from "./../src/mono";

import { A, Button, Div, RequiredA, RequiredButton, RequiredDiv, DefinedA, DefinedButton, DefinedDiv, DefinedSetupFnA, DefinedSetupFnButton, DefinedSetupFnDiv } from "./~res/components";

const PROPS = { "data-testid": "root" };
const KLASS_OPTIONS = shared.klass.abstract.options;
const REKLASS_OPTIONS = shared.reklass.abstract.options;

describe("poly", () => {
  describe("klassed", () => {
    const expect = (ui: any) => tests.expects.element(render(ui).getByTestId(PROPS["data-testid"]));

    it("A", () => {
      const Component = poly.klassed(A, KLASS_OPTIONS);
      expect(<Component {...PROPS} />).tagName("A");
    });

    it("Button", () => {
      const Component = poly.klassed(Button, KLASS_OPTIONS);
      expect(<Component {...PROPS} />).tagName("BUTTON");
    });

    describe("required", () => {
      it("A", () => {
        const Component = poly.klassed(RequiredA, KLASS_OPTIONS);
        expect(<Component {...PROPS} id="id" />).tagName("A");
      });

      it("Button", () => {
        const Component = poly.klassed(RequiredButton, KLASS_OPTIONS);
        expect(<Component {...PROPS} id="id" />).tagName("BUTTON");
      });

      describe("polymorphic", () => {
        it("A", () => {
          const Component = poly.klassed("span", KLASS_OPTIONS);
          expect(<Component {...PROPS} as={RequiredA} id="id" />).tagName("A");
        });

        it("Button", () => {
          const Component = poly.klassed("span", KLASS_OPTIONS);
          expect(<Component {...PROPS} as={RequiredButton} id="id" />).tagName("BUTTON");
        });
      });
    });

    describe("defined", () => {
      it("A", () => {
        const Component = poly.klassed(DefinedA, KLASS_OPTIONS);
        expect(<Component {...PROPS} id="id" />).tagName("A");
      });

      it("Button", () => {
        const Component = poly.klassed(DefinedButton, KLASS_OPTIONS);
        expect(<Component {...PROPS} id="id" />).tagName("BUTTON");
      });

      describe("polymorphic", () => {
        it("A", () => {
          const Component = poly.klassed("span", KLASS_OPTIONS);
          expect(<Component {...PROPS} as={DefinedA} id="id" />).tagName("A");
        });

        it("Button", () => {
          const Component = poly.klassed("span", KLASS_OPTIONS);
          expect(<Component {...PROPS} as={DefinedButton} id="id" />).tagName("BUTTON");
        });
      });
    });

    describe("defined setup fn", () => {
      it("A", () => {
        const Component = poly.klassed(DefinedSetupFnA, KLASS_OPTIONS);
        expect(<Component {...PROPS} id="id" />).tagName("A");
      });

      it("Button", () => {
        const Component = poly.klassed(DefinedSetupFnButton, KLASS_OPTIONS);
        expect(<Component {...PROPS} id="id" />).tagName("BUTTON");
      });

      describe("polymorphic", () => {
        it("A", () => {
          const Component = poly.klassed("span", KLASS_OPTIONS);
          expect(<Component {...PROPS} as={DefinedSetupFnA} id="id" />).tagName("A");
        });

        it("Button", () => {
          const Component = poly.klassed("span", KLASS_OPTIONS);
          expect(<Component {...PROPS} as={DefinedSetupFnButton} id="id" />).tagName("BUTTON");
        });
      });
    });
  });

  describe("reklassed", () => {
    const expect = (ui: any) => tests.expects.element(render(ui).getByTestId(PROPS["data-testid"]));

    it("Div", () => {
      const Component = poly.reklassed(Div, REKLASS_OPTIONS);
      expect(<Component {...PROPS} />).tagName("DIV");
    });

    describe("required", () => {
      it("Div", () => {
        const Component = poly.reklassed(RequiredDiv, REKLASS_OPTIONS);
        expect(<Component {...PROPS} id="id" />).tagName("DIV");
      });

      describe("polymorphic", () => {
        it("Div", () => {
          const Component = poly.reklassed("span", REKLASS_OPTIONS);
          expect(<Component {...PROPS} as={RequiredDiv} id="id" />).tagName("DIV");
        });
      });
    });

    describe("defined", () => {
      it("Div", () => {
        const Component = poly.reklassed(DefinedDiv, REKLASS_OPTIONS);
        expect(<Component {...PROPS} id="id" />).tagName("DIV");
      });

      describe("polymorphic", () => {
        it("Div", () => {
          const Component = poly.reklassed("span", REKLASS_OPTIONS);
          expect(<Component {...PROPS} as={DefinedDiv} id="id" />).tagName("DIV");
        });
      });
    });

    describe("defined setup fn", () => {
      it("Div", () => {
        const Component = poly.reklassed(DefinedSetupFnDiv, REKLASS_OPTIONS);
        expect(<Component {...PROPS} id="id" />).tagName("DIV");
      });

      describe("polymorphic", () => {
        it("Div", () => {
          const Component = poly.reklassed("span", REKLASS_OPTIONS);
          expect(<Component {...PROPS} as={DefinedSetupFnDiv} id="id" />).tagName("DIV");
        });
      });
    });
  });
});

describe("mono", () => {
  describe("klassed", () => {
    const expect = (ui: any) => tests.expects.element(render(ui).getByTestId(PROPS["data-testid"]));

    it("A", () => {
      const Component = mono.klassed(A, KLASS_OPTIONS);
      expect(<Component {...PROPS} />).tagName("A");
    });

    it("Button", () => {
      const Component = mono.klassed(Button, KLASS_OPTIONS);
      expect(<Component {...PROPS} />).tagName("BUTTON");
    });

    describe("required", () => {
      it("A", () => {
        const Component = mono.klassed(RequiredA, KLASS_OPTIONS);
        expect(<Component {...PROPS} id="id" />).tagName("A");
      });

      it("Button", () => {
        const Component = mono.klassed(RequiredButton, KLASS_OPTIONS);
        expect(<Component {...PROPS} id="id" />).tagName("BUTTON");
      });
    });

    describe("defined", () => {
      it("A", () => {
        const Component = mono.klassed(DefinedA, KLASS_OPTIONS);
        expect(<Component {...PROPS} id="id" />).tagName("A");
      });

      it("Button", () => {
        const Component = mono.klassed(DefinedButton, KLASS_OPTIONS);
        expect(<Component {...PROPS} id="id" />).tagName("BUTTON");
      });
    });

    describe("defined setup fn", () => {
      it("A", () => {
        const Component = mono.klassed(DefinedSetupFnA, KLASS_OPTIONS);
        expect(<Component {...PROPS} id="id" />).tagName("A");
      });

      it("Button", () => {
        const Component = mono.klassed(DefinedSetupFnButton, KLASS_OPTIONS);
        expect(<Component {...PROPS} id="id" />).tagName("BUTTON");
      });
    });
  });

  describe("reklassed", () => {
    const expect = (ui: any) => tests.expects.element(render(ui).getByTestId(PROPS["data-testid"]));

    it("Div", () => {
      const Component = mono.reklassed(Div, REKLASS_OPTIONS);
      expect(<Component {...PROPS} />).tagName("DIV");
    });

    describe("required", () => {
      it("Div", () => {
        const Component = mono.reklassed(RequiredDiv, REKLASS_OPTIONS);
        expect(<Component {...PROPS} id="id" />).tagName("DIV");
      });
    });

    describe("defined", () => {
      it("Div", () => {
        const Component = mono.reklassed(DefinedDiv, REKLASS_OPTIONS);
        expect(<Component {...PROPS} id="id" />).tagName("DIV");
      });
    });

    describe("defined setup fn", () => {
      it("Div", () => {
        const Component = mono.reklassed(DefinedSetupFnDiv, REKLASS_OPTIONS);
        expect(<Component {...PROPS} id="id" />).tagName("DIV");
      });
    });
  });
});
