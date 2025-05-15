import * as React from 'react';
import { useState } from 'react';
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
  IconPigMoney,
  IconChartDots2,
  IconWallet,
  IconMessage,
} from '@tabler/icons-react';

import Logo from './logo';
import { NavDocuments } from '@/components/nav-documents';
import { NavMain } from '@/components/nav-main';
import { NavSecondary } from '@/components/nav-secondary';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const data = {
  user: {
    name: 'John Doe',
    email: 'johndoe@metrobank.ph',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '#',
      icon: IconDashboard,
    },
    {
      title: 'My Contributions',
      url: '#',
      icon: IconPigMoney,
    },
    {
      title: 'Fund Projection',
      url: '#',
      icon: IconChartDots2,
    },
    {
      title: 'Loans',
      url: '#',
      icon: IconWallet,
    },
    {
      title: 'Help & Resources',
      url: '#',
      icon: IconHelp,
    },
  ],
  navClouds: [
    {
      title: 'Capture',
      icon: IconCamera,
      isActive: true,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
    {
      title: 'Proposal',
      icon: IconFileDescription,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
    {
      title: 'Prompts',
      icon: IconFileAi,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Settings',
      url: '#',
      icon: IconSettings,
    },
    {
      title: 'Contact HR',
      url: '#',
      icon: IconMessage,
    },
  ],
  documents: [
    {
      name: 'Data Library',
      url: '#',
      icon: IconDatabase,
    },
    {
      name: 'Reports',
      url: '#',
      icon: IconReport,
    },
    {
      name: 'Word Assistant',
      url: '#',
      icon: IconFileWord,
    },
  ],
};

export function AppSidebar({ ...props }) {
  // Add state to track the active item (Default to dashboard)
  const [activeItemId, setActiveItemId] = useState(data.navMain[0].title);

  return (
    <Sidebar collapsible='icon' variant='floating' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className='data-[slot=sidebar-menu-button]:!p-1.5'
            >
              <a href='#'>
                <Logo />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={data.navMain}
          activeItemId={activeItemId}
          setActiveItemId={setActiveItemId}
        />
        <NavSecondary
          items={data.navSecondary}
          activeItemId={activeItemId}
          setActiveItemId={setActiveItemId}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={data.user}
          activeItemId={activeItemId}
          setActiveItemId={setActiveItemId}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
