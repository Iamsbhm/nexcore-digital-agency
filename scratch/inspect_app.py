import os

def convert_to_utf8(src, dst):
    if not os.path.exists(src):
        print(f"File {src} does not exist")
        return
    # Detect encoding and read
    content = ""
    for enc in ['utf-16', 'utf-16-le', 'utf-16-be', 'utf-8', 'latin1']:
        try:
            with open(src, 'r', encoding=enc) as f:
                content = f.read()
            print(f"Successfully read {src} with {enc}")
            break
        except Exception:
            continue
    
    with open(dst, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Successfully wrote {dst} in UTF-8")

convert_to_utf8('scratch/App.tsx.orig', 'scratch/App.tsx.orig.utf8')
