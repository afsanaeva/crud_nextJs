import React from "react";
import { Button, Container, Card, Grid } from "semantic-ui-react";
import ReactPlayer from "react-player/youtube";
// import { Link } from "next/link";
import { useRouter } from "next/router";
export default function Home({ tasks = [] }) {
  const router = useRouter();
  if (tasks.length === 0) {
    return (
      <Grid
        centered
        verticalAlign="middle"
        columns="1"
        style={{ height: "88vh" }}
      >
        <Grid.Row>
          <Grid.Column textAlign="center">
            <h1>There are no videos available.Please add one</h1>
            <div>
              <Button primary onClick={() => router.push("/tasks/new")}>
                Add Video
              </Button>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return (
    <Container>
      <Card.Group itemsPerRow={4}>
        {tasks &&
          tasks.map((task) => (
            <Card key={tasks._id}>
              <Card.Content >
                <Card.Header >
                  {/* <Link href={`/tasks/${task._id}`}> */}
                  <a >{task.title}</a>
                  {/* </Link> */}
                </Card.Header>
                <ReactPlayer
                  className="react-player"
                  url={task.link}
                  width="100%"
                  height="100%"
                />
              </Card.Content>
              <Card.Content extra>
                <Button
                  color="orange"
                  onClick={() => router.push(`/tasks/${task._id}`)}
                >
                  View
                </Button>
                <Button
                  color="blue"
                  onClick={() => router.push(`/tasks/${task._id}/edit`)}
                >
                  Edit
                </Button>
              </Card.Content>
            </Card>
          ))}
      </Card.Group>
    </Container>
  );
}

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3000/api/tasks");
  const tasks = await response.json();
  return {
    props: {
      tasks,
    },
  };
}
