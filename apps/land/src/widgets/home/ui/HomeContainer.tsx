import Image from 'next/image';
import LandHeaderImg from '../../../../public/images/land-header.png';
import OpinionUnit from './OpinionUnit';

import { OPINION, TEXT } from '@/widgets/home/model';
import { parse } from '@/shared/utils';
import FeatureCarousel from './FeatureCarousel';

export default function HomeContainer() {
  return (
    <div className="flex w-full flex-col">
      <Header />
      <div className="mt-20 box-border flex flex-col items-center justify-center">
        <p className="text-text-light pb-4 text-lg">
          {TEXT.HOME.LAND_QUESTION}
        </p>
        <p className="text-xl">{TEXT.HOME.LAND_MESSAGE_1}</p>
        <p className="text-xl font-bold">{TEXT.HOME.LAND_MESSAGE_2}</p>
        <div className="mt-20 flex h-fit w-[68%] flex-col gap-y-8">
          {OPINION.map((data) => (
            <OpinionUnit
              key={data.id}
              reversed={data.reversed}
              text={data.text}
              image={data.image}
            />
          ))}
        </div>
        <div className="mt-24 flex flex-col items-center justify-center">
          <p className="text-xl">{TEXT.HOME.FEATURE_INTRODUCE_1}</p>
          <p className="text-xl font-bold">{TEXT.HOME.FEATURE_INTRODUCE_2}</p>
        </div>
        <FeatureCarousel />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="relative flex size-fit">
      <div className="absolute inset-0 box-border flex size-full flex-col justify-center gap-y-4 px-10 text-white md:px-40">
        <div>
          {parse(TEXT.HEADER.TITLE, [
            'text-md md:text-lg',
            'text-xl md:text-2xl font-bold',
          ])}
        </div>
        <div className="hidden text-sm md:block">
          {parse(TEXT.HEADER.SUBTITLE)}
        </div>
        <button className="border-text-dark rounded-4xl md:text-md w-fit cursor-pointer border-[1px] bg-black/20 p-4 py-2 text-sm focus:outline-none md:px-6 md:py-4">
          바로 시작하기
        </button>
      </div>
      <Image alt="landing-header" src={LandHeaderImg} priority={true} />
    </div>
  );
}
