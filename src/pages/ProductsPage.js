import React, {useContext, useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table'
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { fetchProducts } from 'Http/productsAPI';
import { createProduct, deleteProduct } from 'Http/productsAPI';

const ProductsPage = observer(() => {
    const {products} = useContext(Context);
    const [isValid, setValid] = useState(false);
    const [selector, setSelector] = useState(true)

    //remove product
    const [showDelProd, setShowDelProd] = useState(false);
    const handleShowDelete = () => setShowDelProd(true);
    const [delProdName, setDelProdName] = useState('');
    const [delProdId, setDelProdId] = useState(0);

    //add product
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const [price, setPrice] = useState('');
    const [name, setName] = useState('');

    //close form for new product after creating or when pressed Cancel button
    const handleClose = () => {
        setPrice('')
        setName('')
        setShow(false);
    }

    //close form for delete product after deleting or when pressed Cancel button
    const handleCloseDelete = () => {
        setShowDelProd(false);
    }

    useEffect(() => {
        fetchProducts().then(data => products.setProducts(data))
    }, [selector])


   const addProduct = () => {
        createProduct({name: price, price: price})
        //clear all temporary fields
        setPrice('')
        setName('')
        setShow(!show)
        setValid(!isValid)
        //reload page
        setSelector(!selector)
   }

   //save deleting prod data for information page
   const removeProduct = (prod) => {
        handleShowDelete()
        setDelProdName(prod.name)
        setDelProdId(prod.id)
   }

   //delete prod
   const deleteProductFn = () => {
        deleteProduct(delProdId)
        //clear all temporary fields
        setDelProdName('')
        setShowDelProd(!showDelProd)
        fetchProducts().then(data => products.setProducts(data))
        setSelector(!selector)
   }


    return (
        <React.Fragment>

            {/* For create new product */}
            <>
                <Button type="button" variant="btn btn-dark" onClick={() => handleShow()}
                style={{marginTop: '10px', marginLeft: "25%"}}>
                    Add Product
                </Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>Add new Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={name}
                                    onChange={e => {setName(e.target.value)}}
                                    required
                                    />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="0"
                                    value={price}
                                    onChange={e => {setPrice(e.target.value)}}
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
                        onClick={() => addProduct()}
                        >
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>

            {/* Table with products */}
            <Table className='mt-4' striped bordered hover size='sm' style={{width: '50%', margin: 'auto' }}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {products._products.map(prod => 
                        <tr key={prod.id}>
                            <td>{prod.id}</td>
                            <td>{prod.name}</td>
                            <td>{prod.price}</td>
                            <td width='7%'><Button variant="btn btn-dark" size='sm' 
                            onClick={() => {removeProduct(prod)}}>Delete</Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>

            {/* for delete product */}
            <Modal show={showDelProd}>
                    <Modal.Header>
                        <Modal.Title>Delete product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>You delete this product: {delProdName}</Form.Label>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="btn btn-secondary" onClick={() => handleCloseDelete()}>
                            Cancel
                        </Button>
                        <Button variant="btn btn-dark" onClick={() => deleteProductFn()}>
                            Delete
                        </Button>
                    </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
});

export default ProductsPage;
