---
title: Example tool
lang: en-US
---

# {{ $frontmatter.title }}

> **This page is a template.** Copy it, rename it, add the new file to
> `getSoftwareSidebar()` in `.vuepress/config.ts`, and overwrite the content.

Open with what the tool does and who it is for. Software pages are split into a **user guide** and a **developer guide**, so a reader who only wants to run the thing never has to read about its internals.

## User guide

### Installation

Fenced code blocks get syntax highlighting from the language tag. Shell:

```bash
git clone https://github.com/BolkanLab/example-tool.git
cd example-tool
pip install -r requirements.txt
```

### Configuration

```yaml
database:
  host: datajoint.example.princeton.edu
  port: 3306
user: your-netid
```

::: warning
Never commit credentials. Keep them in a local config file that is listed in `.gitignore`, or in an environment variable.
:::

### Running the tool

Python:

```python
from example_tool import Session

session = Session(subject="mouse_01", date="2026-01-15")
session.run()
```

MATLAB:

```matlab
session = Session('mouse_01', '2026-01-15');
session.run();
```

<figure>
  <img src='./assets/images/placeholder.svg'>
  <center><figcaption><small>Screenshots of GUIs go here — use the caption to name the control you are describing.</small></figcaption></center>
</figure>

### Output

Describe what the tool produces and where it lands.

| Field | Type | Description |
| --- | --- | --- |
| `subject` | string | Subject identifier |
| `date` | date | Session date |
| `n_trials` | int | Number of completed trials |

## Developer guide

### Repository structure

```
example-tool/
  example_tool/
    __init__.py
    session.py      # Main entry point
    io.py           # Reading and writing session files
  tests/
  requirements.txt
```

### Adding a feature

1. Branch from `master`.
2. Make the change and add a test covering it.
3. Open a pull request.

::: tip
Highlight specific lines in a code block by adding a range after the language tag, like ` ```python{2,4-6} `:

```python{2}
def run(self):
    self.validate()  # this line is highlighted
    self.process()
```
:::

::: danger
Document anything here that writes to the shared database, and say plainly what is irreversible.
:::
