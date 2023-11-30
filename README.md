# Herovah-HTML-Interpretor

Play with it [Here](https://zalorcakelord.github.io/Herovah-HTML-Interpretor/).

What is Herovah?
----------------

Herovah is a minimalist brainf\*\*\* like programming language I made to play around with!

What's special about it?
------------------------

Not much. It does have a very small amount of allowed memory, seven slots, but each slot can contain an arbitrarily large integer.

How do I use it?
----------------

The fun part! While it might seem rather complex at first, Herovah is actually pretty simple, (although I might be a bit biased on that count).

Herovah has only thirteen functioning commands in this iteration, and I only plan to add about five more to make it turing-completeish.

Those commands are as follows:

* * *

Command

Purpose (what it do)

< and >

These are pretty simple, they move left and right in memory.

\+ and -

These should be obvious, allowing you to increase or decrease the value of the current cell of memory!

. and #

These are for debugging your program, or displaying data. The '.' will push the value of the current cell of memory to output, while the # will dump the entire memory, and also show you where the pointer is! Pretty darn useful. **As of 1.5 the interpreter automatically appends one of these to the end of your code. Still useful in the center though!**

X

X will eXecute the instructions currently stored in the memory (more on that later)! How it does this will depend on the instructions.

o

This command will zero out the cell the pointer is currently on! No need for fifty minuses!

$

$ will move the pointer to the first cell of memory, while zeroing out every cell except whichever your pointer is on at the time of instruction.

{ and }

These will copy the value of the current cell of memory, to the left and the right respectively. It doesn't change the value of the current cell!

\[ and \]

These are for loops! The way this works is pretty simple. When you use the \[ symbol you mark the iterator, and whatever you do inside the brackets (once they are closed) will repeat until the iterator cell is at 0. You do not need to return to the iterator cell manually, as at the end of the loop it will automatically move back to it, but you do need to manually iterate, so it's good practice to begin your loop with `[-` The interpretor will kill a loop after 10000 iterations. [`++>+>+++++>+++++>+++++<<[->X<]`](programs.html)

* * *

Basic Details
-------------

The first thing to know about Herovah, at least in this iteration, is there are ONLY SEVEN SLOTS OF MEMORY. Of these seven, the first and second tend to be used for instructions.

A basic program to multiply 4 by 3 and display the result would look like this: `++>++++>>>>>++++<+++X.`

The first part of the program (++) increases the first slot of memory to two. This tells the code we are going to do math!

The other possible value (one) would be for displaying text. We'll get to that later.

Then we need to tell it what kind of math we are doing. For this we move over to the second slot. (>).

There are five options for math:

1: Addition
2: Subtraction
3: Division
4: Multiplication
5: Modulus

So we set the second slot to four (++++). As a reminder, our program up to this point is: `++>++++`

If we use the # command at the end of this program we will get: `2 >4< 0 0 0 0 0 pointer at 2`

Now we can move over and do the actual math! Adding `>>>>>` will move our pointer over to the seventh spot, as you can see if you throw a # on the end.

Now if you've actually read this far down you might remember we were multiplying three and four. All we have to do is add four to the current spot `++++` then we move over to the left one (<) add three (+++) run with X, and then display the result with '.'!

thus our program comes out to `++>++++>>>>>++++<+++X.`

Now for text! To be entirely honest I'm not feeling typing out a play by play for the next one, but that's okay because we have code comments!

* * *

`/hello world program: start with hello/ ++>++++>>>>>+++++<+++X}---{<<+++++<++<X}*-X /clear and add a space/ $+>++++>++++++<X+++}*-X /world/ $++>++++>>>>>++++<+++X<<+++++<++++X}+++>--}---*-X /now for exclamation mark/ $++>++++>>++++++<+++++X}o*-X`

* * *

When you use X while the first cell is set to 1 it will iterate through the last four cells, attempting to match each of them to a character.

The value for each letter/symbol is decide by it's point in the following list:

1.  "a"
2.  "b"
3.  "c"
4.  "d"
5.  "e"
6.  "f"
7.  "g"
8.  "h"
9.  "i"
10.  "j"
11.  "k"
12.  "l"
13.  "m"
14.  "n"
15.  "o"
16.  "p"
17.  "q"
18.  "r"
19.  "s"
20.  "t"
21.  "u"
22.  "v"
23.  "w"
24.  "x"
25.  "y"
26.  "z"
27.  ' '
28.  'newline'
29.  '?'
30.  '!'
31.  '<'
32.  '>'
33.  '/'
34.  '.'
35.  ','
36.  '+'
37.  '-'
38.  '\*'
39.  '='
40.  '('
41.  ')'
42.  ' " '

0 is an empty space.

If you attempt to display a character but the character code doesn't correspond to any of the above it will instead display the '�' symbol.

A few quick notes:
------------------

You _can_ have negative integers in memory.  
It's technically possible to trick it into giving you more slots of memory, but I can't promise everything will work as expected.

And that's about it! Go forth and code! Feel free to direct any suggestions towards me. Below this is the changelog, where I will detail any significant or breaking changes between interpreter/language versions.

Changelog
---------

**2.0**

1.  Language+Interpreter: Loops! Finally added a looping method to Herovah.
2.  Interpreter: Fixed bug where the dump function '#' was mutating the actual memory array (oopsy, don't know how that wasn't breaking literally everything :) )
3.  Documentation: Added loops, added example programs page with loop example.

**1.5**

1.  Language+Interpretor: Added 12 new characters, from 31(<) to 42(")
2.  Interpreter: Automatically appends the # command to the end of your code.
3.  Interpreter: Updates as you write your code now again!
4.  Interpreter: Attempting to display a character that doesn't match the built in list will now display �
5.  Documentation: Minor changes, added changelog, fixed $ description.
6.  Interpreter: Attempting to navigate to a cell higher or lower than the provided seven will cause it to wrap around to either the start or the end.
7.  Interpreter: Attempted fix for code comments (/) locking the page in an infinite loop.
8.  Interpreter: Changed the input to a resizeable textarea.
