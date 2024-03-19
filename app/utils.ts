export const classify = <T>(targets: T[], getter: (target: T) => string) => {
  const benchmark = {
    en: alphabetRange(),
    'zh-Hans-CN': '阿八嚓哒妸发旮哈讥讥咔垃妈拏噢妑七呥扨它穵 穵夕丫帀'.split(
      ''
    ),
  }
  return alphabetRange().map((letter, i) => {
    const items = targets.filter((target) => {
      const first = getter(target)[0]
      const locale = isAlphabet(first) ? 'en' : 'zh-Hans-CN'
      return !(
        (locale === 'zh-Hans-CN' && ['I', 'U', 'V'].includes(letter)) ||
        first.localeCompare(benchmark[locale][i], locale) < 0 ||
        first.localeCompare(benchmark[locale][i + 1], locale) >= 0
      )
    })
    return { letter, items }
  })
}

const isAlphabet = (c: string) => /^[A-Za-z]$/.test(c)

export const alphabetRange = () =>
  Array.from({ length: 26 }, (_v, k) =>
    String.fromCodePoint('A'.codePointAt(0)! + k)
  )
