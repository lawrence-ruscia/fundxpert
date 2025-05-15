'use client';
import * as React from 'react';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

export function NavSecondary({
  items,
  activeItemId,
  setActiveItemId,
  ...props
}) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarGroupLabel className='font-semibold'>Others</SidebarGroupLabel>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className={
                  activeItemId === item.title
                    ? 'bg-primary/10 text-primary font-medium'
                    : ''  
                }
              >
                <a
                  href={item.url}
                  onClick={(e) => {
                    e.preventDefault(); // Prevent navigation because of client-side routing
                    setActiveItemId(item.title);
                  }}
                >
                  <item.icon
                    className={
                      activeItemId === item.title ? 'text-primary' : ''
                    }
                  />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
