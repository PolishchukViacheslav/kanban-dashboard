import { useGetAllColumnsQuery } from '@/graphql/queries';
import { Column } from './column/Column';

const Board = () => {
  const { data } = useGetAllColumnsQuery();
  return (
    <div className="flex flex-1 h-full">
      {data &&
        data?.allColumns?.map((column) => (
          <Column key={column.id} {...column} />
        ))}
      {!data && 'No data'}
    </div>
  );
};

export default Board;
