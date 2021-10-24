function WeblogService(client) {

  async function submitWeblog(formData) {
    const response = await client.post("/weblog", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  }

  return {
    submitWeblog
  };
}

export default WeblogService;