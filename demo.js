const { generarLlave, cifrar, descifrar } = require("./cifrado");

const llave = generarLlave();
const mensaje = "Datos sensibles del usuario: tarjeta 4111-1111-1111-1111";

console.log("Mensaje original:");
console.log("  " + mensaje);

const paquete = cifrar(mensaje, llave);
console.log("\nCifrado (esto es lo que se guardaria en la base de datos):");
console.log(paquete);

const recuperado = descifrar(paquete, llave);
console.log("\nDescifrado de nuevo:");
console.log("  " + recuperado);

// Demostracion del valor de GCM: si alguien altera los datos cifrados,
// el descifrado se rechaza automaticamente.
console.log("\nProbando que pasa si alguien manipula los datos...");
try {
  const alterado = { ...paquete, datos: paquete.datos.replace(/.$/, "A") };
  descifrar(alterado, llave);
} catch (e) {
  console.log("  Detectado: los datos fueron alterados. El descifrado se rechazo.");
}
