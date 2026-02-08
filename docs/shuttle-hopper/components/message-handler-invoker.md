# Message Handler Invoker

An implementation of the `IMessageHandlerInvoker` interface is used to invoke a mesage handler for the given message in the `PipelineEvent`.

If you do not specify your own implementation of the `IMessageHandlerInvoker` the default `MessageHandlerInvoker` will be used.  This invoker makes use of the `IServiceProvider` to create the required message handler.

## Methods

### Invoke

``` c#
ValueTask<bool> InvokeAsync(IPipelineContext<OnHandleMessage> pipelineContext);
```

Invoke the message handler using the data contained in the given `PipelineEvent`.

# MessageHandlerInvoker

Type `MessageHandlerInvoker` implements the `IMessageHandlerInvoker` interface and will attempt to find a matching delegate or implementation of the required `IMessageHandler<>` interface.

If no delegate or handler can be found `false` is returned.

The `IServiceProvder` is used to obtain a handler.