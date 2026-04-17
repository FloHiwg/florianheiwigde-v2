# Public-Data RAG Reframing Todo

This checklist tracks what still needs to change before the kickoff article and linked explorer fully reflect the new framing:

- legal is an example domain, not the core point of the article
- the use case is shifting away from a tenant-law-style example
- the target workflow is legal professionals doing research
- the first concrete legal area will be added later once the updated experiments are finalized

## Kickoff Article

File: [public-data-rag-experiment-kickoff.md](/Users/flohiwg/dev/0_private/projects/florianheiwigde-v2/content/projects/experiments/public-data-rag-experiment-kickoff.md)

- Update the demo CTA title so it no longer promises a generic "Legal RAG chat explorer" and instead signals a professional legal research replay or retrieval explorer.
- Update the CTA copy once the explorer question changes, so it matches the new professional-research example instead of the current placeholder.
- Rework the evaluation section so it no longer leans so heavily on "legal Q&A" wording and instead describes research tasks, research questions, and source-grounded professional workflows.
- Done: no disclaimer is needed near the results section because the benchmark, experiment grid, and explorer are now updated.
- Decide whether to keep the current GerLayQA result table as an interim benchmark or relabel it more carefully as a current baseline benchmark rather than implying it already matches the final target workflow.

## Linked Explorer

File: [_drafts/legal-rag-chat-explorer/index.html](/Users/flohiwg/dev/0_private/projects/florianheiwigde-v2/_drafts/legal-rag-chat-explorer/index.html)

- Replace the current saved question, which is still termination / tenant-law flavored, with a professional legal research prompt.
- Update the page title, meta description, hero copy, and conversation intro so they describe a saved legal research workflow instead of one saved legal question.
- Replace all tenant-law / rental / landlord source material in the replay payload with sources from the new professional domain once chosen.
- Rewrite the answer texts in all four modes so they sound like research assistance for a legal professional, not end-user guidance.
- Update the diagnostic copy in the "What Changed In This Mode" logic so it talks about research quality, authority, source reliability, and reranking opportunities rather than this single tenancy example.
- Revisit the noisy-source heuristic once the corpus changes, because the current explanations are tuned to the existing dataset and failure pattern.
- Rename `session_id` and any visible labels that still encode the old example.

## Cross-Article Follow-Up

File: [adding-german-court-judgments-to-my-public-data-rag-system.md](/Users/flohiwg/dev/0_private/projects/florianheiwigde-v2/content/projects/experiments/adding-german-court-judgments-to-my-public-data-rag-system.md)

- Update references to "harder legal questions" and "better legal QA system" so they align with the new professional legal research framing.
- Make sure the follow-up article does not assume the old example domain once the kickoff article has been generalized.

## Decisions To Make

- Decide whether the explorer should stay visible as an interim placeholder with a disclaimer or be hidden until the professional-research replay is ready.
- Decide whether the first concrete legal area will appear in the explorer first or in both article and explorer at the same time.
- Decide whether GerLayQA remains the benchmark name in public copy or whether it should be labeled more abstractly until the new experiment setup is in place.

## Public References To Research And Potentially Add To The Article

The goal of this section is to make it obvious that the techniques used in the project are not proprietary tricks. They are public, documented, and already used across research and production RAG systems.

### Core RAG Framing

