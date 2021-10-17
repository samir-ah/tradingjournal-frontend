import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useRef } from "react";
const ComingSoonAnimation: React.FC = (props) => {
	const player = useRef(null);
	return (
		<div>
			<div className="mt-6 text-center text-xl font-extrabold text-gray-900 dark:text-gray-200">
				Cette section est en cours de développement
			</div>
			<Player
				ref={player} // set the ref to your class instance
				autoplay={true}
				loop={true}
				controls={false}
				src="42631-mechanical-engineering-setting.json"
				style={{ height: "300px", width: "300px" }}
			></Player>
		</div>
	);
};

export default ComingSoonAnimation;
