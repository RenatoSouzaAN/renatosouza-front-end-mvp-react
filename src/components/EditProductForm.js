import React, { useState, useEffect, useRef } from "react";
import { formatCurrency, isValidPrice } from "../utils/utils";

function EditProductForm({ product, onSubmit, onClose }) {
    const [editedProduct, setEditedProduct] = useState({
        ...product,
        price: formatCurrency(product.price),
    });
    const priceInputRef = useRef(null);
    const quantityInputRef = useRef(null);

    useEffect(() => {
        setEditedProduct({
            ...product,
            price: formatCurrency(product.price),
        });
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "price") {
            setEditedProduct({
                ...editedProduct,
                [name]: formatCurrency(value),
            });
            e.target.setCustomValidity("");
        } else if (name === "quantity") {
            setEditedProduct({ ...editedProduct, [name]: value });
            e.target.setCustomValidity("");
        } else {
            setEditedProduct({ ...editedProduct, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let isValid = true;

        priceInputRef.current.setCustomValidity("");
        quantityInputRef.current.setCustomValidity("");

        if (!isValidPrice(editedProduct.price)) {
            e.target.price.setCustomValidity(
                "Por favor, insira um preço válido."
            );
            isValid = false;
        } else {
            const numericPrice = parseFloat(
                editedProduct.price.replace(/[^\d,-]/g, "").replace(",", ".")
            );
            if (numericPrice < 1) {
                priceInputRef.current.setCustomValidity(
                    "O preço mínimo é R$1,00."
                );
                isValid = false;
            }
        }

        const quantityValue = parseInt(editedProduct.quantity);
        if (isNaN(quantityValue) || quantityValue < 1) {
            quantityInputRef.current.setCustomValidity(
                "A quantidade mínima é 1."
            );
            isValid = false;
        }

        if (!isValid) {
            if (!priceInputRef.current.validity.valid) {
                priceInputRef.current.reportValidity();
            } else if (!quantityInputRef.current.validity.valid) {
                quantityInputRef.current.reportValidity();
            }
            return;
        }

        const submittedProduct = {
            ...editedProduct,
            price: parseFloat(
                editedProduct.price.replace(/[^\d,-]/g, "").replace(",", ".")
            ),
        };
        onSubmit(submittedProduct);
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <span className="close" onClick={onClose}>
                    &times;
                </span>
                <h2>Editar Produto</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="editName">Nome:</label>
                    <div id="editName">{editedProduct.name}</div>
                    <br />
                    <br />
                    <label htmlFor="editDescription">Descrição:</label>
                    <textarea
                        id="editDescription"
                        name="description"
                        value={editedProduct.description}
                        onChange={handleChange}
                        rows="4"
                        cols="50"
                        placeholder="Digite aqui a descricão do seu produto (opcional)"
                    ></textarea>
                    <br />
                    <br />
                    <label htmlFor="editPrice">Preço:</label>
                    <input
                        type="text"
                        id="editPrice"
                        name="price"
                        value={editedProduct.price}
                        onChange={handleChange}
                        required
                        placeholder="R$ 0,00"
                        ref={priceInputRef}
                    />
                    <br />
                    <br />
                    <label htmlFor="editQuantity">Quantidade:</label>
                    <input
                        type="number"
                        id="editQuantity"
                        name="quantity"
                        value={editedProduct.quantity}
                        onChange={handleChange}
                        required
                        ref={quantityInputRef}
                    />
                    <br />
                    <br />
                    <input type="submit" value="Finalizar Edição" />
                </form>
            </div>
        </div>
    );
}

export default EditProductForm;
