from dotenv import load_dotenv
import os
from typing import List
from pinecone import Pinecone, ServerlessSpec
from langchain_pinecone import PineconeVectorStore
from src.helper import load_pdf_files, filter_to_minimal_docs, text_split, download_embeddings

load_dotenv(dotenv_path=".env", override=True)

PINECONE_API_KEY = os.environ.get("PINECONE_API_KEY")
GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")

os.environ["PINECONE_API_KEY"] = PINECONE_API_KEY
os.environ["GOOGLE_API_KEY"] = GOOGLE_API_KEY

pc = Pinecone(pinecone_api_key=PINECONE_API_KEY)


index_name = "university-helpdesk-chatbot"

# Get existing index names
existing_indexes = [index.name for index in pc.list_indexes()]

if index_name not in existing_indexes:
    pc.create_index(
        name=index_name,
        dimension=384,
        metric="cosine",
        spec=ServerlessSpec(
            cloud="aws",
            region="us-east-1"
        )
    )

index = pc.Index(index_name)

extracted_data = load_pdf_files("data/")
minimal_docs = filter_to_minimal_docs(extracted_data)
text_chunk = text_split(minimal_docs)

from langchain_huggingface import HuggingFaceEmbeddings
def download_embeddings():
    """
    Download and return the HuggingFace embeddings model.
    """
    model_name = "sentence-transformers/all-MiniLM-L6-v2"
    embeddings = HuggingFaceEmbeddings(
        model_name=model_name
    )
    return embeddings
embeddings = download_embeddings()
 

docsearch = PineconeVectorStore.from_documents(
    documents=text_chunk,
    embedding=embeddings,
    index_name=index_name
)

print("✅ Upload Complete! Your index is ready. - store_index.py:60")