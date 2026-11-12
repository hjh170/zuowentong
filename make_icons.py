#!/usr/bin/env python3
from PIL import Image, ImageDraw

GREEN = (79, 150, 0, 255)
DARK = (58, 112, 0, 255)
WHITE = (255, 255, 255, 255)
GOLD = (232, 178, 40, 255)

def icon(n):
    S = n * 4  # 4x supersample for smooth edges
    img = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    r = int(S * 0.22)
    d.rounded_rectangle([0, 0, S - 1, S - 1], radius=r, fill=GREEN)
    # 书本：两页书本造型（左右各一整块，中间留缝）
    bx0, by0, bx1, by1 = int(S*0.15), int(S*0.32), int(S*0.85), int(S*0.72)
    mid = S // 2
    gap = int(S * 0.022)
    d.rounded_rectangle([bx0, by0, mid - gap, by1], radius=int(S*0.035), fill=WHITE)
    d.rounded_rectangle([mid + gap, by0, bx1, by1], radius=int(S*0.035), fill=WHITE)
    # 书页上的文字行（严格收在页面内）
    lh = int(S * 0.034)
    pad = int(S * 0.045)
    widths = [0.92, 0.74, 0.92, 0.66]
    for i, wf in enumerate(widths):
        top = int(S * (0.385 + i * 0.082))
        l_end = int((mid - gap) - pad - ((mid - gap - pad) - (bx0 + pad)) * (1 - wf))
        r_end = int((bx1 - pad) - ((bx1 - pad) - (mid + gap + pad)) * (1 - wf))
        d.rounded_rectangle([bx0 + pad, top, l_end, top + lh], radius=lh // 2, fill=DARK)
        d.rounded_rectangle([mid + gap + pad, top, r_end, top + lh], radius=lh // 2, fill=DARK)
    # 右上角金色星星
    cx, cy, R = int(S*0.755), int(S*0.215), int(S*0.075)
    pts = [(cx, cy - R), (cx + R*0.31, cy - R*0.31), (cx + R, cy), (cx + R*0.31, cy + R*0.31),
           (cx, cy + R), (cx - R*0.31, cy + R*0.31), (cx - R, cy), (cx - R*0.31, cy - R*0.31)]
    d.polygon(pts, fill=GOLD)
    return img.resize((n, n), Image.LANCZOS)

for size, name in [(192, "icon-192.png"), (512, "icon-512.png"), (180, "icon-180.png")]:
    icon(size).save(name)
    print("生成", name)
# maskable：留出安全区（图形缩到 80% 居中）
m = Image.new("RGBA", (512, 512), GREEN)
inner = icon(410).copy()
m.paste(inner, ((512-410)//2, (512-410)//2), inner)
m.save("icon-maskable-512.png")
print("生成 icon-maskable-512.png")
