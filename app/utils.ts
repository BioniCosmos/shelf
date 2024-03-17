export const classify = <T>(targets: T[], getter: (target: T) => string) => {
  const base = {
    en: alphabetRange(),
    'zh-Hans-CN': '阿八嚓哒妸发旮哈讥讥咔垃妈拏噢妑七呥扨它穵 穵夕丫帀'.split(
      ''
    ),
  }
  const map = base['en'].map((letter) => ({ letter, items: Array.of<T>() }))

  for (const target of targets) {
    const first = getter(target)[0]
    if (first === undefined) {
      continue
    }

    const locale = isAlphabet(first) ? 'en' : 'zh-Hans-CN'
    for (let i = 0; i < map.length; i++) {
      if (
        locale === 'zh-Hans-CN' &&
        (map[i].letter === 'I' ||
          map[i].letter === 'U' ||
          map[i].letter === 'V')
      ) {
        continue
      }

      if (
        first.localeCompare(base[locale][i], locale) >= 0 &&
        first.localeCompare(base[locale][i + 1], locale) < 0
      ) {
        map[i].items.push(target)
        break
      }
    }
  }
  return map
}

const isAlphabet = (c: string) => /^[A-Za-z]$/.test(c)

export const alphabetRange = () =>
  Array.from({ length: 26 }, (_v, k) =>
    String.fromCodePoint('A'.codePointAt(0)! + k)
  )
