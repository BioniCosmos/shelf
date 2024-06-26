import doubanLogo from '@/assets/douban.png'
import { Stars } from '@/components/Stars'
import prisma from '@/lib/db'
import { openGraph } from '@/lib/metadata'
import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export const metadata: Metadata = { openGraph }

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params
  const work = await prisma.work.findUnique({ where: { id } })
  if (work === null) {
    notFound()
  }

  metadata.title = work.name
  metadata.openGraph!.title = work.name

  return (
    <div className="flex gap-4 sm:gap-6 md:gap-10 lg:px-16">
      <picture className="basis-1/2">
        <source srcSet={`${work.cover}?format=avif`} type="image/avif" />
        <source srcSet={`${work.cover}?format=webp`} type="image/webp" />
        <img
          src={work.cover}
          alt={work.name}
          className="max-w-full ml-auto mr-0 lg:mr-auto mt-4 shadow-2xl rounded-xl"
        />
      </picture>
      <div className="basis-1/2 flex flex-col gap-4">
        <h1 className="text-3xl font-bold sm:text-4xl xl:text-5xl">
          {work.name}
        </h1>
        <Stars count={work.like} />
        {work.comment !== '' && (
          <p
            className="text-zinc-500 md:text-xl lg:text-base xl:text-xl"
            dangerouslySetInnerHTML={{
              __html: work.comment.replaceAll('\n', '<br>'),
            }}
          />
        )}
        {work.link !== '' && (
          <a href={work.link} target="_blank">
            <Image src={doubanLogo} alt="Douban logo" width={30} height={30} />
          </a>
        )}
      </div>
    </div>
  )
}
