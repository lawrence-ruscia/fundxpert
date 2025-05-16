import { AppSidebar } from '@/components/app-sidebar';
import { FundGrowthChart } from '@/dashboard/components/fund-growth';
import { SectionCards } from '@/dashboard/components/section-cards';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { Search } from '@/components/search';
import { ModeToggle } from '@/components/mode-toggle';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { RecentContributions } from './components/recent-contributions';
import { Header } from '@/components/header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Dashboard() {
  return (
    <div className='flex flex-1 flex-col'>
      <div className='@container/main flex flex-1 flex-col gap-2'>
        <div className='flex flex-col gap-4 py-3 md:gap-6 md:py-6'>
          <h1 className='px-4 lg:px-6 text-2xl font-bold'>Dashboard</h1>
          <SectionCards />
          <div className='grid grid-cols-1 gap-4 lg:grid-cols-7 px-4 lg:px-6'>
            <div className='col-span-1 lg:col-span-4'>
              <FundGrowthChart />
            </div>
            <Card className='col-span-1 lg:col-span-3'>
              <CardHeader>
                <CardTitle>Recent Contributions</CardTitle>
              </CardHeader>
              <CardContent>
                <RecentContributions />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
