import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ReactPlayer from "react-player/youtube";
import { Button, Confirm, Card, Grid } from "semantic-ui-react";
import Error from "next/error";

const Task = ({ task, error }) => {
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { push, query } = useRouter();

  const deleteTask = async () => {
    const { id } = query;
    try {
      await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const open = () => setConfirm(true);
  const close = () => setConfirm(false);

  const handleDelete =async ()=>{
    setIsDeleting(true);
    await deleteTask();
    await push("/");
    close();
  };

  if (error && error.statusCode){
    return <Error statusCode={error.statusCode} title={error.statusText}/>
    
  }
  
  return (
    <Grid
      centered
      verticalAlign="middle"
      columns="1"
      style={{ height: "80vh" }}
    >
      <Grid.Row>
        <Grid.Column textAlign="center">
          <Card centered  style={{ height:"49vh", width: "69vh" }}>
            <Card.Content>
              <Card.Header><h1>{task.title}</h1></Card.Header>
              <Card.Description>
              <ReactPlayer
                  className="react-player"
                  url={task.link}
                 
                />
             </Card.Description>
            </Card.Content>
            <Card.Content extra>
            <Button color="red" onClick={open} loading={isDeleting}>
                Delete
            </Button>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>

      <Confirm
      content = "Are you want to delete this video?"
      header ="Please Confirm"
      open={confirm}
      onConfirm ={handleDelete}
      onCancel={close}
      />
    </Grid>
  );
};

export async function getServerSideProps({ query: { id } }) {
  const res = await fetch(`http://localhost:3000/api/tasks/${id}`);
  if (res.status === 200) {
    const task = await res.json();
    return {
      props: {
        task,
      },
    };
  }

  return {
    props: {
      error: {
        statusCode: res.status,
        statusText: "Invalid ID",
      },
    },
  };
}

export default Task;
