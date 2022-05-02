import React from 'react';
import CommonCreateContainer from '../../container/commonCreate';
import { CommonCreatePage } from '../../components/commonCreate';

function Creator() {
    return (
        <CommonCreateContainer.Provider>
            <CommonCreatePage/>
        </CommonCreateContainer.Provider>
    )
}

export default Creator;
