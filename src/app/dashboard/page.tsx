import { AppSidebar } from '@/components/app-sidebar';
import ModeToogle from '@/components/ModeToogle';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
} from '@/components/ui/breadcrumb';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Outlet } from 'react-router';

export default function Page() {
	return (
		<SidebarProvider>
			<AppSidebar className="bg-primary-foreground dark:bg-background shadow-md border-none" />
			<SidebarInset className="bg-sidebar-accent dark:bg-secondary">
				<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
					<div className="flex items-center gap-2 px-4">
						<Breadcrumb className="">
							<BreadcrumbList>
								<BreadcrumbItem className="hidden md:block">
									<BreadcrumbLink href="#" className="p-3">
										<ModeToogle />
									</BreadcrumbLink>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</div>
				</header>
				<div className="">
					<Outlet />
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
