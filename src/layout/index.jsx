import { AppSidebar } from '@/components/app-sidebar';
import { ProfileDropdown } from '@/components/profile-dropdown';
import { Search } from '@/components/search';
import { ModeToggle } from '@/components/mode-toggle';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Header } from '@/components/header';
import { Outlet } from 'react-router-dom';
import user from './data/user.json';

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header>
          <div className='ml-auto flex items-center space-x-4'>
            <Search />
            <ModeToggle />
            <ProfileDropdown user={user} />
          </div>
        </Header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
