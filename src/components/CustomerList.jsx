import { useState, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import Button from "@mui/material/Button";
import Snackbar from '@mui/material/Snackbar';
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";



export default function Customerlist() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState();
    const gridRef = useRef()

    const [columnDefs] = useState([
        { field: "firstname", sortable: true, filter: true },
        { field: "lastname", sortable: true, filter: true, width: 150 },
        { field: "streetaddress", sortable: true, filter: true, width: 200 },
        { field: "postcode", sortable: true, filter: true, width: 100 },
        { field: "city", sortable: true, filter: true, width: 100 },
        { field: "email", sortable: true, filter: true, width: 120 },
        { field: "phone", sortable: true, filter: true, width: 120 },
        {
            cellRenderer: params => <EditCustomer customerdata={params.data} fetchCustomers={fetchCustomers} />,
            width: 80
        },
        {
            cellRenderer: params => <Button size="small" color="error" onClick={() => deleteCustomer(params.data.links[0].href)}>Delete</Button>,
            width: 80
        },
        {
            cellRenderer: (params) => (
                <AddTraining
                    customer={params.data.links[0].href}
                    saveTraining={addTraining}
                />
            ),
            width: 140
        }
    ]);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const deleteCustomer = (url) => {
        if (window.confirm("Are you sure?")) {
            fetch(url, { method: "DELETE" })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Error in delete " + response.statusText);
                    }
                    else {
                        setOpen(true)
                        setMsg("Customer deleted successfully");
                        fetchCustomers();
                    }
                })

                .catch(err => console.error(err))
        }
    }

    const fetchCustomers = () => {
        fetch(import.meta.env.VITE_API_URL + '/customers')
            .then(response => {
                if (!response.ok)
                    throw new Error("Something went wrong" + response.statusText);
                return response.json()
            })
            .then(data => {
                console.log(data);
                setCustomers(data.content)

            })
            .catch(err => console.error(err))
    }

    const addTraining = (training) => {
        fetch(import.meta.env.VITE_API_URL + "/trainings", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(training),
        })
            .then((response) => {
                if (response.ok) {
                    setMsg("Training added successfully");
                    setOpen(true);
                    fetchCustomers();
                } else {
                    alert("Something went wrong in addition: " + response.statusText);
                }
            })
            .catch((err) => console.error(err));
    };
    const exportToCSV = () => {

        if (gridRef.current && gridRef.current.api) {
            gridRef.current.api.exportDataAsCsv({
                fileName: "Customers.csv",
                columnKeys: [
                    "firstname",
                    "lastname",
                    "streetaddress",
                    "postcode",
                    "city",
                    "email",
                    "phone",
                ],
            });
        } else {
            console.error("Grid API is not available");
        }
    };

    useEffect(() => {

        if (gridRef.current && gridRef.current.api) {
            exportToCSV();
        }
    }, []);
    return (<>
        <AddCustomer fetchCustomers={fetchCustomers} />

        <Button onClick={exportToCSV}>Export to CSV</Button>
        <div className="ag-theme-material" style={{ width: "90%", height: 600 }}>
            <h1>Customers</h1>
            <AgGridReact
                rowData={customers}
                columnDefs={columnDefs}
                pagination={true}
                paginationAutoPageSize={true}
                ref={gridRef} // Attach the ref to the AgGridReact component
            />
        </div>
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={() => setOpen(false)}
            message={msg}
        />

    </>
    );
}
