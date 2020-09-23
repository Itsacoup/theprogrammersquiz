# theprogrammersquiz
A quiz about javascript using javascript

deployed link
https://itsacoup.github.io/theprogrammersquiz/

My quiz. A couple potential bugs I noticed might be that the each loop that appends the high scores only selects storage items 1-5. All though before they are appended the 5 are sorted highest to lowest, it would execlude any potential high scores saved past 5. This could be solved by parse out all scores stored in local storage and sort them and then only appending the top 5, but I ran out of time. Working with local storage is difficult and so was this homework for my current level. Another issue is that it isn't appropriately responsive at the mobile viewport. Comments in code should make the logic concise.