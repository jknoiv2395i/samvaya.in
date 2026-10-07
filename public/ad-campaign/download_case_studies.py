from bs4 import BeautifulSoup
import urllib.request
import os

with open('kingkong_dump.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')

s6 = soup.find_all('section')[6]
print("Section 6 headings:", [h.get_text(' ', strip=True) for h in s6.find_all(['h2', 'h3', 'span'])][:5])

imgs = []
for img in s6.find_all('img'):
    src = img.get('src') or ''
    srcset = img.get('srcset') or ''
    if src: imgs.append(src)
    if srcset:
        for part in srcset.split(','):
            u = part.strip().split(' ')[0]
            if u: imgs.append(u)

imgs = list(set(imgs))
print(f"Total case study images found: {len(imgs)}")
for idx, url in enumerate(imgs[:8]):
    print(f"{idx}: {url}")
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        data = urllib.request.urlopen(req, timeout=10).read()
        fname = f"case_study_{idx}.png"
        with open(fname, 'wb') as f:
            f.write(data)
        print(f"Saved {fname}")
    except Exception as e:
        print(f"Failed {url}: {e}")
