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

Testing on `Saturday, September 23, 2023`

<!-- /information/ -->

## Variants

<!-- variants -->

| No  | Libs                                 | Ops/Sec |
| --- | ------------------------------------ | ------: |
| 1   | @klass/core                          | 2237764 |
| 2   | onno                                 | 1450524 |
| 3   | classname-variants                   | 1096217 |
| 4   | @tw-classed/core                     |  889882 |
| 5   | @klass/core + tailwind-merge         |  541159 |
| 6   | @intrnl/cv                           |  506236 |
| 7   | tailwind-variants(-tailwind-merge)   |  369089 |
| 8   | @vanilla-extract/recipes (impostor!) |  321932 |
| 9   | tailwind-variants(+tailwind-merge)   |  300440 |
| 10  | cvu                                  |  270882 |
| 11  | classname-manager                    |  258012 |
| 12  | cva                                  |  232658 |
| 13  | class-variant                        |  223143 |
| 14  | cvu + tailwind-merge                 |  191297 |
| 15  | cva + tailwind-merge                 |  174812 |
| 16  | stitches (impostor!)                 |   80487 |
| 17  | pandacss (impostor!)                 |   69410 |

<!-- variants -->

## Variants Compound

<!-- variants-compound -->

| No  | Libs                                 | Ops/Sec |
| --- | ------------------------------------ | ------: |
| 1   | @klass/core                          |  882296 |
| 2   | onno                                 |  578497 |
| 3   | classname-variants                   |  476375 |
| 4   | @intrnl/cv                           |  456167 |
| 5   | @klass/core + tailwind-merge         |  400391 |
| 6   | @vanilla-extract/recipes (impostor!) |  262037 |
| 7   | @tw-classed/core                     |  130195 |
| 8   | cva                                  |   89005 |
| 9   | cva + tailwind-merge                 |   74484 |
| 10  | stitches (impostor!)                 |   70983 |
| 11  | tailwind-variants(+tailwind-merge)   |   50228 |
| 12  | cvu                                  |   48284 |
| 13  | tailwind-variants(-tailwind-merge)   |   46945 |
| 14  | cvu + tailwind-merge                 |   42893 |
| 15  | pandacss (impostor!)                 |   39656 |

<!-- variants-compound -->

## Responsive Variants

<!-- responsive-variants -->

| No  | Libs                                   | Ops/Sec |
| --- | -------------------------------------- | ------: |
| 1   | @klass/core                            |  695045 |
| 2   | @klass/core + tailwind-merge           |  453429 |
| 3   | tailwind-variants(-tailwind-merge)     |  113100 |
| 4   | tailwind-variants(+tailwind-merge)     |  109636 |
| 5   | @vanilla-extract/sprinkles (impostor!) |   86290 |
| 6   | pandacss (impostor!)                   |   44075 |

<!-- responsive-variants -->

## Slots

<!-- slots -->

| No  | Libs                               | Ops/Sec |
| --- | ---------------------------------- | ------: |
| 1   | @klass/core/slots                  |  675015 |
| 2   | @klass/core/slots + tailwind-merge |  505661 |
| 3   | tailwind-variants(-tailwind-merge) |   25238 |
| 4   | tailwind-variants(+tailwind-merge) |   22726 |
| 5   | pandacss (impostor!)               |   22451 |

<!-- slots -->
