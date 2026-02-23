# Azure-translator-code - Contribution Guide

The azure-translator-code is a powerful Multilanguage library for validating form fields in multiple languages. This guide describes the guidelines for contributing to the project efficiently and effectively.

## How to Contribute

1. **Fork the Repository**
   - Fork the azure-translator-code repository to your GitHub account.

2. **Clone the Repository**
   - Clone the forked repository to your local environment:
     ```
     git clone https://github.com/gabriel-logan/azure-translator-code.git
     ```

3. **Commit and Push**
   - Commit your changes and push them to the forked repository:
     ```
     git add .
     git commit -m "feat: concise description of the changes"
     git push origin my-feature
     ```

4. **Open a Pull Request (PR)**
   - Go to the forked repository on GitHub and open a PR to the main branch of the project.

## Package Manager

The project uses pnpm as the package manager. To install dependencies, run:

```bash
pnpm install
```

## Contribution Guidelines

feat: adds a new feature to the project. For example:

feat: add controller for user management
fix: fixes an existing bug or issue. For example:

fix: fix validation error in the controller
refactor: restructures existing code without changing its functionality. For example:

refactor: rearrange methods in the controller for better readability
docs: updates the project's documentation. For example:

docs: update documentation for the user controller
style: makes code style-related changes, such as formatting, indentation, etc. For example:

style: format code in the controller according to project guidelines
test: adds or modifies tests in the project. For example:

test: add tests for the user controller
chore: performs maintenance tasks or other activities not directly related to code. For example:

chore: update project dependencies for compatibility with new versions
perf: makes performance improvements in the code. For example:

perf: optimize data query in the controller
revert: reverts a previous change. For example:

revert: revert changes in the controller due to implementation issues
ci: makes modifications related to continuous integration (CI) and deployment. For example:

ci: configure CI pipeline to automatically test the controller

- Follow the coding standards of the language you're contributing to (TypeScript).
- Keep the code clean and readable.
- Add tests for new functionalities or bug fixes.
- Properly document the changes made, including updates to README if necessary.
- Be respectful to other contributors and maintain a collaborative environment.

## License

By contributing to azure-translator-code, you agree that your contributions will be licensed under the MIT license. Make sure you're familiar with the terms of this license.
