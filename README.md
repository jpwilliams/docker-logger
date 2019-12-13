# @jpwilliams/docker-logger

Output logs of all of your Docker containers. Verbose, but sometimes useful.

``` sh
npm install --save @jpwilliams/docker-logger
```

``` sh
$ docker-logger

[great_nightingale : chentex/random-logger]     2019-12-13T16:40:21+0000 DEBUG first loop completed.
[heuristic_gates : chentex/random-logger]       2019-12-13T16:40:21+0000 ERROR something happened in this execution.
[hopeful_matsumoto : chentex/random-logger]     2019-12-13T16:40:21+0000 ERROR something happened in this execution.
[compassionate_euler : chentex/random-logger]   2019-12-13T16:40:22+0000 DEBUG first loop completed.
[hopeful_darwin : chentex/random-logger]        2019-12-13T16:40:22+0000 ERROR something happened in this execution.
[brave_herschel : chentex/random-logger]        2019-12-13T16:40:22+0000 DEBUG first loop completed.
[great_nightingale : chentex/random-logger]     2019-12-13T16:40:23+0000 ERROR something happened in this execution.
[happy_brahmagupta : chentex/random-logger]     2019-12-13T16:40:23+0000 WARN variable not in use.
[compassionate_euler : chentex/random-logger]   2019-12-13T16:40:23+0000 INFO takes the value and converts it to string.
[stupefied_hopper : chentex/random-logger]      2019-12-13T16:40:23+0000 INFO takes the value and converts it to string.
[happy_brahmagupta : chentex/random-logger]     2019-12-13T16:40:24+0000 INFO takes the value and converts it to string.
[objective_mclaren : chentex/random-logger]     2019-12-13T16:40:25+0000 DEBUG first loop completed.
[hopeful_darwin : chentex/random-logger]        2019-12-13T16:40:25+0000 INFO takes the value and converts it to string.
[charming_ptolemy : chentex/random-logger]      2019-12-13T16:40:26+0000 DEBUG first loop completed.
[hopeful_matsumoto : chentex/random-logger]     2019-12-13T16:40:26+0000 INFO takes the value and converts it to string.
```

This is a really tiny wrapper around the wonderful [mcollina/docker-loghose](https://github.com/mcollina/docker-loghose) so that I had something to get a really quick overview when running raw Docker instances.

It suports most of the major options that [mcollina/docker-loghose](https://github.com/mcollina/docker-loghose) does outside of log detaching and some advanced filtering.

``` sh
$ docker-logger --help

Usage: docker-logger [options]

Options:
  -V, --version           output the version number
  --name-label <label>    The label to use to name containers with
  --include-current       Include current container logs
  --match-image <regex>   Only include logs matching image name regexes (default: [])
  --match-name <regex>    Only include logs matching container name regexes (default: [])
  --skip-image <regex>    Exclude logs matching image name regexes (default: [])
  --skip-name <regex>     Exclude logs matching container name regexes (default: [])
  --add-labels            Enrich log events with labels set on container.
  --labels-match <regex>  Only include labels matching regexes. Assumes --add-labels. (default: [])
  -h, --help              output usage information
```
