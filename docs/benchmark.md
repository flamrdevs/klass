# Benchmark

<p>
  <a title="github" href="https://github.com/flamrdevs/klass-benchmark" target="_blank" style="display: inline-block; margin: 0px 4px;">
    <img alt="github" src="https://none.deno.dev/ui/button/simple?i=github&e=Open in GitHub" hspace="1">
  </a>
</p>

Device information `i7-1165G7 @ 2.80GHz 16.0 GB RAM`

## ClassName Concatenation

| Rank | Library           | Operations/Second |
| ---- | ----------------- | ----------------- |
| 1    | cxs (@klass/core) | 6,094,839         |
| 2    | clsx              | 6,039,732         |
| 3    | classnames        | 2,496,900         |

## Variants Only

| Rank | Library                            | Operations/Second |
| ---- | ---------------------------------- | ----------------- |
| 1    | @intrnl/cv                         | 3,536,548         |
| 2    | @klass/core                        | 2,755,022         |
| 3    | class-variance-authority           | 2,088,954         |
| 4    | classname-variants                 | 1,983,967         |
| 5    | @tw-classed/core                   | 1,580,935         |
| 6    | @klass/core + tailwind-merge       | 781,271           |
| 7    | tailwind-variants(-tailwind-merge) | 515,724           |
| 8    | tailwind-variants(+tailwind-merge) | 419,633           |

## Variants Compound

| Rank | Library                            | Operations/Second |
| ---- | ---------------------------------- | ----------------- |
| 1    | @intrnl/cv                         | 3,074,724         |
| 2    | @klass/core                        | 1,933,879         |
| 3    | classname-variants                 | 1,479,769         |
| 4    | class-variance-authority           | 1,102,529         |
| 5    | @tw-classed/core                   | 976,133           |
| 6    | @klass/core + tailwind-merge       | 667,609           |
| 7    | tailwind-variants(-tailwind-merge) | 320,303           |
| 8    | tailwind-variants(+tailwind-merge) | 271,879           |
