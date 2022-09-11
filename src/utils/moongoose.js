import {connect,connection} from "mongoose";

const conn={
    isConnected: false,

}
export async function  dbConnect(){
    if(conn.isConnected) return;
    
    const db = await connect(process.env.MONGO_URI);
    conn.isConnected = db.connections[0].readyState;
}

connection.on("connected",()=>{
    console.log("MongoDB connected to our database");
});

connection.on("error",(err)=>{
    console.log("MongoDB Error",err.message); 
})