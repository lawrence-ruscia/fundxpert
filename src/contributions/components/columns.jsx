import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Download, PencilIcon, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
const columns = [
  {
    id: 'select',
    header: ({ table }) => (
      <div className='flex items-center justify-center'>
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className='flex items-center justify-center'>
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='font-medium'
        >
          Date
        </Button>
      );
    },
    cell: ({ row }) => {
      // Format date to display in a more readable format
      const date = new Date(row.getValue('date'));
      const formattedDate = date.toLocaleDateString('en-PH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => <div>{row.getValue('description')}</div>,
  },
  {
    accessorKey: 'employee',
    header: 'Employee Contributions',
    cell: ({ row }) => {
      const employee = row.getValue('employee');
      const contribution = employee[0].contribution;
      const income = employee[0].income;

      return (
        <div className='space-y-1'>
          <div className='font-medium'>₱{contribution.toLocaleString()}</div>
          {income > 0 && (
            <div className='text-xs text-muted-foreground'>
              + ₱{income.toLocaleString()} interest
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'bank',
    header: 'Bank Contributions',
    cell: ({ row }) => {
      const bank = row.getValue('bank');
      const contribution = bank[0].contribution;
      const income = bank[0].income;

      return (
        <div className='space-y-1'>
          <div className='font-medium'>₱{contribution.toLocaleString()}</div>
          {income > 0 && (
            <div className='text-xs text-muted-foreground'>
              + ₱{income.toLocaleString()} interest
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'total',
    header: 'Total',
    cell: ({ row }) => {
      const total = row.getValue('total');
      const contribution = total[0].contribution;
      const income = total[0].income;
      const monthlyTotal = contribution + income;

      return (
        <div className='space-y-1'>
          <div className='font-medium'>₱{monthlyTotal.toLocaleString()}</div>
          <div className='text-xs'>
            <Badge
              variant='outline'
              className='bg-green-50 text-green-700 border-green-200'
            >
              +₱{income.toLocaleString()} interest
            </Badge>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'balance',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='font-medium ml-5'
        >
          Balance
        </Button>
      );
    },
    cell: ({ row }) => {
      const balance = parseFloat(row.getValue('balance'));

      return (
        <div className='text-right font-medium w-29 flex justify-center'>
          ₱{balance.toLocaleString()}
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
            >
              <MoreVertical className='h-4 w-4' />
              <span className='sr-only'>Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className='w-48'>
            <DropdownMenuItem>
              <Eye className='mr-2 h-4 w-4' />
              <span>View Details</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className='mr-2 h-4 w-4' />
              <span>Download Statement</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <PencilIcon className='mr-2 h-4 w-4' />
              <span>Request Correction</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default columns;
