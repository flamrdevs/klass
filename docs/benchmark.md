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
| 1   | @klass/core                          | 2200440 |
| 2   | onno                                 | 1540738 |
| 3   | classname-variants                   | 1202487 |
| 4   | @tw-classed/core                     |  864750 |
| 5   | @intrnl/cv                           |  554574 |
| 6   | @klass/core + tailwind-merge         |  526853 |
| 7   | tailwind-variants(-tailwind-merge)   |  406903 |
| 8   | @vanilla-extract/recipes (impostor!) |  337506 |
| 9   | tailwind-variants(+tailwind-merge)   |  333523 |
| 10  | cvu                                  |  289529 |
| 11  | classname-manager                    |  274889 |
| 12  | cva                                  |  263559 |
| 13  | cvu + tailwind-merge                 |  206135 |
| 14  | cva + tailwind-merge                 |  184955 |
| 15  | stitches (impostor!)                 |   91304 |
| 16  | pandacss (impostor!)                 |   78311 |

<!-- variants -->

## Variants Compound

<!-- variants-compound -->

| No  | Libs                                 | Ops/Sec |
| --- | ------------------------------------ | ------: |
| 1   | @klass/core                          |  671268 |
| 2   | classname-variants                   |  584735 |
| 3   | onno                                 |  540497 |
| 4   | @intrnl/cv                           |  474996 |
| 5   | @klass/core + tailwind-merge         |  341405 |
| 6   | @vanilla-extract/recipes (impostor!) |  269673 |
| 7   | @tw-classed/core                     |  144322 |
| 8   | cva                                  |  102945 |
| 9   | cva + tailwind-merge                 |   84093 |
| 10  | stitches (impostor!)                 |   73506 |
| 11  | cvu                                  |   50731 |
| 12  | tailwind-variants(-tailwind-merge)   |   50620 |
| 13  | tailwind-variants(+tailwind-merge)   |   49892 |
| 14  | cvu + tailwind-merge                 |   47234 |
| 15  | pandacss (impostor!)                 |   39761 |

<!-- variants-compound -->

## Responsive Variants

<!-- responsive-variants -->

| No  | Libs                                   | Ops/Sec |
| --- | -------------------------------------- | ------: |
| 1   | @klass/core                            |  647651 |
| 2   | @klass/core + tailwind-merge           |  452526 |
| 3   | tailwind-variants(+tailwind-merge)     |  122807 |
| 4   | tailwind-variants(-tailwind-merge)     |  122020 |
| 5   | @vanilla-extract/sprinkles (impostor!) |   91531 |
| 6   | pandacss (impostor!)                   |   49813 |

<!-- responsive-variants -->

## Slots

<!-- slots -->

| No  | Libs                               | Ops/Sec |
| --- | ---------------------------------- | ------: |
| 1   | @klass/core/slots                  |  805841 |
| 2   | @klass/core/slots + tailwind-merge |  472506 |
| 3   | tailwind-variants(-tailwind-merge) |   28018 |
| 4   | tailwind-variants(+tailwind-merge) |   27113 |
| 5   | pandacss (impostor!)               |   23477 |

<!-- slots -->
