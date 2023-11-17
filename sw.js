self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('appCronometro')
      .then(function(cache) {  
        return cache.addAll([
          'index.html',
          'dk.mp3',
          'beep.mp3',
          'descanso.mp3',
          'inicio.mp3',
          'sw.js'
          // Agrega aquí los archivos que deseas almacenar en caché
        ]);
      })
  );
});


self.addEventListener('fetch', function(event) {
  // Verifica si la solicitud es para 'listarProductos.php' o 'listarIntegrantes.php'
    // Para otras solicitudes, busca en la caché primero y luego realiza la solicitud de red si no está en la caché
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          return response || fetch(event.request);
        })
    );
  
});
