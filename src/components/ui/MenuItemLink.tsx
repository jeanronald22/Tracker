import { NavLink } from 'react-router';

export interface MenuItemLinkProps {
	to: string;
	children: string;
}

const MenuItemLink = ({ to, children }: MenuItemLinkProps) => {
	return (
		<li className="list-none p-2 m-1 rounded-lg transition-colors">
			<NavLink
				to={to}
				end
				className={
					({ isActive }: { isActive: boolean }) =>
						isActive
							? 'block p-2 bg-primary text-primary-foreground rounded-lg' // Style actif
							: 'block p-2 text-foreground hover:bg-secondary/20 hover:text-secondary-foreground rounded-lg transition-colors' // Style par défaut
				}
			>
				{children}
			</NavLink>
		</li>
	);
};

export default MenuItemLink;
