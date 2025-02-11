import * as React from 'react';

import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
} from '@/components/ui/sidebar';
import { BookCheck } from 'lucide-react';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<div className="flex items-center  gap-2">
					<BookCheck className="size-6" />
				</div>
			</SidebarHeader>
			<SidebarContent></SidebarContent>
			{/* <SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter> */}
			{/* <SidebarRail /> */}
		</Sidebar>
	);
}
