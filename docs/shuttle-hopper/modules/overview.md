# Modules

More information on the pipelines infrastructure can be obtained in the [Shuttle.Core.Pipelines](https://shuttle.github.io/shuttle-core/infrastructure/shuttle-core-pipelines.html) documentation.

Shuttle.Esb is, therefore, also extensible via modules.  These plug into a relevant pipeline to perform additional tasks within the pipeline by registering one or more observers that respond to the events raised by the pipeline.

Each pipeline has state that contains various name/value pair items.  You can add any state and there are some extensions on the state that return various well-known items such as `GetTransportMessage()` that returns the `TransportMessage` on the pipeline.  Prior to deserializing the transport message it will, of course, be `null`.

The easiest way to add a module is to create a [Hosted Service](https://learn.microsoft.com/en-us/dotnet/core/extensions/timer-service) that has a constructor dependency of type `IPipelineFactory`.  Please reference any of the existing modules to gain better insight into the implementation of a custom module.