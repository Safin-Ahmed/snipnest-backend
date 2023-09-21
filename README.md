# SnipNest - Where Snippets Find It's Nest

## Table of Contents

- [Project Overview](#project-overview)
- [Functional Requirements](#functional-requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

## Project Overview

The SnipNest REST API Application is a collection of public api endpoints that enables users to create, manage and interact with a code snippet platform. The backend application provides authentication functionality, allows users to create and view code snippets, comment on code snippets, add react to a code snippet and follow a user profile.

## Functional Requirements

The system provides secure authentication, allowing users to register and log in using their email and password, while administrators have their own secure login credentials. User profiles become public after creating their initial code snippet, showcasing their snippets and personal information. Authenticated users enjoy the ability to fully manage their snippets, including creation, editing, and deletion, encompassing details like title, description, code files, and authorship. This extends to snippet files, where users can create, edit, and delete files, including filename, content, language information. Additionally, users can engage with snippets through comments and reactions expressed as star ratings, visible to both users and the public.

## Installation

To install the project, run:

```bash
yarn
```

### Usage

To start the project in development environment, run:

```bash
yarn run dev
```

To start the docker services for this project, please run docker daemon on your computer then run the following command

```bash
docker-compose up -d
```

By default, the project will start on `http://localhost:4000`. <br><br>

## Usage

After successfully installing the project and starting docker services, run the following command in your terminal

```bash
yarn dev
```

it will run the development server on `http://localhost:4000`.

After running the server, You can access the swagger documentation by visiting the url `http://localhost:4000/docs`

Here you will see all the available endpoints listed. There are 3 kinds of namespaces:

- public: it means public resources which does not require any authentication

- private: it means protected resources which requires authentication and authorization

- admin: it means admin routes which are only available for admin user.

So for public endpoints, you don't need any authentication. However, if you want to access any authenticated endpoints that starts with private namespace. You will need to login if user already exists or you have to register a new user if user does not exists.

For registering new user you will need to hit this api endpoint with required payload: "http://localhost:4000/api/v1/public/auth/register"

see details in swagger docs.

After registration is done, login with the user credentails "http://localhost:4000/api/v1/public/auth/login"

After successful authentication you will get an access_token and refresh_token. Now to access authenticated routes just add the access_token in header as authorization and you are good to go.

## Configuration

You can use config located in ./src/config folder to customize some configuration in the api. for example, default pageSize, limit, sort property etc.

You can also use your .env file to customize Database name, Database username or password.

## Test

You can run the tests for this api by running the following command in your terminal

```bash
yarn test
```

## Contributing

We welcome and appreciate contributions from the community! If you'd like to contribute to SnipNest, please follow these guidelines:

1. **Fork** the repository on GitHub.
2. Create a **feature branch** from the `main` branch for your contribution.
3. Make your changes, ensuring that your code follows our coding standards and practices.
4. Write clear and concise **commit messages**.
5. Submit a **Pull Request** with a detailed description of your changes and their purpose.

I will review your contribution and provide feedback. To ensure a smooth review process, please consider the following:

- Keep your pull requests focused on a single feature or bug fix.
- Ensure that your code is well-documented and includes any necessary tests.
- Be open to feedback and willing to make necessary adjustments to your code.

Thank you for considering contributing to SnipNest! Your help is greatly appreciated.

## Contact

If you have questions, feedback, or need assistance with SnipNest, please don't hesitate to get in touch with me. You can reach out via the following channels:

- **Email**: safin.ahmed2000@gmail.com
- **GitHub Issues**: [Link to GitHub Issues](https://github.com/Safin-Ahmed/snipnest-backend/issues)
- **Facebook**: [/safin.web](https://www.facebook.com/safin.web/)

I value your input and are always here to help. Feel free to reach out, and I'll do our best to assist you.
