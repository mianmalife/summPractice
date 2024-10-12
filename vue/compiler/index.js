export function compileToFunctions(template) {
  const unicodeRegExp =
    /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/
  const attribute =
    /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
  const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z${unicodeRegExp.source}]*`
  const qnameCapture = `((?:${ncname}\\:)?${ncname})`
  const startTagOpen = new RegExp(`^<${qnameCapture}`)
  const startTagClose = /^\s*(\/?)>/
  const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)
  const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

  const ast = parseHtml(template)

  function start(tagName, attrs) {
    console.log(tagName, attrs, '开始标签')
  }

  function end(tagName, attrs) {
    console.log(tagName, attrs, '结束标签')
  }

  function chars(text) {
    console.log(text, '文本')
  }

  function parseHtml(html) {
    while (html) {
      const textEnd = html.indexOf('<')
      // 是开始标签
      if (textEnd == 0) {
        // 解析开始标签
        const startTagMatch = parseStartTag()
        if (startTagMatch) {
          start(startTagMatch.tagName, startTagMatch.attrs)
          continue
        }
      }

      // 解析结束标签
      const endTagMatch = html.match(endTag)
      if (endTagMatch) {
        advance(endTagMatch[0].length)
        end(endTagMatch[1])
        // parseEndTag(endTagMatch[1])
        continue
      }

      let text
      if (textEnd > 0) { //是文本
        text = html.substring(0, textEnd)
      }
      if (text) {
        advance(text.length)
        chars(text)
      }
    }

    function advance(n) {
      // 截掉已经解析的字符
      html = html.substring(n)
    }

    function parseStartTag() {
      const start = html.match(startTagOpen)
      if (start) {
        const match = {
          tagName: start[1],
          attrs: []
        }
        advance(start[0].length)
        let end
        let attrs
        // 不是关闭字符 > /> 并且匹配到了属性
        while (!(end = html.match(startTagClose)) && (attrs = html.match(attribute))) {
          match.attrs = { name: attrs[1], value: attrs[3] || attrs[4] || attrs[5] }
          advance(attrs[0].length)
        }
        if (end) {
          advance(end[0].length)
          return match
        }
      }
    }

    function parseEndTag(tag) {
      console.log(tag, '结束标签')
      console.log(html)
    }
  }
}