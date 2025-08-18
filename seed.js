import bcrypt from "bcrypt"
import {
    configDotenv
} from "dotenv"
 
import { User } from "./src/models/User.js"
import { Project } from "./src/models/Project.js"
import { Task } from "./src/models/Task.js"
import { connectToMongoDB } from "./src/configs/db.js"
 

configDotenv()

const seed = async () => {
    try {
        await connectToMongoDB()

        console.log("Clearing old data...")
        // await User.deleteMany({})
        // await Project.deleteMany({})
        // await Task.deleteMany({})

        console.log("Seeding new data...")

        const hashedPassword = await bcrypt.hash("Test@123", 10)
        const user = await User.create({
            name:"Manish",
            email: "test@example.com",
            password: hashedPassword,
        })

         const projects = await Project.insertMany([{
                userId: user._id,
                title: "Project One",
                description: "First test project",
                status: "active"
            },
            {
                userId: user._id,
                title: "Project Two",
                description: "Second test project",
                status: "active"
            },
        ])

         for (const project of projects) {
            const tasks = [{
                    title: "Task 1",
                    description: "First task",
                    status: "todo",
                    due_date: new Date(),
                    projectId: project._id,
                },
                {
                    title: "Task 2",
                    description: "Second task",
                    status: "in-progress",
                    due_date: new Date(),
                    projectId: project._id,
                },
                {
                    title: "Task 3",
                    description: "Third task",
                    status: "done",
                    due_date: new Date(),
                    projectId: project._id,
                },
            ]
            await Task.insertMany(tasks)
        }

        console.log("✅ Database seeding completed.")
        process.exit(0)
    } catch (error) {
        console.error("❌ Error seeding data:", error)
        process.exit(1)
    }
}

seed()
