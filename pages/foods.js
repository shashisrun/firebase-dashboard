import React from 'react';
import TablePage from '../components/tablePage';
import { getDocuments, createRef, subscribe, getRef } from '../config/firebase';

export default function Categories() {
    const [rows, setRows] = React.useState([]);
    const [cuisines, setCuisines] = React.useState([]);
    const docroot = 'restaurants/cw8bYvB7wlQPAX1mjfFl/';

    React.useEffect(() => {
        const fetchData = async () => {
            subscribe(`${docroot}foods`, setRows)
            getDocuments(`${docroot}cuisines`).then((data) => {
                setCuisines(data);
            })
        }
        fetchData();
    }, [])

    const columns = [
        { field: 'id', headerName: 'ID', width: 200 },
        {
            field: 'name',
            headerName: 'Meal Name',
            width: 150,
            editable: true,
        },
        {
            field: 'thumbnails',
            headerName: 'Thumbnail',
            width: 110,
            editable: false,
            type: 'image',
        },
        {
            field: 'cuisines',
            headerName: 'Cuisines',
            width: 110,
            type: 'multiselect',
            values: cuisines,
            valueGetter: (params) => {
                if (params.value) return params.value.map(async (value) => getRef(value).then((response) => response));
             },
            title: () => {},
            value: () => {},
            onChange: () => {},
            
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
            type: 'date',
        },
        {
            field: 'updatedAt',
            headerName: 'Updated At',
            width: 250,
            type: 'date',
        },
    ];

    const addCuisine = {
        title: 'Meal',
        document: `${docroot}foods`,
        submitLabel: 'Add Meal',
        fields: [
            {
                type: 'text',
                name: 'Meal Name',
                required: true,
                key: 'name'
            },
            {
                type: 'file',
                name: 'Meal Image',
                required: false,
                multiple: 10,
                key: 'thumbnails',
                accept: 'image/*',
                uploadPath: 'restaurants/oscarclub/meals'
            },
            {
                type: 'select',
                multiple: true,
                name: 'Cuisines',
                required: true,
                key: 'cuisines',
                title: (data) => data.name,
                value: (data) => data.id,
                preprocess: (datas) => {
                    if (datas) {
                        return datas.map(data => createRef(`${docroot}cuisines`, data))
                    } else {
                        return []
                    }
                },
                options: cuisines
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
            <TablePage title={'Food Menu'} columns={columns} rows={rows} addDocument={addCuisine} docRoot={docroot} />
        </div>
    )
}
