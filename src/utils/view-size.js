
export const getAvailableArea = () => ({
    width: window.innerWidth,
    height: window.innerHeight
});

export const getViewArea = () => ({
    height: window.screen.availHeight,
    width: window.screen.availWidth
})

export const getSafariNavigateElementsHeight = () => (
    getViewArea().height - getAvailableArea().height
);
