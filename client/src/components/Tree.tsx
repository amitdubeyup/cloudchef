import './Tree.css';

interface TreeProps {
  data: Record<string, any>;
}

interface TreeNodeProps {
  node: Record<string, any>;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node }) => {
  return (
    <ul>
      {Object.entries(node).map(([nodeName, childNode]) => (
        <li key={nodeName}>
          <span className="node">{nodeName}</span>
          {Object.keys(childNode).length > 0 && <TreeNode node={childNode} />}
        </li>
      ))}
    </ul>
  );
};

const Tree: React.FC<TreeProps> = ({ data }) => {
  return (
    <div className="tree-container">
      <div className="tree">
        <TreeNode node={data} />
      </div>
    </div>
  );
};

export default Tree;
