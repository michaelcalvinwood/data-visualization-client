let socket = null;

export const setupTheSocket = (socketio, url, store) => {
  if (socket) return;

  socket = socketio(url);

  socket.on('connect', () => {
    socket.emit('initFilters');
  });

  socket.on('initFilters', data => {
    store.dispatch({
      type: 'chartFilters/initFilters',
      payload: data
    });
  });

  socket.on('getSingleChartData', data => {
    store.dispatch({
      type: 'chartFilters/setSingleChartData',
      payload: data
    });
  });
};

export const emit = (event, ...args) => socket.emit(event, ...args);
