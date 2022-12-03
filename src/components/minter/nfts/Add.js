import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";
import { uploadFileToWebStorage } from "../../../utils/minter";

const MODEL = ["Tactoes", "Boseman", "Bonjour"];
const NIKE_GOBBLER_GEN = ["Mutant", "Spike", "Hunter"];

// ...
const AddNfts = ({ save, address }) => {
  const [name, setName] = useState("");
  const [ipfsImage, setIpfsImage] = useState("");
  const [description, setDescription] = useState("");
  const [attributes, setAttributes] = useState([]);
  const [show, setShow] = useState(false);
  // ...

  // ...
  // check if all form data has been filled
  const isFormFilled = () =>
    name && ipfsImage && description && attributes.length > 2;

  // close the popup modal
  const handleClose = () => {
    setShow(false);
    setAttributes([]);
  };

  // display the popup modal
  const handleShow = () => setShow(true);

  // add an attribute to an NFT
  const setAttributesFunc = (e, trait_type) => {
    const { value } = e.target;
    const attributeObject = {
      trait_type,
      value,
    };
    const arr = attributes;

    // check if attribute already exists
    const index = arr.findIndex((el) => el.trait_type === trait_type);

    if (index >= 0) {
      // update the existing attribute
      arr[index] = {
        trait_type,
        value,
      };
      setAttributes(arr);
      return;
    }

    // add a new attribute
    setAttributes((oldArray) => [...oldArray, attributeObject]);
  };
  // ...

  // ...
  return (
    <>
      <Button
        onClick={handleShow}
        variant="dark"
        className="rounded-pill px-0"
        style={{ width: "38px" }}
      >
        <i className="bi bi-plus"></i>
      </Button>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Nike Gobbler NFT</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <FloatingLabel
              controlId="inputLocation"
              label="Name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Name of Nike Gobbler NFT"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="inputDescription"
              label="Description"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                placeholder="description"
                style={{ height: "80px" }}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </FloatingLabel>

            <Form.Control
              type="file"
              className={"mb-3"}
              onChange={async (e) => {
                const imageUrl = await uploadFileToWebStorage(e);
                if (!imageUrl) {
                  alert("failed to upload Nike Gobbler image");
                  return;
                }
                setIpfsImage(imageUrl);
              }}
              placeholder="Product name"
            ></Form.Control>
            <Form.Label>
              <h5>Properties</h5>
            </Form.Label>
            <Form.Control
              as="select"
              className={"mb-3"}
              onChange={async (e) => {
                setAttributesFunc(e, "model");
              }}
              placeholder="Nike Gobbler Model"
            >
              <option hidden>Nike Gobbler Model</option>
              {MODEL.map((model) => (
                <option
                  key={`model-${model.toLowerCase()}`}
                  value={model.toLowerCase()}
                >
                  {model}
                </option>
              ))}
            </Form.Control>

            <Form.Control
              as="select"
              className={"mb-3"}
              onChange={async (e) => {
                setAttributesFunc(e, "gen");
              }}
              placeholder="Nike Gobbler Generation"
            >
              <option hidden>Nike Gobbler Generation</option>
              {NIKE_GOBBLER_GEN.map((generation) => (
                <option
                  key={`generation-${generation.toLowerCase()}`}
                  value={generation.toLowerCase()}
                >
                  {generation}
                </option>
              ))}
            </Form.Control>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="dark"
            disabled={!isFormFilled()}
            onClick={() => {
              save({
                name,
                ipfsImage,
                description,
                ownerAddress: address,
                attributes,
              });
              handleClose();
            }}
          >
            Create Nike Gobbler NFT
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
// ...

// ...
AddNfts.propTypes = {
  save: PropTypes.func.isRequired,
  address: PropTypes.string.isRequired,
};

export default AddNfts;
