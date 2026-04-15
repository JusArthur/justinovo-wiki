- Define research task workflows: [karpathy/autoresearch](https://github.com/karpathy/autoresearch)
- Provide optimization engine: [meta-harness](https://github.com/stanford-iris-lab/meta-harness-tbench2-artifact)

# Harness for Automated Research
It runs, but how do we design automated evaluation functions? **Choose the right task (with clear metrics) + control the experiment scale**

Meta-Harness is essentially a **framework of "optimization execution frameworks"**, migrated to automated research:
- The loop structure of Meta-Harness (Proposal → Evaluation → Record → Iteration) **naturally fits the research workflow**.
- The paper already covers three types of tasks (classification/reasoning/coding), showing the framework itself does not depend on a specific domain.

### Searchable Harness Objects
In research scenarios, optimizable frameworks include:

| Optimizable Object | Example |
| --- | --- |
| Experimental Prompt Design | How to make the model generate hypotheses, analyze data |
| Data Preprocessing Pipeline | Cleaning strategies, feature selection logic |
| Evaluation Metric Selection | What standard to use to judge experiment "success" |
| Tool Invocation Strategy | When to retrieve literature, when to run code |
| Result Reporting Format | How to output structured conclusions |

***

### Automated Evaluation Signals
The "goodness" of a research task is hard to measure with a single number
→ Text classification has accuracy
→ Math has right or wrong
→ Who scores the "value" of a research discovery?

### Challenges
| Challenge | Description |
| --- | --- |
| **Long Experiment Cycles** | Running one experiment might take hours, high iteration cost |
| **Dataset Diversity** | Data formats across fields differ greatly, hard to unify |
| **Result Reproducibility** | High randomness, identical framework might yield different results |
| **Hallucination Risks** | LLM might generate plausible but incorrect research conclusions |

***

## Implementation
```text
Step 1: Select a research sub-task with clear metrics
        Example: Literature review quality score / Code experiment accuracy

Step 2: Build a small-scale dataset (50~200 tasks)
        Serve as search set + holdout test set

Step 3: Define quantifiable evaluation functions
        This is the key to success or failure

Step 4: Integrate Claude Code as Proposer
        Read historical execution logs, propose new experimental frameworks

Step 5: Run 10~20 iterations on a small scale to verify feasibility