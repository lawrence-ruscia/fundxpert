import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DownloadIcon } from 'lucide-react';
import { downloadCSV, generateFilename } from '../utils/csvExport.js';

export function DataTableToolbarExport({ table }) {
  const handleExportAll = () => {
    const filename = generateFilename();
    const visibleColumns = table.getAllColumns();
    const data = table.getFilteredRowModel().rows.map((row) => row.original);
    downloadCSV(data, visibleColumns, filename);
  };

  const handleExportSelected = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    if (selectedRows.length === 0) {
      alert('Please select at least one row to export');
      return;
    }

    const visibleColumns = table.getAllColumns();
    const selectedData = selectedRows.map((row) => row.original);
    const filename = generateFilename('selected');
    downloadCSV(selectedData, visibleColumns, filename);
  };

  const handleExportCurrentPage = () => {
    const pageRows = table.getRowModel().rows;
    const visibleColumns = table.getAllColumns();
    const pageData = pageRows.map((row) => row.original);
    const filename = generateFilename('page');
    downloadCSV(pageData, visibleColumns, filename);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='sm' className='h-8 gap-1'>
          <DownloadIcon className='h-4 w-4' />
          <span className='hidden sm:inline'>Export</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-48'>
        <DropdownMenuItem onClick={handleExportAll}>
          Export All Records
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportCurrentPage}>
          Export Current Page
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleExportSelected}
          disabled={table.getFilteredSelectedRowModel().rows.length === 0}
          className={
            table.getFilteredSelectedRowModel().rows.length === 0
              ? 'opacity-50 cursor-not-allowed'
              : ''
          }
        >
          Export Selected ({table.getFilteredSelectedRowModel().rows.length})
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
