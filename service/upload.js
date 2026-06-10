export const upload = async (img) => {
  const formData = new FormData();
  formData.append("file", img);
  try {
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error);
    }
    return data;
  } catch (err) {
    console.log(err);
  }
};
