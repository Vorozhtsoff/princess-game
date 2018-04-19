export function fullScreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitrequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.mozRequestFullscreen) {
        element.mozRequestFullScreen();
    }
}


export function fullScreenCancel() {
    if (document.requestFullscreen) {
        document.requestFullscreen();
    } else if (document.webkitRequestFullscreen) {
        document.webkitRequestFullscreen();
    } else if (document.mozRequestFullscreen) {
        document.mozRequestFullScreen();
    }
}
