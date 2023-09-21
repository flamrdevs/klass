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

Testing on `Thursday, September 21, 2023`

<!-- /information/ -->

## Variants

<!-- variants -->

| No  | Libs                                 | Ops/Sec |
| --- | ------------------------------------ | ------: |
| 1   | @klass/core                          | 2361848 |
| 2   | onno                                 | 1507000 |
| 3   | classname-variants                   | 1250773 |
| 4   | @tw-classed/core                     |  778452 |
| 5   | @klass/core + tailwind-merge         |  568475 |
| 6   | @intrnl/cv                           |  553991 |
| 7   | tailwind-variants(-tailwind-merge)   |  375026 |
| 8   | @vanilla-extract/recipes (impostor!) |  372953 |
| 9   | tailwind-variants(+tailwind-merge)   |  340855 |
| 10  | cvu                                  |  272800 |
| 11  | classname-manager                    |  271240 |
| 12  | cva                                  |  256860 |
| 13  | class-variant                        |  223143 |
| 14  | cvu + tailwind-merge                 |  193000 |
| 15  | cva + tailwind-merge                 |  187522 |
| 16  | stitches (impostor!)                 |   87737 |
| 17  | pandacss (impostor!)                 |   75354 |

<!-- variants -->

## Variants Compound

<!-- variants-compound -->

| No  | Libs                                 | Ops/Sec |
| --- | ------------------------------------ | ------: |
| 1   | @klass/core                          |  716004 |
| 2   | onno                                 |  583666 |
| 3   | classname-variants                   |  540465 |
| 4   | @intrnl/cv                           |  428484 |
| 5   | @klass/core + tailwind-merge         |  344556 |
| 6   | @vanilla-extract/recipes (impostor!) |  260876 |
| 7   | @tw-classed/core                     |  134310 |
| 8   | cva                                  |   98398 |
| 9   | cva + tailwind-merge                 |   85470 |
| 10  | stitches (impostor!)                 |   66453 |
| 11  | cvu                                  |   49018 |
| 12  | tailwind-variants(-tailwind-merge)   |   48449 |
| 13  | tailwind-variants(+tailwind-merge)   |   46974 |
| 14  | cvu + tailwind-merge                 |   45246 |
| 15  | pandacss (impostor!)                 |   38303 |

<!-- variants-compound -->

## Responsive Variants

<!-- responsive-variants -->

| No  | Libs                                   | Ops/Sec |
| --- | -------------------------------------- | ------: |
| 1   | @klass/core                            |  626671 |
| 2   | @klass/core + tailwind-merge           |  452566 |
| 3   | tailwind-variants(+tailwind-merge)     |  115027 |
| 4   | tailwind-variants(-tailwind-merge)     |  114245 |
| 5   | @vanilla-extract/sprinkles (impostor!) |   85922 |
| 6   | pandacss (impostor!)                   |   49028 |

<!-- responsive-variants -->

## Slots

<!-- slots -->

| No  | Libs                               | Ops/Sec |
| --- | ---------------------------------- | ------: |
| 1   | @klass/core/slots                  |  772581 |
| 2   | @klass/core/slots + tailwind-merge |  460656 |
| 3   | tailwind-variants(+tailwind-merge) |   26341 |
| 4   | tailwind-variants(-tailwind-merge) |   24637 |
| 5   | pandacss (impostor!)               |   22872 |

<!-- slots -->
