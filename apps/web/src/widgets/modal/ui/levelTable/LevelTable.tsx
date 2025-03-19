import { cn } from '@soup/utils';
import { PropsWithChildren } from 'react';

interface LevelTableHeadProps {
  content: Array<string>;
}
interface LevelTableBodyProps {
  title: string;
  content: Array<string>;
  description?: string;
}

export const LevelTable = ({ children }: PropsWithChildren) => {
  return (
    <table className="border-light rounded=[10px] border text-center">
      {children}
    </table>
  );
};

export const LevelTableHead = ({ content }: LevelTableHeadProps) => {
  return (
    <thead className="bg-lock border-light border">
      <tr>
        <th className="border-light border p-[10px]"></th>
        {content.map((content, index) => (
          <th className="border-light border p-[10px] font-light" key={index}>
            {content}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export const LevelTableBody = ({
  title,
  content,
  description = '',
}: LevelTableBodyProps) => {
  return (
    <tbody className="border-light border font-light">
      <tr className="border-light border">
        <td className="bg-lock p-[10px]">{title}</td>
        {content.map((content, index) => (
          <td
            className={cn(
              'border-light border p-[10px]',
              content === '△' && 'text-important',
            )}
            key={index}
          >
            {content}
          </td>
        ))}
        <td
          className={cn(
            'border-light border p-[10px]',
            content.includes('△') && 'text-important',
          )}
        >
          {description}
        </td>
      </tr>
    </tbody>
  );
};
