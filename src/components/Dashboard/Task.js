import { CardContent, Typography } from "@mui/material";
import User from "../common/User";
import { observer } from "mobx-react-lite";

function Task ({task}) {
  return (
    <CardContent>
      <Typography color="textPrimary" gutterBottom style={{fontSize: 18}}>
        {task?.title}
      </Typography>
      <Typography color="textSecondary" gutterBottom>
        {task?.description}
      </Typography>
      <User user={task?.assignee} />
    </CardContent>
  )
}

export default observer(Task);