unpaginator
===========

Auto Un Paginate Those Pesky Pages

Clone this sucker and tell chrome to load unpacked extensions on the cloned directory.

By scrolling to the bottom of a page with pagination links you will automatically be directed to the next page.

If this doesn't work, the pagination detection magic needs help.

I've only created 2 detection cases thus far, which are pagination links that share a similarity to the current uri that you are on, as well as those that contain /page/<digit> or page=<digit> in the uri.
