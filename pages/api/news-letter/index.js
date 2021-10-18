import { MongoClient } from 'mongodb'

const handler = async (req, res) => {

    if (req.method === "POST") {

        const parsedNewsLetterData = JSON.parse(req.body)
        const email = parsedNewsLetterData

        const client = await MongoClient.connect(`${process.env.NEXT_PUBLIC_MONGO_DB_HOST}${process.env.NEXT_PUBLIC_MONGO_DB_USERNAME}:${process.env.NEXT_PUBLIC_MONGO_DB_PASS}${process.env.NEXT_PUBLIC_MONGO_DB_HOST_CLUSTER}`)
        const db = client.db()
        const emailSCollection = db.collection("emails")
        const result = await emailSCollection.insertOne(email)
        console.log(result)
        client.close()

        //validation 

        console.log("email", email)
        res.status(201).json({
            email: email
        })
    }
  
}

export default handler