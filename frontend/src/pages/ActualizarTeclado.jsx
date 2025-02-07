import React, { useState } from 'react';

const ActualizarTeclado = () => {
  const [teclados, setTeclados] = useState([
    { id: 1, nombre: 'Logitech MX Keys', tipo: 'Membrana', precio: 99.99 },
    { id: 2, nombre: 'Keychron K2', tipo: 'Mecánico', precio: 89.99 },
  ]);
  const [tecladoSeleccionado, setTecladoSeleccionado] = useState(null);
  const [formData, setFormData] = useState({ nombre: '', tipo: '', precio: '' });

  const seleccionarTeclado = (teclado) => {
    setTecladoSeleccionado(teclado);
    setFormData(teclado);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const actualizarTeclado = () => {
    setTeclados(teclados.map(teclado => 
      teclado.id === tecladoSeleccionado.id ? { ...formData } : teclado
    ));
    setTecladoSeleccionado(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Actualizar Teclado</h1>
      
      {/* Tabla de teclados */}
      <table className="w-full border-collapse border border-gray-400 mb-4">
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
                  onClick={() => seleccionarTeclado(teclado)} 
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formulario para editar teclado */}
      {tecladoSeleccionado && (
        <div className="border p-4 rounded">
          <h2 className="text-xl mb-2">Editar Teclado ID: {tecladoSeleccionado.id}</h2>
          <div className="mb-2">
            <label className="block text-sm font-medium">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="border border-gray-300 rounded w-full p-2"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium">Tipo</label>
            <input
              type="text"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              className="border border-gray-300 rounded w-full p-2"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-medium">Precio ($)</label>
            <input
              type="number"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              className="border border-gray-300 rounded w-full p-2"
            />
          </div>
          <button
            onClick={actualizarTeclado}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Guardar Cambios
          </button>
        </div>
      )}
    </div>
  );
};

export default ActualizarTeclado;
