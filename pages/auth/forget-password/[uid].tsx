import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import ForgetPasswordForm from "../../../components/auth/forget-password-form";

const ForgetPasswordPage: NextPage = ({uid}:any) => {
	const router = useRouter();
	// const { uid } = router.query;
	return <ForgetPasswordForm resetToken={uid} />;
};

export default ForgetPasswordPage;
export const getStaticPaths: GetStaticPaths<{ uid: string }> = async () => {
	return {
		paths: [], //indicates that no page needs be created at build time
		fallback: true, //indicates the type of fallback
	};
};

export const getStaticProps: GetStaticProps = async (context) => {
	return {
		props: {
			uid: context.params?.uid,
		},
	};
};
