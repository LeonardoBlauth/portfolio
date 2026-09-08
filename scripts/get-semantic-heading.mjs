const hiddenAttribute = /\baria-hidden\s*=\s*(?:"true"|'true'|true)(?=\s|>|\/)/i
const htmlTag = /<\/?[a-z][^>]*>/gi

export const getSemanticHeadingText = (headingHtml) => {
  const hiddenStack = []
  let text = ''
  let cursor = 0

  for (const match of headingHtml.matchAll(htmlTag)) {
    if (!hiddenStack.at(-1)) text += headingHtml.slice(cursor, match.index)

    const tag = match[0]
    const isClosingTag = tag.startsWith('</')
    const isSelfClosingTag = tag.endsWith('/>')

    if (isClosingTag) {
      hiddenStack.pop()
    } else if (!isSelfClosingTag) {
      hiddenStack.push(Boolean(hiddenStack.at(-1)) || hiddenAttribute.test(tag))
    }

    cursor = match.index + tag.length
  }

  if (!hiddenStack.at(-1)) text += headingHtml.slice(cursor)

  return text.replace(/\s+/g, ' ').trim()
}
