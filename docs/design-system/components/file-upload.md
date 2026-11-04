# File upload (web)

Source: Figma web file `trJvYAeN2wdayn2VdSUR2N`, page "File upload". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

File uploader facilitates selecting and uploading files from the user's device to a web platform. Users initiate the process through a designated area, review selections, and monitor upload progress. Upon completion, they receive confirmation, ensuring a smooth experience.

Internal sub-parts (not used directly): `_Drop Zone`, `_File`

## Component: File Upload / Multiple  (2 variants)

| Prop | Values / default |
|---|---|
| File 2 | B:false |
| File 3 | B:false |
| Uploaded | B:true |
| RTL | no \| yes |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 334x272 V p0/0/0/0 g16 gap=spacing-xl |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| - | fg:text-display ic:icon-default ts:Text md/Medium |

## Component: File Upload / Single  (6 variants)

| Prop | Values / default |
|---|---|
| Show Helper Text | B:true |
| Helper Text EN | T:Maximum file size allowe |
| Helper Text AR | T:الحد الأقصى لحجم الملف ا |
| RTL | True \| False |
| State | Default \| Disabled \| Uploaded |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 326x116 V p0/0/0/0 g16 gap=spacing-xl |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Default | fg:field-text-label ts:Text md/Regular |
| Disabled | fg:text-default-disabled ts:Text md/Regular |
| Uploaded | fg:field-text-label ic:icon-oncolor ts:Text md/Regular |

## CSS implementation notes (from design.dga.gov.sa CSS, phase 2)
Where these differ from Figma above, Figma is the source of truth.
CSS block(s): `.file-upload` — extracted verbatim from https://design.dga.gov.sa/ compiled CSS (2026-11-04). Not cross-checked against Figma (community files not readable via connector). rem duplicates (62.5% root) omitted.

### Variants / modifiers (`--`)
disabled, drag-over

### Elements / anatomy (`__`)
drop-area, formats, icon, instructions

### Heights used
—

### Tokens referenced (count)
`--colors-brand-50` (1), `--colors-brand-600` (1), `--colors-text-brand-primary` (1), `--colors-base-white` (1), `--colors-gray-neutral-300` (1)

### Rules (selector → declarations; covers sizes, states :hover/:focus/:active/:disabled, colors, spacing, radius)

- `.file-upload` → `width: 100%; gap: var(--size-8, 8px)`
- `.file-upload--drag-over .file-upload__drop-area` → `background-color: var(--colors-brand-50); background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='4' ry='4' stroke='%231B8354FF' stroke-width='2' stroke-dasharray='12%2c6.5' stroke-dashoffset='5' stroke-linecap='square'/%3e%3c/svg%3e")`
- `.file-upload--drag-over .file-upload__icon` → `color: var(--colors-brand-600)`
- `.file-upload--drag-over .file-upload__instructions,.file-upload--drag-over .file-upload__formats` → `color: var(--colors-text-brand-primary)`
- `.file-upload--disabled .file-upload__drop-area` → `background-color: var(--colors-base-white)`
- `.file-upload--disabled .file-upload__icon,.file-upload--disabled .file-upload__instructions,.file-upload--disabled .file-upload__formats` → `color: var(--colors-gray-neutral-300)`
