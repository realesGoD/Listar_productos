import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ProductCRUD from './ProductCRUD';

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <ProductCRUD />
  </StrictMode>,
)
