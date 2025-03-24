import { cn } from '@soup/utils';

interface LevelTableProps {
  children: React.ReactNode;
}

interface LevelTableHeadProps {
  content: Array<string>;
}
interface LevelTableBodyProps {
  title: string;
  content: Array<string>;
  description?: string;
}

export const LevelTable: React.FC<LevelTableProps> = ({
  children,
}: LevelTableProps) => {
  return (
    <table className="border-light rounded=[10px] border text-center">
      {children}
    </table>
  );
};

export const LevelTableHead: React.FC<LevelTableHeadProps> = ({
  content,
}: LevelTableHeadProps) => {
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

export const LevelTableBody: React.FC<LevelTableBodyProps> = ({
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
