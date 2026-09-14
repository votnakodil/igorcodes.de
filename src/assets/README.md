# Asset naming

All asset file names use lowercase kebab-case and describe their context and role.

## Patterns

- Technology icons: `technology-<name>.svg`
- Brand icons: `brand-<name>.svg`
- Project covers: `<project>-cover.<ext>`
- Project compositions: `<project>-showcase-<position>.<ext>`
- Section photography: `<section>-<role>[-<variant>].<ext>`

Use meaningful words such as `cover`, `portrait`, `showcase`, `left`, `center`, and `right`. Avoid sequence-only names such as `1.webp`, generic names such as `image.png`, uppercase letters, spaces, and mixed separators.

Keep related assets in a dedicated subdirectory when a project has more than one visual file. For example:

```text
images/projects/kursvalut/
  kursvalut-showcase-left.webp
  kursvalut-showcase-center.webp
  kursvalut-showcase-right.webp
```
