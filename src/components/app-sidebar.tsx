import * as React from 'react';

import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
} from '@/components/ui/sidebar';
import { Focus } from 'lucide-react';
import Menu from './ui/Menu';
import { MenuItemLinkProps } from './ui/MenuItemLink';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const MenuItem: MenuItemLinkProps[] = [
		{ to: '/', children: 'Pomodoro' },
		{ to: '/task', children: 'Task' },
	];
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader className="flex-row justify-center items-center mt-2">
				<Focus className="w-12 size-8" />
				<span className="font-semibold font-mono">Focus Flow</span>
			</SidebarHeader>
			<SidebarContent>
				<Menu items={MenuItem} />
			</SidebarContent>
			{/* <SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter> */}
			{/* <SidebarRail /> */}
		</Sidebar>
	);
}
