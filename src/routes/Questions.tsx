import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    alpha,
    AppBar,
    Avatar,
    Box,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    CardHeader,
    CardProps,
    Grid,
    styled,
    Toolbar,
    Typography,
} from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';
import { red } from '@mui/material/colors';

interface hydraViewInterface {
    '@id': string;
    '@type': string;
    'hydra:first': string;
    'hydra:last': string;
    'hydra:previous'?: string;
    'hydra:next'?: string;
}

interface questionInterface {
    '@id': string;
    '@type': string;
    title: string;
    text: string;
    owner: string;
    answers: string;
    askAt: string;
}

interface navButtonsProps {
    onClick: (page: 'first' | 'previous' | 'next' | 'last') => void;
    hydraView: hydraViewInterface;
}

function NavButtons(props: navButtonsProps) {
    return (
        <AppBar
            position="fixed"
            color="transparent"
            sx={{ top: 'auto', bottom: 0, pointerEvents: 'none' }}
            elevation={0}
        >
            <Toolbar>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Grid item xs={3}>
                        <ButtonGroup
                            variant="contained"
                            aria-label="outlined primary button group"
                            sx={{ pointerEvents: 'all' }}
                        >
                            <Button
                                onClick={function () {
                                    props.onClick('first');
                                }}
                            >
                                <FastRewindIcon />
                            </Button>
                            {
                                <Button
                                    onClick={function () {
                                        props.onClick('previous');
                                    }}
                                    disabled={
                                        !props.hydraView['hydra:previous']
                                    }
                                >
                                    {' '}
                                    <ArrowLeftIcon sx={{ fontSize: 35 }} />
                                </Button>
                            }
                            {
                                <Button
                                    onClick={function () {
                                        props.onClick('next');
                                    }}
                                    disabled={!props.hydraView['hydra:next']}
                                >
                                    <ArrowRightIcon sx={{ fontSize: 35 }} />
                                </Button>
                            }
                            <Button
                                onClick={function () {
                                    props.onClick('last');
                                }}
                            >
                                <FastForwardIcon />
                            </Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

const QuestionCard = styled(Card)<CardProps>(({ theme }) => ({
    color: theme.palette.grey['600'],
    '&:hover': {
        boxShadow: `0px 0px 0px 8px ${alpha(theme.palette.primary.main, 0.16)}`,
        cursor: 'pointer',
    },
}));

const Test = (): JSX.Element => {
    let navigate = useNavigate();

    const [questions, setQuestions] = useState<questionInterface[]>([]);
    const [hydraView, setHydraView] = useState<hydraViewInterface>({
        '@id': '/api/questions?page=1',
        '@type': '',
        'hydra:first': '',
        'hydra:last': '',
        'hydra:previous': '',
        'hydra:next': '',
    });

    useEffect(
        function () {
            async function getRequest(): Promise<AxiosResponse<any, any>> {
                return await axios.get(
                    process.env.REACT_APP_API_ADRESS + hydraView['@id']
                );
            }

            getRequest().then(function (response) {
                console.log(response);
                setHydraView(
                    JSON.parse(JSON.stringify(response.data['hydra:view']))
                );
                setQuestions(response.data['hydra:member']);
            });
        },
        [hydraView['@id']]
    );

    function handleSetPage(page: 'first' | 'previous' | 'next' | 'last') {
        let newHydraView: any = { ...hydraView };
        newHydraView['@id'] = newHydraView['hydra:' + page];
        setHydraView(newHydraView);
    }

    function handleClick(questionElement: string) {
        navigate(questionElement.slice(4));
    }

    return (
        <Box sx={{ padding: '1rem' }}>
            {questions.map(function (question, key) {
                return (
                    <QuestionCard
                        sx={{ margin: '1rem' }}
                        onClick={function () {
                            handleClick(question['@id']);
                        }}
                    >
                        <CardHeader
                            avatar={
                                <Avatar
                                    sx={{ bgcolor: red[500] }}
                                    aria-label="recipe"
                                >
                                    R
                                </Avatar>
                            }
                            title={question.owner}
                            subheader={question.askAt}
                        />
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                            >
                                {question['title']}
                            </Typography>
                            <Typography variant="body2">
                                Answers: {question.answers.length}
                            </Typography>
                        </CardContent>
                    </QuestionCard>
                );
            })}
            <NavButtons onClick={handleSetPage} hydraView={hydraView} />
        </Box>
    );
};

Test.propTypes = {};

export default Test;
