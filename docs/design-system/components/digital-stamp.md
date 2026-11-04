# Digital Stamp (web)

Source: Figma web file `trJvYAeN2wdayn2VdSUR2N`, page "Digital Stamp". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

The Digital Stamp Component is an interface element that ensures users are interacting with a verified and secure source, confirming the integrity and authenticity of government sites. It provides an encrypted digital stamp, reinforcing trust and transparency in the website's content.

## Component: Digital Stamp  (8 variants)

| Prop | Values / default |
|---|---|
| RTL | Yes \| No |
| Opened | yes \| no |
| Device | Mobile \| Desktop |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 1728x32 H p0/32/0/32 g0 pad-y=spacing-none pad-x=section-padding |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| no/Desktop | bg:background-neutral-100 fg:text-default ic:#ffffff ts:Text sm/Medium |
| yes/Desktop | bg:background-neutral-100 fg:text-default ic:#ffffff ts:Text sm/Medium |
| no/Mobile | bg:background-neutral-100 fg:text-default ic:#ffffff ts:Text sm/Medium |
| yes/Mobile | bg:background-neutral-100 fg:text-default ic:#ffffff ts:Text sm/Medium |

## Component: Extension  (24 variants)

The purpose of extensions is to provide clear indications of the authenticity of a website. Key details, such as domain confirmation (e.g., .gov.sa, .edu.sa, .med.sa, .org.sa, .sch.sa), HTTPS usage, and Digital Government Authority registration, reinforce user trust and security.

| Prop | Values / default |
|---|---|
| RTL | False \| True |
| Extension | gov.sa \| edu.sa \| med.sa \| org.sa \| sch.sa \| .sa |
| Device | Mobile \| Desktop |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 1664x88 H p0/0/0/0 g16 gap=spacing-xl |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| gov.sa/Desktop | ic:icon-success ts:Text lg/Semibold |
| edu.sa/Desktop | ic:icon-success ts:Text lg/Semibold |
| med.sa/Desktop | ic:icon-success ts:Text lg/Semibold |
| org.sa/Desktop | ic:icon-success ts:Text lg/Semibold |
| sch.sa/Desktop | ic:icon-success ts:Text lg/Semibold |
| .sa/Desktop | ic:icon-success ts:Text lg/Semibold |
| gov.sa/Mobile | ic:icon-success ts:Text lg/Semibold |
| edu.sa/Mobile | ic:icon-success ts:Text lg/Semibold |
| med.sa/Mobile | ic:icon-success ts:Text lg/Semibold |
| org.sa/Mobile | ic:icon-success ts:Text lg/Semibold |
| sch.sa/Mobile | ic:icon-success ts:Text lg/Semibold |
| .sa/Mobile | ic:icon-success ts:Text lg/Semibold |
