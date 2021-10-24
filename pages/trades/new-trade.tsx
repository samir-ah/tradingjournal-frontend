import type { GetStaticProps, NextPage } from "next";
import TradeForm from "../../components/trade/trade-form";
import { ProtectRoute } from "../../context/auth-context";



const NewTrade: NextPage = () => {
	return <TradeForm></TradeForm>;
};
export default ProtectRoute(NewTrade, "ROLE_USER");
