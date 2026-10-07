from PIL import Image

img = Image.open('reference.png')

# 1. Video Card Exact (excluding text above and enroll below)
# Container is x=110 to 642, y=179 to 470
video = img.crop((109, 178, 643, 471))
video.save('exact_video.png')

# 2. Split 1 exact Angela card
split1 = img.crop((388, 1472, 654, 1800))
split1.save('exact_split1.png')

# 3. Split 2 exact Angela card
split2 = img.crop((98, 1850, 364, 2182))
split2.save('exact_split2.png')

# 4. CTA Glow banner exact
cta = img.crop((186, 4975, 566, 5130))
cta.save('exact_cta_bg.png')

# 5. Kipp Bodnar exact avatar
kipp = img.crop((97, 3687, 116, 3706))
kipp.save('exact_kipp.png')

# 6. Hero Avatar Stack
hero_avatars = img.crop((347, 576, 377, 592))
hero_avatars.save('exact_hero_avatars.png')

# 7. Brand logo
brand_logo = img.crop((334, 29, 418, 48))
brand_logo.save('exact_logo.png')

print("All calibrated crops completed successfully!")
