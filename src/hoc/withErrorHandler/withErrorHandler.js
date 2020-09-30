import React from 'react';

import Model from '../../components/UI/Modal/Modal';
import Aux from '../Ax/Ax';
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrapperComponent, axios) => {
    return props => {
        const [error, clearError] = useHttpErrorHandler(axios);

        return (
            <Aux>
                <Model show={error} modalClosed={clearError}>
                    {error ? error.message : null}
                </Model>    
                <WrapperComponent {...props} />
            </Aux>
        )  
    }
};

export default withErrorHandler;