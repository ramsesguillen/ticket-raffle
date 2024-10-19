import React, { useState } from "react"

import { reactAxios } from "../axiosConfig";
import { useEffect } from "react"

interface Ticket {
    uuid: string;
    number: number;
    status: 'DISPONIBLE' | 'VENDIDO' | 'TRANSITO';
}

const PHONE_NUMBER = '9541446527';
const MESSAGE = 'Hola, me gustaría obtener más información.';

const TicketList = () => {
    const [tickets, setTickets] = useState<Ticket[]>([])
    const [selected, setSelected] = useState<Ticket[]>([])
    // let selected:Ticket[] = [];

    useEffect(() => {
        (async() => {
            const { data } = await reactAxios.get<{boletos: Ticket[]}>('/boletos');
            setTickets(data.boletos);
        })();
    }, []);

    const handleClick = (ticket: Ticket): void => {
        setTickets(prev => {
            return prev.map(t => {
                if (t.uuid === ticket.uuid)
                    t.status = 'TRANSITO'
                return t;
            });
        });
    }

    const handleRemove = (ticket: Ticket): void => {
        setTickets(prev => {
            return prev.map(t => {
                if (t.uuid === ticket.uuid)
                    t.status = 'DISPONIBLE'
                return t;
            });
        });
    }

    useEffect(() => {
        const selected = tickets.filter(t => t.status === 'TRANSITO');
        setSelected(selected);
    }, [tickets]);


    function handleSend() {
        let tickets = '%0A';
        for (const el of selected) {
            tickets += `%0A${el.number}`;
        }
        console.log(tickets)
        const message = `%0A${encodeURIComponent(MESSAGE)}${tickets}`;

        console.log(message)
        const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    }



    return (
        <div>
            <div className="tickets-list">
                {
                    selected.map(({ number, status, uuid}) => (
                        <button
                            className="ticket ticket-selected"
                            key={uuid}
                            onClick={() => handleRemove({number, uuid, status}) }
                            >
                                {number}
                        </button>
                    ))
                }
            </div>
            <button onClick={handleSend}>Enviar</button>
            <div className="tickets-list">
                {
                    tickets.map(({number, uuid, status}) => (
                        status === 'DISPONIBLE' ?
                        <button
                            className="ticket"
                            key={uuid}
                            onClick={() => handleClick({number, uuid, status}) }
                            >
                                {number}
                        </button>
                        :
                        <button
                            className="ticket ticket-transito"
                            key={uuid}
                            >
                        </button>
                    ))
                }
            </div>
        </div>
    )
}
export default TicketList
