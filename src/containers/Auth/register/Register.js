import React, {useCallback} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import Appbar from "../../../components/appbar/Appbar";
import Signup from "../signup/Signup";
import TargetForm from "../../../components/targetForm/TargetForm";
import RegistrationSummary from "../../../components/registrationSummary/RegistrationSummary";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

const getSteps = () => {
    return ['Personal details', 'Set your targets', 'Create your account'];
}

const Register = (props) => {

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const steps = getSteps();

    const getStepContent = step => {
        switch (step) {
            case 0:
                return <Signup onNextClick={handleNext}/>
            case 1:
                return <TargetForm
                    onNextClick={handleNext}
                    onSkipClick={handleSkip}/>
            case 2:
                return <RegistrationSummary onFinishClick={handleNext} onBackClick={handleBack} {...props}/>;
            default:
                return 'Unknown step';
        }
    }

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = useCallback((step) => {
        return skipped.has(step);
    },[skipped]);

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    return (
        <Box className={classes.root}>
            <Appbar {...props}/>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = <Typography variant="caption">Optional</Typography>;
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <Box>
                {getStepContent(activeStep)}
            </Box>
        </Box>
    );
}

export default Register
