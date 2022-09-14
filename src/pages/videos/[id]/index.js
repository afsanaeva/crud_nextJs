import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ReactPlayer from "react-player/youtube";
import { Button, Confirm, Card, Grid } from "semantic-ui-react";
import Error from "next/error";

const Video = ({ video, error }) => {
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { push, query } = useRouter();

  const deleteVideo = async () => {
    const { id } = query;
    try {
      await fetch(`http://localhost:3000/api/videos/${id}`, {
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
    await deleteVideo();
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
              <Card.Header><h1>{video.title}</h1></Card.Header>
              <Card.Description>
              <ReactPlayer
                  className="react-player"
                  url={video.link}
                 
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
  const res = await fetch(`http://localhost:3000/api/videos/${id}`);
  if (res.status === 200) {
    const video = await res.json();
    return {
      props: {
        video,
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

export default Video;
