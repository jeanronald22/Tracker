import { AppSidebar } from '@/components/app-sidebar';
import ModeToogle from '@/components/ModeToogle';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from '@/components/ui/sidebar';
import { Pomodoro } from '../pomodoro/page';

export default function Page() {
	return (
		<SidebarProvider>
			<AppSidebar className="bg-primary-foreground dark:bg-background shadow-md border-none" />
			<SidebarInset className="bg-sidebar-accent dark:bg-secondary">
				<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator
							orientation="vertical"
							className="mr-2 h-4"
						/>
						<Breadcrumb className="">
							<BreadcrumbList>
								<BreadcrumbItem className="hidden md:block">
									<BreadcrumbLink href="#">
										<ModeToogle />
									</BreadcrumbLink>
								</BreadcrumbItem>
							</BreadcrumbList>
						</Breadcrumb>
					</div>
				</header>
				<div className="">
					<Pomodoro />
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
