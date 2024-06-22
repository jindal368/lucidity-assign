import React, { useState } from "react";
import Modal from "react-modal";

const EditProductModal = ({ product, onSave }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    category: product.category,
    price: product.price,
    quantity: product.quantity,
    value: product.value,
  });

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedProduct({
      ...editedProduct,
      [name]: value,
    });
  };

  const handleSave = () => {
    onSave(editedProduct);
    closeModal();
  };

  return (
    <>
      <button
        onClick={openModal}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Edit
      </button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="Modal">
        <div className="m-4">
          <h2 className="text-lg font-bold mb-4">Edit Product</h2>
          <form>
            <div className="mb-4 flex items-center">
              <div className="w-1/2 mr-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Category:
                </label>
                <input
                  type="text"
                  name="category"
                  value={editedProduct.category}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="w-1/2 ml-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Price:
                </label>
                <input
                  type="number"
                  name="price"
                  value={editedProduct.price}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
            <div className="mb-4 flex items-center">
              <div className="w-1/2 mr-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Quantity:
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={editedProduct.quantity}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="w-1/2 ml-2">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Value:
                </label>
                <input
                  type="text"
                  name="value"
                  value={editedProduct.value}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={closeModal}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 mr-2 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default EditProductModal;
