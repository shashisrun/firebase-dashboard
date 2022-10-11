import React from 'react';
import Image from 'next/image'
import TablePage from '../components/tablePage';
import { getDocuments } from '../config/firebase';
import moment from 'moment';

export default function Categories() {
    const [rows, setRows] = React.useState([]);
    const docroot = 'restaurants/cw8bYvB7wlQPAX1mjfFl/orders';

    React.useEffect(() => {
        const fetchData = async () => {
            const data = await getDocuments(docroot);
            setRows(data);
        }
        fetchData();
    }, [])

    const columns = [
        { field: 'id', headerName: 'ID', width: 200 },
        {
            field: 'name',
            headerName: 'Cuisine Name',
            width: 150,
            editable: true,
        },
        {
            field: 'thumbnail',
            headerName: 'Thumbnail',
            width: 110,
            editable: false,
            renderCell: (params) => {
                return (
                    <div className='w-full h-full'>
                        {params.row.thumbnails.map((thumbnail, index) => {
                            return (
                                <Image src={thumbnail} alt='' className='h-full w-auto' key={index} height={1000} width={1000} />
                            )
                        })}
                    </div>
                )
            }
        },
        {
            field: 'status',
            headerName: 'Active',
            width: 160,
            type: 'boolean',
            editable: true,
        },
        {
            field: 'createdAt',
            headerName: 'Created At',
            width: 160,
            valueFormatter: function (params) {
                return moment(params.value.toDate()).fromNow();
            },
        },
        {
            field: 'updatedAt',
            headerName: 'Updated At',
            width: 160,
            valueFormatter: function (params) {
                return moment(params.value.toDate()).fromNow();
            },
        },
    ];

    const addCuisine = {
        title: 'Add cuisine',
        document: docroot,
        submitLabel: 'Add Cuisine',
        fields: [
            {
                type: 'text',
                name: 'Cuisine Name',
                required: true,
                key: 'name'
            },
            {
                type: 'file',
                name: 'Cuisine Image',
                required: false,
                multiple: 5,
                key: 'thumbnails',
                accept: 'image/*',
                uploadPath: 'restaurants/oscarclub/cuisines'
            },
            {
                type: 'checkbox',
                name: 'Active',
                required: true,
                key: 'status',
                checked: true
            },
        ]
    }
    return (
        <div>
            <TablePage title={'Orders'} columns={columns} rows={rows} addDocument={addCuisine} docRoot={docroot} />
        </div>
    )
}
