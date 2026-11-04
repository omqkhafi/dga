# Table (web)

Source: Figma web file `trJvYAeN2wdayn2VdSUR2N`, page "Table". All values below are read from Figma component variants (LTR variants; RTL variants mirror them). Token names are Figma variable names (last segment); see `tokens.css`.

## Usage (plain language)

Table Row Cell is a container where content or data is placed.

Internal sub-parts (not used directly): `_Cell swap`

## Component: Table Row Cell  (44 variants)

| Prop | Values / default |
|---|---|
| Column Divider | B:true |
| Helper Text | B:false |
| Avatar/image | B:false |
| 2nd action | B:true |
| 3rd action | B:true |
| Lead Text EN | T:Cell |
| Helper text | T:helper text |
| Lead Text AR | T:خلية |
| 🔁 Swap Content | I:5698:40274 |
| RTL | False \| True |
| Type | Default \| Link \| Actions \| Input field \| Badge \| Status \| Avatar/Image \| Checkbox \| Switch \| Feedback icon \| Custom |
| Compact | False \| True |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Default | 228x64 H p8/16/8/16 g8 pad-y=table-cell-v-padding pad-x=table-cell-h-padding gap=table-cell-gap |
| Link | 228x64 H p8/16/8/16 g8 pad-y=table-cell-v-padding pad-x=table-cell-h-padding gap=table-cell-gap |
| Input field | 228x64 H p8/16/8/16 g8 pad-y=table-cell-v-padding pad-x=table-cell-h-padding gap=table-cell-gap |
| Badge | 120x64 H p8/16/8/16 g8 pad-y=table-cell-v-padding pad-x=table-cell-h-padding gap=table-cell-gap |
| Status | 120x64 H p8/16/8/16 g8 pad-y=table-cell-v-padding pad-x=table-cell-h-padding gap=table-cell-gap |
| Switch | 80x64 H p8/16/8/16 g8 pad-y=table-cell-v-padding pad-x=table-cell-h-padding gap=table-cell-gap |
| Feedback icon | 80x64 H p8/16/8/16 g8 pad-y=table-cell-v-padding pad-x=table-cell-h-padding gap=table-cell-gap |
| Actions | 144x64 H p8/16/8/16 g8 pad-y=table-cell-v-padding pad-x=table-cell-h-padding gap=table-cell-gap |
| Avatar/Image | 64x64 H p8/16/8/16 g8 pad-y=table-cell-v-padding pad-x=table-cell-h-padding gap=table-cell-gap |
| Checkbox | 52x64 H p8/16/8/16 g8 pad-y=table-cell-v-padding pad-x=table-cell-h-padding gap=table-cell-gap |
| Custom | 228x64 H p8/16/8/16 g8 pad-y=table-cell-v-padding pad-x=table-cell-h-padding gap=table-cell-gap |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Default/False | fg:table-text-body ts:Text md/Regular |
| Default/True | fg:table-text-body ts:Text md/Regular |
| Link/False | fg:link-primary ts:Text md/Regular |
| Link/True | fg:link-primary ts:Text md/Regular |
| Input field/False | fg:field-text-filled ts:Text sm/Regular |
| Input field/True | fg:field-text-filled ts:Text sm/Regular |
| Badge/False | fg:tag-text-neutral ts:Text xs/Medium |
| Badge/True | fg:tag-text-neutral ts:Text xs/Medium |
| Status/False | fg:tag-text-neutral ts:Text sm/Medium |
| Status/True | fg:tag-text-neutral ts:Text sm/Medium |
| Switch/False |  |
| Switch/True |  |
| Feedback icon/False | ic:icon-oncolor |
| Feedback icon/True | ic:icon-oncolor |
| Actions/False | ic:icon-default |
| Actions/True | ic:icon-default |
| Avatar/Image/False |  |
| Avatar/Image/True |  |
| Checkbox/False |  |
| Checkbox/True |  |
| Custom/False | fg:text-primary ts:Base/Text md/Medium |
| Custom/True | fg:text-primary ts:Base/Text md/Medium |

## Component: Table Header Cell  (12 variants)

The Table Header Cell is a container that holds and represents the content or data within a table's header.

| Prop | Values / default |
|---|---|
| Column Divider | B:true |
| Label EN | T:Header |
| Icon | B:false |
| 🔁 Swap Icon | I:5698:2327 |
| Sort | B:false |
| Help Icon | B:false |
| Filter | B:false |
| Label AR | T:عنوان العمود |
| 🔁 Swap Content | I:5698:40274 |
| RTL | False \| True |
| Type | Default \| Actions \| Checkbox \| Custom \| Icon \| Filter |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| Default | 228x48 H p8/16/8/16 g8 pad-y=table-cell-v-padding pad-x=table-cell-h-padding gap=table-cell-gap |
| Actions | 64x48 H p8/16/8/16 g8 pad-y=table-cell-v-padding pad-x=table-cell-h-padding gap=table-cell-gap |
| Checkbox | 52x48 H p8/16/8/16 g8 pad-y=table-cell-v-padding pad-x=table-cell-h-padding gap=table-cell-gap |
| Icon | 52x48 H p8/16/8/16 g8 pad-y=table-cell-v-padding pad-x=table-cell-h-padding gap=table-cell-gap |
| Custom | 228x48 H p8/16/8/16 g8 pad-y=table-cell-v-padding pad-x=table-cell-h-padding gap=table-cell-gap |
| Filter | 52x48 H p8/16/8/16 g8 pad-y=table-cell-v-padding pad-x=table-cell-h-padding gap=table-cell-gap |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Default | fg:table-text-head ts:Text xs/Medium |
| Actions | ic:icon-default |
| Checkbox |  |
| Icon | ic:icon-default-500 |
| Custom | fg:text-primary ts:Base/Text md/Medium |
| Filter | ic:icon-default |

