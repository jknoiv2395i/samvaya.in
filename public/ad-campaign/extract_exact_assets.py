from PIL import Image

img = Image.open('reference.png')

# The video card in reference.png:
# Top left of black video container is around y=172, x=58 to x=694
# Let's inspect coordinates precisely
video_card = img.crop((58, 172, 694, 532))
video_card.save('video_card_exact.png')

# Split 1 (Angela 1 photo with card)
# x from ~390 to 655, y from ~1460 to 1820
split1 = img.crop((390, 1455, 655, 1815))
split1.save('split1_exact.png')

# Split 2 (Angela 2 photo with card)
# x from ~97 to 362, y from ~1930 to 2290
split2 = img.crop((97, 1930, 362, 2290))
split2.save('split2_exact.png')

# Bottom CTA glowing banner:
# Let's check y coordinate around 4850
cta_card = img.crop((186, 4840, 566, 5130))
cta_card.save('cta_card_exact.png')

# Logo at header:
header_logo = img.crop((330, 28, 422, 52))
header_logo.save('header_logo.png')

# Center cube icon above 'Why Choose'
cube_icon = img.crop((360, 1262, 392, 1294))
cube_icon.save('cube_icon.png')

# Avatar stack in Hero
avatar_stack = img.crop((345, 574, 407, 592))
avatar_stack.save('hero_avatar_stack.png')

print("All exact slices extracted!")
