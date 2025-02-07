import React, { useState } from 'react';

const AñadirTeclado = () => {
  const [teclado, setTeclado] = useState({ nombre: '', tipo: '', precio: '' });
  const [teclados, setTeclados] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeclado({ ...teclado, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (teclado.nombre && teclado.tipo && teclado.precio) {
      setTeclados([...teclados, teclado]);
      setTeclado({ nombre: '', tipo: '', precio: '' });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Teclados</h1>

      {/* Formulario para añadir teclados */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Nombre del Teclado</label>
          <input
            type="text"
            name="nombre"
            value={teclado.nombre}
            onChange={handleChange}
            className="border border-gray-300 rounded w-full p-2"
            placeholder="Ej: Logitech MX Keys"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Tipo</label>
          <input
            type="text"
            name="tipo"
            value={teclado.tipo}
            onChange={handleChange}
            className="border border-gray-300 rounded w-full p-2"
            placeholder="Ej: Mecánico, Membrana, Custom"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Precio ($)</label>
          <input
            type="number"
            name="precio"
            value={teclado.precio}
            onChange={handleChange}
            className="border border-gray-300 rounded w-full p-2"
            placeholder="Ej: 99.99"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Añadir Teclado
        </button>
      </form>

      {/* Tabla para mostrar los teclados */}
      <h2 className="text-xl font-bold mb-2">Lista de Teclados</h2>
      <table className="w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Nombre</th>
            <th className="border border-gray-300 px-4 py-2">Tipo</th>
            <th className="border border-gray-300 px-4 py-2">Precio ($)</th>
          </tr>
        </thead>
        <tbody>
          {teclados.map((teclado, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">{teclado.nombre}</td>
              <td className="border border-gray-300 px-4 py-2">{teclado.tipo}</td>
              <td className="border border-gray-300 px-4 py-2">{teclado.precio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AñadirTeclado;
