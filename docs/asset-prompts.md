# Obrazy strony

Wygenerowane przez wbudowane `image_gen.imagegen`, z `transparent_background: true`. Obrazy służą do artystycznej ilustracji, nie do identyfikacji odmian.

Pliki źródłowe:

- `src/assets/tomato-whole.png`
- `src/assets/tomato-slice.png`
- `src/assets/tomato-varieties.png`

Astro przetwarza je na warianty WebP w `dist/_astro/` podczas budowania.

## whole

Generate a premium editorial food photograph of exactly one large ripe red heirloom tomato, a beautiful irregular flattened ribbed beefsteak shape, lush small natural green calyx and short curving stem on top. Three-quarter front view at tomato eye-level, tomato fills 85 percent of square canvas but whole silhouette fully inside with margin. Warm tomato-red skin with small natural imperfections and a few tiny condensation droplets, striking side light from upper left, luminous highlights and softly darker underside. Realistic edible tomato, photorealistic tactile skin, no plastic 3D look. This is an isolated hero cutout for an all-red editorial website, no ground plane or cast shadow, NO background, truly transparent background, no typography no labels no other objects. 1536x1536 composition.

## slice

Generate a premium editorial macro food photograph of exactly one fresh horizontal cross-section of a ripe red beefsteak tomato, face-on view of the cut face, showing pale flesh partitions, real natural seed cavities with wet translucent yellowish seeds and tomato gel, subtly irregular round ribbed silhouette, no green stem. Naturally believable botanical food photography, no diagram, no fake ornamental patterns, bright warm red outer skin, vivid red juicy flesh, softly directional light. Whole slice fits inside square canvas with 8 percent breathing room around perimeter. Isolated cutout for an all-red editorial website, truly transparent background, NO backdrop NO ground plane NO cast shadow, no labels no text no other objects. 1536x1536 composition.

## varieties

Generate a premium editorial overhead still-life food photograph of a carefully art-directed loose group of exactly six different tomatoes: a large ribbed red tomato, an oval orange tomato, a medium gold yellow tomato, a small red cherry tomato, a burgundy dark tomato, and a green striped tomato. These are illustrative generic shapes and colors, not named cultivars. Beautiful real skin texture with natural imperfections, subtle highlights, small green calyx on two tomatoes. Cluster spread loosely in a horizontal diagonal, all six tomatoes fully visible, none cropped, narrow gaps between them, no stems connecting tomatoes, no slicing. Photorealistic food photography. Isolated objects on truly transparent background, no backdrop, no ground plane, NO typography NO labels NO plate NO hands. Landscape composition 1536x1024, generous margin.

## ripening — green and orange

Warianty utworzone wbudowanym `image_gen.imagegen` w trybie edycji, z `transparent_background: true`, na podstawie `src/assets/tomato-whole.png`. Oba mają 1254 × 1254 px i zachowują kanał alpha. Pliki: `src/assets/tomato-green.png`, `src/assets/tomato-orange.png`. Czerwony etap wykorzystuje dotychczasowy obraz. Trzy kolory są uproszczeniem wizualnym dla odmian czerwonych, nie pełną skalą etapów dojrzałości.

### Green — prompt

Use case: precise-object-edit. Asset type: transparent PNG tomato for a scroll-driven ripening story on a website. Edit target: attached red tomato. Change ONLY the red and orange fruit skin into realistic pale fresh green skin of an unripe tomato of a red-ripening variety, subtle light olive and apple green tones, realistic natural slight unevenness. Keep the leafy calyx and stem their original green. Preserve the EXACT fruit identity, ribbed silhouette, size, position, camera angle, crop, green stem geometry, lighting, water droplets and all highlights. This variant will crossfade on top of the original so pixel registration and identical composition are essential. Preserve the transparent background and square canvas, no backdrop, no shadow added, no extra objects, text or borders. One single green tomato.

### Orange — prompt

Use case: precise-object-edit. Asset type: transparent PNG tomato for a scroll-driven ripening story. Edit target: attached red tomato. Change ONLY the fruit skin colour into warm natural golden orange of a tomato partway through ripening to red, with faint yellow-green areas at its shoulders, predominantly luminous orange and apricot, not red. Keep the leafy calyx and stem their original green. Preserve EXACT fruit identity, ribbed silhouette, size, position, camera angle, framing, square canvas, stem shape, water droplets, all lighting and highlights. This image will crossfade over the reference so identical pixel registration is essential. Preserve genuine transparent background. No backdrop, no added shadows, no new objects, no text or borders. One single orange tomato.

