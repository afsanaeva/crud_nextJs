import React,{ useState, useEffect } from "react";
import { Button, Form, Loader, Grid } from "semantic-ui-react";
import { useRouter } from "next/router";

const CreateVideo = () => {
  const[newVideo, setNewVideo] = useState({
    title: "",
    link: "",
  });
  const {title, link} = newVideo;
  const { push , query} = useRouter();
  const [isSubmit, setSubmit] = useState(false);
  const [errors, setErrors] = useState({});

  const getVideo = async () =>{
    const response = await fetch(`http://localhost:3000/api/videos/${query.id}`);
    const data = await response.json();
    setNewVideo({title: data.title, link:data.link});
  };

  useEffect(() => {
    if (query.id) getVideo();
  } ,[query.id]);

  const validate = () =>{
    let errors= {};
    if(!title){
        errors.title="Title is Required";
    }
    if(!link){
        errors.link="Video Link is Required";
    }
    return errors;
  };
  const handleSubmit =  async (e) => {
    e.preventDefault();
    let errors =validate();

    if (Object.keys(errors).length)return setErrors(errors);
    setSubmit(true);

    if(query.id){
      await updateVideo();
    }else{
      await createVideo();
    }

    await createVideo();
    await push("/push")
  };
  const updateVideo = async()=>{
    try{
        await fetch(`http://localhost:3000/api/videos/${query.id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newVideo)
        });
    }catch(error){
        console.log(error);
    }
  };
  
  const createVideo = async()=>{
    try{
        await fetch("http://localhost:3000/api/videos",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newVideo)
        });
    }catch(error){
        console.log(error);
    }
  };

  const handleChange = (e) => {
    const{name, value} =e.target;
    setNewVideo({...newVideo,[name]:value});
  };
  return (
    <Grid
      centered
      verticalAlign="middle"
      columns="4"
      style={{ height: "88vh" }}
    >
      <Grid.Row>
        <Grid.Column textAlign="center">
          <div> 
          <h1>{query.id ? "Update Video" : "Add New Video"} </h1>
          <div>
            {isSubmit ? (
              <Loader active inline="centered" />
            ) : (
              <Form onSubmit={handleSubmit}>
                <Form.Input
                  label="Title"
                  placeholder="Enter Title"
                  name="title"
                  onChange={handleChange}
                  value={title}
                  autoFocus
                />
                <Form.TextArea
                label="Link"
                placeholder="Enter Video Youtube Link"
                name="link"
                onChange={handleChange}
                value={link}
                />
                <Button type="submit" primary>
                {query.id ? "Update" : "Add" }
                </Button>
              </Form>
            )}
            </div>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default CreateVideo;
