import React, { useEffect, useState } from 'react'
import ticketService from 'src/views/services/ticket';
import DataTable from 'react-data-table-component';

function ListTicket() {
    const [Projects, setTickets] = useState([])
    const columns = [
        {
            name: 'Nom du ticket',
            selector: row => row.nomticket,
            sortable: true,
        },
        {
            name: 'Responsable ticket',
            selector: row => row.ownerId.nom,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
        }
    ];

    const ExpandedComponent = ({data}) => {
        // console.log(data);
        return <pre><div className="card">
                <div className="card-header">
                    {data.nomticket}
                </div>
                <div className="card-body">
                    <p className="card-text">Déscription de ticket: <strong>{data.descriptionticket}</strong> </p>
                    <p className="card-text">Status: <strong className='text-info'>{data.status.toUpperCase()}</strong> </p>
                    <button className='btn btn-dark ms-3' >Consulter ticket</button>
                </div>
            </div>
            </pre>;
    };

    useEffect(() => {
        const getTickets = async () => {
            const response = await ticketService.getAllTickets();
            setTickets(response.data);
        }
        getTickets()
    }, [])
    return (
        <div>
            <DataTable
                columns={columns}
                data={Projects}
                expandableRows
                highlightOnHover
		        pointerOnHover
                expandableRowsComponent={ExpandedComponent}
            />
        </div>
    )
}

export default ListTicket