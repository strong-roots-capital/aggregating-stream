# aggregating-stream [![Build status](https://travis-ci.org/strong-roots-capital/aggregating-stream.svg?branch=master)](https://travis-ci.org/strong-roots-capital/aggregating-stream) [![npm version](https://img.shields.io/npm/v/@strong-roots-capital/aggregating-stream.svg)](https://npmjs.org/package/@strong-roots-capital/aggregating-stream) [![codecov](https://codecov.io/gh/strong-roots-capital/aggregating-stream/branch/master/graph/badge.svg)](https://codecov.io/gh/strong-roots-capital/aggregating-stream)

> Transform stream that aggregates elements into larger chunks

## Install

```shell
npm install @strong-roots-capital/aggregating-stream
```

## Use

```typescript
import { aggregatingStream } from '@strong-roots-capital/aggregating-stream'

const source = new Readable({objectMode: true, read() {}})

const aggregator = aggregatingStream(2, (chunks: number[]) => Math.max(...chunks))

const sink = new Writable({
    objectMode: true,
    write(chunk: number, _: string, callback: any) {
        console.log(chunk)
        callback()
    }
})

source.pipe(aggregator).pipe(sink

;[1, 2, 3, 4, null].forEach(value => source.push(value))
//=>2,
//=>4
```
