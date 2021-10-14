import { NextPage } from "next";
import { useRouter } from "next/router";
import ForgetPasswordForm from "../../../components/auth/forget-password-form";

const ForgetPasswordPage: NextPage = () => {
	const router = useRouter();
	const { uid } = router.query;
	return <ForgetPasswordForm resetToken={uid} />;
};

export default ForgetPasswordPage;
