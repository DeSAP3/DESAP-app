// Open to all role
export const accountProfileRoutes = [
	{
		name: "Profile Management",
		route: "/community/profile",
	},
];

// Open to CommunityLeader and CommunityMember
export const communityDashboardRoutes = [
	{
		name: "Community Dashboard",
		route: "/community/dashboard",
	},
    {
        name: "Dengue Screening Task",
        route: "/community/screening",
    }
];

// Open to CommunityLeader
export const leaderCouncilRoutes = [
	{
		name: "Council Management",
		route: "/council/management",
	},
	{
		name: "Council Detail",
		route: "/council/detail",
	},
	{
		name: "Council List",
		route: "/council/list",
	},
	{
		name: "Council Dengue Screening Verification",
		route: "/council/screening",
	},
];

// Open to CommunityLeader where the user.councilId is null
export const optionalLeaderCouncilRoutes = [
	{
		name: "Create Council",
		route: "/council/new",
	},
];

// Open to CommunityMember
export const memberCouncilRoutes = [
	{
		name: "Council Detail",
		route: "/council/detail",
	},
	{
		name: "Council List",
		route: "/council/list",
	},
];

// Open to OperationTeam
export const operationTeamRoutes = [
	{
		name: "Mosquito Eggs Calculator",
		route: "/ento/opencv",
	},
	{
		name: "Larvae Calculator",
		route: "/ento/calculator",
	},
	{
		name: "Larvae Calculator Record",
		route: "/ento/record",
	},
];
