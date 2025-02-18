import Image from 'next/image';
import OpinionUnit from './OpinionUnit';

import { OPINION, TEXT } from '@/widgets/home/model';
import { parse } from '@/shared/utils';
import FeatureCarousel from './FeatureCarousel';

export default function HomeContainer() {
  return (
    <div className="flex w-full flex-col">
      <Header />
      <div className="mt-40 box-border flex flex-col items-center justify-center">
        <p className="text-text-light pb-6 text-lg font-light">
          {TEXT.HOME.LAND_QUESTION}
        </p>
        <p className="text-xl font-medium">{TEXT.HOME.LAND_MESSAGE_1}</p>
        <p className="text-xl font-bold">{TEXT.HOME.LAND_MESSAGE_2}</p>
        <div className="mt-20 flex h-fit w-[69%] flex-col gap-y-[57px]">
          {OPINION.map((data) => (
            <OpinionUnit
              key={data.id}
              reversed={data.reversed}
              text={data.text}
              image={data.image}
            />
          ))}
        </div>
        <div className="mt-45 flex flex-col items-center justify-center">
          <p className="text-xl font-medium">{TEXT.HOME.FEATURE_INTRODUCE_1}</p>
          <p className="text-xl font-bold">{TEXT.HOME.FEATURE_INTRODUCE_2}</p>
        </div>
        <FeatureCarousel />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="relative flex h-[505px] w-full bg-cover bg-no-repeat">
      <div className="absolute inset-0 z-20 box-border flex h-[505px] w-[896px] justify-start pl-[80px] pr-[110px] font-medium text-white md:justify-end">
        <div className="relative mb-[55px] mt-[137px] flex flex-col place-items-start gap-y-4">
          <Image
            src="/images/land-header-comma-down.png"
            alt="circle"
            width={30}
            height={50}
            className="absolute left-[-44px]"
          />
          <div>{parse(TEXT.HEADER.TITLE, ['text-xl', 'text-2xl'])}</div>
          <div className="text-lg">{parse(TEXT.HEADER.SUBTITLE)}</div>
          <Image
            src="/images/land-header-comma-up.png"
            alt="circle"
            width={30}
            height={50}
            className="absolute right-[-44px] top-11"
          />
          <div className="flex w-full justify-end">
            <button className="border-text-dark rounded-4xl mt-[66px] h-fit w-fit cursor-pointer border-[1px] bg-black/20 px-9 py-3 text-xl focus:outline-none">
              바로 시작하기
            </button>
          </div>
        </div>
      </div>
      <Image
        src="/images/land-header-circle.png"
        alt="circle"
        width={896}
        height={505}
        className="absolute z-10"
      />
      <div
        className="size-full bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/land-header-people.png)' }}
      ></div>
    </div>
  );
}
