# Benchmark

<p>
  <a title="github" href="https://github.com/flamrdevs/klass-benchmark" target="_blank" style="display: inline-block; margin: 0px 4px;">
    <img alt="github" src="https://none.deno.dev/ui/button/simple?i=github&e=Open in GitHub" hspace="1">
  </a>
</p>

<!-- /information/ -->

OS `x64 | win32 | 11th Gen Intel(R) Core(TM) i7-1165G7 @ 2.80GHz | 15.71GB`

Node.js `v20.5.1`

Testing on `Monday, 18 September 2023`.

<!-- /information/ -->

## Variants

<!-- variants -->

| No  | Libs                                 | Ops/Sec |
| --- | ------------------------------------ | ------: |
| 1   | @klass/core                          | 2341085 |
| 2   | onno                                 | 1568843 |
| 3   | classname-variants                   | 1263966 |
| 4   | @tw-classed/core                     |  902224 |
| 5   | @klass/core + tailwind-merge         |  612165 |
| 6   | @intrnl/cv                           |  581965 |
| 7   | tailwind-variants(-tailwind-merge)   |  415365 |
| 8   | @vanilla-extract/recipes (impostor!) |  381392 |
| 9   | tailwind-variants(+tailwind-merge)   |  344132 |
| 10  | cvu                                  |  275671 |
| 11  | classname-manager                    |  271240 |
| 12  | cva                                  |  267428 |
| 13  | cvu + tailwind-merge                 |  200508 |
| 14  | cva + tailwind-merge                 |  191538 |
| 15  | stitches (impostor!)                 |   91132 |
| 16  | pandacss (impostor!)                 |   78691 |

<!-- variants -->

## Variants Compound

<!-- variants-compound -->

| No  | Libs                                 | Ops/Sec |
| --- | ------------------------------------ | ------: |
| 1   | @klass/core                          |  717593 |
| 2   | classname-variants                   |  590949 |
| 3   | onno                                 |  565065 |
| 4   | @intrnl/cv                           |  455784 |
| 5   | @klass/core + tailwind-merge         |  358744 |
| 6   | @vanilla-extract/recipes (impostor!) |  273685 |
| 7   | @tw-classed/core                     |  143293 |
| 8   | cva                                  |  104751 |
| 9   | cva + tailwind-merge                 |   87456 |
| 10  | stitches (impostor!)                 |   74524 |
| 11  | cvu                                  |   52909 |
| 12  | tailwind-variants(-tailwind-merge)   |   52291 |
| 13  | tailwind-variants(+tailwind-merge)   |   49364 |
| 14  | cvu + tailwind-merge                 |   47717 |
| 15  | pandacss (impostor!)                 |   39917 |

<!-- variants-compound -->

## Responsive Variants

<!-- responsive-variants -->

| No  | Libs                                   | Ops/Sec |
| --- | -------------------------------------- | ------: |
| 1   | @klass/core                            |  668117 |
| 2   | @klass/core + tailwind-merge           |  472532 |
| 3   | tailwind-variants(-tailwind-merge)     |  124535 |
| 4   | tailwind-variants(+tailwind-merge)     |  122753 |
| 5   | @vanilla-extract/sprinkles (impostor!) |   94666 |
| 6   | pandacss (impostor!)                   |   51236 |

<!-- responsive-variants -->

## Slots

<!-- slots -->

| No  | Libs                 | Ops/Sec |
| --- | -------------------- | ------: |
| 1   | @klass/core/slots    |  881984 |
| 2   | tailwind-variants    |   27860 |
| 3   | pandacss (impostor!) |   24190 |

<!-- slots -->
