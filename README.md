# five-seconds

### A Cryptographic, Encrypted One-way Passphrase Implementation  

![five-seconds logo](./asset/logo.png)

## 🔍 **Project Overview**

### 💡 **Purpose**
The `five-seconds` project provides a secure, encrypted one-way passphrase solution for applications requiring high levels of cryptographic integrity.

This was initially created as part of the solution to the **Digital Defences** problem at the [YouthxHack 2024 Hackathon](https://www.cyberyouth.sg/events/youthxhack-2024-total-defence-edition).

### 📲 **Technologies**

1. Frontend
2. Backend
    * Next.js
    * MongoDB

### 🛠️ **Architecture**

![Architecture](./asset/architecture_diagram.png)

## 🚀 **Quick Start (for developers)**

To get started with the Next.js backend and MongoDB, follow the steps below to set up your environment and run the application locally.

### 1. **Install Dependencies**

```console
$ make config
```

### 2. **Set Up MongoDB Connection**

1. Ensure your MongoDB server is up and running on the default port (27017).
2. Create a `.env.local` file in the root of your project to securely store your MongoDB URI.

```env
MONGODB_URI=mongodb://your-username:your-password@localhost:27017/your-database-name
```

### 3. **Run the Next.js Application**

```console
$ cd ./src/backend/five_seconds/
$ npm run dev
```

### 4. **View local development server on [`localhost:3000`](http://localhost:3000)**

### 5. **Access the API Routes**

- **List users**: `/api/users`
- **Create post**: `/api/posts`
- **Get post by specific ID**: `/api/posts/[id]`

## 👐 **Contributors** 

<table>
	<tbody>
        <tr>
            <td align="center">
                <a href="https://www.linkedin.com/in/bethloke/">
                    <img src="https://avatars.githubusercontent.com/u/96629569?v=4" width="100;" alt="huitingloke"/>
                    <br />
                    <sub><b>Bethel Loke</b></sub>
                </a>
                <br />
                <sub><a href="./src/frontend/">Frontend<a>  Developer</sub>
            </td>
            <td align="center">
                <a href="https://www.linkedin.com/in/gabriel-zmong/">
                    <img src="https://avatars.githubusercontent.com/u/117062305?v=4" width="100;" alt="gongahkia"/>
                    <br />
                    <sub><b>Gabriel Ong</b></sub>
                </a>
                <br />
                <sub><a href="./src/backend/">Backend<a>  Developer</sub>
            </td>
        </tr>
	</tbody>
</table>


## 💬 **Contact**

For any questions, feedback, or collaboration requests, feel free to open an issue **[here](https://github.com/4-0gpa/five-seconds/issues)**.

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.