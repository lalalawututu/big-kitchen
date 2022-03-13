import React from 'react';
import ScreenContainer from '../../container/screen';
import { ScreenPage } from '../../pages/screen';

function Screen() {
    return (
        <ScreenContainer.Provider>
            <ScreenPage />
        </ScreenContainer.Provider>
    )
}

export default Screen;
