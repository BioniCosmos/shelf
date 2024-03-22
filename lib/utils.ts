import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface Category<T> {
  letter: string
  items: T[]
}

let categories: Category<unknown>[] | null = null

export const classify = <T>(targets: T[], getter: (target: T) => string) => {
  if (categories === null) {
    const alphabetRange = range('A', 26)
    const benchmark = {
      en: alphabetRange,
      'zh-Hans-CN': '阿八嚓哒妸发旮哈讥讥咔垃妈拏噢妑七呥扨它穵 穵夕丫帀'.split(
        ''
      ),
    }
    categories = alphabetRange.map((letter, i) => {
      const items = targets.filter((target) => {
        const first = getter(target)[0]
        const [locale, options]: [
          keyof typeof benchmark,
          Intl.CollatorOptions
        ] = isAlphabet(first)
          ? ['en', { sensitivity: 'base' }]
          : ['zh-Hans-CN', {}]
        return !(
          (locale === 'zh-Hans-CN' && ['I', 'U', 'V'].includes(letter)) ||
          first.localeCompare(benchmark[locale][i], locale, options) < 0 ||
          first.localeCompare(benchmark[locale][i + 1], locale, options) >= 0
        )
      })
      return { letter, items }
    })
  }
  return categories as Category<T>[]
}

export const classifyAndSort = <T>(
  targets: T[],
  getter: (target: T) => string
) =>
  classify(targets, getter).map((target) => ({
    ...target,
    items: target.items.toSorted((a, b) =>
      getter(a).localeCompare(getter(b), 'zh-Hans-CN')
    ),
  }))

export const sortAndFlat = <T>(targets: T[], getter: (target: T) => string) =>
  classifyAndSort(targets, getter).flatMap(({ items }) => items)

const isAlphabet = (c: string) => /^[A-Za-z]$/.test(c)

export function range(length: number): number[]
export function range(start: number, length: number): number[]
export function range(start: string, length: number): string[]
export function range(
  startOrLength: number | string,
  length?: number
): (number | string)[] {
  if (length === undefined) {
    if (typeof startOrLength === 'number') {
      return range(0, startOrLength)
    }
    throw Error('Invalid arguments')
  }

  if (typeof startOrLength === 'string') {
    return Array.from({ length }, (_v, k) =>
      String.fromCodePoint(startOrLength.codePointAt(0)! + k)
    )
  }

  return Array.from({ length }, (_v, k) => startOrLength + k)
}
