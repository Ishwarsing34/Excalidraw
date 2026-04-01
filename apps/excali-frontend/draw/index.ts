export function initDraw(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  let clicked = false;
  let startX = 0;
  let startY = 0;

  canvas.addEventListener("mousedown", (e) => {
    clicked = true;

    const rect = canvas.getBoundingClientRect();
    startX = e.clientX - rect.left;
    startY = e.clientY - rect.top;
  });

  canvas.addEventListener("mouseup", () => {
    clicked = false;
  });

  canvas.addEventListener("mousemove", (e) => {
    if (!clicked) return;

    const rect = canvas.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    const rectWidth = currentX - startX;
    const rectHeight = currentY - startY;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "white";
    ctx.strokeRect(startX, startY, rectWidth, rectHeight);
  });
}