import os
from PIL import Image, ImageDraw

def create_pixel_art_image(size):
    # Create an image with transparent background (RGBA)
    # We will draw on a 32x32 grid, and then scale up/down to the target size
    grid_size = 32
    img = Image.new("RGBA", (grid_size, grid_size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # We will draw a background circle or rounded rect for search engines (looks cleaner in lists)
    # Use the brand dark background: #06080E
    bg_color = (6, 8, 14, 255)
    draw.rounded_rectangle([1, 1, 30, 30], radius=7, fill=bg_color)
    
    # Define our colors
    white = (255, 255, 255, 255)
    
    # We will draw a vertical gradient from blue (#3B82F6 -> 59, 130, 246) to purple (#7C3AED -> 124, 58, 237)
    # Row index goes from 0 to 7 (32 pixels height)
    # Let's map Y coordinates to gradient values
    def get_grad_color(y):
        t = y / 32.0  # normalize
        # Interpolate RGB
        r = int(59 + (124 - 59) * t)
        g = int(130 + (58 - 130) * t)
        b = int(246 + (237 - 246) * t)
        return (r, g, b, 255)
        
    # The pixel grid coordinates based on our SVG rows.
    # Grid offset: x offset to center our 28px wide character inside 32px grid -> offset_x = 2
    # y offset to center our 32px high character -> offset_y = 0
    offset_x = 2
    offset_y = 0
    
    # Helper to draw a pixel block
    # Note: in SVG, x/y coords are multiplied by 4, so 4x4 blocks.
    # Here on a 32x32 grid, we can map directly:
    # 4px in SVG = 1px on 32x32 grid.
    
    # Let's draw the rows:
    # Row 0: x=8..11, 12..15 (fill grad) -> 32x32 grid: x=2,3 and x=3,4?
    # In SVG:
    # <rect x="8" y="0" width="4" height="4" .../> -> 32x32 grid: x = 2, y = 0
    # <rect x="12" y="0" width="4" height="4" .../> -> 32x32 grid: x = 3, y = 0
    # So we divide SVG coords by 4.
    
    # Row 0 (y=0)
    for x in [2, 3]:
        draw.rectangle([x + offset_x, 0 + offset_y, x + offset_x, 0 + offset_y], fill=get_grad_color(0))
        
    # Row 1 (y=1): x = 4..23 -> divide by 4: x = 1 to 5 (inclusive)
    for x in range(1, 6):
         draw.rectangle([x + offset_x, 1 + offset_y, x + offset_x, 1 + offset_y], fill=get_grad_color(4))
         
    # Row 2 (y=2): x = 0..27 -> divide by 4: x = 0 to 6
    for x in range(0, 7):
         draw.rectangle([x + offset_x, 2 + offset_y, x + offset_x, 2 + offset_y], fill=get_grad_color(8))
         
    # Row 3 (y=3): eyes row
    # x=0 (grad), x=1 (white), x=2..3 (grad), x=4 (grad), x=5 (white), x=6 (grad)
    draw.rectangle([0 + offset_x, 3 + offset_y, 0 + offset_x, 3 + offset_y], fill=get_grad_color(12))
    draw.rectangle([1 + offset_x, 3 + offset_y, 1 + offset_x, 3 + offset_y], fill=white)
    draw.rectangle([2 + offset_x, 3 + offset_y, 3 + offset_x, 3 + offset_y], fill=get_grad_color(12))
    draw.rectangle([4 + offset_x, 3 + offset_y, 4 + offset_x, 3 + offset_y], fill=get_grad_color(12))
    draw.rectangle([5 + offset_x, 3 + offset_y, 5 + offset_x, 3 + offset_y], fill=white)
    draw.rectangle([6 + offset_x, 3 + offset_y, 6 + offset_x, 3 + offset_y], fill=get_grad_color(12))
    
    # Row 4 (y=4): full (x=0 to 6)
    for x in range(0, 7):
         draw.rectangle([x + offset_x, 4 + offset_y, x + offset_x, 4 + offset_y], fill=get_grad_color(16))
         
    # Row 5 (y=5): lower body split
    # x=1..2 (grad), x=4..5 (grad)
    draw.rectangle([1 + offset_x, 5 + offset_y, 2 + offset_x, 5 + offset_y], fill=get_grad_color(20))
    draw.rectangle([4 + offset_x, 5 + offset_y, 5 + offset_x, 5 + offset_y], fill=get_grad_color(20))
    
    # Row 6 (y=6): legs
    # x=2 (grad), x=4 (grad)
    draw.rectangle([2 + offset_x, 6 + offset_y, 2 + offset_x, 6 + offset_y], fill=get_grad_color(24))
    draw.rectangle([4 + offset_x, 6 + offset_y, 4 + offset_x, 6 + offset_y], fill=get_grad_color(24))
    
    # Row 7 (y=7): foot
    # x=4 (grad)
    draw.rectangle([4 + offset_x, 7 + offset_y, 4 + offset_x, 7 + offset_y], fill=get_grad_color(28))

    # Scale pixel art up to target size using nearest-neighbor to keep it crisp
    # Since we drew a 32x32 icon inside a 32x32 canvas, we scale it
    # We will scale the 8x8 character + background nicely.
    # However, to make it look incredibly clean, let's draw it directly at higher resolution or scale with NEAREST.
    return img.resize((size, size), Image.Resampling.NEAREST)

def make_high_res_render(size):
    # Let's draw it directly at the target resolution to avoid pixelation on the rounded rect background,
    # but keep the pixel art inner character crisp!
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    bg_color = (6, 8, 14, 255)
    radius = int(size * 0.22)
    draw.rounded_rectangle([0, 0, size-1, size-1], radius=radius, fill=bg_color)
    
    # Center character inside the size box
    # The character grid is 7 units wide, 8 units high
    # We scale each unit block to match the resolution
    # Let's set block size
    block_size = max(1, int(size * 0.08)) # around 8% of size
    char_w = 7 * block_size
    char_h = 8 * block_size
    
    offset_x = (size - char_w) // 2
    offset_y = (size - char_h) // 2
    
    # Define colors
    white = (255, 255, 255, 255)
    
    def get_grad_color(y_unit):
        t = y_unit / 8.0
        r = int(59 + (124 - 59) * t)
        g = int(130 + (58 - 130) * t)
        b = int(246 + (237 - 246) * t)
        return (r, g, b, 255)
        
    def draw_block(xu, yu, color):
        x1 = offset_x + xu * block_size
        y1 = offset_y + yu * block_size
        x2 = x1 + block_size - 1
        y2 = y1 + block_size - 1
        draw.rectangle([x1, y1, x2, y2], fill=color)
        
    # Row 0
    draw_block(2, 0, get_grad_color(0))
    draw_block(3, 0, get_grad_color(0))
    
    # Row 1
    for x in range(1, 6):
        draw_block(x, 1, get_grad_color(1))
        
    # Row 2
    for x in range(0, 7):
        draw_block(x, 2, get_grad_color(2))
        
    # Row 3
    draw_block(0, 3, get_grad_color(3))
    draw_block(1, 3, white)
    for x in range(2, 5):
        draw_block(x, 3, get_grad_color(3))
    draw_block(5, 3, white)
    draw_block(6, 3, get_grad_color(3))
    
    # Row 4
    for x in range(0, 7):
        draw_block(x, 4, get_grad_color(4))
        
    # Row 5
    draw_block(1, 5, get_grad_color(5))
    draw_block(2, 5, get_grad_color(5))
    draw_block(4, 5, get_grad_color(5))
    draw_block(5, 5, get_grad_color(5))
    
    # Row 6
    draw_block(2, 6, get_grad_color(6))
    draw_block(4, 6, get_grad_color(6))
    
    # Row 7
    draw_block(4, 7, get_grad_color(7))
    
    return img

# Output paths
public_dir = r"c:\Users\ASUS\Desktop\2d documentry images\nexcore-digital-agency\public"
os.makedirs(public_dir, exist_ok=True)

# Generate assets
sizes = {
    "favicon-16x16.png": 16,
    "favicon-32x32.png": 32,
    "favicon-48x48.png": 48, # Google search results preferred format
    "apple-touch-icon.png": 180,
    "android-chrome-192x192.png": 192,
}

for name, size in sizes.items():
    img = make_high_res_render(size)
    img.save(os.path.join(public_dir, name))
    print(f"Generated {name} ({size}x{size})")

# Generate standard favicon.ico containing 16x16, 32x32, and 48x48 sizes
ico_img = make_high_res_render(32)
ico_sizes = [make_high_res_render(16), make_high_res_render(32), make_high_res_render(48)]
ico_img.save(os.path.join(public_dir, "favicon.ico"), format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
print("Generated favicon.ico (multi-resolution)")
