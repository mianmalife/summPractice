import { generate } from "./generate"
import { parseHtml } from "./parse"

export function compileToFunctions(template) {
  const ast = parseHtml(template)
  let code = generate(ast)
  let render = new Function(`with(this){return ${code}}`)
  console.log(render, code)
}