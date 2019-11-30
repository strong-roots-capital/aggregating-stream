import test from 'ava'
import { Transform, Writable } from 'readable-stream'

/**
 * Library under test
 */

import { aggregatingStream } from '../src/aggregating-stream'


const transform = () => new Transform({
    objectMode: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    transform(__: any, _: string, callback: (error?: Error, data?: any) => void) {
        callback()
    }
})

/*********************************************************************
 * Test cases
 ********************************************************************/

test('should not aggregate chunks of size zero', t => {
    t.throws(() => aggregatingStream(0, () => {}))
})


test.cb('should push aggregated chunk after specified number of input chunks', t => {
    t.plan(2)

    const source = transform()
    const sink = aggregatingStream(2, (chunks: number[]) => t.is(2, chunks.length))

    source.pipe(sink)

    ;[1, 2, 3, 4, null].forEach(value => source.push(value))

    sink.on('finish', t.end)
})

test.cb('should aggregate input chunks with aggregating function', t => {

    const witnessed: number[] = []

    const source = transform()
    const sink = aggregatingStream(2, (chunks: number[]) => Math.max(...chunks))
    const witness = new Writable({
        objectMode: true,
        write(chunk: number, _: string, callback: (error?: Error | null) => void) {
            witnessed.push(chunk)
            callback()
        }
    })

    source.pipe(sink).pipe(witness)

    ;[1, 2, 3, 4, null].forEach(value => source.push(value))

    sink.on('finish', () => {
        t.deepEqual([2, 4], witnessed)
        t.end()
    })
})
