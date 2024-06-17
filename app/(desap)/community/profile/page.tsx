"use client";
import ProfileForm from "@/shared/components/community-profile/profileForm";
import PageHeader from "@/shared/components/general-component/page-component/PageHeader";

export default function Profile() {
	return (
		<>
			<PageHeader title={`Profile`} />
			<ProfileForm />
		</>
	);
}
