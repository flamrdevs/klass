# Benchmark

<p>
  <a title="github" href="https://github.com/flamrdevs/klass-benchmark" target="_blank" style="display: inline-block; margin: 0px 4px;">
    <img alt="github" src="https://none.deno.dev/ui/button/simple?i=github&e=Open in GitHub" hspace="1">
  </a>
</p>

Device information `i7-1165G7 @ 2.80GHz 16.0 GB RAM`

OS `Windows 11`

Node.js `v20.2.0`

Testing on `August 25, 2023`.

## ClassName Concatenation

| Rank | Library           | Operations/Second |
| ---- | ----------------- | ----------------- |
| 1    | cxs (@klass/core) | 5,719,847         |
| 2    | clsx              | 5,666,823         |
| 3    | cx (cva)          | 4,400,073         |
| 4    | classnames        | 2,248,744         |

## Variants Only

| Rank | Library                            | Operations/Second |
| ---- | ---------------------------------- | ----------------- |
| 1    | @intrnl/cv                         | 3,532,607         |
| 2    | @klass/core                        | 2,903,817         |
| 3    | classname-variants                 | 1,835,020         |
| 4    | @tw-classed/core                   | 1,466,757         |
| 5    | @klass/core + tailwind-merge       | 837,744           |
| 6    | cva                                | 658,771           |
| 7    | tailwind-variants(-tailwind-merge) | 463,989           |
| 8    | cva + tailwind-merge               | 411,757           |
| 9    | tailwind-variants(+tailwind-merge) | 405,257           |

## Variants Compound

| Rank | Library                            | Operations/Second |
| ---- | ---------------------------------- | ----------------- |
| 1    | @intrnl/cv                         | 2,965,246         |
| 2    | @klass/core                        | 1,922,410         |
| 3    | classname-variants                 | 1,416,897         |
| 4    | @tw-classed/core                   | 777,729           |
| 5    | @klass/core + tailwind-merge       | 708,649           |
| 6    | cva                                | 522,258           |
| 7    | cva + tailwind-merge               | 337,589           |
| 8    | tailwind-variants(-tailwind-merge) | 281,765           |
| 9    | tailwind-variants(+tailwind-merge) | 245,010           |
