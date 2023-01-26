import { Grid, Paper } from '@mantine/core';
import { useLoaderData } from 'react-router-dom';
import { Project } from '../../types/Project';

export default function ProjectTests() {
  const project = useLoaderData() as Project;

  return (
    <Grid>
      <Paper>
        <div>{project.id}</div>
      </Paper>
    </Grid>
  );
}
