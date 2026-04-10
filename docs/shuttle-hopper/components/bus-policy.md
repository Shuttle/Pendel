# Bus Policy

An implementation of the `IBusPolicy` interface is used to evaluate failures and determine whether the failure should be retried.

## Methods

### EvaluateMessageHandlingFailure

``` c#
MessageFailureAction EvaluateMessageHandlingFailure(IPipelineContext<PipelineFailed> pipelineContext);
```

### EvaluateOutboxFailure

``` c#
MessageFailureAction EvaluateOutboxFailure(IPipelineContext<PipelineFailed> pipelineContext);
```
