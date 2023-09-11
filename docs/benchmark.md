# Benchmark

<p>
  <a title="github" href="https://github.com/flamrdevs/klass-benchmark" target="_blank" style="display: inline-block; margin: 0px 4px;">
    <img alt="github" src="https://none.deno.dev/ui/button/simple?i=github&e=Open in GitHub" hspace="1">
  </a>
</p>

OS `x64 | win32 | 11th Gen Intel(R) Core(TM) i7-1165G7 @ 2.80GHz | 15.71GB`

Node.js `v20.5.1`

Testing on `Tuesday, 12 September 2023`.

## Variants

| No  | Libs                                 | Ops/Sec |
| --- | ------------------------------------ | ------: |
| 1   | @klass/core                          | 1759378 |
| 2   | classname-variants                   |  816012 |
| 3   | @tw-classed/core                     |  694961 |
| 4   | @klass/core + tailwind-merge         |  532937 |
| 5   | @intrnl/cv                           |  528032 |
| 6   | tailwind-variants(-tailwind-merge)   |  357239 |
| 7   | @vanilla-extract/recipes (impostor!) |  308376 |
| 8   | tailwind-variants(+tailwind-merge)   |  272108 |
| 9   | cvu                                  |  267728 |
| 10  | cva                                  |  233068 |
| 11  | classname-manager                    |  206604 |
| 12  | cvu + tailwind-merge                 |  182029 |
| 13  | cva + tailwind-merge                 |  166480 |
| 14  | pandacss (impostor!)                 |   67592 |

## Variants Compound

| No  | Libs                                 | Ops/Sec |
| --- | ------------------------------------ | ------: |
| 1   | @klass/core                          |  562332 |
| 2   | classname-variants                   |  513894 |
| 3   | @intrnl/cv                           |  391631 |
| 4   | @klass/core + tailwind-merge         |  292046 |
| 5   | @vanilla-extract/recipes (impostor!) |  230901 |
| 6   | @tw-classed/core                     |  123657 |
| 7   | cva                                  |   89968 |
| 8   | cva + tailwind-merge                 |   73457 |
| 9   | cvu                                  |   45127 |
| 10  | tailwind-variants(-tailwind-merge)   |   41689 |
| 11  | cvu + tailwind-merge                 |   41412 |
| 12  | tailwind-variants(+tailwind-merge)   |   40826 |
| 13  | pandacss (impostor!)                 |   32647 |

## Responsive Variants

| No  | Libs                                   | Ops/Sec |
| --- | -------------------------------------- | ------: |
| 1   | @klass/core                            |  538246 |
| 2   | @klass/core + tailwind-merge           |  398425 |
| 3   | tailwind-variants(+tailwind-merge)     |  105391 |
| 4   | tailwind-variants(-tailwind-merge)     |  103567 |
| 5   | @vanilla-extract/sprinkles (impostor!) |   75549 |
| 6   | pandacss (impostor!)                   |   42979 |
