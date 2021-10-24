function WeblogService(client) {

  async function submitWeblog(formData, unique, order) {
    // Building the URL like this should be improved upon.
    const url = `/weblog?unique=${unique}&order=${order}`;
    const response = await client.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  }

  return {
    submitWeblog
  };
}

export default WeblogService;