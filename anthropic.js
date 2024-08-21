import { config } from "dotenv";
config();
import {
  Anthropic,
  Document,
  VectorStoreIndex,
  Settings,
  SimpleDirectoryReader,
  HuggingFaceEmbedding,
} from "llamaindex";

Settings.llm = new Anthropic({
  apiKey: "",
});

Settings.embedModel = new HuggingFaceEmbedding({
  modelType: "BAAI/bge-small-en-v1.5",
  quantized: false,
});

async function main() {
  const data = await new SimpleDirectoryReader().loadData({
    directoryPath: "Datas",
  });
  // Create Document object with essay

  const index = await VectorStoreIndex.fromDocuments(data);

  // Create a query engine
  const queryEngine = index.asQueryEngine({});

  const query = "What is the meaning of life?";

  // Query

  console.log(query);
  const response = await queryEngine.query({
    query,
  });

  // Log the response
  console.log(response.response);
}

main().catch(console.error);
