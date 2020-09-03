import React from 'react';
import { Button, Modal } from 'react-bootstrap';

export default function Options() {
    const [showG, setShowG] = React.useState(false);
    const [showB, setShowB] = React.useState(false);
  
    const handleCloseG = () => setShowG(false);
    const handleShowG = () => setShowG(true);
    const handleCloseB = () => setShowB(false);
    const handleShowB = () => setShowB(true);
    return (
        <div>
        <div>
        <Button variant="secondary" onClick={handleShowG}>
          Group
        </Button>
  
        <Modal show={showG} onHide={handleCloseG}>
          <Modal.Header closeButton>
            <Modal.Title>Create a New Group</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, more people</Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleCloseG}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        </div>


        <div>
        <Button variant="secondary" onClick={handleShowB}>
          Broadcast
        </Button>
  
        <Modal show={showB} onHide={handleCloseB}>
          <Modal.Header closeButton>
            <Modal.Title> Send a Broadcast Message </Modal.Title>
          </Modal.Header>
          <Modal.Body>Enter Something Here!!</Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleCloseB}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        </div>
        </div>
    )
}
