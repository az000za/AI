module.exports = class OpenAI {
    constructor(apiKey) {
      this.apiKey = apiKey;
      this.baseUrl = "https://api.openai.com/v1";
    }
  
    // Function to send a request to OpenAI API
    async sendRequest(prompt, endpoint, method = "POST") {
      const response = await fetch(`${this.baseUrl}/${endpoint}`, {
        method,
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });
      const data = await response.json();
      return data;
    }
  
    // Supported OpenAI methods
    methods = {
      // Text-generation
      completions: async (prompt) => this.sendRequest(prompt, "completions"),
      // Text-editing
      edits: async (prompt) => this.sendRequest(prompt, "edits"),
      // Embeddings
      embeddings: async (prompt) => this.sendRequest(prompt, "embeddings", "GET"),
      // Fine-tune
      fine_tunes: async (prompt) => this.sendRequest(prompt, "fine-tunes"),
      // Classifications
      classifications: async (prompt) => this.sendRequest(prompt, "classifications"),
      // Answers
      answers: async (prompt) => this.sendRequest(prompt, "answers"),
      // Search
      search: async (prompt) => this.sendRequest(prompt, "search"),
    };
  
    // Use a method dynamically
    async callMethod(methodName, prompt) {
      if (this.methods[methodName]) {
        return await this.methods[methodName](prompt);
      } else {
        throw new Error(`Unknown OpenAI method: ${methodName}`);
      }
    }
  }