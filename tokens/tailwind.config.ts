// DGA Platforms Code — Tailwind preset (source: Figma Foundations variables). Import tokens.css globally.
// Font sizes are responsive via tokens.css Desktop/Tablet/Mobile modes. Semantic: bg-bg-body, text-fg-default, border-line-primary.
import type { Config } from "tailwindcss";
const dgaPreset = {
  "darkMode": [
    "selector",
    "[data-theme=\"dark\"]"
  ],
  "theme": {
    "extend": {
      "colors": {
        "primary": {
          "25": "var(--colors-primary-sa-flag-25)",
          "50": "var(--colors-primary-sa-flag-50)",
          "100": "var(--colors-primary-sa-flag-100)",
          "200": "var(--colors-primary-sa-flag-200)",
          "300": "var(--colors-primary-sa-flag-300)",
          "400": "var(--colors-primary-sa-flag-400)",
          "500": "var(--colors-primary-sa-flag-500)",
          "600": "var(--colors-primary-sa-flag-600-primary)",
          "700": "var(--colors-primary-sa-flag-700)",
          "800": "var(--colors-primary-sa-flag-800)",
          "900": "var(--colors-primary-sa-flag-900)",
          "950": "var(--colors-primary-sa-flag-950)",
          "DEFAULT": "var(--colors-primary-sa-flag-600-primary)"
        },
        "secondary": {
          "25": "var(--colors-secondary-gold-25)",
          "50": "var(--colors-secondary-gold-50)",
          "100": "var(--colors-secondary-gold-100)",
          "200": "var(--colors-secondary-gold-200)",
          "300": "var(--colors-secondary-gold-300)",
          "400": "var(--colors-secondary-gold-400)",
          "500": "var(--colors-secondary-gold-500)",
          "600": "var(--colors-secondary-gold-600-primary)",
          "700": "var(--colors-secondary-gold-700)",
          "800": "var(--colors-secondary-gold-800)",
          "900": "var(--colors-secondary-gold-900)",
          "950": "var(--colors-secondary-gold-950)",
          "DEFAULT": "var(--colors-secondary-gold-600-primary)"
        },
        "tertiary": {
          "25": "var(--colors-tertiary-lavendar-25)",
          "50": "var(--colors-tertiary-lavendar-50)",
          "100": "var(--colors-tertiary-lavendar-100)",
          "200": "var(--colors-tertiary-lavendar-200)",
          "300": "var(--colors-tertiary-lavendar-300)",
          "400": "var(--colors-tertiary-lavendar-400)",
          "500": "var(--colors-tertiary-lavendar-500-primary)",
          "600": "var(--colors-tertiary-lavendar-600)",
          "700": "var(--colors-tertiary-lavendar-700)",
          "800": "var(--colors-tertiary-lavendar-800)",
          "900": "var(--colors-tertiary-lavendar-900)",
          "950": "var(--colors-tertiary-lavendar-950)",
          "DEFAULT": "var(--colors-tertiary-lavendar-500-primary)"
        },
        "neutral": {
          "25": "var(--colors-neutral-25)",
          "50": "var(--colors-neutral-50)",
          "100": "var(--colors-neutral-100)",
          "200": "var(--colors-neutral-200)",
          "300": "var(--colors-neutral-300)",
          "400": "var(--colors-neutral-400)",
          "500": "var(--colors-neutral-500)",
          "600": "var(--colors-neutral-600)",
          "700": "var(--colors-neutral-700)",
          "800": "var(--colors-neutral-800)",
          "900": "var(--colors-neutral-900)",
          "950": "var(--colors-neutral-950)"
        },
        "success": {
          "25": "var(--colors-green-25)",
          "50": "var(--colors-green-50)",
          "100": "var(--colors-green-100)",
          "200": "var(--colors-green-200)",
          "300": "var(--colors-green-300)",
          "400": "var(--colors-green-400)",
          "500": "var(--colors-green-500)",
          "600": "var(--colors-green-600)",
          "700": "var(--colors-green-700)",
          "800": "var(--colors-green-800)",
          "900": "var(--colors-green-900)",
          "950": "var(--colors-green-950)"
        },
        "error": {
          "25": "var(--colors-red-25)",
          "50": "var(--colors-red-50)",
          "100": "var(--colors-red-100)",
          "200": "var(--colors-red-200)",
          "300": "var(--colors-red-300)",
          "400": "var(--colors-red-400)",
          "500": "var(--colors-red-500)",
          "600": "var(--colors-red-600)",
          "700": "var(--colors-red-700)",
          "800": "var(--colors-red-800)",
          "900": "var(--colors-red-900)",
          "950": "var(--colors-red-950)"
        },
        "warning": {
          "25": "var(--colors-yellow-25)",
          "50": "var(--colors-yellow-50)",
          "100": "var(--colors-yellow-100)",
          "200": "var(--colors-yellow-200)",
          "300": "var(--colors-yellow-300)",
          "400": "var(--colors-yellow-400)",
          "500": "var(--colors-yellow-500)",
          "600": "var(--colors-yellow-600)",
          "700": "var(--colors-yellow-700)",
          "800": "var(--colors-yellow-800)",
          "900": "var(--colors-yellow-900)",
          "950": "var(--colors-yellow-950)"
        },
        "info": {
          "25": "var(--colors-blue-25)",
          "50": "var(--colors-blue-50)",
          "100": "var(--colors-blue-100)",
          "200": "var(--colors-blue-200)",
          "300": "var(--colors-blue-300)",
          "400": "var(--colors-blue-400)",
          "500": "var(--colors-blue-500)",
          "600": "var(--colors-blue-600)",
          "700": "var(--colors-blue-700)",
          "800": "var(--colors-blue-800)",
          "900": "var(--colors-blue-900)",
          "950": "var(--colors-blue-950)"
        },
        "black": "var(--colors-base-black)",
        "white": "var(--colors-base-white)",
        "bg": {
          "white": "var(--background-white)",
          "neutral-50": "var(--background-neutral-50)",
          "primary-50": "var(--background-primary-50)",
          "primary": "var(--background-primary)",
          "secondary-50": "var(--background-secondary-50)",
          "tertiary-50": "var(--background-tertiary-50)",
          "success-50": "var(--background-success-50)",
          "info-50": "var(--background-info-50)",
          "warning-50": "var(--background-warning-50)",
          "error-50": "var(--background-error-50)",
          "black": "var(--background-black)",
          "success": "var(--background-success)",
          "info": "var(--background-info)",
          "warning": "var(--background-warning)",
          "error": "var(--background-error)",
          "neutral-400": "var(--background-neutral-400)",
          "neutral-100": "var(--background-neutral-100)",
          "sa-flag": "var(--background-sa-flag)",
          "sa-flag-50": "var(--background-sa-flag-50)",
          "neutral-800": "var(--background-neutral-800)",
          "neutral-300": "var(--background-neutral-300)",
          "neutral-200": "var(--background-neutral-200)",
          "neutral-25": "var(--background-neutral-25)",
          "disabled": "var(--background-disabled)",
          "body": "var(--background-body)",
          "primary-25": "var(--background-primary-25)",
          "secondary-25": "var(--background-secondary-25)",
          "tertiary-25": "var(--background-tertiary-25)",
          "success-25": "var(--background-success-25)",
          "info-25": "var(--background-info-25)",
          "warning-25": "var(--background-warning-25)",
          "error-25": "var(--background-error-25)",
          "sa-flag-25": "var(--background-sa-flag-25)",
          "menu": "var(--background-menu)",
          "inverse-disabled": "var(--background-inverse-disabled)",
          "disabled-primary": "var(--background-disabled-primary)",
          "card": "var(--background-card)",
          "primary-400": "var(--background-primary-400)",
          "notification-white": "var(--background-notification-white)",
          "primary-200": "var(--background-primary-200)",
          "warning-light": "var(--background-warning-light)",
          "error-light": "var(--background-error-light)",
          "brand-light": "var(--background-brand-light)",
          "info-light": "var(--background-info-light)",
          "success-light": "var(--background-success-light)",
          "nav-header": "var(--background-nav-header)",
          "surface-oncolor": "var(--background-surface-oncolor)",
          "secondary": "var(--background-secondary)",
          "tertiary": "var(--background-tertiary)"
        },
        "fg": {
          "primary": "var(--text-primary)",
          "display": "var(--text-display)",
          "primary-paragraph": "var(--text-primary-paragraph)",
          "secondary-paragraph": "var(--text-secondary-paragraph)",
          "success": "var(--text-success)",
          "info": "var(--text-info)",
          "warning": "var(--text-warning)",
          "error": "var(--text-error)",
          "oncolor-primary": "var(--text-oncolor-primary)",
          "default": "var(--text-default)",
          "form-title": "var(--text-form-title)",
          "form-paragraph": "var(--text-form-paragraph)",
          "default-disabled": "var(--text-default-disabled)",
          "default-oncolor-disabled": "var(--text-default-oncolor-disabled)",
          "primary-light": "var(--text-primary-light)",
          "primary-sa-flag": "var(--text-primary-sa-flag)",
          "oncolor-secondary": "var(--text-oncolor-secondary)",
          "oncolor-tertiary": "var(--text-oncolor-tertiary)",
          "secondary": "var(--text-secondary)",
          "tertiary": "var(--text-tertiary)",
          "secondary-light": "var(--text-secondary-light)",
          "tertiary-light": "var(--text-tertiary-light)"
        },
        "line": {
          "neutral-primary": "var(--border-neutral-primary)",
          "neutral-secondary": "var(--border-neutral-secondary)",
          "neutral-tertiary": "var(--border-neutral-tertiary)",
          "white": "var(--border-white)",
          "black": "var(--border-black)",
          "success": "var(--border-success)",
          "info": "var(--border-info)",
          "warning": "var(--border-warning)",
          "error": "var(--border-error)",
          "background-white": "var(--border-background-white)",
          "background-neutral": "var(--border-background-neutral)",
          "primary-light": "var(--border-primary-light)",
          "primary": "var(--border-primary)",
          "success-light": "var(--border-success-light)",
          "info-light": "var(--border-info-light)",
          "warning-light": "var(--border-warning-light)",
          "error-light": "var(--border-error-light)",
          "white-40": "var(--border-white-40)",
          "transparent-10": "var(--border-transparent-10)",
          "oncolor-transparent-30": "var(--border-oncolor-transparent-30)",
          "disabled": "var(--border-disabled)",
          "secondary": "var(--border-secondary)",
          "secondary-light": "var(--border-secondary-light)",
          "tertiary": "var(--border-tertiary)",
          "tertiary-light": "var(--border-tertiary-light)"
        },
        "icon": {
          "oncolor": "var(--icon-oncolor)",
          "default": "var(--icon-default)",
          "primary-light": "var(--icon-primary-light)",
          "primary": "var(--icon-primary)",
          "secondary-light": "var(--icon-secondary-light)",
          "tertiary-light": "var(--icon-tertiary-light)",
          "neutral-light": "var(--icon-neutral-light)",
          "neutral": "var(--icon-neutral)",
          "success-light": "var(--icon-success-light)",
          "success": "var(--icon-success)",
          "info-light": "var(--icon-info-light)",
          "info": "var(--icon-info)",
          "warning-light": "var(--icon-warning-light)",
          "warning": "var(--icon-warning)",
          "error-light": "var(--icon-error-light)",
          "error": "var(--icon-error)",
          "default-disabled": "var(--icon-default-disabled)",
          "default-oncolor-disabled": "var(--icon-default-oncolor-disabled)",
          "default-400": "var(--icon-default-400)",
          "default-500": "var(--icon-default-500)",
          "primary-400": "var(--icon-primary-400)",
          "warning-ring": "var(--icon-warning-ring)",
          "error-ring": "var(--icon-error-ring)",
          "info-ring": "var(--icon-info-ring)",
          "success-ring": "var(--icon-success-ring)",
          "neutral-ring": "var(--icon-neutral-ring)",
          "secondary": "var(--icon-secondary)",
          "tertiary": "var(--icon-tertiary)"
        }
      },
      "spacing": {
        "0": "var(--spacing-0)",
        "0.5": "var(--spacing-0-5)",
        "1": "var(--spacing-1)",
        "2": "var(--spacing-2)",
        "3": "var(--spacing-3)",
        "4": "var(--spacing-4)",
        "5": "var(--spacing-5)",
        "6": "var(--spacing-6)",
        "8": "var(--spacing-8)",
        "10": "var(--spacing-10)",
        "12": "var(--spacing-12)",
        "16": "var(--spacing-16)",
        "20": "var(--spacing-20)",
        "24": "var(--spacing-24)",
        "32": "var(--spacing-32)",
        "40": "var(--spacing-40)",
        "48": "var(--spacing-48)",
        "56": "var(--spacing-56)",
        "64": "var(--spacing-64)",
        "96": "var(--spacing-96)",
        "80": "var(--spacing-80)",
        "120": "var(--spacing-120)",
        "160": "var(--spacing-160)",
        "192": "var(--spacing-192)",
        "256": "var(--spacing-256)",
        "320": "var(--spacing-320)",
        "360": "var(--spacing-360)",
        "400": "var(--spacing-400)",
        "480": "var(--spacing-480)",
        "1.5": "var(--spacing-1-5)",
        "140": "var(--spacing-140)",
        "180": "var(--spacing-180)",
        "none": "var(--spacing-none)",
        "xxs": "var(--spacing-xxs)",
        "xs": "var(--spacing-xs)",
        "sm": "var(--spacing-sm)",
        "md": "var(--spacing-md)",
        "lg": "var(--spacing-lg)",
        "xl": "var(--spacing-xl)",
        "2xl": "var(--spacing-2xl)",
        "3xl": "var(--spacing-3xl)",
        "4xl": "var(--spacing-4xl)",
        "5xl": "var(--spacing-5xl)",
        "6xl": "var(--spacing-6xl)",
        "7xl": "var(--spacing-7xl)",
        "8xl": "var(--spacing-8xl)",
        "9xl": "var(--spacing-9xl)"
      },
      "borderRadius": {
        "none": "var(--radius-none)",
        "xs": "var(--radius-xs)",
        "sm": "var(--radius-sm)",
        "md": "var(--radius-md)",
        "lg": "var(--radius-lg)",
        "xl": "var(--radius-xl)",
        "full": "var(--radius-full)",
        "card": "var(--card-radius)"
      },
      "boxShadow": {
        "xs": "var(--shadow-xs)",
        "sm": "var(--shadow-sm)",
        "md": "var(--shadow-md)",
        "lg": "var(--shadow-lg)",
        "xl": "var(--shadow-xl)",
        "2xl": "var(--shadow-2xl)",
        "3xl": "var(--shadow-3xl)"
      },
      "fontSize": {
        "display-2xl": [
          "var(--typo-size-display-2xl)",
          {
            "lineHeight": "var(--line-heights-display-2xl)"
          }
        ],
        "display-xl": [
          "var(--typo-size-display-xl)",
          {
            "lineHeight": "var(--line-heights-display-xl)"
          }
        ],
        "display-lg": [
          "var(--typo-size-display-lg)",
          {
            "lineHeight": "var(--line-heights-display-lg)"
          }
        ],
        "display-md": [
          "var(--typo-size-display-md)",
          {
            "lineHeight": "var(--line-heights-display-md)"
          }
        ],
        "display-sm": [
          "var(--typo-size-display-sm)",
          {
            "lineHeight": "var(--line-heights-display-sm)"
          }
        ],
        "display-xs": [
          "var(--typo-size-display-xs)",
          {
            "lineHeight": "var(--line-heights-display-xs)"
          }
        ],
        "xl": [
          "var(--typo-size-text-xl)",
          {
            "lineHeight": "var(--line-heights-text-xl)"
          }
        ],
        "lg": [
          "var(--typo-size-text-lg)",
          {
            "lineHeight": "var(--line-heights-text-lg)"
          }
        ],
        "md": [
          "var(--typo-size-text-md)",
          {
            "lineHeight": "var(--line-heights-text-md)"
          }
        ],
        "sm": [
          "var(--typo-size-text-sm)",
          {
            "lineHeight": "var(--line-heights-text-sm)"
          }
        ],
        "xs": [
          "var(--typo-size-text-xs)",
          {
            "lineHeight": "var(--line-heights-text-xs)"
          }
        ],
        "2xs": [
          "var(--typo-size-text-2xs)",
          {
            "lineHeight": "var(--line-heights-text-2xs)"
          }
        ]
      },
      "fontFamily": {
        "sans": [
          "var(--font-family-text)",
          "\"IBM Plex Sans Arabic\"",
          "sans-serif"
        ],
        "display": [
          "var(--font-family-display)",
          "\"IBM Plex Sans Arabic\"",
          "sans-serif"
        ]
      },
      "maxWidth": {
        "container": "var(--container-max-width-desktop)",
        "paragraph": "var(--paragraph-max-width)"
      }
    }
  }
} satisfies Partial<Config>;
export default dgaPreset;
