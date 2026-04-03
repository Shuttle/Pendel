# Shuttle.Core.Contract

A guard implementation that performs assertions/assumptions to prevent invalid code execution.

## Installation

```bash
dotnet add package Shuttle.Core.Contract
```

# Guard

```c#
void Against<TException>(bool condition, string message) where TException : Exception
```

Throws exception `TException` with the given `message` if the `condition` is true. If exception type `TException` does not have a constructor that accepts a `message` then an `InvalidOperationException` is thrown instead.

```c#
Guard.Against<ArgumentException>(age < 0, "Age cannot be negative");
```

---

```c#
string AgainstEmpty(string? value, [CallerArgumentExpression("value")] string? name = null)
```

Throws a `ArgumentNullException` if the given `value` is `null` or empty/whitespace; else returns the `value`.

---

```c#
Guid AgainstEmpty(Guid value, [CallerArgumentExpression("value")] string? name = null)
```

Throws an `ArgumentException` when the `value` is equal to an empty `Guid` (`{00000000-0000-0000-0000-000000000000}`); else returns the `value`.

---

```c#
IEnumerable<T> AgainstEmpty<T>(IEnumerable<T> enumerable, [CallerArgumentExpression("enumerable")] string? name = null)
```

Throws a `ArgumentNullException` if the given `enumerable` is `null`, or an `ArgumentException` if the enumerable does not contain any entries; else returns the `enumerable`.

---

```c#
T AgainstNull<T>(T? value, [CallerArgumentExpression("value")] string? name = null)
```

Throws a `ArgumentNullException` if the given `value` is `null`; else returns the `value`.

---

```c#
TEnum AgainstUndefinedEnum<TEnum>(object? value, [CallerArgumentExpression("value")] string? name = null)
```

Throws an `ArgumentNullException` if the given `value` is `null`, or an `InvalidOperationException` if the provided `value` cannot be found in the given `TEnum`; else returns the `value` as `TEnum`. Accepts both enum values and string representations.

## Usage Examples

```csharp
// Basic null checking
var name = Guard.AgainstNull(userName); // Throws ArgumentNullException if userName is null
var email = Guard.AgainstNull(userEmail, nameof(userEmail)); // Exception message includes parameter name

// String validation
var password = Guard.AgainstEmpty(userPassword); // Throws ArgumentNullException if null, empty, or whitespace
var title = Guard.AgainstEmpty(documentTitle, nameof(documentTitle)); // Includes parameter name in exception

// Collection validation
var items = Guard.AgainstEmpty(orderItems, nameof(orderItems)); // Throws if null or empty

// Custom assertions
Guard.Against<ArgumentException>(userId > 0, "User ID must be positive"); // Throws ArgumentException if condition is false

// Enum validation
var status = Guard.AgainstUndefinedEnum<OrderStatus>("Pending", nameof(status)); // Converts string to enum or throws
```

