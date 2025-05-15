import { IconSearch } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function Search({ className = '', placeholder = 'Search' }) {
  return (
    <div
      variant='outline'
      className={cn(
        'bg-muted/25 text-muted-foreground hover:bg-muted/50 relative h-8 w-full flex-1 justify-start rounded-md text-sm font-normal shadow-none sm:pr-12 md:w-40 md:flex-none lg:w-56 xl:w-64',
        className
      )}
    >
      <IconSearch className='w-4.5 absolute top-1/2 left-1.5 -translate-y-1/2' />
      <Input
        className={cn(
          'bg-muted/25 text-muted-foreground hover:bg-muted/50 relative h-8 w-full flex-1 justify-start rounded-md text-sm font-normal shadow-none sm:pr-12 md:w-40 md:flex-none lg:w-56 xl:w-64 pl-7.5',
          className
        )}
        placeholder={placeholder}
      />
    </div>
  );
}
