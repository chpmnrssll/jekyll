---
layout: post
image: backgrounds/primitive/servers.svg
title: Multithreaded Downloader
sub-title: With HTTP Range Requests
date: 2018-08-27T00:00:00.000Z
tags: Javascript Async WhatWG Streams
category: [ Article ]
---

A browser based multi-threaded downloader implemented in vanilla JavaScript. <!-- more --> Fetches parts of a file using the HTTP Range header and downloads those pieces in parallel. When the pieces have all been downloaded, the original file is re-assembled and saved in the browser's Downloads folder.

## Requirements

The downloader should fetch the file directly from the web browser without a server needed to proxy the file. The download process should not need any client software or browser plugin to be installed. It should allow for resuming an interrupted download, or at least retrying a part of the file that was interrupted.

This project will allow us to specify the number of download threads and the size of each request... so we can tune it for specific network conditions, if that is necessary.

-   Sends HTTP HEAD request to get the file info and calculate number of chunks
-   Sends HTTP GET requests with "Range: bytes=start-end" header for each chunk
-   Monitor the progress of each response stream

100% client side JavaScript, no plug-ins or proxy required

## Methods

### a[download]

-   WhatWG Web Streams
-   Memory limit
-   Blob

### StreamSaver.js

-   Uses [StreamSaver.js](https://github.com/jimmywarting/StreamSaver.js) to simplify downloading the output stream.
-   Concatenates each response stream (in order) into a final output stream
-   Cross-origin dependency (mitm.html)
-   Service worker timeout
-   WhatWG Web Streams
-   [Web Streams Polyfill](https://github.com/creatorrr/web-streams-polyfill)

### HTML5 FileSystem API

-   Uses [Bro-fs](https://github.com/vitalets/bro-fs) (HTML5 Filesystem api) to temporarily save each chunk.
-   Concatenates all chunks once complete and triggers a[download] with final file.
-   HTML5 Filesystem is marked deprecated but is still commonly in use.

## Usage

### Constructor

The Multithread constructor accepts a single object parameter:

```javascript
new MultiThread({
  url: 'http://some-url/',    // The request url
  headers: {                  // Request headers to pass-though
    'Authorization': `Bearer ${accessToken}`
  },
  fileName: 'some-file.ext',  // The final output fileName
  chunkSize: 4,               // Size of each chunk in MB
  threads: 6,                 // Number of concurrent request threads
  retries: 2,                 // Number of retry attempts
  retryDelay: 1000            // Delay before another retry attempt in ms
})
```

### Callbacks

Multithread triggers several events that you can attach callbacks to. The callbacks will be called with a single object consisting of the following keys:

-   onStart({ contentLength, chunks })
-   onFinish({})
-   onProgress({ contentLength, loaded })
-   onError({ error })

Each individual chunk will also trigger it's own events:

-   onChunkStart({ id })
-   onChunkFinish({ id })
-   onChunkProgress({ contentLength, loaded, id })
-   onChunkError({ id, error })

PromiseQueue provides concurrency by using a queue of promises. It will automatically retry a configurable amount of times before triggering either an "onFinish" or "onError" event.

## Demo

<a href="https://backblaze-b2-samples.github.io/multithreaded-downloader-js/examples/backblaze.html">
  <!-- <img class="lazyLoad tiny" :data-src="$withBase('/assets/backblazeB2.png')" alt="Backblaze B2"/> -->
  <img class="image image__thumb image--lazyload" data-src="/assets/images/logo/backblazeB2.png" alt="Backblaze B2">
</a>

<a href="https://backblaze-b2-samples.github.io/multithreaded-downloader-js/examples/googleDrive.html">
  <!-- <img class="lazyLoad tiny" :data-src="$withBase('/assets/googleDrive.jpg')" alt="Google Drive"/> -->
  <img class="image image__thumb image--lazyload" data-src="/assets/images/logo/googleDrive.jpg" alt="Google Drive">
</a>

## Source

<a href="https://github.com/Backblaze-B2-Samples/multithreaded-downloader-js">
  <img class="image image__thumb image--lazyload" data-src="/assets/images/logo/logoGithub.png" alt="Github">
</a>


## Reference

-   [Parallel chunk requests in a browser via Service Workers](https://blog.ghaiklor.com/parallel-chunk-requests-in-a-browser-via-service-workers-7be10be2b75f)
-   [Web Streams API](https://developer.mozilla.org/en-US/docs/Web/API/Streams_API)
-   [Web Streams Spec](https://streams.spec.whatwg.org/)
-   [browser-server](https://github.com/mafintosh/browser-server)
-   [fetch-retry](https://github.com/jonbern/fetch-retry)
-   [Pipes.js](http://pipes.js.org/)
