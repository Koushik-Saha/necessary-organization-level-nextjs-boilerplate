#!/usr/bin/env node

const { execSync } = require("child_process");
const inquirer = require("inquirer");

const run = (command) => execSync(command, { stdio: "inherit" });

async function main() {
    console.log("Welcome to My Next.js Boilerplate!");

    // Step 1: Ask for project details
    const answers = await inquirer.prompt([
        {
            name: "projectName",
            type: "input",
            message: "What will your project be called?",
            default: "my-t3-app",
        },
        {
            name: "language",
            type: "list",
            message: "Will you be using JavaScript or TypeScript?",
            choices: ["JavaScript", "TypeScript"],
        },
        {
            name: "packages",
            type: "checkbox",
            message: "Which packages would you like to enable?",
            choices: ["nextAuth", "prisma", "tailwind", "trpc"],
        },
        {
            name: "gitInit",
            type: "confirm",
            message: "Initialize a new git repository?",
            default: true,
        },
        {
            name: "installDependencies",
            type: "confirm",
            message: "Would you like us to run npm install?",
            default: true,
        },
    ]);

    const { projectName, language, packages, gitInit, installDependencies } = answers;

    // Step 2: Clone the boilerplate repository
    console.log(`Creating project: ${projectName}`);
    run(`git clone https://github.com/your-username/my-nextjs-boilerplate.git ${projectName}`);
    process.chdir(projectName);

    // Step 3: Remove the existing .git folder (if it exists) and initialize a new one if requested
    if (gitInit) {
        run("rm -rf .git");
        run("git init");
    }

    // Step 4: Configure TypeScript or JavaScript
    if (language === "TypeScript") {
        console.log("Adding TypeScript support...");
        run("npm install --save-dev typescript @types/node @types/react");
    } else {
        console.log("Switching to JavaScript...");
        run("rm -f tsconfig.json");
    }

    // Step 5: Install selected packages
    console.log("Installing selected packages...");
    if (packages.includes("nextAuth")) {
        run("npm install next-auth");
    }
    if (packages.includes("prisma")) {
        run("npm install prisma @prisma/client");
        run("npx prisma init");
    }
    if (packages.includes("tailwind")) {
        run("npm install tailwindcss postcss autoprefixer");
        run("npx tailwindcss init -p");
    }
    if (packages.includes("trpc")) {
        run("npm install @trpc/server @trpc/client @trpc/react-query zod");
    }

    // Step 6: Install dependencies
    if (installDependencies) {
        console.log("Installing dependencies...");
        run("npm install");
    }

    console.log("Your project is ready! Happy coding!");
}

main().catch((err) => {
    console.error("An error occurred:", err);
    process.exit(1);
});
