'use client'

import { Stars } from '@/components/Stars'
import { classify, cn, range } from '@/lib/utils'
import { useState, type SVGAttributes } from 'react'
import { MagicCard } from 'react-magic-motion'
import 'react-magic-motion/card.css'
import doubanLogo from './assets/douban.png'
import { works } from './data'

export interface Work {
  name: string
  cover: string
  like: number
  comment: string
  link: string
}

export default function Page() {
  const categories = classify(works, ({ name }) => name)
  for (const category of categories) {
    category.items.sort((a, b) => a.name.localeCompare(b.name, 'zh-Hans-CN'))
  }
  const [isExpanded, setIsExpanded] = useState(
    Object.fromEntries(
      range('A', 26).map((letter) => [
        letter,
        Array.from({ length: 100 }, () => false),
      ])
    )
  )
  return categories.map(({ letter, items }) =>
    items.length !== 0 ? (
      <div className="p-4" key={letter}>
        <h2 className="text-3xl font-bold mb-4">{letter}</h2>
        <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4">
          {items.map((work, i) => (
            <MagicCard
              isCardExpanded={isExpanded[letter][i]}
              onBackgroundFadeClick={() =>
                setIsExpanded(
                  Object.fromEntries(
                    range('A', 26).map((letter) => [
                      letter,
                      Array.from({ length: 100 }, () => false),
                    ])
                  )
                )
              }
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              key={i}
            >
              <div
                onClick={() => {
                  setIsExpanded((prev) => {
                    return {
                      ...prev,
                      [letter]: prev[letter].map((_v, j) =>
                        j === i ? true : false
                      ),
                    }
                  })
                }}
                className={cn({
                  'p-10 bg-white bg-opacity-75 !flex-row gap-8 rounded-xl':
                    isExpanded[letter][i],
                })}
              >
                <picture
                  className={cn({
                    'basis-1/2': isExpanded[letter][i],
                  })}
                >
                  <source
                    srcSet={`${work.cover}?format=avif`}
                    type="image/avif"
                  />
                  <source
                    srcSet={`${work.cover}?format=webp`}
                    type="image/webp"
                  />
                  <img
                    src={work.cover}
                    alt={work.name}
                    className={cn(
                      'w-full aspect-[3_/_4]',
                      isExpanded[letter][i] ? 'object-contain' : 'object-cover'
                    )}
                  />
                </picture>
                <div
                  className={cn({
                    'basis-1/2': isExpanded[letter][i],
                  })}
                >
                  <h1
                    className={cn(
                      isExpanded[letter][i]
                        ? 'text-3xl font-bold sm:text-4xl xl:text-5xl mb-3'
                        : 'text-center font-bold pt-2 pb-3'
                    )}
                  >
                    {work.name}
                  </h1>
                  {isExpanded[letter][i] && (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-1">
                        <Stars count={work.like} />
                      </div>
                      <p
                        className="text-gray-500 md:text-xl lg:text-base xl:text-xl"
                        // dark:text-gray-400
                      >
                        {work.comment}
                      </p>
                      <a href={work.link} target="_blank">
                        <picture>
                          <img
                            src={doubanLogo.src}
                            alt="Douban logo"
                            width={30}
                            height={30}
                          />
                        </picture>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </MagicCard>
          ))}
        </div>
      </div>
    ) : null
  )
}

export function StarIcon(props: SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
