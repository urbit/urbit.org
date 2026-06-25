---
title: Hawk499 Lesson Coach
reference_type: app-subtopic
app: "%hawk499"
app_metadata_reference: "../README.md"
related_references:
  - "../README.md"
dependencies: []
---

# Lesson-Coach Sub-Skill

Use this procedure when helping a Hoon beginner learn `%hawk499` through the bundled lessons.

## Coaching Principles

- Teach one concept at a time.
- Ask the learner to predict behavior before running code.
- Prefer small edits over long explanations.
- Debug in public: show what failed, where to look, and why.
- Do not skip over Hoon syntax that looks alien; name it and explain its job.

## Per-Lesson Flow

For each lesson:

1. **Orient**
   - State the lesson goal in one sentence.
   - Name the new concept.
   - Show the endpoint path.

2. **Predict**
   - Ask: "What do you expect this page/API to do?"
   - Ask: "Which line do you think causes that behavior?"

3. **Install**
   - Use the install script or one `curl` command.
   - If install fails, distinguish auth failure from compile failure.

4. **Observe**
   - Open `/o/learn/<lesson>`.
   - Ask what changed from the previous lesson.

5. **Modify**
   - Give one small exercise.
   - Examples: change a title, add a query param, add a form field, change patch target text.

6. **Debug**
   - If route fields are confusing, open `/hawk499/bowl`.
   - If runtime crashes, open `/hawk499/quills`.
   - If Datastar does nothing, inspect attribute spelling.

7. **Checkpoint**
   - Ask the learner to explain the concept back.
   - Move on only when they can make one modification without guessing blindly.

## Suggested Questions

### Static lessons

- What is the difference between Udon and SAIL?
- What does `respond-html:r` receive?
- What value does SAIL produce?

### Request lessons

- Where does `query.req` come from?
- What changes when the URL path has extra segments?
- Why branch on method first?

### State lessons

- Where is the counter/todo list stored?
- Is it shared across users or per-user?
- What does `!>(value)` do conceptually?

### Datastar lessons

- Which state lives in the browser?
- Which state lives on Urbit?
- What event patches which element?

### Debugging lessons

- Did the error happen at save/compile time or request/runtime time?
- Which tool shows the request object?
- Which tool shows the quill crash logs?

## Coach Response Template

Use this response shape when tutoring:

```text
Lesson: <number and name>
New idea: <one concept>
What to run: <install/open command>
What to observe: <expected behavior>
Try this: <small edit>
If it breaks: <debug path>
Checkpoint question: <question>
```
