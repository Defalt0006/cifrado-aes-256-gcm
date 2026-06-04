const crypto = require("crypto");

// AES-256-GCM: cifrado simétrico autenticado.
//  - "Simétrico": la misma llave cifra y descifra.
//  - "256": la llave es de 256 bits (32 bytes).
//  - "GCM": además de cifrar, genera una etiqueta (authTag) que permite
//           detectar si los datos fueron alterados.

const ALGORITMO = "aes-256-gcm";

// Genera una llave de 256 bits. En producción se guarda de forma segura
// (variable de entorno o gestor de secretos), NUNCA dentro del código.
function generarLlave() {
  return crypto.randomBytes(32);
}

function cifrar(textoPlano, llave) {
  const iv = crypto.randomBytes(12); // vector de inicialización único por mensaje
  const cipher = crypto.createCipheriv(ALGORITMO, llave, iv);
  const cifrado = Buffer.concat([cipher.update(textoPlano, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();
  // Se guardan los tres elementos juntos (en base64) para poder descifrar después.
  return {
    iv: iv.toString("base64"),
    authTag: authTag.toString("base64"),
    datos: cifrado.toString("base64"),
  };
}

function descifrar(paquete, llave) {
  const iv = Buffer.from(paquete.iv, "base64");
  const authTag = Buffer.from(paquete.authTag, "base64");
  const datos = Buffer.from(paquete.datos, "base64");
  const decipher = crypto.createDecipheriv(ALGORITMO, llave, iv);
  decipher.setAuthTag(authTag); // si los datos fueron alterados, el descifrado fallará
  const descifrado = Buffer.concat([decipher.update(datos), decipher.final()]);
  return descifrado.toString("utf8");
}

module.exports = { generarLlave, cifrar, descifrar };
