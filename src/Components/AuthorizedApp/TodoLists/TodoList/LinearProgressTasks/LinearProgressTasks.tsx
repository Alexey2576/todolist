import Box from '@material-ui/core/Box';
import React, {FC, memo, useCallback} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LinearProgress, {LinearProgressProps} from '@material-ui/core/LinearProgress';

export const LinearProgressTasks: FC<LinearProgressTasksType> = memo((props) => {
   const { numberOfAllTasks, numberOfCompletedTasks } = props

   const classes = useStyles();

   const getProgress = useCallback(() =>
      (numberOfCompletedTasks / numberOfAllTasks) * 100, [numberOfCompletedTasks, numberOfAllTasks])

   return (
      <div className={classes.linear_progress_tasks}>
         <LinearProgressWithLabel value={getProgress()}/>
      </div>
   );
});

const LinearProgressWithLabel = memo((props: LinearProgressProps & { value: number }) => {
   return (
      <Box display="flex" alignItems="center">
         <Box width="100%" mr={1}>
            <LinearProgress variant="determinate" {...props} />
         </Box>
         <Box minWidth={35}>
            <Typography
               variant="body2"
               color="textSecondary"
            >
               {`${Math.round(props.value,)}%`}
            </Typography>
         </Box>
      </Box>
   );
})

export type LinearProgressTasksType = {
   numberOfAllTasks: number
   numberOfCompletedTasks: number
}

const useStyles = makeStyles({
   linear_progress_tasks: {
      width: '100%',
   },
});
