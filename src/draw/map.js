import { iterateObject } from '../utils';

export const drawDragon = canvas => ({ position, size }) => (
    canvas.point(position.x, position.y, size, 'blue')
);

export const drawBoom = canvas => ({ x, y, radius }) => (
    radius > 0 && canvas.point(x, y, radius, 'black')
);

export const drawDragonTarget = canvas => ({ x, y }) => (
    canvas.point(x, y, 2, 'rgba(255,0,0,0.3)')
)

export const drawDragonShot = canvas => ({ x, y }) => (
    canvas.point(x, y, 0.3, 'yellow')
);


export const drawMap = canvas => (data, store) => {
    const CROSS = 1;

    if (!canvas) {
        return;
    }

    canvas.clear();

    if (data.dragon) {
        drawDragon(canvas)(data.dragon);

        const { shotPosition, boomPosition } = data.dragon;

        if (shotPosition) {
            const { x, y } = shotPosition;
            drawDragonShot(canvas)({ x, y });
        }

        if (boomPosition) {
            const { x, y } = boomPosition;
            drawDragonTarget(canvas)({ x, y });
        }
    }

    if (data.booms) {
        iterateObject(data.booms, (prop, { position, radius }) => (
            drawBoom(canvas)({ x: position.x, y: position.y, radius })
        ));
    }

    if (data.princess) {
        iterateObject(
            data.princess,
            (id, {
                position, viewDirect, size, color
            }) => {
                const { x, y } = position;
                canvas.line(
                    x,
                    y,
                    x + CROSS * Math.sin(viewDirect),
                    y + CROSS * Math.cos(viewDirect),
                    'rgba(0,0,0,1)',
                    1
                );

                canvas.point(x, y, size, color);
            }
        );

        canvas.line(0.6, 2.3, 0.6, 2.3, 'red', 1);
    }

    if (data.shots) {
        iterateObject(data.shots, (prop, { position }) => (
            canvas.point(position.x, position.y, null, 'red')
        ));
    }
}
