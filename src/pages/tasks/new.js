import { useState, useEffect } from "react";
import { Button, Form, Loader, Grid } from "semantic-ui-react";
import { useRouter } from "next/router";

const CreateTask = () => {
  const[newTask, setNewTask] = useState({
    title: "",
    link: "",
  });
  const {title, link} =newTask;
  const { push } = useRouter();
  const [isSubmit, setSubmit] = useState(false);
  const [errors, setErrors] = useState({});

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
    await createTask();
    await push("/push")
  };

  const createTask = async()=>{
    try{
        await fetch("http://localhost:3000/api/tasks",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newTask)
        });
    }catch(error){
        console.log(error);
    }
  }
  const handleChange = (e) => {
    const{name, value} =e.target;
    setNewTask({...newTask,[name]:value});
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
          <h1> Add New Video</h1>
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
                <Button type="submit">Add</Button>
              </Form>
            )}
            </div>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default CreateTask;
