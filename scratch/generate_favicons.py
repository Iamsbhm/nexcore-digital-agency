import os
from PIL import Image, ImageDraw

def make_high_res_render(size):
    # Create an image with transparent background (RGBA)
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Center character inside the size box
    # The character grid is 7 units wide, 8 units high
    # We scale each unit block to match the resolution
    block_size = max(1, int(size * 0.10)) # around 10% of size (e.g. 4px for 48px)
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
