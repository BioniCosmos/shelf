'use client'

import { Stars } from '@/components/Stars'
import { classifyAndSort, cn } from '@/lib/utils'
import type { Work } from '@prisma/client'
import { useState } from 'react'
import { MagicCard } from 'react-magic-motion'
import 'react-magic-motion/card.css'
import doubanLogo from './douban.png'

export default function DisplayShelf({ works }: { works: Work[] }) {
  const categories = classifyAndSort(works, ({ name }) => name)
  const [openWork, setOpenWork] = useState('')

  return categories.map(({ letter, items }) =>
    items.length !== 0 ? (
      <div className="p-4" key={letter}>
        <h2 className="text-3xl font-bold mb-4">{letter}</h2>
        <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4">
          {items.map((work, i) => {
            const isOpen = openWork === work.id
            return (
              <MagicCard
                isCardExpanded={isOpen}
                onBackgroundFadeClick={() => setOpenWork('')}
                transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                key={i}
              >
                <div
                  onClick={() => setOpenWork(work.id)}
                  className={cn(
                    isOpen
                      ? 'p-10 bg-white bg-opacity-75 !flex-row gap-8 rounded-xl'
                      : 'cursor-pointer'
                  )}
                >
                  <picture
                    className={cn({
                      'basis-1/2': isOpen,
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
                        isOpen ? 'object-contain' : 'object-cover'
                      )}
                    />
                  </picture>
                  <div
                    className={cn({
                      'basis-1/2': isOpen,
                    })}
                  >
                    <h1
                      className={cn(
                        isOpen
                          ? 'text-3xl font-bold sm:text-4xl xl:text-5xl mb-3'
                          : 'text-center font-bold pt-2 pb-3'
                      )}
                    >
                      {work.name}
                    </h1>
                    {isOpen && (
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
            )
          })}
        </div>
      </div>
    ) : null
  )
}
