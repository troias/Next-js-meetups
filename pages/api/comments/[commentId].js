import { MongoClient } from 'mongodb'

const handler = async (req, res) => {
    const eventId = req.query.commentId

    if (req.method === "POST") {
        const parsedCommentData = JSON.parse(req.body)

        //server-side validation 
        const { email, name, text } = parsedCommentData

        if (!email.includes('@') ||
            !name ||
            name.trim() === '' ||
            !text ||
            text.trim() === '') {
                res.status(422).json({ message: "invalid input"})
            return
        }
       
        const newComment = {  email, name, text, id: new Date().toISOString()}
        console.log(newComment)

    

        //Connect & send to mongodb server

        const client = await MongoClient.connect(`${process.env.NEXT_PUBLIC_MONGO_DB_HOST}${process.env.NEXT_PUBLIC_MONGO_DB_USERNAME}:${process.env.NEXT_PUBLIC_MONGO_DB_PASS}${process.env.NEXT_PUBLIC_MONGO_DB_HOST_CLUSTER_COMMENTS}`)
        const db = client.db()
        const commentsCollection = db.collection('comments')
        const result = await commentsCollection.insertOne(newComment)
        console.log("result", result)
        client.close()
        res.status(201).json({ message: "success", newComment: newComment})
    }

    if (req.method === "GET") {
        const dummyList = [{id: new Date().toISOString(), name: "John", email: "test@gmail.com", text: "testing"}]
        res.status(200).json({comments: dummyList})
        // const parsedCommentData = JSON.parse(req.body)
        // const comment = parsedCommentData
        // res.status(201).json({
        //     comment: comment
        // })
    }

}

export default handler