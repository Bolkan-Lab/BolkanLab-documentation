---
title: Contributing to ViRMEn
lang: en-US
---

# {{ $frontmatter.title }}

All changes to ViRMEn (new tasks, bug fixes, new rig code) go through a **pull request (PR)**. Nobody pushes directly to the `main` branch, because rigs run the code in `main` and an untested change can stop a training session.

## One-time setup

+ Ask the repository administrators to give your GitHub account **Write** access to <a href="https://github.com/Bolkan-Lab/ViRMEn">Bolkan-Lab/ViRMEn</a>. With Write access you can create branches directly in the repository, so you do **not** need to fork it.
+ Clone the repository (or use the existing clone in ```C:\Experiments\ViRMEn``` if you are working on a rig computer).
+ Make sure the git hooks are installed. Running `install_virmen.m` copies them automatically. To install them by hand, copy the files from the `git-hooks` folder into `.git\hooks`. One of them, **pre-push**, stops you from pushing to `main` by mistake.

## Step-by-step workflow

 1. **Start from an up-to-date `main`:**
    ```
    git checkout main
    git pull
    ```
 2. **Create a branch** for your change, with a short descriptive name, e.g. `feature/<task_name>` for new functionality or `fix/<what_you_fixed>` for bug fixes:
    ```
    git checkout -b feature/my_new_task
    ```
 3. **Make your changes and commit them** with clear messages that say what changed and why:
    ```
    git add <files you changed>
    git commit -m "Add my_new_task experiment, protocol and world files"
    ```
    + Add only the files you changed (avoid `git add .`).
    + Do **not** commit data files, behavior logs, compiled binaries (e.g. `.mex*`) or passwords.
 4. **Test your change on a rig** (or in simulation mode, see [Make the code simulation-ready](./virmen_guide.md#make-the-code-simulation-ready)) before asking for a review.
 5. **Push your branch:**
    ```
    git push -u origin feature/my_new_task
    ```
 6. **Open a pull request** on GitHub (the push output prints a link, or use the **Compare & pull request** button on the repository page). Fill in the PR template: what changes, which rigs or experiments it affects, and the checklist.
 7. **Ask for a review.** Another lab member reviews the PR. Answer their comments by pushing more commits to the same branch; the PR updates automatically.
 8. **Merge the PR** on GitHub once it is approved (use **Squash and merge** to keep the history short). The branch is deleted automatically after the merge.
 9. **Update the rigs.** On each rig computer that needs the change:
    ```
    git checkout main
    git pull
    ```

## Rules to keep in mind

+ **Never push directly to `main`.** The pre-push hook blocks it, but the rule applies even if the hook is missing or bypassed (`--no-verify`). This is a team convention and GitHub does not enforce it, so please follow it.
+ **Keep PRs small and focused.** One task or one fix per PR is much easier to review.
+ **Flag changes to startup or scheduled tasks** (`startup.m`, scheduled task import, DAQ or laser code) in the PR description, since they affect every rig.
+ **Do not edit code directly on a rig computer** and leave it uncommitted. Make the change on a branch and open a PR, so that all rigs stay in sync.

