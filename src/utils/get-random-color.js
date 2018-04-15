export default function getRandomColor(map) {
    const id = parseInt(Math.random() * map.length, 10);
    return map[id];
}
