import { observer } from "mobx-react-lite";
import useStore from "../../hooks/useStore";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Column from "./Column";
import { useCallback, useState } from "react";
import NewTaskDialog from "./NewTaskDialog";

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: 8,
  minHeight: 500,
});

function Dashboard() {
  const { boards } = useStore();
  const [newTaskToSection, setnewTaskToSection] = useState(null);

  const closeDialog = useCallback(() => {
    setnewTaskToSection(null);
  }, []);

  const onDragEnd = useCallback(
    (event) => {
      const { source, destination, draggableId: taskId } = event;
      boards.active.moveTask(taskId, source, destination);
    },
    [boards]
  );

  return (
    <Box p={2}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={3}>
          {boards?.active?.sections?.map((section) => {
            return (
              <Grid item key={section.id} xs>
                <Paper>
                  <Box
                    p={1}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography variant="h5">{section.title}</Typography>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        setnewTaskToSection(section.id);
                      }}
                    >
                      Add
                    </Button>
                  </Box>
                  <Droppable droppableId={section.id} key={section.id}>
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                      >
                        <Column section={section} />
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </DragDropContext>
      <NewTaskDialog
        open={!!newTaskToSection}
        handleClose={closeDialog}
        activeSection={newTaskToSection}
      />
    </Box>
  );
}

export default observer(Dashboard);
