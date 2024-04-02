import doubanLogo from '@/assets/douban.png'
import { Stars } from '@/components/Stars'
import prisma from '@/lib/db'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params
  const work = await prisma.work.findUnique({ where: { id } })

  if (work === null) {
    notFound()
  }

  return (
    <div className="p-10 bg-white dark:bg-black flex gap-12">
      <picture className="basis-1/2">
        <source srcSet={`${work.cover}?format=avif`} type="image/avif" />
        <source srcSet={`${work.cover}?format=webp`} type="image/webp" />
        <img
          src={work.cover}
          alt={work.name}
          className="max-w-full ml-auto mr-0"
        />
      </picture>
      <div className="basis-1/2 flex flex-col gap-4">
        <h1 className="text-3xl font-bold sm:text-4xl xl:text-5xl">
          {work.name}
        </h1>
        <Stars count={work.like} />
        {work.comment !== '' && (
          <p className="text-zinc-500 md:text-xl lg:text-base xl:text-xl">
            {work.comment}
          </p>
        )}
        <a href={work.link} target="_blank">
          <Image src={doubanLogo} alt="Douban logo" width={30} height={30} />
        </a>
      </div>
    </div>
  )
}
