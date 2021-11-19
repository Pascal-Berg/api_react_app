import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';

const Question = () => {
    let { questionId } = useParams();

    useEffect(function () {
        async function getRequest(): Promise<AxiosResponse<any, any>> {
            return await axios.get(
                process.env.REACT_APP_API_ADRESS +
                    '/api/questions/' +
                    questionId
            );
        }

        getRequest().then(function (response) {
            console.log(response);
        });
    }, []);

    return <h2>Question: {typeof questionId}</h2>;
};

export default Question;
