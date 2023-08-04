import React, {useContext, useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table'
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { fetchInvoices, createInvoices, deleteInvoice } from 'Http/invoicesAPI';
import { getCusNames, getCustomerId, getCustomerName} from 'Pages/services';
import { fetchCustomers } from 'Http/customerAPI';
import { useNavigate } from 'react-router-dom';


const InvoicesPage = observer(() => {
    const {customers} = useContext(Context);
    const {invoices} = useContext(Context);
    const customersArr = customers._customers;
    const cusNamesArr = getCusNames(customersArr);
    const invoicesArr = invoices._invoices;
    const dataArr = invoicesArr.map(invoice => (
            {invoice_id: invoice.id, invoice_cusId: invoice.customer_id,
            invoice_discount: invoice.discount, invoice_total: invoice.total,
            cust_name: (getCustomerName(customersArr, invoice.customer_id))
            }
        ))

    const [isValid, setValid] = useState(+false);
    const [selector, setSelector] = useState(+true)

    //to delete invoice
    const [delInvoiceId, setDelInvoiceId] = useState(0);
    const [showDelInvoice, setShowDelInvoice] = useState(+false);
    const handleShowDelete = () => {
        setShowDelInvoice(+true);
    }
 
    //for new invoice
    const [show, setShow] = useState(+false);
    const handleShow = () => setShow(+true);
    const [customerName, setCustomerName] = useState('');
    const [discount, setDiscount] = useState('');
    const [total, setTotal] = useState(0);

    const navigate = useNavigate()

    //close form for new invoice after creating or when pressed Cancel button
    const handleClose = () => {
        setDiscount(0)
        setTotal(0)
        setShow(+false);
    }

    //close form for delete invoice after deleting or when pressed Cancel button
    const handleCloseDelete = () => {
        setShowDelInvoice(+false);
    }
    
    useEffect(() => {
        fetchInvoices().then(data => invoices.setInvoices(data))
        fetchCustomers().then(data => customers.setCustomers(data))
    }, [selector])


   const addInvoice = () => {
        //take customer id through Name
        createInvoices({customer_id: getCustomerId(customersArr, customerName),  
        discount: discount, total: total})
        //clear all temporary fields
        setDiscount('')
        setTotal(0)
        setShow(!show)
        setValid(!isValid)
        //reload page
        setSelector(!selector)
   }

   //save deleting invoice data for information page
   const removeInvoice = (inv) => {
        handleShowDelete()
        setDelInvoiceId(inv.invoice_id)
   }

   //delete invoice
   const deleteInvoiceFn = () => {
        deleteInvoice(delInvoiceId)
        fetchInvoices().then(data => invoices.setInvoices(data))
        //clear all temporary fields
        setDelInvoiceId('')
        setShowDelInvoice(!showDelInvoice)
        //reload page
        setSelector(!selector)
   } 
    
   const getInvoice = (invoice_id) => {
    return invoicesArr.find(inv => inv.id === invoice_id)
   }
    return (
        <React.Fragment>

            {/* For create new invoice */}
            <>
                <Button type="button" variant="btn btn-dark" onClick={() => handleShow()}
                style={{marginTop: '10px', marginLeft: "23%"}}>
                    Add Invoice
                </Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>Add new Invoice</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Customer Name</Form.Label>
                                    <select className="form-select" 
                                    value={customerName}
                                    onChange={e => {setCustomerName(e.target.value)}}
                                    >
                                        <option>Open this select menu</option>
                                        {cusNamesArr.map(cusName =>
                                            <option key={cusName} value={cusName}>{cusName}</option>
                                        )}
                                    </select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Discount</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="0"
                                    value={discount}
                                    onChange={e => {setDiscount(e.target.value)}}
                                    autoFocus
                                    placeholder='1.1'
                                    required
                                    />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="btn btn-secondary" onClick={() => handleClose()}>
                            Close
                        </Button>
                        <Button variant="btn btn-dark" 
                        onClick={() => addInvoice()}
                        >
                            Add
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>

            {/* Table with invoices */}
            <Table className='mt-4' striped bordered hover size='sm' style={{width: '55%', margin: 'auto' }}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Discount</th>
                        <th>Total</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {dataArr.map(data => 
                        <tr key={data.invoice_id}>
                            <td>{data.invoice_id}</td>
                            <td>{data.cust_name}</td>
                            <td>{data.invoice_discount}</td>
                            <td>{data.invoice_total}</td>
                            <td width='7%'>
                                {data.invoice_total !== 0 ? <a></a> :
                                <Button variant="btn btn-dark" size='sm' 
                                onClick={() => navigate('/invoices/' + data.invoice_id)}>
                                    Edit
                                </Button>
                                }
                            </td>
                            <td width='7%'><Button variant="btn btn-dark" size='sm' 
                            onClick={() => {removeInvoice(data)}}>Delete</Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>

            {/* for delete invoice */}
            <Modal show={showDelInvoice}>
                    <Modal.Header>
                        <Modal.Title>Delete Invoice</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>You delete this invoice ID #: {delInvoiceId}</Form.Label>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="btn btn-secondary" onClick={() => handleCloseDelete()}>
                            Cancel
                        </Button>
                        <Button variant="btn btn-dark" 
                        onClick={() => deleteInvoiceFn()}
                        >
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
        </React.Fragment>
    );
});

export default InvoicesPage;
