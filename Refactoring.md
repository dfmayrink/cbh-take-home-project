# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

In this refactor, since I added the possibility of setting the max_partition_key_lenght, and the result 
of the hash has a length of 128, it is possible that, if we set the max value to less than 128, we hash 
the result twice.

- First improvement is to move constants to a .env file, this way we can override then if needed, and we also improve readability. For this we added the dotenv package. This also helps changing the constants during tests.
- Second change is to return the TRIVIAL_PARTITION_KEY first when there is no event, improving the readability of the remaining function
- Another improvement is to not use the candidate variable as a return of the hash and the "initial value", we're going to split into two variables
- I will also create a function for the hashing
- 