Źródło opisu zmiany barwy: [UC Davis — Tomato: maturity indices and quality](https://horticulture.ucdavis.edu/information/tomato-maturity-indices-and-quality).

## favourites — sandwich layers

Trzy obrazy zapisane w `src/assets/sandwich-bread.png`, `src/assets/sandwich-cheese.png`, `src/assets/sandwich-tomato.png`. Wbudowany `image_gen.imagegen`, `transparent_background: true`; wszystkie obrazy mają 1254 × 1254 px i kanał alpha. Pieczywo wygenerowane od nowa, ser i pomidor przygotowane jako osobne warstwy z referencjami poprzednich składników. Warstwy mają wspólną perspektywę; końcowe dopasowanie rozmiaru odbywa się w CSS.

### Bread — generate

Use case: photorealistic-natural. Asset type: isolated transparent PNG ingredient layer for an animated open-faced cheese and tomato sandwich on an editorial website. Subject: exactly one thick oval slice of rustic wheat sourdough bread, golden brown crust, soft pale ivory porous crumb, small natural irregularities, no toppings. Camera: fixed three-quarter overhead view looking down at 60 degrees above horizontal, front edge and thin thickness visible, long axis of slice running diagonally from lower left to upper right at about 15 degrees. Composition: square canvas, bread centred at x50%, y55%, fully inside margins, loaf slice occupies about 76% of canvas width and 49% of canvas height. Warm natural editorial food photography, soft upper-left side lighting, realistic edible crumb and tactile crust. This bread is the bottom layer of a sandwich; later a flat yellow cheese slice and three overlapping red tomato rounds will cover its central crumb. Genuinely transparent background, no surface, no plate, no utensils, no hands, no extra food, no ground shadow, no text, no watermark. One bread slice only.

### Cheese — edit with bread reference

Use case: precise-object-edit. Asset type: transparent PNG cheese layer to overlay this bread photo in an animated open-faced sandwich. Input image: the bread image is a compositional and perspective reference. Replace ALL the bread with exactly two thin overlapping slices of pale golden yellow Gouda-style cheese, no bread left anywhere. Match the reference's square canvas, fixed overhead three-quarter camera looking down at 60 degrees, upper-left soft lighting, long diagonal composition from lower left to upper right. The cheese must lie flat along the reference bread's central crumb plane, within its outer crust outline, occupying roughly 70% of the canvas width, centred x50%, y49%. Two slightly irregular thin rectangular cheese slices overlapping along the long diagonal axis, with small rounded corners, realistic matte-satin surface and barely visible edge thickness, delicate natural crease only. This layer will be placed directly over the original bread at the same canvas coordinates. All other pixels transparent. NO bread, tomato, plate, table, hands, garnish, utensils, external ground shadow, text, watermark or other objects. Genuine transparent background and same square framing.

### Tomato — edit with bread and cheese references

Use case: precise-object-edit. Asset type: isolated transparent PNG tomato topping layer for an animated open-faced sandwich. Input image 1 bread and image 2 cheese are compositional references only. Generate ONLY exactly three thin round slices of a ripe red tomato, partially overlapping along a diagonal from lower left to upper right, on a genuinely transparent square canvas. NO bread or cheese should remain visible. Match both references' overhead three-quarter camera looking down at 60 degrees, upper-left soft natural light, diagonal plane, framing and square canvas size. Position the three slices at approximately x29% y58%, x49% y46%, x69% y35%, each about 32% of canvas width, projected into natural ellipses with a visible thin red front skin edge. Together the tomato group occupies about 73% of the canvas width, centred x49% y47%; it will overlay the reference bread and cheese in exactly those coordinates. Beautiful realistic wet translucent red flesh, natural seed chambers, pale partitions, seeds in gel, edible red tomato slices with naturally imperfect rims and small thickness. Editorial food photography. Three slices only, top surfaces facing upward. Preserve genuine alpha transparency around and between all slices; no backdrop, ground plane, plate, leaves, herbs, butter, hands, typography or watermark.
