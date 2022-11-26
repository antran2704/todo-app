let timer;

const handleAddToast = (toasts, type, title) => {
  toasts.value.push({
    type,
    title,
    id: toasts.value.length + 1,
  });
  timer = setTimeout(() => {
    const test = toasts.value.filter((item) => {
      return item.id != toasts.value[0].id;
    });
    toasts.value = test;
  }, 5100);
};

const handleDeleteToast = (toasts, id) => {
  clearTimeout(timer);
  const newToast = toasts.value.filter((toast) => {
    return toast.id !== id;
  });

  toasts.value = newToast;
};


export {handleAddToast, handleDeleteToast}