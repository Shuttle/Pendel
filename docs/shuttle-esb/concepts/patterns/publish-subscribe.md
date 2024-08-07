# Publish / Subscribe

When you `Send` a *command* shuttle needs to be able to determine the relevant endpoint.  The same applies to publishing an event.  Shuttle would need to know where to `Publish` the event to.  When sending a command there should be 1, and exactly 1, endpoint that receives the command.  When publishing, however, there can be 0 to any number of subscribers.

![Publish/Subscribe Image](/images/publish-subscribe.png)

In order to register an endpoint as a subscriber you can either manually configure the subscription store, as recommended for production, or register the subscription using the `ISubscriptionService` implementation:

``` c#
services.AddServiceBus(builder =>
{
    // using type
    builder.AddSubscription(typeof(Event1));
    builder.AddSubscription(typeof(Event2));

    // using a full type name
    builder.AddSubscription(typeof(Event1).FullName);
    builder.AddSubscription(typeof(Event2).FullName);

    // using a generic
    builder.AddSubscription<Event1>();
    builder.AddSubscription<Event2>();
});
```

In a production environment it is recommended that the subscription store be maintained manually using an elevated identity.  Even though the above configures the required subscriptions it is up to the registered `ISubscriptionService` implementation to perform the required processing and checks.

# Shuttle Configuration

All endpoints that belong to the same physical pub/sub store should connect to the same store.  

You would have a separate store for your development environment, perhaps even locally on your own machine.  You would have a separate store for your QA, UAT, and production environments.

## Publishing from a web-site

Typically you would publish events from some processing endpoint, as opposed to a web-site.

That being said, there is nothing stopping you from publishing a message from a web-site.  The idea behind publishing a message is that the message represents an event that is typically produced by some *processing* endpoint.  Since a web application should not really be processing anything but rather be *sending* commands off to a processing endpoint it would stand to reason that a web application would not typically be publishing events.

If you find yourself in a situation where it seems to make sense to publish from your web application it indicates that you need to make a design decision: either the design is not optimal, given that the web application is performing processing, *or* you are constrained in some way that prohibits the implementation of a processing endpoint, such as a shared hosting environment.
