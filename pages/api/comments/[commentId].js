import { MongoClient } from 'mongodb'

const handler = async (req, res) => {
    const eventId = req.query.commentId
    console.log("commentApiId", eventId)
    const client = await MongoClient.connect(`${process.env.NEXT_PUBLIC_MONGO_DB_HOST}${process.env.NEXT_PUBLIC_MONGO_DB_USERNAME}:${process.env.NEXT_PUBLIC_MONGO_DB_PASS}${process.env.NEXT_PUBLIC_MONGO_DB_HOST_CLUSTER}`)
    
    if (req.method === "POST") {
        const parsedCommentData = JSON.parse(req.body)

        //server-side validation 
        const { email, name, text } = parsedCommentData

        if (!email.includes('@') ||
            !name ||
            name.trim() === '' ||
            !text ||
            text.trim() === '') {
            res.status(422).json({ message: "invalid input" })
            return
        }

        const newComment = { email, name, text, eventId }

        //Connect & send to mongodb server


        const db = client.db()
        const commentsCollection = db.collection('comments')
        const result = await commentsCollection.insertOne(newComment)
       
        newComment.id = result.insertedId
        client.close()
        res.status(201).json({ message: "success", newComment: newComment })
    }

    if (req.method === "GET") {

        const db = client.db()
        const comments = await db.collection('comments').find().sort({ _id: -1 }).toArray()
      
        res.status(200).json({ comments: comments })


    }

}

export default handler