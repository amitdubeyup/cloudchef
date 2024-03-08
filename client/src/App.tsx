import React from 'react';
import './App.css';

interface TreeNodeProps {
  node: Record<string, any>;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node }) => {
  return (
    <ul>
      {Object.entries(node).map(([nodeName, childNode]) => (
        <li key={nodeName}>
          {nodeName}
          {Object.keys(childNode).length > 0 && <TreeNode node={childNode} />}
        </li>
      ))}
    </ul>
  );
};

const Tree: React.FC = () => {
  const data = {
    name1: {
      name2: {
        name4: {},
      },
      name3: {
        name5: {},
        name6: {},
        name7: {},
      },
    },
  };

  return (
    <div className="tree-container">
      <TreeNode node={data} />
    </div>
  );
};

const App: React.FC = () => {
  return <Tree />;
};

export default App;
