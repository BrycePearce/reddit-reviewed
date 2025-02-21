// calculates if x/y coords are found within a DOMRect
export const isInsideZone = (
    x: number,
    y: number,
    rect: DOMRect,
    percentBuffer = 0.25
) => {
    const wBuffer = rect.width * percentBuffer;
    const hBuffer = rect.height * percentBuffer;
    const zoneLeft = rect.left + wBuffer;
    const zoneRight = rect.right - wBuffer;
    const zoneTop = rect.top + hBuffer;
    const zoneBottom = rect.bottom - hBuffer;

    return x >= zoneLeft && x <= zoneRight && y >= zoneTop && y <= zoneBottom;
};