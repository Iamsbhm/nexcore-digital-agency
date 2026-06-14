filepath = r"c:\Users\ASUS\Desktop\2d documentry images\nexcore-digital-agency\src\App.tsx"

with open(filepath, "r", encoding="utf-8") as f:
    lines = f.readlines()

def inspect_line(label, idx):
    line = lines[idx]
    codes = [ord(c) for c in line]
    print(f"{label} (Index {idx}): {repr(line)} -> Codes: {codes}")

inspect_line("Card 1 close", 711)
inspect_line("Card 2 close", 801)

# Let's search for the line containing className for Card 2
for i, line in enumerate(lines):
    if "group/card relative rounded-[24px]" in line:
        print(f"Card className line {i+1}: {repr(line)}")
