import React, { useContext } from "react";
import ContentLoader from "react-content-loader";
import { Theme, ThemeContext } from "../../context/theme-context";

const GridLoader: React.FC = (props) => {
	const themeCtx = useContext(ThemeContext);
	return (
		<>
			<ContentLoader
				width={700}
				height={270}
				viewBox="0 0 700 270"
				style={{ width: "100%" }}
				backgroundColor={
					themeCtx.theme === Theme.LIGHT ? "#e6e6e6" : "#3b3b3b"
				}
				foregroundColor={
					themeCtx.theme === Theme.LIGHT ? "#b0b0b0" : "#828282"
				}
				{...props}
			>
				<rect x="537" y="9" rx="2" ry="2" width="140" height="10" />
				<rect x="14" y="30" rx="2" ry="2" width="667" height="11" />
				<rect x="12" y="58" rx="2" ry="2" width="211" height="211" />
				<rect x="240" y="57" rx="2" ry="2" width="211" height="211" />
				<rect x="467" y="56" rx="2" ry="2" width="211" height="211" />
				<rect x="12" y="283" rx="2" ry="2" width="211" height="211" />
				<rect x="240" y="281" rx="2" ry="2" width="211" height="211" />
				<rect x="468" y="279" rx="2" ry="2" width="211" height="211" />
				<circle cx="286" cy="536" r="12" />
				<circle cx="319" cy="535" r="12" />
				<circle cx="353" cy="535" r="12" />
				<rect x="378" y="524" rx="0" ry="0" width="52" height="24" />
				<rect x="210" y="523" rx="0" ry="0" width="52" height="24" />
				<circle cx="210" cy="535" r="12" />
				<circle cx="428" cy="536" r="12" />
			</ContentLoader>
		</>
	);
};

export default GridLoader;
