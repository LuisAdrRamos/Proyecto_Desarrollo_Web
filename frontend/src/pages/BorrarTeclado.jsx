import React, { useState } from 'react';

const BorrarTeclado = () => {
  const [teclados, setTeclados] = useState([
    { id: 1, nombre: 'Logitech MX Keys', tipo: 'Membrana', precio: 99.99 },
    { id: 2, nombre: 'Keychron K2', tipo: 'Mecánico', precio: 89.99 },
  ]);

  const borrarTeclado = (id) => {
    setTeclados(teclados.filter(teclado => teclado.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Borrar Teclado</h1>

      <table className="w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Nombre</th>
            <th className="border border-gray-300 px-4 py-2">Tipo</th>
            <th className="border border-gray-300 px-4 py-2">Precio ($)</th>
            <th className="border border-gray-300 px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {teclados.map(teclado => (
            <tr key={teclado.id}>
              <td className="border border-gray-300 px-4 py-2">{teclado.id}</td>
              <td className="border border-gray-300 px-4 py-2">{teclado.nombre}</td>
              <td className="border border-gray-300 px-4 py-2">{teclado.tipo}</td>
              <td className="border border-gray-300 px-4 py-2">{teclado.precio}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => borrarTeclado(teclado.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BorrarTeclado;