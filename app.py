from flask import Flask, jsonify, request
from flask_cors import CORS
from src.helper import download_embeddings
from langchain_pinecone import PineconeVectorStore
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv
from src.prompt import *
import os
from pinecone import Pinecone

app = Flask(__name__)
CORS(app) 

load_dotenv()

PINECONE_API_KEY = os.environ.get("PINECONE_API_KEY")
GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")

os.environ["PINECONE_API_KEY"] = PINECONE_API_KEY
os.environ["GOOGLE_API_KEY"] = GOOGLE_API_KEY


index_name = "university-helpdesk-chatbot"

embeddings = download_embeddings()

docsearch = PineconeVectorStore.from_existing_index(
    index_name=index_name,
    embedding=embeddings
)


retriever = docsearch.as_retriever(search_type="similarity", search_kwargs={"k": 3})

llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    temperature=0.4,
    max_output_tokens=500,
)

system_prompt = (
    "You are an AI help desk assistant for the Faculty of Science, University of Kelaniya. "
    "Answer user questions using ONLY the information provided in the retrieved documents. "
    # "If the answer is not clearly stated in the documents, reply exactly with: 'I don't know.' "
    "Do not guess, do not add external knowledge, and keep answers clear and concise. "
    "When possible, mention the document source."
    "Answer concisely."
    "\n\n"
    "{context}"
)

prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system_prompt),
        ("human", "{input}"),
    ]
)

def get_answer(question: str) -> str:
    # Retrieve relevant documents
    try:
        docs = retriever.invoke(question)
    except Exception:
        # Fallback for retrievers that don't implement invoke()
        docs = retriever.get_relevant_documents(question)

    # Build context by concatenating page content
    context = "\n\n".join([d.page_content for d in docs]) if docs else ""

    # Format messages using the ChatPromptTemplate
    messages = prompt.format_messages(input=question, context=context)

    # Call the chat model
    ai_msg = llm.invoke(messages)
    return getattr(ai_msg, "content", str(ai_msg))

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "ok"}), 200

@app.route('/ask', methods=['POST'])
def ask():
    data = request.get_json()
    question = data.get("question")
    answer = get_answer(question)
    return jsonify({"answer": answer})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8081, debug=True)