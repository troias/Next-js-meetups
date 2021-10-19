import { connectDatabase, insertDocument, getAllDocuments } from '../../../helpers/db-utils'
const handler = async (req, res) => {

    const eventId = req.query.commentId

    let client
    try {
        client = await connectDatabase()
    } catch (error) {
        res.status(500).json({ message: "connecting to db failed" })
        return
    }


    if (req.method === "POST") {

        const parsedCommentData = JSON.parse(req.body)
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

     

        try {
            const result = await insertDocument(client, "comments", newComment)
            newComment.id = result.insertedId
            console.log("result", result)
            client.close()
            res.status(201).json({ message: "success", newComment: newComment })
        } catch (error) {
            res.status(500).json({ message: "error inserting data", error: error })
            return
        }




    }

    if (req.method === "GET") {

        const documents = await getAllDocuments(client, "comments", { _id: -1 }, { eventId: eventId })
        console.log("commentsApi", documents)
        res.status(200).json({ comments: documents })


    }

}

export default handler