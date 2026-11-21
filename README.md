# Aarushi & Hari — wedding website

A static React travel journal. Open through an HTTP server because the JSX scripts are fetched by Babel in the browser.

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Visit http://127.0.0.1:4173/. No build step is required. React, Babel, and fonts currently load from their existing CDN sources.

## RSVP

The site embeds a published, four-question Google Form: guest name, email, attendance, and party size. No Google sign-in is required, email format is validated, and replies are linked to a private Google Sheet. Response summaries are not shared with guests.

- [Guest form](https://docs.google.com/forms/d/e/1FAIpQLSdzJIhOR29E_9nI58E2w3MI1Mn7yTtnQa-3q1mzpaoQ9lSwxA/viewform)
- [Edit the form](https://docs.google.com/forms/d/1FwJuIxg2Vbt-2diEUo3mYmvri98T_DtEkgeQz6gmFOk/edit)
- [Response spreadsheet](https://docs.google.com/spreadsheets/d/1f42XYc_kc07Ktd_LLMqWKxEwBnCZdSQ4KDy8nRDF_sU/edit)

The Google account that created these resources owns them. The response spreadsheet stays private. Only the published guest form URL appears in application code. Edit questions in Google Forms; if questions are added, check the iframe height in `styles.css` on a small phone.

## Music

Song buttons play real, licensed Apple Music previews (about 30 seconds) through a single native audio player, with play/pause, progress, volume, and error handling. Each row also links to a verified YouTube release for the full song. Full tracks are not hosted in this repository. YouTube refused embedded playback during browser QA, so the full tracks open on YouTube.

The original “Jasmine Flower — A.R. Rahman” entry could not be matched to an official release. It is omitted from the active playlist pending a correct title or link, rather than pointing to an unrelated recording.

The active song data is in `scenes/Playlist.jsx`. `assets/songs.json` records the verified Apple catalogue IDs/preview URLs used for QA. If a preview URL is withdrawn, refresh it with Apple's iTunes Lookup API using the ID from its Apple Music link. The UI offers the full-song link if audio fails.

## Responsive behavior

The same scroll-driven, pinned sequences run on desktop and mobile: the Bumble/Hinge match, Toronto skyline and polaroids, flight path, Two States split panels and comparisons, and Dehradun sunrise, mountains, and photos. A viewport-fit canvas and compact layouts keep the compositions inside narrow/short screens without disabling animation. Countdown cards use a two-by-two grid on phones. The countdown is anchored to Indian Standard Time.

Destination photographs are local optimized WebP files; see [photo credits](assets/CREDITS.md).


## Scroll performance regression checks

Run the dependency-free Node checks with:

```sh
node --test tests/scroll-runtime.test.cjs
```

The tests cover Safari URL-bar height changes, elastic overscroll, coalescing scroll events into one animation-frame update, cached scene geometry, reverse scrolling, and cleanup. Browser QA also checks all five pinned scenes in WebKit with an iPhone-sized viewport, Android-sized Chromium, and desktop Chromium.

Scroll geometry uses the scenes’ stable `100svh` height. Layout is remeasured after resize, font loading, and observed size changes, rather than on every scroll event. Heavy static skyline/mountain artwork is memoized, and the sunrise uses static gradient layers plus opacity and transform animation.
