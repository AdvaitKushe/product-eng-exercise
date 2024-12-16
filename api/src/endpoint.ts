import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import json from "./data.json";

type Feedback = {
  id: number;
  name: string;
  description: string;
  importance: "High" | "Medium" | "Low";
  type: "Sales" | "Customer" | "Research";
  customer: "Loom" | "Ramp" | "Brex" | "Vanta" | "Notion" | "Linear" | "OpenAI";
  date: string;
};

type FeedbackData = Feedback[];

export const router = express.Router();
router.use(bodyParser.json());

router.post("/query", queryHandler);
router.post("/groups", groupHandler);

const feedback: FeedbackData = json as any;

function queryHandler(req: Request, res: Response<{ data: FeedbackData }>) {

//server side
  /**
   * TODO(part-1): Implement query handling
   */

const feedbackFiltered: { data: FeedbackData } = { data: [] } ;
    
  // Safely extract filters
  const filters: unknown = req.body?.query?.filters;
 

  if(Array.isArray(filters) && (filters[0][1].length > 0 || filters[1][1].length > 0 || filters[2][1].length > 0)) { // checks to see that we have some filters applied

    for (let i = 0; i < feedback.length; i++) {
      if (// Filter #0: Importance
        (filters[0][1].length === 0 || filters[0][1].includes(feedback[i].importance))
        &&
        // Filter #1: Type
        (filters[1][1].length === 0 || filters[1][1].includes(feedback[i].type))
        &&
        // Filter #2: Customer
        (filters[2][1].length === 0 || filters[2][1].includes(feedback[i].customer)) ) {

        var tmp = feedback[i];
        feedbackFiltered.data.push(tmp);
        
      }

    }
 
  
  
  res.status(200).json(feedbackFiltered);
  
  

} else {
  


    

    res.status(200).json({ data: feedback });
  
}
  
}

type FeedbackGroup = {
  name: string;
  feedback: Feedback[];
};

async function groupHandler(
  req: Request,
  res: Response<{ data: FeedbackGroup[] }>
) {
  const body = req;
  console.log(body);

  /**
   * TODO(part-2): Implement filtering + grouping
   */

  const pythonRes = await fetch("http://127.0.0.1:8000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ feedback }),
  });

  const pythonData = (await pythonRes.json()) as { feedback: Feedback[] };

  res.status(200).json({
    data: [
      {
        name: "All feedback",
        feedback: pythonData.feedback,

      },
    ],
  });
}
