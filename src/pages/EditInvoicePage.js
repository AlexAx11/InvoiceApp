import { observer } from 'mobx-react-lite';
import React, { useContext, useState, useEffect } from 'react'
import { Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import {Context} from "../index";
import Table from 'react-bootstrap/Table'
import { useNavigate } from 'react-router-dom';
import { INVOICES_ROUTE } from 'Utils/constants';
import { fetchItems, putItem } from 'Http/itemsAPI';
import { fetchProducts } from 'Http/productsAPI';
import { fetchInvoices, putOneInvoice } from 'Http/invoicesAPI';
import { fetchCustomers } from 'Http/customerAPI';
import { createItem } from 'Http/itemsAPI';

const EditInvoicePage = observer(() => {
    const {items} = useContext(Context);
    const {invoices} = useContext(Context);
    const {products} = useContext(Context)
    const {customers} = useContext(Context)
    const invoicesArr = invoices._invoices;
    const productsArr = products._products;
    const cusArr = customers._customers;

    const [invoice, setInvoice] = useState({})
    const [invoiceItems, setInvoiceItems] = useState([])
    const [prodName, setProdName] = useState('')
    const [newCusName, setNewCusName] = useState('')
    const [discount, setDiscount] = useState(0)
    const [totalVal, setTotalVal] = useState(0)
    const currentUrl = window //take url of current page
    const pattern = /\/(\d+)$/ //to take invoice# from url
    const navigate = useNavigate() //for returning to Invoices page
    const productsNameArr = productsArr.map(prod => prod.name)
    
    useEffect(() => {
            //save invoice
            const match = currentUrl.location.href.match(pattern);
            const invoiceId = match[1];
            fetchItems(invoiceId).then(data => items.setItems(data))
            fetchProducts().then(data => products.setProducts(data))
            fetchInvoices().then(data => invoices.setInvoices(data))
            fetchCustomers().then(data => customers.setCustomers(data))
            //find and save invoice
            const invoice = invoicesArr.find(inv => inv.id == invoiceId)
            setInvoice(invoice);

            //add cus name
            const invoiceCustomer = customers._customers.find(c => c.id === invoice.customer_id)
            setNewCusName(invoiceCustomer.name)
            setDiscount(invoice.discount)
           
             //create and save invoice's items

             const invoiceItemsArr = items._items.map(item => {
                if(item.invoice_id == invoiceId) return item})
             setInvoiceItems(invoiceItemsArr);
            
    }, [])

    //temporary ID for new Items
    const getTempId = () => {
        let newId = 0
        let tempIdArr = []
        tempIdArr = invoiceItems.map(item => item.temporary_id);
        if(tempIdArr.length > 0) {
            newId = tempIdArr.sort((a, b) => b - a)[0] + 1
        } else { newId = 1 }
        return newId;
    }

    //add item
    const addItem = () => {
        const newItem = {
            temporary_id: getTempId(),
            product_id: getProductId(),
            quantity: 0,
            invoice_id: invoice?.id
        }
        const clone = invoiceItems.slice(0);
        clone.push(newItem)
        setInvoiceItems(clone)
    }

    const getProductId = () => {
        const product = productsArr.find(prod => prod.name === prodName)
        return product?.id
    }

    //saving changes and return to Invoices page
    function changeInvoce() {
        const newItemsArr = invoiceItems.filter(i => i.temporary_id);
        const changedItemArr = invoiceItems.filter(i => i.id);
        const newInvoice = {id: invoice.id, customer_id: getCustomerId(),
            discount: discount, total: totalVal}
        newItemsArr.forEach(item => {
            createItem(invoice.id, item)
        })
        changedItemArr.forEach(item => {
            putItem(invoice.id, item.id, item)
        })
        putOneInvoice(invoice.id, newInvoice)
        fetchInvoices().then(data => invoices.setInvoices(data))
        navigate(INVOICES_ROUTE)
    }

    function removeInvoice(item) {
        let newInvoiceItems = [];
        if(item.temporary_id) {
            newInvoiceItems = invoiceItems.filter(_item => 
                (_item.temporary_id !== item.temporary_id))
        } else {
            newInvoiceItems = invoiceItems.filter(_item => 
                (_item.id !== item.id))
        }
        setInvoiceItems(newInvoiceItems)
        getTotal()
    }

    
    // product's data for table
    const getProdName = (prod_id) => {
        const product = productsArr.find(prod => prod.id === prod_id)
        return product ? product.name : ''
    }
    // product's data for table
    const getProdPrice = (prod_id) => {
        const product = productsArr.find(prod => prod.id === prod_id)
        return product ? product.price : 0
    }
    
    const setQtyFn = (item, qty) => {
        let clone = invoiceItems.slice(0);
        clone.find(i => i?.temporary_id === item?.temporary_id).quantity = qty
        setInvoiceItems(clone)
        getTotal()
    }

    const getTotal = () => {
        let res = 0
        invoiceItems.forEach(item => {
            const product = productsArr.find(prod => prod?.id === item.product_id)
            const sum = item?.quantity * product.price
            res = res + sum
        })
        if (res < 0) res = 0;
        if (discount > 0) {
            setTotalVal((res - (res*discount*0.01)).toFixed(2))
        } else { setTotalVal(res.toFixed(2)) }
    }

    const recountTotal = (disc) => {
        let res = 0
        invoiceItems.forEach(item => {
            const product = productsArr.find(prod => prod.id === item.product_id)
            const sum = item?.quantity * product.price
            res = res + sum
        })
        if (res < 0) res = 0;
        if (disc > 0) {
            setTotalVal((res - (res*disc*0.01)).toFixed(2))
        } else { setTotalVal(res.toFixed(2)) }
    } 

    const getCustomerId = () => {
        const cus = customers._customers.find(c => c.name === newCusName)
        return cus.id
    }

    return (
        <React.Fragment>
            <Container className="mt-3" style={{width: "70%", marginBottom: "3%"}}>
            <div className="col">
                <div className="form-outline" style={{width: "40%"}}>
                    <label className="form-label" htmlFor="form6Example1">Customer</label>
                        <select className="form-select" 
                                    value={newCusName}
                                    onChange={e => {setNewCusName(e.target.value)}}
                                    >
                                        <option>Open this select menu</option>
                                        {cusArr.map(cus =>
                                            <option key={cus.id} value={cus.name}>{cus.name}</option>
                                        )}
                        </select>
                </div>
            </div>
            <div className="col mt-3" style={{width: "15%"}}>
                <div className="form-outline">
                    <label className="form-label" htmlFor="form6Example2">Discount (%)</label>
                    <input type="number" min="0" id="form6Example2" className="form-control" 
                    onChange={e => {setDiscount(e.target.value); recountTotal(e.target.value)}}
                    value={discount}/>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col">
                    <div className="form-outline"  style={{width: "80%"}}>
                        <label className="form-label" htmlFor="form6Example2">Add Product</label>
                        <select className="form-select" 
                                    value={prodName}
                                    onChange={e => {setProdName(e.target.value)}}
                                    >
                                        <option>Open this select menu</option>
                                        {productsNameArr.map(prodName =>
                                            <option key={prodName} value={prodName}>{prodName}</option>
                                        )}
                                    </select>
                    </div>
                </div>
                <div className="col">
                    <Button style={{marginTop: '8%', marginLeft: '-20%'}} 
                    type="button" variant="btn btn-dark"
                    onClick={addItem}
                    >Add</Button>
                </div>
            </div>

            <Table className='mt-4' striped bordered hover size='sm' 
            style={{width: '75%', margin: 'auto', align: 'left', marginLeft: '0%' }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th width='25%'>Price</th>
                        <th width='15%'>Qty</th>
                        <th width='10%'>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {invoiceItems.length > 0 ? invoiceItems.map(item => 
                        <tr key={item?.id ? item?.id : item?.temporary_id}>
                            <td>{getProdName(item?.product_id)}</td>
                            <td>{getProdPrice(item?.product_id)}</td>
                            <td >
                                <input defaultValue={item?.quantity} style={{width: '80%'}} type='number'
                                     min="0" onChange={e => {setQtyFn(item, e.target.value)}}/>
                            </td>
                            <td><Button variant="btn btn-dark" size='sm' 
                            onClick={() => {removeInvoice(item)}}>Remove</Button></td>
                        </tr>
                    ) : <tr></tr>}
                </tbody>
            </Table>
          
            <div className="row mt-3">
                <div className="col">
                    <label className="form-label" style={{ marginTop: '8%',fontSize: '22px'}}  
                    htmlFor="form6Example3">Total: {totalVal}</label>
                </div> 
                <div className="col">
                    <Button style={{marginTop: '8%', marginLeft: '-35%'}} 
                    type="button" variant="btn btn-dark"
                    onClick={() => navigate(INVOICES_ROUTE)}
                    >Cancel</Button>
                </div>
                <div className="col">
                    <Button style={{marginTop: '8%', marginLeft: '-90%'}} 
                    type="button" variant="btn btn-dark"
                    onClick={() => changeInvoce()}
                    >Save Changes</Button>
                </div>
            </div>
        </Container>
        </React.Fragment>
    )
})

export default EditInvoicePage;