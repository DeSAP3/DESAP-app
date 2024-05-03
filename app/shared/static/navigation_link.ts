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
		label: "Calculator",
		children: [
			{
				label: "Calculator",
				subLabel:
					"Calculate the mosquitoe eggs, larvae and mosquitoes aedes in the image",
				href: "/ento/calculator",
			},
			{
				label: "Calculation History",
				subLabel: "View the calculation history",
				href: "/ento/history",
			},
		],
	},
	{
		label: "Dengue Prediction",
		href: "/ento/prediction",
	},
	{
		label: "Community",
		children: [
			{
				label: "Register",
				subLabel: "Register your community account",
				href: "/community/register",
			},
			{
				label: "Community Dashboard",
				subLabel: "View community dashboard",
				href: "/community/dashboard",
			},
			{
				label: "Dengue Case Forecast",
				subLabel: "View dengue case forecast",
				href: "/community/forecast",
			},
			{
				label: "Dengue Screening",
				subLabel: "Perform dengue screening",
				href: "/community/screening",
			},

		],
	},
];
