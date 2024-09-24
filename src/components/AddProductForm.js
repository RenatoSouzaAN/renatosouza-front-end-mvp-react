import React, { useState, useRef } from "react";
import { formatCurrency, isValidPrice } from "../utils/utils";

function AddProductForm({ onSubmit, onClose }) {
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        quantity: "",
    });
    const priceInputRef = useRef(null);
    const quantityInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "price") {
            setProduct({ ...product, [name]: formatCurrency(value) });
            e.target.setCustomValidity("");
        } else if (name === "quantity") {
            setProduct({ ...product, [name]: value });
            e.target.setCustomValidity("");
        } else {
            setProduct({ ...product, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let isValid = true;

        priceInputRef.current.setCustomValidity("");
        quantityInputRef.current.setCustomValidity("");

        if (!isValidPrice(product.price)) {
            priceInputRef.current.setCustomValidity(
                "Por favor, insira um preço válido."
            );
            isValid = false;
        } else {
            const numericPrice = parseFloat(
                product.price.replace(/[^\d,-]/g, "").replace(",", ".")
            );
            if (numericPrice < 1) {
                priceInputRef.current.setCustomValidity(
                    "O preço mínimo é R$1,00."
                );
                isValid = false;
            }
        }

        const quantityValue = parseInt(product.quantity);
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

        onSubmit({
            ...product,
            price: parseFloat(
                product.price.replace(/[^\d,-]/g, "").replace(",", ".")
            ),
        });
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <span className="close" onClick={onClose}>
                    &times;
                </span>
                <h2>Adicionar Produto</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="addName">Nome:</label>
                    <input
                        type="text"
                        id="addName"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                        placeholder="Digite aqui o nome do seu produto"
                    />
                    <br />
                    <br />
                    <label htmlFor="addDescription">Descrição:</label>
                    <textarea
                        id="addDescription"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        rows="4"
                        cols="50"
                        placeholder="Digite aqui a descricão do seu produto (opcional)"
                    ></textarea>
                    <br />
                    <br />
                    <label htmlFor="addPrice">Preço:</label>
                    <input
                        type="text"
                        id="addPrice"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                        placeholder="R$ 0,00"
                        ref={priceInputRef}
                    />
                    <br />
                    <br />
                    <label htmlFor="addQuantity">Quantidade:</label>
                    <input
                        type="number"
                        id="addQuantity"
                        name="quantity"
                        value={product.quantity}
                        onChange={handleChange}
                        required
                        placeholder="0"
                        ref={quantityInputRef}
                    />
                    <br />
                    <br />
                    <input type="submit" value="Adicionar Produto" />
                </form>
            </div>
        </div>
    );
}

export default AddProductForm;
