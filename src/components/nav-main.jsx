import { NavLink } from 'react-router-dom';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';

export function NavMain({ items }) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className='flex flex-col'>
        <SidebarGroupLabel className='font-semibold'>General</SidebarGroupLabel>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? 'bg-primary text-primary font-medium' : ''
                }
                end
              >
                {({ isActive }) => (
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={`transition-colors ${
                      isActive
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                        : ''
                    }`}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                )}
              </NavLink>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
