import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Cross2Icon, MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { DataTableToolbarExport } from './data-table-toolbar-export';

export function DataTableToolbar({ table }) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className='flex w-full flex-wrap items-center justify-between gap-2'>
      <div className='flex flex-1 items-center gap-2'>
        <div className='relative w-full flex-1 lg:max-w-sm'>
          <MagnifyingGlassIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Search contributions...'
            value={table.getColumn('description')?.getFilterValue() ?? ''}
            onChange={(event) =>
              table.getColumn('description')?.setFilterValue(event.target.value)
            }
            className='w-full pl-8'
          />
          {table.getColumn('description')?.getFilterValue() && (
            <Button
              variant='ghost'
              className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
              onClick={() => table.getColumn('description')?.setFilterValue('')}
            >
              <Cross2Icon className='h-4 w-4' />
              <span className='sr-only'>Clear search</span>
            </Button>
          )}
        </div>
        <div className='flex items-center gap-2'>
          {isFiltered && (
            <Button
              variant='ghost'
              onClick={() => table.resetColumnFilters()}
              className='h-8 px-2 lg:px-3'
            >
              Reset
              <Cross2Icon className='ml-2 h-4 w-4' />
            </Button>
          )}
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <DataTableToolbarExport table={table} />
      </div>
    </div>
  );
}
