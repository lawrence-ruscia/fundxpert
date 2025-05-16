import { Input } from '@/components/ui/input';

export function DataTableToolbar({ table }) {
  const date = new Date();
  const formattedDate = date.toLocaleDateString('en-PH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder='Filter contributions...'
          value={table.getColumn('date')?.getFilterValue() ?? ''}
          className='h-8 w-[150px] lg:w-[250px]'
          onChange={(event) =>
            table.getColumn('date')?.setFilterValue(event.target.value)
          }
        />
      </div>
    </div>
  );
}
