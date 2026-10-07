from PIL import Image

img = Image.open('reference.png')
w, h = img.size

# Video: x approx 110 to 642, y approx 90 to 400
# Angela photo 1: split 1
# Angela photo 2: split 2
# Bottom CTA banner: bottom

# Let's crop precise visual assets
# 1. Video card thumbnail exactly as in design:
# Let's find video bounding box
video_crop = img.crop((110, 85, 642, 385))
video_crop.save('video_thumb.png')

# 2. Angela 1 (top split right photo)
# approx y around 1300 to 1800
split1_crop = img.crop((390, 1370, 650, 1720))
split1_crop.save('split1_img.png')

# 3. Angela 2 (bottom split left photo)
split2_crop = img.crop((102, 1795, 362, 2145))
split2_crop.save('split2_img.png')

# 4. Kipp Bodnar avatar
kipp_avatar = img.crop((98, 3672, 130, 3704))
kipp_avatar.save('kipp_avatar.png')

# 5. Bottom banner background/glow
cta_banner = img.crop((180, 4800, 572, 4980))
cta_banner.save('cta_banner.png')

print("Cropped successfully!")
