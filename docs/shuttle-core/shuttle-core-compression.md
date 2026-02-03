# Shuttle.Core.Compression

Provides a compression adapter through the `ICompressionAlgorithm` interface.

Implementations available in this package:

- `DeflateCompressionAlgorithm` (name: "Deflate")
- `GZipCompressionAlgorithm` (name: "GZip")
- `NullCompressionAlgorithm` (name: "null")

There is also an `ICompressionService` that acts as a central container for all registered `ICompressionAlgorithm` implementations.

## Installation

```bash
dotnet add package Shuttle.Core.Compression
```

## Algorithm Names

When retrieving algorithms from the service, use these exact names:

- `"GZip"` - For GZip compression
- `"Deflate"` - For Deflate compression  
- `"null"` - For null/pass-through compression (useful for testing scenarios or when compression needs to be disabled)

## Configuration

In order to add compression:

```c#
services.AddCompression();
```

This will try to add the `CompressionService` singleton.

In order to add specific compression algorithms use the relevant builder calls:

```c#
services.AddCompression(builder => {
	builder.AddGZip();
	builder.AddDeflate();
	builder.AddNull();
});
```

> Note: The `AddGZip()`, `AddDeflate()`, and `AddNull()` methods are provided as extension methods from separate files.

## Usage

The `ICompressionService` can be injected into any class that requires compression services:

### Using Byte Arrays

```c#
var algorithm = compressionService.Get("algorithm-name");
var compressed = await algorithm.CompressAsync(Encoding.UTF8.GetBytes("some data"));
var decompressed = await algorithm.DecompressAsync(compressed);
```

### Using Streams

Convenient extension methods are available for working with streams:

```c#
using var inputStream = new MemoryStream(Encoding.UTF8.GetBytes("some data"));
await using var compressedStream = await algorithm.CompressAsync(inputStream);
await using var decompressedStream = await algorithm.DecompressAsync(compressedStream);

using var reader = new StreamReader(decompressedStream);
var result = await reader.ReadToEndAsync();
```

## Performance Considerations

The compression algorithms use a `MemoryStreamCache` manager to optimize memory allocation and reduce garbage collection pressure. This cached memory pool improves performance for frequent compression/decompression operations.
