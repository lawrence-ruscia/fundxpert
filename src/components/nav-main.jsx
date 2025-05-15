import { IconCirclePlusFilled, IconMail } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';

export function NavMain({ items, activeItemId, setActiveItemId }) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className='flex flex-col'>
        <SidebarGroupLabel className='font-semibold'>General</SidebarGroupLabel>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                onClick={() => setActiveItemId(item.title)}
                className={
                  activeItemId === item.title
                    ? 'bg-primary/10 text-primary font-medium'
                    : ''
                }
              >
                {item.icon && (
                  <item.icon
                    className={activeItemId === item.id ? 'text-primary' : ''}
                  />
                )}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