## Component: Table Header Cell - Sort  (15 variants)

A Table Header Cell - Sort allows users to arrange table data in ascending or descending order by interacting with the header, enhancing data organization and usability.

| Prop | Values / default |
|---|---|
| State | Default \| Hovered \| Pressed \| Focused \| Disabled |
| Sort | Off \| Down \| Up |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 20x20 H p0/0/0/0 g8 gap=spacing-md r4=4 |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Default/Off | bg:button-background-neutral-default ic:icon-default |
| Hovered/Off | bg:button-background-neutral-hovered ic:icon-default |
| Pressed/Off | bg:button-background-neutral-pressed ic:icon-default |
| Focused/Off | bd:border-black ic:icon-default |
| Disabled/Off | ic:icon-default |
| Default/Down | bg:button-background-black-default ic:icon-oncolor |
| Hovered/Down | bg:button-background-black-hovered ic:icon-oncolor |
| Pressed/Down | bg:button-background-black-pressed ic:icon-oncolor |
| Focused/Down | bg:button-background-black-focused bd:border-black ic:icon-oncolor |
| Disabled/Down | ic:icon-default |
| Default/Up | bg:button-background-black-default ic:icon-oncolor |
| Hovered/Up | bg:button-background-black-hovered ic:icon-oncolor |
| Pressed/Up | bg:button-background-black-pressed ic:icon-oncolor |
| Focused/Up | bg:button-background-black-focused bd:border-black ic:icon-oncolor |
| Disabled/Up | ic:icon-default |

## Component: Table Header Cell - Filter  (10 variants)

A Table Header Cell - Filter enables users to refine table data by applying specific criteria, improving data discoverability and organization.

| Prop | Values / default |
|---|---|
| State | Default \| Hovered \| Pressed \| Focused \| Disabled |
| Active | False \| True |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 20x20 H p0/0/0/0 g8 gap=spacing-md r4=4 |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| Default/False | bg:button-background-neutral-default ic:icon-default |
| Hovered/False | bg:button-background-neutral-hovered ic:icon-default |
| Pressed/False | bg:button-background-neutral-pressed ic:icon-default |
| Focused/False | bd:border-black ic:icon-default |
| Disabled/False | ic:icon-default |
| Default/True | bg:button-background-black-default ic:icon-oncolor |
| Hovered/True | bg:button-background-black-hovered ic:icon-oncolor |
| Pressed/True | bg:button-background-black-pressed ic:icon-oncolor |
| Focused/True | bg:button-background-black-focused bd:border-black ic:icon-oncolor |
| Disabled/True | ic:icon-default |

## Component: Table Row  (4 variants)

A table is a structured format for displaying data in rows and columns, which helps users to understand and interact with complex information efficiently. It is a crucial element in many user interfaces, particularly for applications that require the organization, analysis, or manipulation of large 

| Prop | Values / default |
|---|---|
| Alt-bg | B:false |
| Hovered | B:false |
| Selected | B:false |
| Row Divider | B:true |
| RTL | True \| False |
| Compact | True \| False |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 1000x64 H p0/0/0/0 g0 |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| False | fg:link-primary ic:icon-default ts:Text md/Regular |
| True | fg:link-primary ic:icon-default ts:Text md/Regular |

## Component: Table  (16 variants)

A table is a structured format for displaying data in rows and columns, which helps users to understand and interact with complex information efficiently. It is a crucial element in many user interfaces, particularly for applications that require the organization, analysis, or manipulation of large 

| Prop | Values / default |
|---|---|
| RTL | False \| True |
| Alternating rows | True \| False |
| Compact | False \| True |
| Contained | False \| True |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 1330x1008 V p0/0/0/0 g0 |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| False/False/False | fg:table-text-head ic:icon-default ts:Text xs/Medium |
| False/False/True | bd:table-cell-border fg:table-text-head ic:icon-default ts:Text xs/Medium |
| True/False/False | fg:table-text-head ic:icon-default ts:Text xs/Medium |
| True/False/True | bd:table-cell-border fg:table-text-head ic:icon-default ts:Text xs/Medium |
| False/True/False | fg:table-text-head ic:icon-default ts:Text xs/Medium |
| False/True/True | bd:table-cell-border fg:table-text-head ic:icon-default ts:Text xs/Medium |
| True/True/False | fg:table-text-head ic:icon-default ts:Text xs/Medium |
| True/True/True | bd:table-cell-border fg:table-text-head ic:icon-default ts:Text xs/Medium |

## Component: Table Header  (2 variants)

The Table Header is a container that organizes and displays header content, defining the structure and context of table data.

| Prop | Values / default |
|---|---|
| RTL | True \| False |

### Sizes / layout
`WxH` (sample instance), layout `H/V p<top/right/bottom/left> g<gap>`, `=token` bindings, `r` radius, `sw` stroke width, `h=` height token.

| Key | Measurements |
|---|---|
| - | 1000x48 H p0/0/0/0 g0 swmixed |

### States / colour tokens
`bg` fill, `bd` border, `fg` first text, `ic` first icon vector, `ts` text style, `fx` effect style.

| Variant | Tokens |
|---|---|
| - | bg:table-background-header bd:table-cell-border fg:table-text-head ic:icon-default ts:Text xs/Medium |
