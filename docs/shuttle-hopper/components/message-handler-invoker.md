# Message Handler Invoker

An implementation of the `IMessageHandlerInvoker` interface is used to invoke a message handler for the given message in the `HandleMessage` pipeline stage.

If you do not specify your own implementation of the `IMessageHandlerInvoker` the default `MessageHandlerInvoker` will be used.  This invoker makes use of the `IServiceProvider` to create the required message handler.

## Methods

### InvokeAsync

``` c#
ValueTask<bool> InvokeAsync(IPipelineContext<HandleMessage> pipelineContext, CancellationToken cancellationToken = default);
```

Invoke the message handler using the data contained in the given `pipelineContext`.

# MessageHandlerInvoker

Type `MessageHandlerInvoker` implements the `IMessageHandlerInvoker` interface and will attempt to find a matching delegate or implementation of the required `IMessageHandler<>` interface.

If no delegate or handler can be found `false` is returned.

The `IServiceProvider` is used to obtain a handler.
