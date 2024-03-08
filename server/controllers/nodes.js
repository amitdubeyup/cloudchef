const fs = require('fs-extra');
const NodesModal = require('../modals/nodes');

const fetchNodes = async (req, res) => {
  try {
    const result = await NodesModal.find({}).select({ name: 1, parentName: 1, childrenNames: 1, _id: 0 });
    function generateTree(inputData) {
      const tree = {};
      const nodes = {};
      inputData.forEach((item) => {
        nodes[item.name] = item;
      });
      function buildTree(nodeName) {
        const node = nodes[nodeName];
        if (!node) return {};
        const children = {};
        node.childrenNames.forEach((childName) => {
          children[childName] = buildTree(childName);
        });
        return children;
      }
      inputData.forEach((item) => {
        if (item.parentName === null) {
          tree[item.name] = buildTree(item.name);
        }
      });
      return tree;
    }
    const tree = generateTree(result);
    return res.send({
      success: true,
      message: 'Nodes fetched successfully.',
      data: tree,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error?.message ?? 'Unable to fetch nodes.',
    });
  }
};

const getFileData = async (file) => {
  try {
    if (!file || !file?.destination || !file?.filename || !file?.originalname) throw new Error('Please upload a file.');
    if (file?.originalname?.split('.')?.[1] != 'json') throw new Error('Please upload a valid json file.');
    const json_data = await fs.readJson(`./${file?.destination}${file?.filename}`);
    if (!Array.isArray(json_data) || json_data?.length === 0) throw new Error('File contents must be an array of at least one object.');
    if (json_data.filter((el) => Object.keys(el).length !== 3).length) throw new Error('Please upload a valid file containing only (name, parentName & childrenNames) in each object.');
    if (json_data.filter((el) => el?.parentName == null).length !== 1) throw new Error('Only one object in the array should have (parentName) as null.');
    if (json_data.filter((el) => el.childrenNames?.length > 4).length) throw new Error('Each node can have up to four children.');
    if (Math.max(0, ...json_data.map((el) => [...new Set([el?.parentName, ...el?.childrenNames].filter(Boolean))]?.length)) > 5) throw new Error(`The tree's maximum depth will not exceed five levels.`);
    if ([...new Set(json_data.map((el) => el?.parentName).filter((el) => el))].length > 15) throw new Error('No more than fifteen nodes will be present at the same level.');
    fs.unlink(`./${file?.destination}${file?.filename}`);
    return json_data;
  } catch (error) {
    throw new Error(error);
  }
};

const uploadNodes = async (req, res) => {
  try {
    const file_data = await getFileData(req.file);
    await NodesModal.deleteMany();
    await NodesModal.insertMany(file_data);
    return res.send({
      success: true,
      message: `Nodes uploaded successfully.`,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error?.message ?? `Unable to upload nodes.`,
    });
  }
};

module.exports = {
  fetchNodes: fetchNodes,
  uploadNodes: uploadNodes,
};
