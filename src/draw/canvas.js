import Canvas from '../modules/canvas';


const img = new Image();
img.src = '/assets/img/map.png';

export const drawCanvas = (data) => {
    return Canvas({
        area: {
            left: data.CENTER.x - data.X_SIZE / 2,
            bottom: data.CENTER.y - data.Y_SIZE / 2,
            width: data.X_SIZE,
            height: data.Y_SIZE,
            z: data.Z_SIZE
        },
        image: img,
        className: 'map',
        parent: '.mapWrapper',
        width: window.innerWidth * 0.6936,
        height: window.innerHeight * 0.6937
    })
}
