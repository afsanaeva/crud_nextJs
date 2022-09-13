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

  const handleSubmit = (e) => {};
  const handleChange = (e) => {};
  return (
    <Grid
      centered
      verticalAlign="middle"
      columns="3"
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
