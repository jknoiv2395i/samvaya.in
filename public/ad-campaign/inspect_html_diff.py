import re

with open('index.html', 'r', encoding='utf-8') as f:
    c = f.read()

sections = re.findall(r'<section[^>]*id=["\']([^"\']+)["\']', c)
print('Section IDs in current index.html:', sections)

# Check classes with bento or light
classes = set(re.findall(r'class=["\']([^"\']+)["\']', c))
print('Total unique class combinations:', len(classes))
bento = [cl for cl in classes if any(k in cl for k in ['bento', 'cal-', 'card-bg', 'light', 'hero-capabilities'])]
print('Special classes added:', bento)

# Check if there is any section between hero and audio
lines = c.split('\n')
for i, l in enumerate(lines[:350]):
    if '<section' in l:
        print(f"Line {i+1}: {l.strip()[:100]}")

