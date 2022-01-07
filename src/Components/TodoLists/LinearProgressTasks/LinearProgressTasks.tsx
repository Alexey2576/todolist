import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import LinearProgress, {LinearProgressProps} from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

export type LinearProgressTasksType = {
   numberOfAllTasks: number
   numberOfCompletedTasks: number
}

const useStyles = makeStyles({
   linear_progress_tasks: {
      width: '100%',
   },
});

const LinearProgressTasks: React.FC<LinearProgressTasksType> = (
   {
      numberOfAllTasks,
      numberOfCompletedTasks
   }
) => {
   // ============================= USE STYLES CONSTANT ================================================================
   const classes = useStyles();

   // ================== THE FUNCTION OF CALCULATING THE PERCENTAGE OF COMPLETED TASKS =================================
   const getProgress = () => (numberOfCompletedTasks / numberOfAllTasks) * 100

   return (
      <div className={classes.linear_progress_tasks}>
         <LinearProgressWithLabel value={getProgress()}/>
      </div>
   );
}

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
   return (
      <Box display="flex" alignItems="center">
         <Box width="100%" mr={1}>
            <LinearProgress variant="determinate" {...props} />
         </Box>
         <Box minWidth={35}>
            <Typography variant="body2" color="textSecondary">{`${Math.round(props.value,)}%`}</Typography>
         </Box>
      </Box>
   );
}

export const MemoizedLinearProgressTasks = React.memo(LinearProgressTasks)


