// ProductCRUD.js
import React, { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductCRUD = () => {
  const [product, setProduct] = useState({ name: '', price: '', description: '' });
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [editId, setEditId] = useState(null);

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProducts(productsList);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const registerProduct = async () => {
    if (!product.name || !product.price || !product.description) {
      setError('Todos los campos son obligatorios');
      return;
    }
    try {
      await addDoc(collection(db, 'products'), product);
      fetchProducts();
      setProduct({ name: '', price: '', description: '' });
      setError('');
    } catch (error) {
      console.error("Error al registrar el producto:", error);
    }
  };

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, 'products', id));
    fetchProducts();
  };

  const editProduct = (product) => {
    setProduct(product);
    setEditId(product.id);
  };

  const updateProduct = async () => {
    if (!product.name || !product.price || !product.description) {
      setError('Todos los campos son obligatorios');
      return;
    }
    try {
      const productRef = doc(db, 'products', editId);
      await updateDoc(productRef, product);
      setEditId(null);
      setProduct({ name: '', price: '', description: '' });
      fetchProducts();
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">CRUD de Productos</h2>
      <form className="mb-4" onSubmit={(e) => { e.preventDefault(); editId ? updateProduct() : registerProduct(); }}>
        <div className="mb-3">
          <label className="form-label">Nombre del producto</label>
          <input type="text" name="name" className="form-control" value={product.name} onChange={handleChange} placeholder="Nombre del producto" />
        </div>
        <div className="mb-3">
          <label className="form-label">Precio</label>
          <input type="number" name="price" className="form-control" value={product.price} onChange={handleChange} placeholder="Precio" />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea name="description" className="form-control" value={product.description} onChange={handleChange} placeholder="Descripción"></textarea>
        </div>
        <button type="submit" className="btn btn-primary">{editId ? 'Actualizar' : 'Registrar'}</button>
        {error && <p className="text-danger mt-2">{error}</p>}
      </form>
      <ul className="list-group">
        {products.map((prod) => (
          <li key={prod.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{prod.name}</strong> - ${prod.price} <br />
              <small>{prod.description}</small>
            </div>
            <div>
              <button className="btn btn-secondary btn-sm me-2" onClick={() => editProduct(prod)}>Editar</button>
              <button className="btn btn-danger btn-sm" onClick={() => deleteProduct(prod.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductCRUD;
