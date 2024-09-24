import React from "react";
import ProductCard from "./ProductCard";

function ProductList({ products, onDelete, onEdit }) {
    const isProductsValid = Array.isArray(products) && products.length > 0;

    return (
        <section className="items">
            <h2>Produtos:</h2>
            <div className="allProductsBox">
                {!isProductsValid ? (
                    <p>Sem produtos disponíveis, experimente adicionar um.</p>
                ) : (
                    products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onDelete={onDelete}
                            onEdit={onEdit}
                        />
                    ))
                )}
            </div>
        </section>
    );
}

export default ProductList;
