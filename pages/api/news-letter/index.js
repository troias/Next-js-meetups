import { MongoClient } from "mongodb";
import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from "../../../helpers/db-utils";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const parsedNewsLetterData = JSON.parse(req.body);
    const email = parsedNewsLetterData;

    let client;
    try {
      client = await connectDatabase();
      const result = await insertDocument(client, "email", email);
      client.close();
      console.log("email", result);
      res.status(201).json({
        email: result,
      });
    } catch (error) {
      res.status(500).json({ message: "failed to submit email" });
    }

    //validation
  }
};

export default handler;
