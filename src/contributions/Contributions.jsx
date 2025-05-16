import { DataTable } from './components/data-table';
import { Button } from '@/components/ui/button';
import { IconUpload } from '@tabler/icons-react';
import data from './components/data.json';
export default function Contributions() {
  return (
    <div className='flex flex-1 flex-col'>
      <div className='@container/main flex flex-1 flex-col gap-2'>
        <div className='flex flex-col gap-4 py-3 md:gap-6 md:py-6'>
          <div className='mb-2 flex flex-wrap items-center justify-between gap-x-4 px-4 lg:px-6 '>
            <div className=''>
              <h2 className='text-2xl font-bold tracking-tight'>
                My Contributions
              </h2>
              <p className='text-muted-foreground'>
                Here&apos;s a breakdown of your contributions and earnings
              </p>
            </div>
            <div>
              <Button variant='outline' className='space-x-1'>
                <span>Export</span> <IconUpload size={18} />
              </Button>
            </div>
          </div>

          <div>
            <DataTable data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