- [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://papers.nips.cc/paper/2020/hash/6b493230205f780e1bc26945df7481e5-Abstract.html)
  - Use this as the canonical citation for the RAG pattern itself.
  - Good fit for the introduction or the retrieval / evaluation framing.
- [Retrieval-augmented generation (RAG) in Azure AI Search](https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview)
  - Good product-facing source to show that RAG is a standard production pattern, not just an academic idea.
  - Especially useful if you want one reference that summarizes query understanding, chunking, hybrid retrieval, and grounding tradeoffs in one place.

### Hybrid Retrieval, BM25, And Fusion

- [Hybrid search | Elastic Docs](https://www.elastic.co/docs/solutions/search/hybrid-search/)
  - Good reference for the idea that lexical and semantic retrieval are commonly combined in production systems.
  - Useful when explaining why BM25 + vector is a practical compromise.
- [Reciprocal rank fusion | Elastic Docs](https://www.elastic.co/docs/reference/elasticsearch/rest-apis/reciprocal-rank-fusion)
  - Good citation if you want to explain one standard public technique for combining result lists from different retrievers.
  - Even if your implementation is not exactly RRF, this is a strong public reference for fusion-style retrieval pipelines.
- [A Comprehensive Hybrid Search Guide | Elastic](https://www.elastic.co/what-is/hybrid-search)
  - More article-like and easier to cite in a portfolio piece than raw API docs.
  - Useful for explaining the market-standard intuition behind lexical search, vector search, and fusion.
- Suggested extra source to research: the original Okapi BM25 / Robertson-Spärck Jones literature.
  - Add this if you want a more academic citation for BM25 itself rather than relying only on vendor docs.

### Reranking

- [Retrieve & Re-Rank | Sentence Transformers](https://www.sbert.net/examples/applications/retrieve_rerank/README.html)
  - Strong public reference for two-stage retrieval: retrieve a broad candidate set first, then rerank with a stronger model.
  - Very relevant to your todo item about exploring reranking.
- [SentenceTransformers Documentation](https://sbert.net/)
  - Good umbrella source for embedding models, sparse encoders, and rerankers all in one public ecosystem.
- [Semantic ranking in Azure AI Search](https://learn.microsoft.com/en-us/azure/search/semantic-ranking)
  - Good production reference for L2 reranking on top of BM25 or hybrid candidate sets.
  - Useful if you want to show that reranking is a standard market technique in commercial retrieval stacks.
- [An Overview of Cohere's Rerank Model](https://docs.cohere.com/v1/docs/rerank-overview)
  - Useful as another production-facing example that reranking is a public, productized capability.
- Suggested extra source to research: cross-encoder reranker benchmarks or MS MARCO reranking references.
  - Add one academic citation here if you want a stronger research anchor for reranking quality improvements.

### Chunking And Document Structuring

- [RAG chunking phase | Microsoft Learn](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/rag/rag-chunking-phase)
  - Strong reference for why chunking matters, what can go wrong, and why chunk strategy affects recall and precision.
- [Chunk large documents for RAG and vector search in Azure AI Search](https://learn.microsoft.com/en-us/azure/search/vector-search-how-to-chunk-documents)
  - Good overview of fixed-size, semantic, and mixed chunking strategies in a production context.
- [Chunk and vectorize by document layout or structure](https://learn.microsoft.com/en-us/azure/search/search-how-to-semantic-chunking)
  - Useful if you want to support the argument that structure-aware chunking is a known public technique, especially for long or semi-structured documents.
- [RecursiveCharacterTextSplitter API](https://api.python.langchain.com/en/latest/text_splitters/character/langchain_text_splitters.character.RecursiveCharacterTextSplitter.html)
  - Useful as a public reference for simpler baseline chunking approaches.
- Suggested extra source to research: LangChain semantic chunker examples, or spaCy / NLP-based sentence segmentation references.
  - Add this if you want to contrast naive chunking with more structure-aware or semantic chunking.

### Data Pipeline And Medallion Architecture

- [What is the medallion lakehouse architecture? | Databricks](https://docs.databricks.com/gcp/en/lakehouse/medallion.html)
  - Best public reference for your Bronze / Silver framing.
  - This helps show that the layered pipeline design is an established public data-engineering pattern.
- [Build an unstructured data pipeline for RAG | Azure Databricks](https://learn.microsoft.com/en-us/azure/databricks/generative-ai/tutorials/ai-cookbook/quality-data-pipeline-rag)
  - Useful because it connects RAG-specific pipeline concerns with production data engineering.
  - Good support for the idea that ingestion, chunking, metadata, and quality control are core engineering work in RAG.

### Evaluation And Benchmarking

- [LangSmith Evaluation](https://docs.langchain.com/langsmith/evaluation)
  - Best general reference for explaining why evaluation is part of the system, not a post-hoc presentation layer.
- [Evaluation concepts | LangSmith](https://docs.langchain.com/langsmith/evaluation-concepts)
  - Good support for the article’s emphasis on offline evaluation, datasets, evaluators, and iterative improvement loops.
- [Evaluation types | LangSmith](https://docs.langchain.com/langsmith/evaluation-types)
  - Useful if you want to distinguish benchmark-style offline evaluation from production / online monitoring.
- Suggested extra source to research: public IR metrics references for MRR, NDCG, precision@k, recall@k, or answer-grounding evaluation.
  - Add this if the article becomes more technical on retrieval measurement.

### Suggested Article Additions

- Add a short "Techniques Used" or "Why These Techniques Are Not Novel" paragraph that explicitly states the stack is assembled from public, market-standard RAG building blocks.
- Add 3-6 inline references directly in the relevant sections instead of one long bibliography only at the end.
- Add one short sentence in the reranking section saying that reranking is already a standard second-stage retrieval technique in production search systems.
- Add one short sentence in the Bronze / Silver section that the medallion-style layering comes from established data engineering practice.
- Add one short sentence in the evaluation section that dataset-based offline evaluation and trace inspection are standard development practices for LLM systems.

### Optional Extras To Research Later

- Public references for metadata-aware retrieval and citation extraction.
- Public references for legal-document structure parsing or judgment segmentation.
- Public references for query rewriting, decomposition, or multi-stage retrieval.
- Public references for grounded answer generation and citation display UX.

## Recommended Shortlist To Actually Cite

If the article should stay readable, this is probably enough. The idea is to cite a small set of strong public references that together show the stack is built from established techniques rather than hidden or proprietary methods.

### 1. Core RAG Pattern

- [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://papers.nips.cc/paper/2020/hash/6b493230205f780e1bc26945df7481e5-Abstract.html)
  - Why include it: this is the strongest single citation for the RAG concept itself.
  - Where to use it: introduction or the first explanation of the end-to-end RAG setup.

### 2. Production RAG Framing

- [Retrieval-augmented generation (RAG) in Azure AI Search](https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview)
  - Why include it: shows that RAG is already a standard production architecture, not just an academic paper pattern.
  - Where to use it: intro, retrieval section, or a short “these are established market techniques” note.

### 3. Hybrid Retrieval

- [Hybrid search | Elastic Docs](https://www.elastic.co/docs/solutions/search/hybrid-search/)
  - Why include it: strong public evidence that combining lexical and semantic retrieval is a standard production approach.
  - Where to use it: retrieval section when explaining BM25 + vector + hybrid.

### 4. Reranking

- [Retrieve & Re-Rank | Sentence Transformers](https://www.sbert.net/examples/applications/retrieve_rerank/README.html)
  - Why include it: probably the cleanest public reference for two-stage retrieval and reranking.
  - Where to use it: reranking todo / next steps section.

### 5. Chunking

- [RAG chunking phase | Microsoft Learn](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/rag/rag-chunking-phase)
  - Why include it: concise public explanation of why chunking strategy matters and how it affects retrieval quality.
  - Where to use it: Silver section or chunking discussion.

### 6. Medallion / Layered Data Pipeline

- [What is the medallion lakehouse architecture? | Databricks](https://docs.databricks.com/gcp/en/lakehouse/medallion.html)
  - Why include it: anchors the Bronze / Silver framing in a widely used public data-engineering pattern.
  - Where to use it: intro to the layered pipeline or Bronze / Silver section.

### 7. Evaluation

- [LangSmith Evaluation](https://docs.langchain.com/langsmith/evaluation)
  - Why include it: supports the claim that repeatable evaluation and trace inspection are part of modern LLM development workflows.
  - Where to use it: evaluation section.

### 8. Optional Extra If You Want One More Production Citation

- [Semantic ranking in Azure AI Search](https://learn.microsoft.com/en-us/azure/search/semantic-ranking)
  - Why include it: strong public support for reranking as a common second-stage retrieval technique in production systems.
  - Where to use it: retrieval or future work section.

## Suggested Minimal Citation Pack

If you want the most compact useful version, use these six:

- [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://papers.nips.cc/paper/2020/hash/6b493230205f780e1bc26945df7481e5-Abstract.html)
- [Retrieval-augmented generation (RAG) in Azure AI Search](https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview)
- [Hybrid search | Elastic Docs](https://www.elastic.co/docs/solutions/search/hybrid-search/)
- [Retrieve & Re-Rank | Sentence Transformers](https://www.sbert.net/examples/applications/retrieve_rerank/README.html)
- [RAG chunking phase | Microsoft Learn](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/rag/rag-chunking-phase)
- [What is the medallion lakehouse architecture? | Databricks](https://docs.databricks.com/gcp/en/lakehouse/medallion.html)

## Suggested Placement In The Article

- Introduction:
  cite the RAG paper and one production RAG overview.
- Bronze / Silver:
  cite medallion architecture and one chunking reference.
- Retrieval:
  cite hybrid retrieval and optionally reranking.
- Evaluation:
  cite LangSmith evaluation if you explicitly talk about trace-based inspection and repeatable experiments.
