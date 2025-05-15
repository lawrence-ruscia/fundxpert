import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import fundgrowth from '../data/fund-growth.json';
export function RecentContributions() {
  // Get the 5 most recent contributions
  const recentContributions = fundgrowth.slice(-6).reverse();

  return (
    <div className='space-y-8'>
      {recentContributions.map((contribution, index) => {
        // Extract month and year from the contribution_month field
        // If contribution_month exists, use it; otherwise, fall back to parsing the date
        const monthYear =
          contribution.contribution_month ||
          (() => {
            const date = new Date(contribution.date);
            return date.toLocaleString('default', {
              month: 'long',
              year: 'numeric',
            });
          })();

        return (
          <div key={contribution.date} className='flex items-center gap-4'>
            <div className='flex flex-1 flex-wrap items-center justify-between'>
              <div className='space-y-1'>
                <p className='text-sm leading-none font-medium'>
                  {monthYear} Contribution Processed
                </p>
                <p className='text-muted-foreground text-sm'>
                  Your monthly contribution of ₱{contribution.personal} has been
                  processed
                </p>
              </div>
              <div className='font-medium'>₱{contribution.personal}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
