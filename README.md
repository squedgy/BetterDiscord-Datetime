# Datetime Plugin

Allows the transformation of highlighted Dates, Times, and DateTimes into discord's auto localized timestamp format. Supports multiple date and/or time formats. Convert your text with the press of a button. Well, 2 buttons. No fiddling with a form.

Default binding is `Ctrl+o` the bound letter is modifiable. It was the first key I found that didn't appear to already have a binding. Feel free to request a more fitting default if it makes sense and won't clash, or just update your own binding.

Should support most formats of date/time/datetimes. Can add more if requested and makes sense. Does NOT handle relative formatting, but that's as easy as changing the final letter (after the second colon `:`) to `R`. Meaning doing the transformation `<t:1692738000:F>` -> `<t:1692738000:R>` will give relative output.

![Different dates being transformed into discord's timestamp format](resources/examples.gif)

