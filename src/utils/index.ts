export const updateName = (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (name.length < 3) {
        reject(new Error("El nombre debe tener al menos 3 caracteres"));
        return;
      }
      resolve({ success: true });
    }, 2000);
  });
};

export const getData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: "ok",
      });
    }, 2000);
  });
};

export const updateJob = async (job: string) => {
  // Simulamos delay de red
  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (!job || job.length < 3) {
    return {
      error: true,
      message: "El nombre del trabajo debe tener más de 3 caracteres",
      job: null,
    };
  }

  return {
    error: false,
    message: `Trabajo actualizado correctamente a: ${job}`,
    job: job,
  };
};
