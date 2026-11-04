# Link (mobile)

Source: Figma mobile file `Ci0aNw48DSdp7MsRw0U1nA`, page "Link". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

_No description is given in Figma for this component; usage guidance not stated in source._

## Component: Link  (120 variants)

| Prop | Values / default |
|---|---|
| Link Text EN | T:Link |
| Link Text AR | T:رابط |
| Icon | B:true |
| 🔁 Icon Swap | I:10750:66278 |
| RTL | False \| True |
| Size | Medium (16px) \| Small (14px) |
| Style | Neutral \| Brand \| On-color |
| Inline | False \| True |
| State | Default \| Pressed \| Focused \| Visited \| Disabled |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Small (14px) | 50x20 H p0/0/0/0 g8 gap=spacing-md r2=radius-xs |
| Medium (16px) | 58x24 H p0/0/0/0 g8 gap=spacing-md r2=radius-xs |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Brand/False/Default | fg:link-primary ic:icon-primary ts:Text sm/Regular |
| Neutral/False/Default | fg:link-neutral ic:icon-neutral ts:Text sm/Regular |
| Brand/False/Visited | fg:link-primary-visited ic:tag-icon-success ts:Text sm/Regular |
| Neutral/False/Visited | fg:link-neutral-visited ic:tag-background-neutral ts:Text sm/Regular |
| Brand/False/Disabled | fg:link-disabled ic:icon-default-disabled ts:Text sm/Regular |
| Neutral/False/Disabled | fg:link-disabled ic:icon-default-disabled ts:Text sm/Regular |
| Brand/False/Focused | bd:border-black fg:link-primary-focused ic:icon-primary ts:Text sm/Regular |
| Neutral/False/Focused | bd:border-black fg:link-neutral-focused ic:icon-neutral ts:Text sm/Regular |
| Brand/False/Pressed | fg:link-primary-pressed ic:datecell-background-300 ts:Text sm/Regular underlined |
| Neutral/False/Pressed | fg:link-neutral-pressed ic:icon-default-400 ts:Text sm/Regular underlined |
| Brand/True/Default | fg:link-primary ic:icon-primary ts:Text sm/Regular underlined |
| Neutral/True/Default | fg:link-neutral ic:icon-neutral ts:Text sm/Regular underlined |
| Brand/True/Visited | fg:link-primary-visited ic:tag-icon-success ts:Text sm/Regular underlined |
| Neutral/True/Visited | fg:link-neutral-visited ic:tag-background-neutral ts:Text sm/Regular underlined |
| Brand/True/Disabled | fg:link-disabled ic:icon-default-disabled ts:Text sm/Regular underlined |
| Neutral/True/Disabled | fg:link-disabled ic:icon-default-disabled ts:Text sm/Regular underlined |
| Brand/True/Focused | bd:border-black fg:link-primary-focused ic:icon-primary ts:Text sm/Regular underlined |
| Neutral/True/Focused | bd:border-black fg:link-neutral-focused ic:icon-neutral ts:Text sm/Regular underlined |
| Brand/True/Pressed | fg:link-primary-pressed ic:datecell-background-300 ts:Text sm/Regular underlined |
| Neutral/True/Pressed | fg:link-neutral-pressed ic:icon-default-400 ts:Text sm/Regular underlined |
| On-color/False/Default | fg:link-oncolor ic:icon-oncolor ts:Text sm/Regular |
| On-color/False/Visited | fg:link-oncolor-visited ic:background-disabled ts:Text sm/Regular |
| On-color/False/Disabled | fg:link-oncolor-disabled ic:icon-default-oncolor-disabled ts:Text sm/Regular |
| On-color/False/Focused | bd:border-white fg:link-oncolor-focused ic:button-background-oncolor-focused ts:Text sm/Regular |
| On-color/False/Pressed | fg:link-oncolor-pressed ic:button-background-oncolor-pressed ts:Text sm/Regular underlined |
| On-color/True/Default | fg:link-oncolor ic:icon-oncolor ts:Text sm/Regular underlined |
| On-color/True/Visited | fg:link-oncolor-visited ic:background-disabled ts:Text sm/Regular underlined |
| On-color/True/Disabled | fg:link-oncolor-disabled ic:icon-default-oncolor-disabled ts:Text sm/Regular underlined |
| On-color/True/Focused | bd:border-white fg:link-oncolor-focused ic:button-background-oncolor-focused ts:Text sm/Regular underlined |
| On-color/True/Pressed | fg:link-oncolor-pressed ic:button-background-oncolor-pressed ts:Text sm/Regular underlined |
