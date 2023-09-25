# Benchmark

<p>
  <a title="github" href="https://github.com/flamrdevs/klass-benchmark">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://none.deno.dev/ui/button/simple?t=dark&i=github&e=Open%20in%20GitHub">
      <img alt="github" src="https://none.deno.dev/ui/button/simple?t=light&i=github&e=Open%20in%20GitHub">
    </picture>
  </a>
</p>

<!-- /information/ -->

OS `x64 | win32 | 11th Gen Intel(R) Core(TM) i7-1165G7 @ 2.80GHz | 15.71GB`

Node.js `v20.5.1`

Testing on `Monday, September 25, 2023`

<!-- /information/ -->

## Variants

<!-- variants -->

| No  | Libs                                 | Ops/Sec |
| --- | ------------------------------------ | ------: |
| 1   | @klass/core                          | 2298463 |
| 2   | onno                                 | 1621667 |
| 3   | classname-variants                   | 1128274 |
| 4   | @tw-classed/core                     |  863142 |
| 5   | @klass/core + tailwind-merge         |  597771 |
| 6   | @intrnl/cv                           |  591401 |
| 7   | tailwind-variants(-tailwind-merge)   |  424812 |
| 8   | @vanilla-extract/recipes (impostor!) |  350398 |
| 9   | tailwind-variants(+tailwind-merge)   |  340248 |
| 10  | cvu                                  |  296983 |
| 11  | classname-manager                    |  278522 |
| 12  | cva                                  |  273190 |
| 13  | class-variant                        |  223143 |
| 14  | cvu + tailwind-merge                 |  202825 |
| 15  | cva + tailwind-merge                 |  196734 |
| 16  | stitches (impostor!)                 |   90604 |
| 17  | pandacss (impostor!)                 |   79245 |

<!-- variants -->

## Variants Compound

<!-- variants-compound -->

| No  | Libs                                 | Ops/Sec |
| --- | ------------------------------------ | ------: |
| 1   | @klass/core                          |  823111 |
| 2   | classname-variants                   |  596465 |
| 3   | onno                                 |  581169 |
| 4   | @intrnl/cv                           |  470841 |
| 5   | @klass/core + tailwind-merge         |  405527 |
| 6   | @vanilla-extract/recipes (impostor!) |  280492 |
| 7   | @tw-classed/core                     |  145597 |
| 8   | cva                                  |  105219 |
| 9   | cva + tailwind-merge                 |   89001 |
| 10  | stitches (impostor!)                 |   76621 |
| 11  | cvu                                  |   52295 |
| 12  | tailwind-variants(-tailwind-merge)   |   52238 |
| 13  | tailwind-variants(+tailwind-merge)   |   51896 |
| 14  | cvu + tailwind-merge                 |   48754 |
| 15  | pandacss (impostor!)                 |   40812 |

<!-- variants-compound -->

## Responsive Variants

<!-- responsive-variants -->

| No  | Libs                                   | Ops/Sec |
| --- | -------------------------------------- | ------: |
| 1   | @klass/core                            |  640345 |
| 2   | @klass/core + tailwind-merge           |  470530 |
| 3   | tailwind-variants(-tailwind-merge)     |  125939 |
| 4   | tailwind-variants(+tailwind-merge)     |  122596 |
| 5   | @vanilla-extract/sprinkles (impostor!) |   93751 |
| 6   | pandacss (impostor!)                   |   51595 |

<!-- responsive-variants -->

## Slots

<!-- slots -->

| No  | Libs                               | Ops/Sec |
| --- | ---------------------------------- | ------: |
| 1   | @klass/core/slots                  |  963279 |
| 2   | @klass/core/slots + tailwind-merge |  507443 |
| 3   | tailwind-variants(-tailwind-merge) |   29201 |
| 4   | tailwind-variants(+tailwind-merge) |   28133 |
| 5   | pandacss (impostor!)               |   24202 |

<!-- slots -->
