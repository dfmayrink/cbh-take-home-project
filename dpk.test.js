const { deterministicPartitionKey } = require("./dpk");

beforeEach(() => {
  require('dotenv').config()
})

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Return the partition key when its length is less than MAX_PARTITION_KEY_LENGTH", () => {
    process.env.MAX_PARTITION_KEY_LENGTH = 10
    const trivialKey = deterministicPartitionKey({partitionKey: 20});
    expect(trivialKey).toBe("20");
  })

  it("Return the hashed key when its length is less than MAX_PARTITION_KEY_LENGTH", () => {
    process.env.MAX_PARTITION_KEY_LENGTH = 10
    const trivialKey = deterministicPartitionKey({partitionKey: 0x4824f7e8a2c34b3242});
    expect(trivialKey).toBe("a5f1a6138f27d282956fef4c1591fd96054b749358a4ea367cfc1b39dba0c641cb6ad75363e05956e921f10f89338b9589a93da8976fdf4aca70cf65bed3f2fe");
  })

  it("Return the hashed key when the event object does no contain the partitionKey property", () => {
    process.env.MAX_PARTITION_KEY_LENGTH = 256
    const trivialKey = deterministicPartitionKey({randomData: 0x4824f7e8a2c34b3242});
    expect(trivialKey).toBe("5c61f5b466314568d96d25663d8534419f63004078fb4650ff5d3c17b1e1321b466b4904d55eef8fa1524a3679ecf9cc747ff390f371e5d6197e1acff40fb1e6");
  })

  it("Return the hashed key twice when the event object does no contain the partitionKey property, and the result of the first " +
      "hash is bigger than the MAX_PARTITION_KEY_LENGTH", () => {
    process.env.MAX_PARTITION_KEY_LENGTH = 100
    const trivialKey = deterministicPartitionKey({randomData: 0x4824f7e8a2c34b3242});
    expect(trivialKey).toBe("f40c968bdad9a9b8644ccc5be01ac676855b9d98ad31e1c08ee9d34f4ba53245908aeaa8365e2ea39df3e4d5c5531d386535416d739e1921fe965470c9180b8a");
  })

});
