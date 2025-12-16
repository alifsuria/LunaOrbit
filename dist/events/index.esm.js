function createEmitter() {
  const events = new Map();

  return {
    on(event, fn) {
      const list = events.get(event) || [];
      list.push(fn);
      events.set(event, list);
      return () => this.off(event, fn);
    },

    off(event, fn) {
      const list = events.get(event);
      if (!list) return;
      const i = list.indexOf(fn);
      if (i !== -1) list.splice(i, 1);
    },

    emit(event, payload) {
      const list = events.get(event);
      if (!list) return;
      list.forEach((fn) => fn(payload));
    },
  };
}

export { createEmitter };
