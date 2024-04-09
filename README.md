# Us Link Video Calling App

This is a Next.js application built on top of Clerk and GetStream.io.

## Description

This application utilizes Next.js, Clerk, and GetStream.io to create a dynamic and interactive web application. Clerk is used for authentication and user management, while GetStream.io powers the real-time feeds and activity streams.

The application allows users to schedule and join virtual meetings seamlessly. With its intuitive interface, users can create new meetings, join existing ones, and easily access all their previous meeting recordings with just a few clicks. Best of all, it's completely free to use, making virtual collaboration and communication hassle-free and accessible to all.

## Live Demo

Check out the live demo of the application at [https://us-link.vercel.app/](https://us-link.vercel.app/)

## Installation

To run this project locally, follow these steps:

1.  Clone the repository:

    ```
    git clone https://github.com/jai-kj/video_calling_app.git
    ```

2.  Navigate into the project directory:

    ```
    cd video_calling_app
    ```

3.  Install dependencies:

    ```
    npm install
    ```

    or

    ```
    yarn install
    ```

4.  Create a `.env.local` file in the root directory of the project and add your environment variables:

    ```
    NEXT_PUBLIC_BASE_URL=http://localhost:3000
    NEXT_PUBLIC_STREAM_API_KEY=<your-stream-api-key>
    STREAM_API_SECRET=<your-stream-api-secret>
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-clerk-public-key>
    CLERK_SECRET_KEY=<your-clerk-secret-key>
    ```

5.  Run the development server:

    ```
    npm run dev
    ```

    or

    ```
    yarn dev
    ```

6.  Open http://localhost:3000 in your browser to view the application.

## Technologies Used

- [Next.js](https://nextjs.org/)
- [Clerk](https://clerk.dev/)
- [GetStream.io](https://getstream.io/)

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please fork the repository and create a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Video Tutorial

For a detailed tutorial on how this project was built, check out this video: [Video Tutorial](https://www.youtube.com/watch?v=BL1ixDaanY8)

## Acknowledgments

Special thanks to the creator "Florian Walther" for providing the tutorial.
