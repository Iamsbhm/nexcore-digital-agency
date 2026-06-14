import subprocess

try:
    res = subprocess.run(["git", "diff", "src/App.tsx"], capture_output=True, check=True)
    diff_text = res.stdout.decode('utf-8', errors='replace')
    with open("scratch/diff_app_utf8.txt", "w", encoding="utf-8") as f:
        f.write(diff_text)
    print("Successfully wrote scratch/diff_app_utf8.txt")
except Exception as e:
    print(f"Error running git diff: {e}")
