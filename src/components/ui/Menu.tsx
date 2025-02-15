import MenuItemLink, { MenuItemLinkProps } from './MenuItemLink';
interface MenuProps {
	items: Array<MenuItemLinkProps>;
}

const Menu = ({ items }: MenuProps) => {
	return (
		<ul className="p-0 m-0 w-64 font-sans">
			{items.map((item, index) => (
				<MenuItemLink key={index} to={item.to}>
					{item.children}
				</MenuItemLink>
			))}
		</ul>
	);
};
export default Menu;
