# Photography and fonts

Demo stories are fictional. Photographs illustrate the design and do not imply
commissioned work, client relationships, or endorsements.

| Local file                   | Original source                                                                       |
| ---------------------------- | ------------------------------------------------------------------------------------- |
| `public/images/family.jpg`   | [Hoi An and Da Nang Photographer / Unsplash](https://unsplash.com/photos/jv1xCkHFoXo) |
| `public/images/couple.jpg`   | [Hoi An and Da Nang Photographer / Unsplash](https://unsplash.com/photos/8G5z5uTx9QI) |
| `public/images/portrait.jpg` | [Nick Karvounis / Unsplash](https://unsplash.com/photos/Y2Z_VQ6B86o)                  |
| `public/images/brand.jpg`    | [Kawê Rodrigues / Unsplash](https://unsplash.com/photos/8gh5dVo8uyM)                  |

Resized JPEGs retain the [Unsplash License](https://unsplash.com/license), separate
from the [code license](../LICENSE). Credits also appear at `/credits/`. The visual
direction favors classic tailoring, crisp cotton, coastal color, and relaxed
portraits. Replace sample photographs with licensed work for a real studio.

Italiana and DM Sans load from Google Fonts with local fallbacks. Self-host them
with their license notices to eliminate external font requests. Lucide provides
interface icons under ISC; Font Awesome provides the GitHub brand icon under
CC BY 4.0. The icon links to the actual project, not an invented social profile.

The [brand page](../src/pages/brand.astro) includes the white favicon and a
1200 × 630 social preview. Set `PUBLIC_SITE_URL` to the deployed site origin
so social image metadata uses an absolute URL.

Additional gallery photographs and their original source links are recorded in
[src/lib/gallery-photos.json](../src/lib/gallery-photos.json) and displayed on the
credits page. Demo collections combine licensed stock shoots; they are not
represented as a single client session. Each added photograph is a distinct image.
