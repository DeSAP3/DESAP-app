export interface NavItem {
	label: string;
	subLabel?: string;
	children?: Array<NavItem>;
	href?: string;
}



export const NAV_ITEMS: Array<NavItem> = [
	{
		label: "Home",
		href: "/",
	},
	{
		label: "Larvae Calculator",
		children: [
			{
				label: "Calculator",
				subLabel:
					"Calculate the mosquitoe eggs, larvae and mosquitoes aedes in the image",
				href: "/ento/calculator",
			},
		],
	},
	{
		label: "Account",
		children: [
			{
				label: "Register Now",
				subLabel: "Register your community account",
				href: "/community/register",
			},
		],
	},
];
