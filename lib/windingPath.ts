/**
 * Builds an SVG path `d` string that winds left-right down the page,
 * one S-curve segment per waypoint. The path starts at the horizontal
 * center of `width` and alternates toward the left and right edges,
 * ending the final segment at the right edge (x = width) so the drawn
 * path has an unambiguous, testable end coordinate.
 */
export function buildWindingPath(
  count: number,
  segmentHeight: number,
  width: number
): string {
  const center = width / 2;
  const amplitude = width / 2;

  let d = `M ${center} 0`;

  for (let i = 0; i < count; i++) {
    const startY = i * segmentHeight;
    const endY = startY + segmentHeight;
    const isLast = i === count - 1;
    const goingRight = i % 2 === 0;
    const targetX = isLast
      ? width
      : goingRight
        ? center + amplitude
        : center - amplitude;
    const controlY1 = startY + segmentHeight / 3;
    const controlY2 = startY + (segmentHeight * 2) / 3;

    d += ` C ${center} ${controlY1}, ${targetX} ${controlY2}, ${targetX} ${endY}`;
  }

  return d;
}
