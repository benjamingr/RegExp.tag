# RegExp.tag
A template string based alternative to or an addition for the [RegExp.escape proposal](https://github.com/benjamingr/RexExp.escape). Inspired by the discussion [here](https://github.com/benjamingr/RexExp.escape/issues/4) and [on this issue](https://esdiscuss.org/topic/regexp-escape). 

## Status

This proposal is a [stage 0 (strawman) proposal](https://docs.google.com/document/d/1QbEE0BsO4lvl7NFTn5WXWeiEIBfaVUF7Dk0hpPpPDzU/edit#) and is awaiting specification, implementation and input.

## Motivation

See [this issue](https://esdiscuss.org/topic/regexp-escape). It is often the case when we want to build a regular expression out of a string without treating special characters from the string as special regular expression tokens. For example if we want to replace all occurrences of the the string `Hello.` which we got from the user we might be tempted to do `ourLongText.replace(new RegExp(text, "g"))` but this would match `.` against any character rather than a dot.

This is a fairly common use in regular expressions and standardizing it would be useful. 

In other languages there is a way to escape a literal through a tool similar to [the RegExp.escape](https://github.com/benjamingr/RexExp.escape) proposal: 

 - Perl: quotemeta(str) - see [the docs](http://perldoc.perl.org/functions/quotemeta.html)
 - PHP: preg_quote(str) - see [the docs](http://php.net/manual/en/function.preg-quote.php)
 - Python: re.escape(str) - see [the docs](https://docs.python.org/2/library/re.html#re.escape)
 - Ruby: Regexp.escape(str) - see [the docs](http://ruby-doc.org/core-2.2.0/Regexp.html#method-c-escape)
 - Java: Pattern.quote(str) - see [the docs](http://docs.oracle.com/javase/7/docs/api/java/util/regex/Pattern.html#quote(java.lang.String))
 - C#, VB.NET: Regex.Escape(str) - see [the docs](https://msdn.microsoft.com/en-us/library/system.text.regularexpressions.regex.escape(v=vs.110).aspx)

Note that the languages differ in what they do - (perl does something different from C#) but they all have the same goal. 
Most of these languages have template strings but most of them don't have _tagged_ template strings like in ES which enable the syntax and solution format this solution uses.


## Proposed Solution

We propose the addition of an `RegExp.tag` function, such that strings can be escaped in order to be used inside regular expressions:

```js
var str = prompt("Please enter a string");
let re = RegExp.tag()`${str}.*${str}A`;
alert(re.test(str)); // check if the string matches against the string twice with A following the second time
```

There is an alternative proposal [here about a RegExp.escape](https://github.com/benjamingr/RexExp.escape) function. Similar to that proposal this one uses the spec's `SyntaxCharacter` list of characters so updates are in sync with the specificaiton instead of specifying the characters escaped manually. This is unlike earlier proposals.

##Cross-Cutting Concerns

The list of escaped identifiers should be kept in sync with what the regular expressions grammar considers to be syntax characters that need escaping - for this reason instead of hard-coding the list of escaped characters we escape characters that are recognized as a `SyntaxCharacter`s by the engine. For example, if regex comments are ever added to the specification (presumably under a flag) - this ensures they are properly escaped.
