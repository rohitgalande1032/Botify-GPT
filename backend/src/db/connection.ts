import {connect, disconnect }from 'mongoose'

async function connectionToDatabase() {
    try {
        await connect(process.env.MONGODB_URL)
    } catch (error) {
        console.log(error)
        throw new Error("Can not connect to MongoDB")
    }
}

async function disconnetFromDatabase() {
    try {
        await disconnect()
    } catch (error) {
        console.log(error)
        throw new Error("Could not Disconnect from MongoDB")
    }
}

export {connectionToDatabase, disconnetFromDatabase}