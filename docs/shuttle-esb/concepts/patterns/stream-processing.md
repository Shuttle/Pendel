# Stream Processing

With message streaming events are produced in a continuous stream that isn't targeted at any specific consumers.  The streams are typically divided into topics and consumers can read messages from a topic.  Consumers are usually identified as a logical unit using some form of discriminator.  Topcis may also be partitioned and one would have at *most* the number of consumers as there are partitions.

The number of messages kept in the stream is determined by a retention policy and consumers may start processing messages from any point in the stream; although typically either the oldest/earliest/tail or most recent/newest/head would be used as a starting point.  Messages are, therefore, not removed once consumed but are rather removed once the retention policy determines that they are no longer required.  The policy is usually either a period or a maximum size for the stream, or a combination of period and size.  This is in contrast to a queue where a message is targeted at a particular logical endpoint and once processed the message is removed.

![Streaming Image](/images/streaming.png)