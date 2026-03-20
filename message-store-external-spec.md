# MessageStore External Specification

## Overview

`MessageStore` is a class that stores string messages in insertion order.
It provides a method to append one message and a method to retrieve all stored messages.

Intended use:
- Collect log-like messages in memory.
- Pass stored messages to other layers as a string array.

## Public API

### `addMessage(message: string): void`

Adds one message to the internal message sequence.

Behavior:
- Appends `message` to the end of the sequence.
- Keeps existing messages unchanged.

### `getMessages(): string[]`

Returns the stored messages as an array.

Behavior:
- Preserves insertion order.
- Returns a new array copy to protect internal state from external mutation.

## Constraints

- `message` must be of type `string`.
- `null` and `undefined` are not valid inputs.
- Empty string (`""`) is allowed.

## Error Handling

- If `addMessage` receives a non-string value, it should throw `TypeError`.
- `getMessages` does not throw under normal operation.

## Behavioral Guarantees

- Initial state: no stored messages.
- Sequence consistency: `getMessages()` reflects all successful `addMessage()` calls in order.
- Encapsulation: modifying the returned array does not affect internal stored messages.

## Non-Functional Notes

- Time complexity:
  - `addMessage`: O(1)
  - `getMessages`: O(n), where `n` is number of stored messages
- Space complexity:
  - `getMessages`: O(n) for copied output array
- Concurrency assumption:
  - Single-threaded usage context.

## Examples

```ts
class MessageStore {
  private readonly messages: string[] = [];

  addMessage(message: string): void {
    if (typeof message !== "string") {
      throw new TypeError("message must be a string");
    }
    this.messages.push(message);
  }

  getMessages(): string[] {
    return [...this.messages];
  }
}

const store = new MessageStore();
store.addMessage("hello");
store.addMessage("world");

const items = store.getMessages(); // ["hello", "world"]
```

