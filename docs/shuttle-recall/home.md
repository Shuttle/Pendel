# Shuttle.Recall

An event sourcing/projection mechanism that abstracts the storage of events.

## Why Event Sourcing?

### Overview

The basic premise of event sourcing is that we do not store only the latest state of a particular object but rather *rebuild* the state of the objects by applying each state change in the same sequence that the change occurred.

This is quite a departure from what one typically learns about storing data.  However, let's use the example of a financial account.  Each time we transact using an account the balance of the account changes.  However, we do not simply store only the balance.  We also store each transaction and the amount.  This means that we could "*lose*" the balance on an account but we would be able to determine the current balance by applying all the transactions to the balance in the order that they occurred. 

It is rather odd that we are quite happy with our traditional data storage for our everyday objects such as `Customer`, `Employee`, and `Address` where we simply store the current/latest state but we would never consider *not* storing the transactions when it comes to an account.  Accounting is a very established discipline and this is one of those cases where they got it spot on.

Event souring effectively does the same thing by storing all changes as a series of events.  However, it is not possible to get an overview of the state of the object by querying the events in the same way as we have no idea what the balance is at a particular point by simply querying some account transactions.

### CQRS

Command/Query Responsibility Segregation relates to explicitly separating the command side of things (transactional / OLTP) from the querying (read / reporting / OLAP) side of things.  This, in no way, implies that event sourcing is a requirement in order to implement CQRS, though.  However, when implementing event sourcing you are definitely going to be implementing CQRS.

### Resources

For some background you could  have a look at the following:

- [Event Sourcing FAQs](https://cqrs.nu/faq/Event%20Sourcing)
- [Event Sourcing (Martin Fowler)](http://martinfowler.com/eaaDev/EventSourcing.html)
- [Event Sourcing Pattern (Microsoft)](https://learn.microsoft.com/en-us/azure/architecture/patterns/event-sourcing)
