 export const secapi = async(ciknum)=>{
   try{
     const data = await fetch(`https://your-backend.onrender.com/api/company/${ciknum}`,
    {
        headers:{
              "User-Agent": "sakshi8394@gmail.com" 
        }


    });
    
    if (!data.ok) {
      throw new Error("API error");
    }


    const res = await data.json();
    return res;
   } 
   catch(error){
    throw error;
   }

}