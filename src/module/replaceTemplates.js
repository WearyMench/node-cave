module.exports = (temp, product) => {
  let output = temp.replace(/{%TITLE%}/g, product.title);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%LARGE_DESCRIPTION%}/g, product.large_description);
  output = output.replace(/{%ID%}/g, product.id);

  return output;
};
