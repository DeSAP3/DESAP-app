"use client";
import CouncilManagement from "@/shared/components/council-management/councilManagement";
import PageHeader from "@/shared/components/general-component/page-component/PageHeader";
import { useUser } from "@/shared/providers/userProvider";

const CouncilManagementPage = () => {
	const { userData } = useUser();
	return (
		<>
			<PageHeader title={`Council Management`} />
			<CouncilManagement />;
		</>
	);
};

export default CouncilManagementPage;
