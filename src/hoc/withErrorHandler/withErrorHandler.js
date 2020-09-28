import React, {useState, useEffect} from 'react';

import Model from '../../components/UI/Modal/Modal';
import Aux from '../Ax/Ax';

const withErrorHandler = (WrapperComponent, axios) => {
    return props => {
        const [error, setError] = useState(null);

            
        const reqInterceptor = axios.interceptors.request.use(req => {
            setError(null);
                return req;
        });
        const resInterceptor = axios.interceptors.response.use(res => res, error => {
            setError(error);
        });

        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);
            }
        }, [reqInterceptor, resInterceptor]);

        const errorConfirmedHandler = () => {
            setError(null);
        };

        return (
            <Aux>
                <Model show={error} modalClosed={errorConfirmedHandler}>
                    {error ? error.message : null}
                </Model>    
                <WrapperComponent {...props} />
            </Aux>
        )  
    }
};

export default withErrorHandler;