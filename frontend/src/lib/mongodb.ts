import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || '';
const options = { maxPoolSize: 10 }; // 連線池大小

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global { // 定義全域變數以避免熱重載時建立多個連線
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// 單例模式： 建立新的 MongoClient 連線
if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options); // 建立 MongoClient 實例
    global._mongoClientPromise = client.connect(); 
}

// 使用全域的 MongoClient 連線
clientPromise = global._mongoClientPromise;
export default clientPromise;