# Benchmark

<p>
  <a title="github" href="https://github.com/flamrdevs/klass-benchmark" target="_blank" style="display: inline-block; margin: 0px 4px;">
    <img alt="github" src="https://none.deno.dev/ui/button/simple?i=github&e=Open in GitHub" hspace="1">
  </a>
</p>

OS `x64 | win32 | 11th Gen Intel(R) Core(TM) i7-1165G7 @ 2.80GHz | 15.71GB`

Node.js `v20.5.1`

Testing on `Friday, 15 September 2023`.

## Variants

| No  | Libs                                 | Ops/Sec |
| --- | ------------------------------------ | ------: |
| 1   | @klass/core                          | 2359262 |
| 2   | onno                                 | 1589834 |
| 3   | classname-variants                   | 1262852 |
| 4   | @tw-classed/core                     |  886347 |
| 5   | @klass/core + tailwind-merge         |  604750 |
| 6   | @intrnl/cv                           |  603070 |
| 7   | tailwind-variants(-tailwind-merge)   |  416523 |
| 8   | tailwind-variants(+tailwind-merge)   |  353357 |
| 9   | @vanilla-extract/recipes (impostor!) |  342620 |
| 10  | cvu                                  |  295359 |
| 11  | classname-manager                    |  275028 |
| 12  | cva                                  |  273486 |
| 13  | cvu + tailwind-merge                 |  207270 |
| 14  | cva + tailwind-merge                 |  197720 |
| 15  | stitches (impostor!)                 |   90523 |
| 16  | pandacss (impostor!)                 |   79138 |

## Variants Compound

| No  | Libs                                 | Ops/Sec |
| --- | ------------------------------------ | ------: |
| 1   | @klass/core                          |  612640 |
| 2   | classname-variants                   |  596251 |
| 3   | onno                                 |  581667 |
| 4   | @intrnl/cv                           |  478861 |
| 5   | @klass/core + tailwind-merge         |  334563 |
| 6   | @vanilla-extract/recipes (impostor!) |  279898 |
| 7   | @tw-classed/core                     |  143751 |
| 8   | cva                                  |  105350 |
| 9   | cva + tailwind-merge                 |   89046 |
| 10  | stitches (impostor!)                 |   75254 |
| 11  | cvu                                  |   52748 |
| 12  | tailwind-variants(-tailwind-merge)   |   52349 |
| 13  | tailwind-variants(+tailwind-merge)   |   51280 |
| 14  | cvu + tailwind-merge                 |   48585 |
| 15  | pandacss (impostor!)                 |   40121 |

## Responsive Variants

| No  | Libs                                   | Ops/Sec |
| --- | -------------------------------------- | ------: |
| 1   | @klass/core                            |  649255 |
| 2   | @klass/core + tailwind-merge           |  486601 |
| 3   | tailwind-variants(-tailwind-merge)     |  124291 |
| 4   | tailwind-variants(+tailwind-merge)     |  124171 |
| 5   | @vanilla-extract/sprinkles (impostor!) |   93788 |
| 6   | pandacss (impostor!)                   |   49954 |
