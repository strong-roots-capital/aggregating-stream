/**
 * aggregating-stream
 * Transform stream that aggregates elements into larger chunks
 */

import ow from 'ow'
import { Transform } from 'readable-stream'


/**
 * Aggregate specified number of received values with aggregating
 * function and push the aggregated result.
 *
 * @param chunksToAggregate - number of chunks to aggregate before each push
 * @param aggregate - Function used to aggregate results into a single value
 */
export function aggregatingStream<I, O>(
    chunksToAggregate: number,
    aggregate: (chunks: I[]) => O
): Transform {

    const chunks: I[] = []

    ow(chunksToAggregate, ow.number)
    ow(chunksToAggregate, ow.number.greaterThan(0))

    return new Transform({
        objectMode: true,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        transform(chunk: I, _: string, callback: (error?: Error, data?: any) => void) {

            chunks.push(chunk)

            if (chunks.length < chunksToAggregate) {
                return callback()
            }

            this.push(aggregate(chunks))
            chunks.length = 0

            return callback()
        }
    })
}
