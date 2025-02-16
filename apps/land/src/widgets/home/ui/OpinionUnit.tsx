import { cn, parse } from '@/shared/utils';

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
        <div className="h-38 flex w-full justify-end">
          <OpinionBox reversed={reversed}>
            <div>{parse(text)}</div>
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
          <div>{parse(text)}</div>
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
        'border-border boxShadow px-18 flex items-center justify-center border-[1px] p-4',
      )}
    >
      {children}
    </div>
  );
}
