import re
import urllib.request
import os

with open('kingkong_main.css', 'r', encoding='utf-8') as f:
    css = f.read()

font_matches = re.findall(r'@font-face\s*\{([^}]+)\}', css)
print(f"Total @font-face rules: {len(font_matches)}")

downloaded_fonts = []
for idx, rule in enumerate(font_matches):
    family_match = re.search(r'font-family:\s*[\'"]?([^\'";]+)[\'"]?', rule)
    src_match = re.search(r'src:\s*url\([\'"]?([^\'";\)]+)[\'"]?\)', rule)
    if family_match and src_match:
        family = family_match.group(1)
        url = src_match.group(1)
        if url.startswith('/'):
            url = 'https://kingkong.co' + url
        elif not url.startswith('http'):
            url = 'https://kingkong.co/wp-content/themes/kingkong/assets/prod/css/' + url
        filename = os.path.basename(url.split('?')[0])
        print(f"Font: {family} -> {url} -> {filename}")
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            data = urllib.request.urlopen(req, timeout=10).read()
            with open(filename, 'wb') as font_file:
                font_file.write(data)
            downloaded_fonts.append((family, filename))
            print(f"  Saved {filename} ({len(data)} bytes)")
        except Exception as e:
            print(f"  Failed {url}: {e}")

print("Downloaded fonts:", downloaded_fonts)
