import React, { useState } from 'react';
import './App.css';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { items } from './items';

function FormPedido ({ visible=false, onClose, onSave, ...props }) {
  const [pedido, setPedido] = useState({});
  if (!visible) return null;
  return (
    <Modal
      show={visible}
      onHide={() => onClose(false)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Nome do cliente</Form.Label>
            <Form.Control
              name="cliente"
              placeholder="Digite o nome do cliente"
              value={pedido.cliente}
              onChange={(e) => setPedido({ ...pedido, cliente: e.target.value})}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            {
              items.map(item => (
                <>
                  <Form.Label>{item.label}</Form.Label>
                  <Form.Control
                    name={item.value}
                    placeholder="Quantidade"
                    value={pedido[item.value]}
                    onChange={(e) => setPedido({ ...pedido, [item.value]: e.target.value})}
                  />
                </>
              ))
            }
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Entrega" />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => onClose(false)}>Close</Button>
        <Button variant="primary" onClick={() => onSave(pedido)}>Save changes</Button>
      </Modal.Footer>
    </Modal>
  )
}

function App() {
  const [formPedidoVisible, setFormPedidoVisible] = useState(false);
  const [pedidos, setPedidos] = useState([]);
  const onSave = (pedido) => {
    pedidos.push(pedido)
    setPedidos(pedidos);
    setFormPedidoVisible(false);
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Assadão da Tere</h1>
        <Button onClick={() => setFormPedidoVisible(true)}>Adicionar pedido</Button>
        <FormPedido
          visible={formPedidoVisible}
          onClose={setFormPedidoVisible}
          onSave={onSave}
        />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Cliente</th>
              {
                items.map(item => <th>{item.label}</th>)
              }
            </tr>
          </thead>
          <tbody>
            {
              pedidos.map((pedido, index) => (
                <tr key={pedido.cliente}>
                  <td>{index}</td>
                  <td>{pedido.cliente}</td>
                  {
                    items.map(item => <td>{pedido[item.value]}</td>)
                  }
                </tr>
              ))
            }
          </tbody>
        </Table>
      </header>
    </div>
  );
}

export default App;
