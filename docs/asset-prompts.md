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
