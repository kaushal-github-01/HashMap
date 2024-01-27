class HashMap {
  constructor(initialSize = 8) {
    this.buckets = new Array(initialSize);
    for (let i = 0; i < initialSize; i++) {
      this.buckets[i] = [];
    }
    this.size = 0;
  }

  checkLoadFactor() {
    const loadFactor = this.size / this.buckets.length;
    if (loadFactor < 0.75) {
      return;
    } else {
      this.resize(this.buckets.length * 2);
      return;
    }
  }

  resize(size) {
    const oldBuckets = this.buckets;
    this.buckets = new Array(size);
    this.size = 0;

    for (let i = 0; i < size; i++) {
      this.buckets[i] = [];
    }
    oldBuckets.forEach((bucket) => {
      bucket.forEach((node) => {
        if (node) {
          this.set(node.key, node.value);
        }
      });
    });
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    hashCode = hashCode % this.buckets.length;
    return hashCode;
  }

  set(key, value) {
    const hashValue = this.hash(key);
    const bucket = this.buckets[hashValue];

    if (bucket.length == 0) {
      bucket.push({ key, value });
      this.size++;

      this.checkLoadFactor();
    } else {
      for (const node of bucket) {
        node.value = value;
      }
    }
  }

  get(key) {
    let foundValue = null;

    this.buckets.forEach((bucket) => {
      bucket.forEach((node) => {
        if (node.key === key) {
          foundValue = node.value;
          return;
        }
      });
    });

    return foundValue;
  }

  has(key) {
    let foundValue = false;

    this.buckets.forEach((bucket) => {
      bucket.forEach((node) => {
        if (node.key === key) {
          foundValue = true;
          return;
        }
      });
    });

    return foundValue;
  }

  remove(key) {
    const hashValue = this.hash(key);
    if (this.buckets[hashValue].length === 0) {
      return false;
    } else {
      this.buckets[hashValue] = [];
      this.size--;
      return true;
    }
  }

  length() {
    return this.size;
  }

  clear() {
    for (let i = 0; i < this.buckets.length; i++) {
      this.buckets[i] = [];
    }
    return;
  }

  keys() {
    let result = [];
    this.buckets.forEach((bucket) => {
      bucket.forEach((node) => {
        result.push(node.key);
      });
    });
    return result;
  }

  values() {
    let result = [];
    this.buckets.forEach((bucket) => {
      bucket.forEach((node) => {
        result.push(node.value);
      });
    });
    return result;
  }

  entries() {
    let result = [];
    this.buckets.forEach((bucket) => {
      bucket.forEach((node) => {
        result.push([node.key, node.value]);
      });
    });
    return result;
  }
}

const myHashMap = new HashMap();
myHashMap.set("Apple", 1);
myHashMap.set("Banana", 2);
myHashMap.set("Cat", 3);
myHashMap.set("Dog", 4);
myHashMap.set("Elephant", 5);
myHashMap.set("GoldFish", 6);

console.log(myHashMap.buckets);
