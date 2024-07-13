
const {
  Document,
  HuggingFaceEmbedding,
  Ollama,
  Settings,
  VectorStoreIndex,
  SimpleDirectoryReader,
} = require("llamaindex");

Settings.llm = new Ollama({
  model: "llama3",
});

Settings.embedModel = new HuggingFaceEmbedding({
  modelType: "BAAI/bge-small-en-v1.5",
  quantized: false,
});

async function main() {
  // Load essay from abramov.txt in Node

  const path = "node_modules/llamaindex/examples/abramov.txt";
  try {
    const data = await new SimpleDirectoryReader().loadData({
      directoryPath: "Datas",
    });
    // Create Document object with essay

    const index = await VectorStoreIndex.fromDocuments(data);
    const queryEngine = index.asQueryEngine();

    // let loading = true;

    const response = await queryEngine.query({
      query: "whats the man doing?",
    });

    console.log("Query Response:", response.toString());
  } catch (error) {
    console.error("Error reading file:", error);
    return;
  }
}

main().catch(console.error);
