import markdownit from 'markdown-it';
import markdownItRoughness from './roughness'

const md = markdownit()
  .use(markdownItRoughness);

console.log(md.render(`
# Avatar

I C U.

| A | B |
| --- | --- |
| 123 | 456 |
`))
