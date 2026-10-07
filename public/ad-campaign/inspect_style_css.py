import sys
sys.stdout.reconfigure(encoding='utf-8')
import re

with open('style.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Root variables
root_match = re.search(r':root\s*\{([^}]+)\}', css)
if root_match:
    print("=== CURRENT CSS ROOT VARIABLES ===")
    print(root_match.group(1))

# Find all occurrences of lime in class names or selectors
lime_selectors = re.findall(r'([^{}]*lime[^{}]*)\{', css, re.I)
print(f"\nLime selectors found ({len(lime_selectors)}):")
for s in set(lime_selectors[:15]):
    print("  ", s.strip())

# Find all hex colors in style.css
colors = re.findall(r'#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b', css)
from collections import Counter
print("\nTop colors in style.css:")
for c, cnt in Counter(colors).most_common(20):
    print(f"  {c}: {cnt}")

