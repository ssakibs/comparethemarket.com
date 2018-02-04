const isPrime = (num) => {
  let prime = num > 1;
  for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
    if (num % i === 0) prime = false;
  }
  return prime;
};

const processResult = (result) => {
  for (const [key, value] of Object.entries(result)) {
    console.log(`${key} : ${value} --> ${isPrime(value) ? 'Prime number' : 'not a Prime number'}`);
  }
};

module.exports = { isPrime, processResult };
