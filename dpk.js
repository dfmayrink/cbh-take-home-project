const crypto = require("crypto");

const createHash = (candidate) => {
  return crypto.createHash("sha3-512").update(candidate).digest("hex")
}

exports.deterministicPartitionKey = (event) => {
  if(!event) {
    return process.env.TRIVIAL_PARTITION_KEY;
  }
  const maxPartitionLength = Number.parseInt(process.env.MAX_PARTITION_KEY_LENGTH);

  //the candidate will be the partition key if present, or the whole event object if not
  let candidate = event.partitionKey && JSON.stringify(event.partitionKey);
  let hashed;

  if (!candidate) {
    hashed = createHash(JSON.stringify(event));
    if (hashed.length > maxPartitionLength) {
      hashed = createHash(hashed);
    }
    return hashed;
  } else if (candidate.length > maxPartitionLength) {
    return createHash(candidate);
  }
  return candidate;
};