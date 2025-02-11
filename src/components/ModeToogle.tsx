import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { Button } from './ui/button';
import { MoonStar, SunDim } from 'lucide-react';
import { useTheme } from './providers/ThemeProviders';

const ModeToogle = () => {
	const { setTheme } = useTheme();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="default" size="icon">
					<SunDim className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<MoonStar className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-4 rounded-md border mt-2 bg-popover border-border">
				<DropdownMenuItem
					onClick={() => setTheme('light')}
					className="cursor-pointer outline-none"
				>
					Light
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => setTheme('dark')}
					className="cursor-pointer outline-none"
				>
					Dark
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => setTheme('system')}
					className="cursor-pointer outline-none"
				>
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
export default ModeToogle;
