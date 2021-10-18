import { MongoClient } from 'mongodb'

const handler = (req, res, next) => {

    if (req.method === "POST") {

        const parsedCommentData = JSON.parse(req.body)
        const client = await MongoClient.connect(`${process.env.NEXT_PUBLIC_MONGO_DB_HOST}${process.env.NEXT_PUBLIC_MONGO_DB_USERNAME}:${process.env.NEXT_PUBLIC_MONGO_DB_PASS}${process.env.NEXT_PUBLIC_MONGO_DB_HOST_CLUSTER}`)
        const db = client.db()
        const meetupCollection = db.collection('meetups')
        const result = await meetupCollection.insertOne(data)
        
        console.log(result)
        client.close()
        res.status(201).json({message: "meetups updated successfully"})
        
        // const comment = parsedCommentData.comment
        // res.status(201).json({
        //     comment: comment
        // })

        console.log(parsedCommentData)
    }
   
}

export default handler