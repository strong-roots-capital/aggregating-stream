
aggregating-stream [![Build status](https://travis-ci.org/strong-roots-capital/aggregating-stream.svg?branch=master)](https://travis-ci.org/strong-roots-capital/aggregating-stream) [![npm version](https://img.shields.io/npm/v/@strong-roots-capital/aggregating-stream.svg)](https://npmjs.org/package/@strong-roots-capital/aggregating-stream) [![codecov](https://codecov.io/gh/strong-roots-capital/aggregating-stream/branch/master/graph/badge.svg)](https://codecov.io/gh/strong-roots-capital/aggregating-stream)
=============================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================

> Transform stream that aggregates elements into larger chunks

Install
-------

```shell
npm install @strong-roots-capital/aggregating-stream
```

Use
---

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

## Index

### Functions

* [aggregatingStream](#aggregatingstream)

---

## Functions

<a id="aggregatingstream"></a>

###  aggregatingStream

▸ **aggregatingStream**<`I`,`O`>(chunksToAggregate: *`number`*, aggregate: *`function`*): `Transform`

*Defined in [aggregating-stream.ts:17](https://github.com/strong-roots-capital/aggregating-stream/blob/2f09f85/src/aggregating-stream.ts#L17)*

Aggregate specified number of received values with aggregating function and push the aggregated result.

**Type parameters:**

#### I 
#### O 
**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| chunksToAggregate | `number` |  number of chunks to aggregate before each push |
| aggregate | `function` |  Function used to aggregate results into a single value |

**Returns:** `Transform`

___

