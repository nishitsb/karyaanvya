import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from "@material-ui/core/Box";

const Loading = (props) => {
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        function tick() {
            // reset when reaching 100%
            setProgress((oldProgress) => (oldProgress >= 100 ? 0 : oldProgress + 1));
        }

        const timer = setInterval(tick, props.timer);
        return () => {
            clearInterval(timer);
        };
    }, [props.timer]);

    return (
        <Box
            p={props.p ? props.p : 4}
            align={"center"}>
            <CircularProgress
                color={"primary"}
                size={props.size ? props.size : 70}
                thickness={props.thickness ? props.thickness : 4.5}
                variant="indeterminate"
                value={progress} />
        </Box>
    );
}

export default Loading
