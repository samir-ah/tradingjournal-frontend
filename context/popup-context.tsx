import React from "react";

type PopupDataType = {
	title: string | null | undefined;
	message: string;
	onConfirmTrue: () => void;
};

type PopupContextObj = {
	showPopupHandler: (activePopup: PopupDataType) => void;
	handleConfirmTrue: () => void;
	handleConfirmFalse: () => void;
	isOpen: boolean;
	activePopup: PopupDataType | undefined | null;
};

export const PopupContext = React.createContext<PopupContextObj>({
	showPopupHandler: (activePopup) => {},
	handleConfirmTrue: () => {},
	handleConfirmFalse: () => {},
	isOpen: false,
	activePopup: null,
});

export const PopupContextProvider: React.FC = ({ children }) => {
	const [isOpen, setIsOpen] = React.useState<boolean>(false);
	const [activePopup, setActivePopup] = React.useState<
		PopupDataType | null | undefined
	>();

	function showPopupHandler(popupData: PopupDataType) {
		setActivePopup(popupData);
		setIsOpen(true);
	}

	function handleConfirmTrue() {
		activePopup?.onConfirmTrue();
		setActivePopup(null);
		setIsOpen(false);
	}

	function handleConfirmFalse() {
		setActivePopup(null);
		setIsOpen(false);
	}
	const context = {
		showPopupHandler: showPopupHandler,
		handleConfirmTrue: handleConfirmTrue,
		handleConfirmFalse: handleConfirmFalse,
		isOpen: isOpen,
		activePopup: activePopup,
	};
	return (
		<PopupContext.Provider value={context}>
			{children}
		</PopupContext.Provider>
	);
};
