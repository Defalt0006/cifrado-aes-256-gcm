# Demo · Cifrado AES-256-GCM

Ejemplo educativo de cómo cifrar y descifrar datos con **AES-256-GCM** usando el
módulo `crypto` de Node.js (sin librerías externas). Muestra cómo proteger datos
sensibles y cómo el modo GCM detecta si la información fue alterada.

## ¿Qué es AES-256-GCM?
- **Simétrico:** la misma llave cifra y descifra.
- **256 bits:** tamaño de la llave (mientras más grande, más difícil de romper).
- **GCM:** genera una etiqueta de autenticación que permite detectar manipulación.

## Cómo ejecutarlo
```bash
node demo.js
```

Verás el mensaje original, su versión cifrada (como se guardaría en una base de
datos), el mensaje descifrado y una prueba de que, si alguien altera los datos,
el descifrado se rechaza.

## Nota de seguridad
La llave de cifrado nunca debe escribirse en el código ni subirse a un repositorio.
En un proyecto real se guarda en una variable de entorno o en un gestor de secretos.

## Autor
José Antonio Soto Castrejón
