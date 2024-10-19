import React, { FC, useEffect } from 'react';

import Header from './Header';
import TicketList from './TicketList';

export const App: FC = () => {
    return (
        <>
            <Header />
            <TicketList />
        </>
    )
}
