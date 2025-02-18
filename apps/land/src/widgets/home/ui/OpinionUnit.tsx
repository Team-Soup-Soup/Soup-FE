import { cn } from '@soup/utils';
import { parse } from '@/shared/utils';

interface OpinionUnitProps {
  reversed: boolean;
  text: string;
  image: string;
}

interface OpinionBoxProps {
  children: React.ReactNode;
  reversed?: boolean;
}

export default function OpinionUnit({
  reversed,
  text,
  image,
}: OpinionUnitProps) {
  if (reversed) {
    return (
      <div className="flex h-fit w-full gap-x-2">
        <div className="h-38 flex w-full justify-end text-end">
          <OpinionBox reversed={reversed}>
            <div className="font-medium">{parse(text)}</div>
          </OpinionBox>
        </div>
        <Icon image={image} />
      </div>
    );
  }
  return (
    <div className="flex h-fit w-full gap-x-2">
      <Icon image={image} />
      <div className="h-38 flex w-full justify-start">
        <OpinionBox>
          <div className="font-medium">{parse(text)}</div>
        </OpinionBox>
      </div>
    </div>
  );
}

function Icon({ image }: { image: string }) {
  return (
    <div
      className="size-38 flex-shrink-0 rounded-[50%] bg-cover bg-center"
      style={{ backgroundImage: `url(${image})` }}
    />
  );
}

function OpinionBox({ children, reversed = false }: OpinionBoxProps) {
  return (
    <div
      className={cn(
        reversed ? 'talkboxLeft' : 'talkboxRight',
        'border-border boxShadow flex items-center justify-center text-nowrap border-[1px] px-[113.5px] py-[44.5px] text-lg lg:text-lg',
      )}
    >
      {children}
    </div>
  );
}
